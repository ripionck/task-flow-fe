'use client';

import { AlertTriangle, History, Key, Shield, Smartphone } from 'lucide-react';
import { useState } from 'react';

// Sample login history data
const loginHistory = [
  {
    id: 1,
    device: 'Chrome on Windows',
    location: 'San Francisco, CA',
    ip: '192.168.1.1',
    date: 'Today, 10:30 AM',
    status: 'success',
  },
  {
    id: 2,
    device: 'Safari on macOS',
    location: 'New York, NY',
    ip: '192.168.1.2',
    date: 'Yesterday, 3:45 PM',
    status: 'success',
  },
  {
    id: 3,
    device: 'Firefox on Ubuntu',
    location: 'Chicago, IL',
    ip: '192.168.1.3',
    date: '3 days ago',
    status: 'failed',
  },
  {
    id: 4,
    device: 'Mobile App on iOS',
    location: 'Miami, FL',
    ip: '192.168.1.4',
    date: '1 week ago',
    status: 'success',
  },
];

export default function SecuritySettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [showSessions, setShowSessions] = useState(false);

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account security and authentication methods
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium flex items-center">
            <Key className="mr-2 h-5 w-5" />
            Password
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Update your password regularly to keep your account secure
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="current-password" className="block font-medium">
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="new-password" className="block font-medium">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block font-medium">
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800"
            />
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium flex items-center">
            <Smartphone className="mr-2 h-5 w-5" />
            Two-Factor Authentication
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add an extra layer of security to your account
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Require a verification code when logging in
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                id="two-factor"
                name="two-factor"
                checked={twoFactorEnabled}
                onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className="sr-only"
              />
              <div
                className={`block w-10 h-6 rounded-full ${
                  twoFactorEnabled
                    ? 'bg-blue-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  twoFactorEnabled ? 'transform translate-x-4' : ''
                }`}
              ></div>
            </div>
          </div>

          {twoFactorEnabled && (
            <>
              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="space-y-4">
                <h3 className="font-medium">Setup Two-Factor Authentication</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Download an authenticator app like Google Authenticator or
                    Authy
                  </li>
                  <li>Scan the QR code below with the app</li>
                  <li>Enter the verification code from the app</li>
                </ol>

                <div className="flex justify-center py-4">
                  <div className="bg-gray-200 dark:bg-gray-600 w-48 h-48 flex items-center justify-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      QR Code Placeholder
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="verification-code"
                    className="block font-medium"
                  >
                    Verification Code
                  </label>
                  <input
                    id="verification-code"
                    placeholder="Enter 6-digit code"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800"
                  />
                </div>

                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Verify and Enable
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Security Preferences
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure additional security settings
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Login Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email alerts for new login attempts
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="login-notifications"
                  name="login-notifications"
                  defaultChecked
                  className="sr-only"
                />
                <div className="block w-10 h-6 rounded-full bg-blue-500"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform translate-x-4"></div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Suspicious Activity Alerts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified about unusual account activity
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="suspicious-activity"
                  name="suspicious-activity"
                  defaultChecked
                  className="sr-only"
                />
                <div className="block w-10 h-6 rounded-full bg-blue-500"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform translate-x-4"></div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Session Timeout</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Automatically log out after a period of inactivity
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={sessionTimeout}
                  onChange={(e) =>
                    setSessionTimeout(Number.parseInt(e.target.value))
                  }
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800"
                />
                <span>minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium flex items-center">
            <History className="mr-2 h-5 w-5" />
            Login History
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review recent login activity on your account
          </p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Device
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loginHistory.map((login) => (
                  <tr key={login.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {login.device}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div>{login.location}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {login.ip}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {login.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          login.status === 'success'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {login.status === 'success' ? 'Successful' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="mt-4 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            onClick={() => setShowSessions(!showSessions)}
          >
            {showSessions ? 'Hide' : 'Show'} all active sessions
          </button>

          {showSessions && (
            <div className="mt-4 space-y-4">
              <h3 className="font-medium">Active Sessions</h3>
              <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/30 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      Current Session
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                      Chrome on Windows • San Francisco, CA • Started 2 hours
                      ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Logout All Other Devices
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
