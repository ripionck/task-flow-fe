import { MessageSquare, Paperclip, Send, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: {
        id: '1',
        name: 'John Doe',
        initials: 'JD',
        color: 'bg-blue-600',
      },
      text: "Hey team, how's the progress on the homepage redesign?",
      timestamp: new Date('2024-02-20T10:30:00').toISOString(),
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: {
        id: '2',
        name: 'Alice Martinez',
        initials: 'AM',
        color: 'bg-green-600',
      },
      text: "I've finished the wireframes and sent them for review.",
      timestamp: new Date('2024-02-20T10:32:00').toISOString(),
      isCurrentUser: false,
    },
    {
      id: 3,
      sender: {
        id: '3',
        name: 'Sarah Kim',
        initials: 'SK',
        color: 'bg-purple-600',
      },
      text: "Great work! I'll check them this afternoon.",
      timestamp: new Date('2024-02-20T10:45:00').toISOString(),
      isCurrentUser: true,
    },
  ]);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: {
        id: '3',
        name: 'Sarah Kim',
        initials: 'SK',
        color: 'bg-purple-600',
      },
      text: message,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  // Group consecutive messages
  const groupedMessages = messages.reduce((acc, msg, index) => {
    const prevMsg = messages[index - 1];
    const timeDiff = prevMsg
      ? new Date(msg.timestamp) - new Date(prevMsg.timestamp)
      : Infinity;

    if (
      prevMsg &&
      msg.sender.id === prevMsg.sender.id &&
      timeDiff < 300000 && // 5 minutes
      msg.isCurrentUser === prevMsg.isCurrentUser
    ) {
      acc[acc.length - 1].push(msg);
    } else {
      acc.push([msg]);
    }
    return acc;
  }, []);

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
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
                8 online
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
            {groupedMessages.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className={`flex ${
                  group[0].isCurrentUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] flex flex-col ${
                    group[0].isCurrentUser ? 'items-end' : 'items-start'
                  }`}
                >
                  {!group[0].isCurrentUser && (
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-6 h-6 rounded-full ${group[0].sender.color} flex items-center justify-center text-white text-xs`}
                      >
                        {group[0].sender.initials}
                      </div>
                      <span className="text-xs font-medium">
                        {group[0].sender.name}
                      </span>
                    </div>
                  )}
                  <div className="space-y-1">
                    {group.map((msg, msgIndex) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-lg ${
                          msg.isCurrentUser
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        } ${msgIndex === group.length - 1 ? 'mb-2' : ''}`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {formatTime(group[group.length - 1].timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-200 flex items-center gap-2"
          >
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-2 px-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              disabled={message.trim() === ''}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
