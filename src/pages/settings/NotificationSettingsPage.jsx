import { useState } from 'react';

const NotificationSettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    taskAssignments: true,
    taskComments: true,
    projectUpdates: true,
    teamAnnouncements: true,
    dueDateReminders: true,
    browserNotifications: true,
    desktopNotifications: false,
    dailyDigest: true,
    weeklyDigest: false,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSave = () => {
    // In a real app, this would save the settings to the backend
    console.log('Saving notification settings:', settings);
    // Show a success message or toast
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Notification Settings
        </h2>
        <p className="text-gray-600">
          Manage how and when you receive notifications
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-gray-500">
                  Receive notifications via email
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pl-6">
              <div>
                <div className="font-medium">Task Assignments</div>
                <div className="text-sm text-gray-500">
                  When you are assigned to a task
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.taskAssignments}
                  onChange={() => handleToggle('taskAssignments')}
                  disabled={!settings.emailNotifications}
                />
                <div
                  className={`w-11 h-6 ${
                    settings.emailNotifications ? 'bg-gray-200' : 'bg-gray-100'
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${
                    !settings.emailNotifications && 'opacity-50'
                  }`}
                ></div>
              </label>
            </div>

            <div className="flex items-center justify-between pl-6">
              <div>
                <div className="font-medium">Task Comments</div>
                <div className="text-sm text-gray-500">
                  When someone comments on your task
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.taskComments}
                  onChange={() => handleToggle('taskComments')}
                  disabled={!settings.emailNotifications}
                />
                <div
                  className={`w-11 h-6 ${
                    settings.emailNotifications ? 'bg-gray-200' : 'bg-gray-100'
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${
                    !settings.emailNotifications && 'opacity-50'
                  }`}
                ></div>
              </label>
            </div>

            <div className="flex items-center justify-between pl-6">
              <div>
                <div className="font-medium">Project Updates</div>
                <div className="text-sm text-gray-500">
                  When there are updates to your projects
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.projectUpdates}
                  onChange={() => handleToggle('projectUpdates')}
                  disabled={!settings.emailNotifications}
                />
                <div
                  className={`w-11 h-6 ${
                    settings.emailNotifications ? 'bg-gray-200' : 'bg-gray-100'
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${
                    !settings.emailNotifications && 'opacity-50'
                  }`}
                ></div>
              </label>
            </div>

            <div className="flex items-center justify-between pl-6">
              <div>
                <div className="font-medium">Team Announcements</div>
                <div className="text-sm text-gray-500">
                  When there are team-wide announcements
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.teamAnnouncements}
                  onChange={() => handleToggle('teamAnnouncements')}
                  disabled={!settings.emailNotifications}
                />
                <div
                  className={`w-11 h-6 ${
                    settings.emailNotifications ? 'bg-gray-200' : 'bg-gray-100'
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${
                    !settings.emailNotifications && 'opacity-50'
                  }`}
                ></div>
              </label>
            </div>

            <div className="flex items-center justify-between pl-6">
              <div>
                <div className="font-medium">Due Date Reminders</div>
                <div className="text-sm text-gray-500">
                  Reminders for upcoming task deadlines
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.dueDateReminders}
                  onChange={() => handleToggle('dueDateReminders')}
                  disabled={!settings.emailNotifications}
                />
                <div
                  className={`w-11 h-6 ${
                    settings.emailNotifications ? 'bg-gray-200' : 'bg-gray-100'
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${
                    !settings.emailNotifications && 'opacity-50'
                  }`}
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-lg font-medium mb-4">Browser Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Browser Notifications</div>
                <div className="text-sm text-gray-500">
                  Receive notifications in your browser
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.browserNotifications}
                  onChange={() => handleToggle('browserNotifications')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Desktop Notifications</div>
                <div className="text-sm text-gray-500">
                  Receive notifications on your desktop
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.desktopNotifications}
                  onChange={() => handleToggle('desktopNotifications')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-lg font-medium mb-4">Digest Emails</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Daily Digest</div>
                <div className="text-sm text-gray-500">
                  Receive a daily summary of activities
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.dailyDigest}
                  onChange={() => handleToggle('dailyDigest')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly Digest</div>
                <div className="text-sm text-gray-500">
                  Receive a weekly summary of activities
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.weeklyDigest}
                  onChange={() => handleToggle('weeklyDigest')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
