import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardsView from '../components/boards-view';
import CalendarView from '../components/calendar-view';
import DashboardView from '../components/dashboard-view';
import NewBoardModal from '../components/new-board-modal';
import NewTaskModal from '../components/new-task-modal';
import NotificationsView from '../components/notifications-view';
import ReportsView from '../components/reports-view';
import SettingsView from '../components/settings-view';
import Sidebar from '../components/sidebar';
import TeamSpaceView from '../components/team-space-view';

export default function Main() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
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

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onNewTask={() => setIsNewTaskModalOpen(true)} />;
      case 'boards':
        return <BoardsView onNewBoard={() => setIsNewBoardModalOpen(true)} />;
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
        onViewChange={setCurrentView}
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
      </main>
    </div>
  );
}
