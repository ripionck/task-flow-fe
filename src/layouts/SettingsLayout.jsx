import { Bell, Globe, Lock, Moon, Shield, User } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const SettingsLayout = () => {
  const location = useLocation();

  const settingsTabs = [
    { name: 'Account', href: '/settings/account', icon: User },
    { name: 'Password', href: '/settings/password', icon: Lock },
    { name: 'Notifications', href: '/settings/notifications', icon: Bell },
    { name: 'Appearance', href: '/settings/appearance', icon: Moon },
    { name: 'Security', href: '/settings/security', icon: Shield },
    { name: 'Language', href: '/settings/language', icon: Globe },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-300">
            <h2 className="font-medium">Settings</h2>
          </div>

          <div className="p-2">
            {settingsTabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={`w-full flex items-center gap-3 p-2 rounded-md text-left ${
                  location.pathname === tab.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
