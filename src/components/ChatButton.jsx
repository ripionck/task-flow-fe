import axios from 'axios';
import { File, MessageSquare, Paperclip, Send, Users, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Set axios defaults
axios.defaults.baseURL = SOCKET_URL;

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userUnreadCounts, setUserUnreadCounts] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef();
  const fileInputRef = useRef();
  const visibleMessagesRef = useRef(new Set());

  // Socket connection and event handlers
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in again.');
      return;
    }

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    // Handle socket connection events
    socketRef.current.on('connect', () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      socketRef.current.emit('authenticate', {
        userId: userData.id,
        username: userData.name,
      });
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setError('Could not connect to chat server. Please try again later.');
      setIsConnected(false);
    });

    socketRef.current.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    });

    // Message event handlers
    socketRef.current.on('newMessage', (serverMessage) => {
      const isCurrentUser = serverMessage.user._id === userData.id;

      setMessages((prev) => {
        // Remove optimistic message using tempId
        const filteredMessages = prev.filter(
          (msg) =>
            msg._id !== serverMessage.tempId && msg._id !== serverMessage._id,
        );

        // Add the server-confirmed message
        return [...filteredMessages, { ...serverMessage, isCurrentUser }];
      });

      // Mark own messages as read immediately
      if (isCurrentUser) {
        markMessageAsRead(serverMessage._id);
      } else if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    // Handle unread counts from server
    socketRef.current.on('unread:counts', (counts) => {
      console.log('Received unread counts:', counts);
      setUserUnreadCounts(counts);

      // Calculate total unread for our badge
      const totalUnread = Object.values(counts).reduce(
        (sum, count) => sum + count,
        0,
      );
      if (!isOpen) {
        setUnreadCount(totalUnread);
      }
    });

    socketRef.current.on('comment:typing', ({ user }) => {
      if (user) {
        setTypingUsers((prev) =>
          prev.includes(user.username) ? prev : [...prev, user.username],
        );
        setTimeout(() => {
          setTypingUsers((prev) =>
            prev.filter((username) => username !== user.username),
          );
        }, 3000);
      }
    });

    socketRef.current.on('users:online', (users) => {
      setOnlineUsers(users);
    });

    socketRef.current.on('user:online', ({ userId, username }) => {
      setOnlineUsers((prev) => {
        if (!prev.some((user) => user.userId === userId)) {
          return [...prev, { userId, username }];
        }
        return prev;
      });
    });

    socketRef.current.on('user:offline', ({ userId }) => {
      setOnlineUsers((prev) => prev.filter((user) => user.userId !== userId));
    });

    socketRef.current.on('error', (errorData) => {
      console.error('Socket error:', errorData);
      setError(errorData.message || 'An error occurred in the chat.');
    });

    // Request unread counts on connection
    if (socketRef.current) {
      socketRef.current.emit('unread:request');
    }

    // Cleanup on unmount or when dependency changes
    return () => {
      if (socketRef.current) {
        // Properly disconnect the socket
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Function to mark messages as read
  const markMessageAsRead = (messageId) => {
    if (socketRef.current && isConnected) {
      // Add to visible messages
      visibleMessagesRef.current.add(messageId);

      // Send read status to server (only send unique IDs)
      socketRef.current.emit('message:read', {
        messageIds: Array.from(visibleMessagesRef.current),
      });
    }
  };

  // Batch mark messages as read when chat is opened
  useEffect(() => {
    if (isOpen && messages.length > 0 && socketRef.current && isConnected) {
      const messageIds = messages.map((msg) => msg._id);

      // Add all to visible messages set
      messageIds.forEach((id) => visibleMessagesRef.current.add(id));

      // Notify server
      socketRef.current.emit('message:read', {
        messageIds: Array.from(visibleMessagesRef.current),
      });

      // Reset local unread count
      setUnreadCount(0);
    }
  }, [isOpen, messages, isConnected]);

  // Load messages when chat opens
  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);
      setError('');
      setUnreadCount(0);

      axios
        .get('/api/messages', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            // Sort messages by createdAt in ascending order
            const sortedMessages = res.data.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            );
            setMessages(sortedMessages);

            // Mark all loaded messages as read
            const messageIds = sortedMessages.map((msg) => msg._id);
            if (socketRef.current && isConnected) {
              messageIds.forEach((id) => visibleMessagesRef.current.add(id));
              socketRef.current.emit('message:read', {
                messageIds: Array.from(visibleMessagesRef.current),
              });
            }
          } else {
            console.error('Expected array of messages but got:', res.data);
            setMessages([]);
            setError('Failed to load messages properly.');
          }
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
          setError(
            'Failed to load message history. Please refresh or try again later.',
          );
          setMessages([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, isConnected]);

  // Message scrolling
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // File upload handler
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err) {
      console.error('File upload failed:', err);
      setError('File upload failed. Please try again.');
      return null;
    }
  };

  // Message submission
  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (!message.trim() && !filePreview) return;
      if (!socketRef.current || !isConnected) {
        setError('Not connected to chat server. Please try again.');
        return;
      }

      setError(''); // Clear any previous errors

      try {
        let fileData = null;
        if (filePreview) {
          fileData = await handleFileUpload(filePreview.file);
          if (!fileData) {
            return; // Exit if file upload failed (error already set)
          }
        }

        // Generate a unique temporary ID
        const tempId = uuidv4();

        // Include tempId when emitting the message
        socketRef.current.emit('sendMessage', {
          text: message,
          file: fileData,
          tempId,
        });

        // Optimistic message with tempId
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const optimisticMessage = {
          _id: tempId,
          text: message,
          file: filePreview
            ? {
                name: filePreview.name,
                type: filePreview.type,
                url: filePreview.preview,
              }
            : null,
          user: {
            _id: userData.id,
            name: userData.name,
          },
          createdAt: new Date().toISOString(),
          isCurrentUser: true,
          isOptimistic: true, // Mark as optimistic
        };

        setMessages((prev) => [...prev, optimisticMessage]);
        setMessage('');
        setFilePreview(null);
      } catch (err) {
        console.error('Message send failed:', err);
        setError('Failed to send message. Please try again.');
      }
    },
    [message, filePreview, isConnected],
  );

  // Typing indicator
  const handleTyping = useCallback(
    (isTyping) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit('comment:typing', {
          taskId: 'global',
          isTyping,
        });
      }
    },
    [isConnected],
  );

  // File preview handling
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFilePreview({
      file,
      name: file.name,
      type: file.type,
      preview: URL.createObjectURL(file),
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col z-50 border border-gray-200">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="font-medium">Team Chat</h3>
              <span className="bg-green-500 text-xs px-2 py-0.5 rounded-full">
                {onlineUsers.length} online
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-700 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading messages...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 p-3 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            ) : messages.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">No messages yet</p>
              </div>
            ) : (
              // User list with unread counts
              <div className="mb-4 border-b pb-2">
                <h4 className="text-xs font-semibold text-gray-500 mb-2">
                  TEAM MEMBERS
                </h4>
                <div className="space-y-1">
                  {onlineUsers.map((user) => {
                    const unreadFromUser = userUnreadCounts[user.userId] || 0;
                    return (
                      <div
                        key={user.userId}
                        className="flex justify-between items-center p-1 rounded hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                              {user.username.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <span className="text-sm font-medium">
                            {user.username}
                          </span>
                        </div>
                        {unreadFromUser > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadFromUser}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {messages.map((msg) => {
              // Mark message as read when it's rendered
              if (!msg.isCurrentUser && msg._id) {
                markMessageAsRead(msg._id);
              }

              return (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.isCurrentUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] flex flex-col ${
                      msg.isCurrentUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    {!msg.isCurrentUser && (
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs`}
                        >
                          {msg.user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-medium">
                          {msg.user.name}
                        </span>
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        msg.isCurrentUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {msg.text && <p className="text-sm">{msg.text}</p>}
                      {msg.file && (
                        <div className="mt-2">
                          {msg.file.type.startsWith('image/') ? (
                            <img
                              src={msg.file.url}
                              alt={msg.file.name}
                              className="max-w-full h-32 rounded-lg object-cover"
                            />
                          ) : (
                            <a
                              href={msg.file.url}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center text-blue-500 hover:underline"
                            >
                              <File className="h-4 w-4 mr-2" />
                              {msg.file.name}
                            </a>
                          )}
                        </div>
                      )}
                      {/* Add timestamp */}
                      <div
                        className={`text-xs mt-1 ${
                          msg.isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*, .pdf, .doc, .docx"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {filePreview && (
              <div className="flex items-center gap-2 mr-2">
                {filePreview.type.startsWith('image/') ? (
                  <img
                    src={filePreview.preview}
                    alt="Preview"
                    className="h-8 w-8 rounded object-cover"
                  />
                ) : (
                  <File className="h-5 w-5 text-gray-500" />
                )}
                <span className="text-sm truncate max-w-[100px]">
                  {filePreview.name}
                </span>
                <button
                  type="button"
                  onClick={() => setFilePreview(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping(e.target.value.length > 0);
              }}
              placeholder="Type a message..."
              className="flex-1 py-2 px-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={(!message.trim() && !filePreview) || !isConnected}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          {typingUsers.length > 0 && (
            <div className="px-3 py-1 text-sm text-gray-500">
              {typingUsers.join(', ')} typing...
            </div>
          )}

          {!isConnected && (
            <div className="px-3 py-1 text-sm text-red-500 bg-red-50">
              Disconnected from chat server. Trying to reconnect...
            </div>
          )}
        </div>
      )}
    </>
  );
}
