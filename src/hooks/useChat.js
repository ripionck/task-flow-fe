import { useContext } from 'react';
import { ChatContext } from '../context/Chatcontext';

const useChat = () => {
  const context = useContext(ChatContext);

  if (context === null) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  return context;
};

export default useChat;
