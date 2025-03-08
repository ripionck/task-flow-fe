import {
  Bell,
  Calendar,
  LayoutDashboard,
  LayoutPanelLeft,
  PieChart,
  Settings,
  Users,
} from 'lucide-react';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

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
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
            JD
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-gray-500">john@example.com</div>
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
