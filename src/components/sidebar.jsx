import {
  Bell,
  Calendar,
  LayoutDashboard,
  LayoutPanelLeft,
  PieChart,
  Settings,
  Users,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'boards', icon: LayoutPanelLeft, label: 'Boards' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'reports', icon: PieChart, label: 'Reports' },
  { id: 'team', icon: Users, label: 'Team' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ currentView, onViewChange, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user data');

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return 'US';
    const names = fullName.split(' ');
    if (names.length === 1) return names[0].slice(0, 2).toUpperCase();
    return names
      .slice(0, 2)
      .map((name) => name[0].toUpperCase())
      .join('');
  };

  return (
    <aside className="w-60 border-r border-gray-200 bg-white flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
      </div>

      <nav className="flex-1 p-2 overflow-y-auto">
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
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 relative">
        <div
          ref={profileRef}
          className="flex items-center gap-3 px-3 py-2 cursor-pointer"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          {userData?.avatar ? (
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
              {getInitials(userData?.fullName)}
            </div>
          )}
          <div className="flex-1">
            <div className="text-sm font-medium truncate">
              {userData?.fullName || 'Loading...'}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {userData?.email || 'Loading...'}
            </div>
          </div>
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 w-full bottom-full mb-2 z-20"
          >
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <button
                className="w-full px-4 py-3 text-left text-red-500 hover:bg-red-100"
                onClick={() => {
                  onLogout();
                  setIsDropdownOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  currentView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
