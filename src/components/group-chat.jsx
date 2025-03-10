import {
  ChevronLeft,
  Image,
  MoreVertical,
  Paperclip,
  Search,
  Send,
  Smile,
  Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

// Configure Socket.io connection
const SOCKET_SERVER_URL = 'http://localhost:5000';

export default function GroupChat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const [chatMembers, setChatMembers] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [joined, setJoined] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Socket event listeners cleanup
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      newSocket.disconnect();
    };
  }, []);

  // Setup socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Listen for messages
    socket.on('message', (receivedMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: receivedMessage.id,
          sender: {
            id: receivedMessage.userId,
            name: receivedMessage.username,
            initials: getInitials(receivedMessage.username),
            color: getUserColor(receivedMessage.userId),
          },
          text: receivedMessage.text,
          timestamp: formatTimestamp(receivedMessage.timestamp),
          isCurrentUser: receivedMessage.userId === userId,
        },
      ]);
    });

    // Listen for user joined event
    socket.on('userJoined', (data) => {
      const systemMessage = {
        id: Date.now(),
        system: true,
        text: data.message,
        timestamp: formatTimestamp(new Date().toISOString()),
      };
      setMessages((prevMessages) => [...prevMessages, systemMessage]);

      // Update members list
      updateMembersList(data.activeUsers);
    });

    // Listen for user left event
    socket.on('userLeft', (data) => {
      const systemMessage = {
        id: Date.now(),
        system: true,
        text: data.message,
        timestamp: formatTimestamp(new Date().toISOString()),
      };
      setMessages((prevMessages) => [...prevMessages, systemMessage]);

      // Update members list
      setChatMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== data.id),
      );
    });

    // Listen for active users update
    socket.on('activeUsers', (users) => {
      updateMembersList(users);
    });

    // Listen for typing events
    socket.on('userTyping', ({ username, isTyping }) => {
      if (isTyping) {
        setTypingUsers((prev) => ({ ...prev, [username]: true }));
      } else {
        setTypingUsers((prev) => {
          const newTypingUsers = { ...prev };
          delete newTypingUsers[username];
          return newTypingUsers;
        });
      }
    });

    return () => {
      socket.off('message');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('activeUsers');
      socket.off('userTyping');
    };
  }, [socket, userId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper function to get user initials
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Helper function to assign color based on user ID
  const getUserColor = (id) => {
    const colors = [
      'bg-blue-600',
      'bg-green-600',
      'bg-purple-600',
      'bg-red-600',
      'bg-yellow-600',
      'bg-pink-600',
      'bg-indigo-600',
      'bg-teal-600',
    ];

    // Simple hash function to deterministically assign color
    const hash = String(id)
      .split('')
      .reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0);

    return colors[hash % colors.length];
  };

  // Format timestamp from ISO to AM/PM format
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Update the members list with active users
  const updateMembersList = (users) => {
    const members = users.map((user) => ({
      id: typeof user === 'string' ? user : user.id || user.userId,
      name: typeof user === 'string' ? user : user.name || user.username,
      initials: getInitials(
        typeof user === 'string' ? user : user.name || user.username,
      ),
      color: getUserColor(
        typeof user === 'string' ? user : user.id || user.userId,
      ),
      status: 'online',
    }));

    setChatMembers(members);
  };

  // Handle user joining the chat
  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() && socket) {
      const generatedUserId = 'user_' + Date.now();
      setUserId(generatedUserId);
      socket.emit('join', username);
      setJoined(true);
    }
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '' || !socket) return;

    socket.emit('sendMessage', { text: message });
    setMessage('');

    // Clear typing indicator
    socket.emit('typing', false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  // Handle typing indicator
  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (socket) {
      socket.emit('typing', true);

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to clear typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing', false);
      }, 2000);
    }
  };

  // Login screen
  if (!joined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Team Chat</h1>
            <p className="mt-2 text-gray-600">
              Enter your name to join the chat
            </p>
          </div>
          <form onSubmit={handleJoin} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Join Chat
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Group messages by sender for consecutive messages
  const groupedMessages = messages.reduce((acc, message, index) => {
    // Handle system messages
    if (message.system) {
      acc.push({
        system: true,
        messages: [message],
      });
      return acc;
    }

    const prevMessage = messages[index - 1];
    const isSameSender =
      prevMessage &&
      !prevMessage.system &&
      prevMessage.sender.id === message.sender.id;

    const isConsecutive =
      isSameSender &&
      new Date(message.timestamp) - new Date(prevMessage.timestamp) <
        5 * 60 * 1000; // 5 minutes

    if (isConsecutive) {
      const lastGroup = acc[acc.length - 1];
      lastGroup.messages.push(message);
      return acc;
    } else {
      acc.push({
        sender: message.sender,
        isCurrentUser: message.isCurrentUser,
        messages: [message],
      });
      return acc;
    }
  }, []);

  return (
    <div className="flex h-full">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMembers(!showMembers)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {showMembers ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <Users className="h-5 w-5" />
              )}
            </button>
            <div>
              <h2 className="font-semibold text-lg">Team Chat</h2>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{chatMembers.length} online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {groupedMessages.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`flex ${
                group.system
                  ? 'justify-center'
                  : group.isCurrentUser
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {/* System messages */}
              {group.system ? (
                <div className="px-4 py-2 bg-gray-200 rounded-lg text-sm text-gray-600">
                  {group.messages[0].text}
                </div>
              ) : (
                <>
                  {/* User avatar (only for non-current user messages) */}
                  {!group.isCurrentUser && (
                    <div className="mt-1 mr-2">
                      <div
                        className={`w-8 h-8 rounded-full ${group.sender.color} flex items-center justify-center text-white text-sm`}
                      >
                        {group.sender.initials}
                      </div>
                    </div>
                  )}

                  <div className={`max-w-[75%]`}>
                    {/* Sender name (only for non-current user messages) */}
                    {!group.isCurrentUser && (
                      <div className="mb-1 ml-1">
                        <span className="text-sm font-medium">
                          {group.sender.name}
                        </span>
                      </div>
                    )}

                    {/* Message bubbles */}
                    <div className="space-y-1">
                      {group.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg ${
                            group.isCurrentUser
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-800 border'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs text-gray-500 mt-1 block">
                      {group.messages[group.messages.length - 1].timestamp}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {Object.keys(typingUsers).length > 0 && (
            <div className="flex justify-start">
              <div className="px-4 py-2 bg-gray-200 rounded-lg text-sm text-gray-600">
                {Object.keys(typingUsers).join(', ')}{' '}
                {Object.keys(typingUsers).length === 1 ? 'is' : 'are'} typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-3 border-t bg-white">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <Image className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <Smile className="h-5 w-5" />
              </button>
            </div>

            <input
              type="text"
              value={message}
              onChange={handleTyping}
              placeholder="Type a message..."
              className="flex-1 py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
              disabled={message.trim() === ''}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Members Sidebar (hidden on mobile unless toggled) */}
      <div
        className={`w-64 border-l bg-white ${
          showMembers ? 'block' : 'hidden md:block'
        }`}
      >
        <div className="p-4 border-b">
          <h3 className="font-medium">Team Members</h3>
        </div>

        <div className="p-2">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search members..."
              className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-1">
            {chatMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white text-sm`}
                  >
                    {member.initials}
                  </div>
                  <span
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      member.status === 'online'
                        ? 'bg-green-500'
                        : member.status === 'away'
                        ? 'bg-yellow-500'
                        : 'bg-gray-400'
                    }`}
                  ></span>
                </div>
                <div>
                  <div className="text-sm font-medium">{member.name}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {member.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
