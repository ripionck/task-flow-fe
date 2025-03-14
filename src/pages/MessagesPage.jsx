import { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatPanel from '../components/ChatPanel';
import useChat from '../hooks/useChat';

const MessagesPage = () => {
  const { activeConversation, messages, sendMessage } = useChat();
  const [chatPanelOpen, setChatPanelOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-gray-600">Manage your conversations</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full">
          <ChatList />
        </div>
      </div>

      {/* Chat Panel for mobile/responsive view */}
      {activeConversation && (
        <ChatPanel
          isOpen={chatPanelOpen || window.innerWidth >= 768}
          onClose={() => setChatPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default MessagesPage;
