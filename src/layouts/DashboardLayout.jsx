import {
  BarChart2,
  Bell,
  Calendar,
  LayoutGrid,
  LayoutList,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import ChatPanel from '../components/ChatPanel';
import LogoutButton from '../components/LogoutButton';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-60 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-blue-600 dark:text-blue-500"
          >
            TaskFlow
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 ${
              location.pathname === '/dashboard'
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-500'
                : ''
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/boards"
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 ${
              location.pathname.startsWith('/boards')
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-500'
                : ''
            }`}
          >
            <LayoutList className="w-5 h-5" />
            <span>Boards</span>
          </Link>

          <Link
            to="/calendar"
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 ${
              location.pathname === '/calendar'
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-500'
                : ''
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Calendar</span>
          </Link>

          <Link
            to="/notifications"
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 relative ${
              location.pathname === '/notifications'
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-500'
                : ''
            }`}
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              5
            </span>
          </Link>

          <Link
            to="/reports"
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 ${
              location.pathname === '/reports'
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-500'
                : ''
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            <span>Reports</span>
          </Link>

          <Link
            to="/team"
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 ${
              location.pathname === '/team'
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-500'
                : ''
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Team</span>
          </Link>

          <Link
            to="/settings"
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 ${
              location.pathname.startsWith('/settings')
                ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-500'
                : ''
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* Profile section with dropdown */}
        <div
          className="p-4 border-t border-gray-200 dark:border-gray-800 relative"
          ref={profileRef}
        >
          <div
            className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {user?.name || 'User'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || 'user@example.com'}
              </div>
            </div>
          </div>

          {/* Profile dropdown */}
          {isProfileOpen && (
            <div className="absolute bottom-full left-0 mb-1 w-full p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <div className="space-y-2">
                <LogoutButton className="w-full justify-start p-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      {/* Chat button */}
      <div className="fixed bottom-6 right-6">
        <button
          className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default DashboardLayout;
