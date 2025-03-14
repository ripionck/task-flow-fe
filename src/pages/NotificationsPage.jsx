'use client';

import {
  Bell,
  Check,
  Clock,
  Filter,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

// Sample notification data
const notifications = [
  {
    id: 1,
    type: 'mention',
    content: 'John Doe mentioned you in a comment on "Homepage Redesign"',
    time: '2 minutes ago',
    read: false,
    project: 'Marketing Website',
  },
  {
    id: 2,
    type: 'assignment',
    content: 'You have been assigned to "Create user flow diagrams"',
    time: '1 hour ago',
    read: false,
    project: 'Mobile App',
  },
  {
    id: 3,
    type: 'deadline',
    content: 'Task "Finalize copy for landing page" is due tomorrow',
    time: '3 hours ago',
    read: true,
    project: 'Marketing Website',
  },
  {
    id: 4,
    type: 'comment',
    content: 'Sarah Johnson commented on your task "Design system components"',
    time: 'Yesterday',
    read: true,
    project: 'Design System',
  },
  {
    id: 5,
    type: 'update',
    content: 'Project "CRM Integration" has been updated',
    time: '2 days ago',
    read: true,
    project: 'CRM Integration',
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const markAllAsRead = () => {
    setNotificationsList(
      notificationsList.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const clearAllNotifications = () => {
    setNotificationsList([]);
  };

  const markAsRead = (id) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const deleteNotification = (id) => {
    setNotificationsList(
      notificationsList.filter((notification) => notification.id !== id),
    );
  };

  const filteredNotifications = notificationsList.filter((notification) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return true;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <div className="flex space-x-2">
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            onClick={markAllAsRead}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </button>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            onClick={clearAllNotifications}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear all
          </button>
          <div className="relative">
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    role="menuitem"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    All notifications
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    role="menuitem"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    Mentions
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    role="menuitem"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    Assignments
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    role="menuitem"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    Comments
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    role="menuitem"
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                  >
                    Updates
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium">Recent Notifications</h2>
        </div>
        <div className="p-4">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'unread'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('unread')}
              >
                Unread
                <span className="ml-2 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                  {notificationsList.filter((n) => !n.read).length}
                </span>
              </button>
            </nav>
          </div>

          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg ${
                    notification.read
                      ? 'bg-white dark:bg-gray-800'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="mt-0.5">
                        <Bell className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {notification.content}
                        </p>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {notification.project}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!notification.read && (
                        <button
                          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </button>
                      )}
                      <button
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </button>
                      <div className="relative">
                        <button
                          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            // Toggle dropdown for this notification
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <Bell className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  You're all caught up! No new notifications at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
