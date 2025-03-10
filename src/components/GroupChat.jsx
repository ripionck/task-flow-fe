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

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const messageHandler = (msg) =>
      setMessages((prev) => [
        ...prev,
        {
          id: msg.id,
          sender: {
            id: msg.userId,
            name: msg.username,
            initials: getInitials(msg.username),
            color: getUserColor(msg.userId),
          },
          text: msg.text,
          timestamp: msg.timestamp,
          isCurrentUser: msg.userId === userId,
        },
      ]);

    const userJoinedHandler = (data) => {
      setMessages((prev) => [...prev, createSystemMessage(data.message)]);
      updateMembersList(data.activeUsers);
    };

    const userLeftHandler = (data) => {
      setMessages((prev) => [...prev, createSystemMessage(data.message)]);
      setChatMembers((prev) => prev.filter((m) => m.id !== data.userId));
    };

    const typingHandler = ({ username, isTyping }) => {
      setTypingUsers((prev) =>
        isTyping
          ? { ...prev, [username]: true }
          : (({ [username]: _, ...rest }) => rest)(prev),
      );
    };

    socket.on('message', messageHandler);
    socket.on('userJoined', userJoinedHandler);
    socket.on('userLeft', userLeftHandler);
    socket.on('activeUsers', updateMembersList);
    socket.on('userTyping', typingHandler);

    return () => {
      socket.off('message', messageHandler);
      socket.off('userJoined', userJoinedHandler);
      socket.off('userLeft', userLeftHandler);
      socket.off('activeUsers', updateMembersList);
      socket.off('userTyping', typingHandler);
    };
  }, [socket, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getInitials = (name) =>
    name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

  const getUserColor = (id) =>
    ['blue', 'green', 'purple', 'red', 'yellow', 'pink', 'indigo', 'teal'][
      id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 8
    ] + '-600';

  const createSystemMessage = (text) => ({
    id: Date.now(),
    system: true,
    text,
    timestamp: new Date().toISOString(),
  });

  const updateMembersList = (users) =>
    setChatMembers(
      users.map((u) => ({
        id: u.id,
        name: u.name,
        initials: getInitials(u.name),
        color: getUserColor(u.id),
        status: 'online',
      })),
    );

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() && socket) {
      const newUserId = `user_${Date.now()}`;
      setUserId(newUserId);
      socket.emit('join', { username, userId: newUserId });
      setJoined(true);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    socket.emit('sendMessage', {
      text: message,
      userId,
      username,
      timestamp: new Date().toISOString(),
    });
    setMessage('');
    socket.emit('typing', false);
    clearTimeout(typingTimeoutRef.current);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(
      () => socket.emit('typing', false),
      2000,
    );
  };

  const formatTime = (isoString) =>
    new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  if (!joined)
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
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
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                {chatMembers.length} online
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

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.system
                  ? 'justify-center'
                  : msg.isCurrentUser
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {msg.system ? (
                <div className="px-4 py-2 bg-gray-200 rounded-lg text-sm text-gray-600">
                  {msg.text}
                </div>
              ) : (
                <div
                  className={`max-w-[75%] ${
                    msg.isCurrentUser ? 'text-right' : 'text-left'
                  }`}
                >
                  {!msg.isCurrentUser && (
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-8 h-8 rounded-full ${msg.sender.color} flex items-center justify-center text-white`}
                      >
                        {msg.sender.initials}
                      </div>
                      <span className="text-sm font-medium">
                        {msg.sender.name}
                      </span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      msg.isCurrentUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              )}
            </div>
          ))}
          {Object.keys(typingUsers).length > 0 && (
            <div className="flex justify-start">
              <div className="px-4 py-2 bg-gray-200 rounded-lg text-sm text-gray-600">
                {Object.keys(typingUsers).join(', ')} typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

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
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Members Sidebar */}
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
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
