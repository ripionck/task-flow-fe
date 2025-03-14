import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';

const API_URL = window.env?.REACT_APP_API_URL || 'http://localhost:5000';

const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(() => {
    return {
      userId: 'default',
      name: 'General Chat',
      color: 'bg-blue-600',
    };
  });
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [typingUsers, setTypingUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    if (!isAuthenticated || !user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found');
      setLoading(false);
      return;
    }

    // Create socket connection
    const socketInstance = io(API_URL, {
      auth: { token },
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
      setError(null);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
      setError(`Connection error: ${err.message}`);
      setConnected(false);
    });

    socketInstance.on('error', (data) => {
      console.error('Socket error:', data.message);
      setError(data.message);
    });

    socketInstance.on('conversationsUpdated', (data) => {
      setConversations(data);
    });

    socketInstance.on('messageReceived', (message) => {
      // Add message to messages if it's part of the active conversation
      if (
        activeConversation &&
        ((message.senderId === activeConversation.userId &&
          message.receiverId === user.displayId) ||
          (message.receiverId === activeConversation.userId &&
            message.senderId === user.displayId))
      ) {
        setMessages((prev) => [...prev, message]);

        // Mark as read if we're the receiver
        if (message.receiverId === user.displayId) {
          socketInstance.emit('markAsRead', { messageId: message._id });
        }
      }
    });

    socketInstance.on('messageRead', ({ messageId }) => {
      // Update message read status
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, isRead: true } : msg,
        ),
      );
    });

    socketInstance.on('userStatus', ({ userId, status }) => {
      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: status === 'online',
      }));
    });

    socketInstance.on('userTyping', ({ userId, isTyping }) => {
      setTypingUsers((prev) => ({
        ...prev,
        [userId]: isTyping,
      }));

      // Clear typing status after 3 seconds if still typing
      if (isTyping) {
        setTimeout(() => {
          setTypingUsers((prev) => ({
            ...prev,
            [userId]: false,
          }));
        }, 3000);
      }
    });

    setSocket(socketInstance);
    setLoading(false);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [isAuthenticated, user, activeConversation]);

  // Fetch messages for active conversation
  const fetchMessages = useCallback(
    async (conversationUserId) => {
      if (!conversationUserId || !user) return;

      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}/api/messages/${conversationUserId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        setMessages(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  // Set active conversation and fetch messages
  const startConversation = useCallback(
    (conversation) => {
      setActiveConversation(conversation);
      fetchMessages(conversation.userId);
    },
    [fetchMessages],
  );

  // Send message
  const sendMessage = useCallback(
    (text) => {
      if (!socket || !connected || !activeConversation) {
        setError('Cannot send message: not connected');
        return false;
      }

      socket.emit('privateMessage', {
        receiverId: activeConversation.userId,
        text,
      });

      return true;
    },
    [socket, connected, activeConversation],
  );

  // Send typing status
  const sendTypingStatus = useCallback(
    (isTyping) => {
      if (!socket || !connected || !activeConversation) return;

      socket.emit('typing', {
        receiverId: activeConversation.userId,
        isTyping,
      });
    },
    [socket, connected, activeConversation],
  );

  // Mark message as read
  const markMessageAsRead = useCallback(
    (messageId) => {
      if (!socket || !connected) return;

      socket.emit('markAsRead', { messageId });
    },
    [socket, connected],
  );

  // Close active conversation
  const closeConversation = useCallback(() => {
    setActiveConversation(null);
    setMessages([]);
  }, []);

  const value = {
    connected,
    conversations,
    activeConversation,
    messages,
    onlineUsers,
    typingUsers,
    loading,
    error,
    startConversation,
    sendMessage,
    sendTypingStatus,
    markMessageAsRead,
    closeConversation,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Add prop validation
ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ChatContext, ChatProvider };
