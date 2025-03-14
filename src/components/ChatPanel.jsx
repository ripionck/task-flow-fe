import { Image, Paperclip, Send, Smile, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';

const ChatPanel = ({ isOpen, onClose }) => {
  const {
    activeConversation,
    messages,
    sendMessage,
    sendTypingStatus,
    typingUsers,
    onlineUsers,
  } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle typing status
  const handleTyping = () => {
    sendTypingStatus(true);

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout to stop typing status after 2 seconds
    const timeout = setTimeout(() => {
      sendTypingStatus(false);
    }, 2000);

    setTypingTimeout(timeout);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const success = sendMessage(newMessage.trim());
    if (success) {
      setNewMessage('');
      sendTypingStatus(false);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const isUserTyping = typingUsers[activeConversation.userId];
  const isUserOnline = onlineUsers[activeConversation.userId];

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col border overflow-hidden z-50">
      {/* Chat Header */}
      <div className="p-3 border-b bg-blue-600 text-white flex justify-between items-center">
        {activeConversation ? (
          <>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full ${activeConversation.color}`}
              >
                {activeConversation.userId.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-medium">{activeConversation.name}</div>
                <div className="text-xs text-blue-100">
                  {isUserOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
            <button onClick={handleClose}>
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="flex-1 text-center">Select a conversation</div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
        <div className="space-y-3">
          {messages.map((message) => {
            const isMe = message.senderId === user.displayId;
            return (
              <div
                key={message._id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg'
                      : 'bg-white border rounded-tl-lg rounded-tr-lg rounded-br-lg'
                  } p-3 shadow-sm`}
                >
                  <div className="text-sm">{message.text}</div>
                  <div
                    className={`text-xs mt-1 flex items-center gap-1 ${
                      isMe ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {isMe && message.isRead && (
                      <span className="text-xs">✓</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {isUserTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-500 rounded-lg p-2 text-sm">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t p-3 bg-white flex items-center gap-2"
      >
        <button type="button" className="text-gray-400 hover:text-gray-600">
          <Paperclip className="w-5 h-5" />
        </button>
        <button type="button" className="text-gray-400 hover:text-gray-600">
          <Image className="w-5 h-5" />
        </button>
        <button type="button" className="text-gray-400 hover:text-gray-600">
          <Smile className="w-5 h-5" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border-0 focus:outline-none focus:ring-0"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          disabled={!newMessage.trim()}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
