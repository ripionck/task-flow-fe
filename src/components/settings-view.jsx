import { useEffect, useState } from 'react';
import { PageHeader } from './page-header';

export default function SettingsView() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    settings: {
      emailNotifications: true,
      desktopNotifications: true,
      themeMode: 'system',
      accentColor: '#3b82f6',
    },
    avatar: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

        const { data } = await response.json();
        setUserData({
          ...data,
          settings: data.settings || {
            emailNotifications: true,
            desktopNotifications: true,
            themeMode: 'system',
            accentColor: '#3b82f6',
          },
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return 'US';
    const names = fullName.split(' ');
    return names
      .slice(0, 2)
      .map((name) => name[0].toUpperCase())
      .join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/users/${userData._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: userData.fullName,
            email: userData.email,
            settings: userData.settings,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update settings');
      }

      setUserData(data.data);
      setSuccessMessage('Settings updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading settings...</div>;
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />
      <div className="min-h-screen max-w-5xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Profile Settings */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-6">Profile Settings</h2>
            <div className="flex items-center gap-4 mb-6">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                  {getInitials(userData.fullName)}
                </div>
              )}
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                onClick={() => alert('Avatar update not implemented yet')}
              >
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
                  value={userData.fullName}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    checked={userData.settings.emailNotifications}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          emailNotifications: e.target.checked,
                        },
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
                    checked={userData.settings.desktopNotifications}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          desktopNotifications: e.target.checked,
                        },
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
                  value={userData.settings.themeMode}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      settings: {
                        ...prev.settings,
                        themeMode: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  {['#3b82f6', '#7c3aed', '#16a34a', '#dc2626'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setUserData((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            accentColor: color,
                          },
                        }))
                      }
                      className={`w-8 h-8 rounded-full border-2 ${
                        userData.settings.accentColor === color
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
