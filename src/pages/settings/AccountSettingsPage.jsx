import { useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import useAuth from '../../hooks/useAuth';

const AccountSettingsPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-600">
          Manage your account information and preferences
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={user?.email || ''}
            disabled
          />
          <p className="mt-1 text-xs text-gray-500">
            Your email address is used for login and notifications
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Change Password
          </button>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-lg font-medium mb-4">Account Actions</h3>
          <div className="space-y-4">
            <LogoutButton className="px-4 py-2 border border-gray-300 rounded-lg" />

            <button className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
