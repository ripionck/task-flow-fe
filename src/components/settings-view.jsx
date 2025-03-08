import { useState } from 'react';
import { PageHeader } from './page-header';

export default function SettingsView() {
  const [settings, setSettings] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    emailNotifications: true,
    desktopNotifications: false,
    themeMode: 'light',
    accentColor: '#2563eb',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update
    console.log('Settings updated:', settings);
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-4">
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Settings */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-6">Profile Settings</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                JD
              </div>
              <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
                Change Photo
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.fullName}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-6">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-600">
                    Receive email updates about your tasks
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        emailNotifications: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Desktop Notifications</h3>
                  <p className="text-sm text-gray-600">
                    Get notifications on your desktop
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.desktopNotifications}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        desktopNotifications: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Theme Settings */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-6">Theme Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme Mode
                </label>
                <select
                  value={settings.themeMode}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      themeMode: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Accent Color
                </label>
                <div className="flex gap-3">
                  {['#2563eb', '#7c3aed', '#16a34a', '#dc2626'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, accentColor: color }))
                      }
                      className={`w-8 h-8 rounded-full border-2 ${
                        settings.accentColor === color
                          ? 'border-blue-600'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
