import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardDetailView from '../components/BoardDetailView';
import BoardsView from '../components/BoardsView';
import CalendarView from '../components/CalendarView';
import ChatButton from '../components/ChatButton';
import DashboardView from '../components/DashboardView';
import NewBoardModal from '../components/NewBoardModal';
import NewTaskModal from '../components/NewTaskModal';
import NotificationsView from '../components/NotificationsView';
import ReportsView from '../components/ReportsView';
import SettingsView from '../components/SettingsView';
import Sidebar from '../components/Sidebar';
import TeamSpaceView from '../components/TeamSpaceView';

// List of valid view IDs (excluding boardDetail)
const validViews = [
  'dashboard',
  'boards',
  'calendar',
  'settings',
  'team',
  'notifications',
  'reports',
];

export default function Main() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState(() => {
    const storedView = localStorage.getItem('currentView');
    return validViews.includes(storedView) ? storedView : 'dashboard';
  });
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  // Persist only valid views to localStorage
  useEffect(() => {
    if (validViews.includes(currentView)) {
      localStorage.setItem('currentView', currentView);
    }
  }, [currentView]);

  // Route protection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentView');
    navigate('/login');
  }, [navigate]);

  const handleCreateTask = (taskData) => {
    console.log('New Task:', taskData);
    // Handle task creation logic here
  };

  const handleCreateBoard = (boardData) => {
    console.log('New Board:', boardData);
    // Handle board creation logic here
  };

  const handleViewChange = (newView) => {
    if (validViews.includes(newView)) {
      setCurrentView(newView);
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleBoardSelect = (boardId) => {
    setSelectedBoardId(boardId);
    setCurrentView('boardDetail');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onNewTask={() => setIsNewTaskModalOpen(true)} />;
      case 'boards':
        return (
          <BoardsView
            onNewBoard={() => setIsNewBoardModalOpen(true)}
            onBoardSelect={handleBoardSelect}
          />
        );
      case 'boardDetail':
        return (
          <BoardDetailView
            onNewTask={() => setIsNewTaskModalOpen(true)}
            boardId={selectedBoardId}
          />
        );
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return <SettingsView />;
      case 'team':
        return <TeamSpaceView />;
      case 'notifications':
        return <NotificationsView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        {renderView()}

        <NewTaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
          onSubmit={handleCreateTask}
        />

        <NewBoardModal
          isOpen={isNewBoardModalOpen}
          onClose={() => setIsNewBoardModalOpen(false)}
          onSubmit={handleCreateBoard}
        />

        <ChatButton />
      </main>
    </div>
  );
}
