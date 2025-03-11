import {
  Bell,
  Calendar,
  LayoutDashboard,
  LayoutPanelLeft,
  LogOut,
  PieChart,
  Settings,
  Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'boards', icon: LayoutPanelLeft, label: 'Boards' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Notifications',
    notificationCount: 5,
  },
  { id: 'reports', icon: PieChart, label: 'Reports' },
  { id: 'team', icon: Users, label: 'Team' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ currentView, onViewChange }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, response: ${text}`,
          );
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format - expected JSON');
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch user profile');
        }
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Rest of the component remains the same...
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <aside className="w-60 border-r border-gray-200 bg-white flex flex-col">
      {/* Rest of the JSX remains the same... */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.notificationCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                    {item.notificationCount}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200" ref={profileMenuRef}>
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
            isProfileMenuOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
            {user?.initials}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{user?.name || 'User'}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
        {isProfileMenuOpen && (
          <div className="mt-2 pl-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
