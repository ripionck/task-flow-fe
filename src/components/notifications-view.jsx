import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { PageHeader } from './page-header';

const notifications = [
  {
    id: 1,
    group: 'Today',
    items: [
      {
        id: 1,
        type: 'assignment',
        user: { initials: 'JD', color: 'bg-blue-600', name: 'John Doe' },
        content: 'assigned you to the task "Update dashboard layout"',
        time: '2 hours ago',
        action: { text: 'View task', link: '#' },
        bgColor: 'bg-blue-50',
      },
      {
        id: 2,
        type: 'deadline',
        user: { initials: '⏰', color: 'bg-yellow-600' },
        content: 'Task "API Integration" is due in 2 hours',
        time: '30 minutes ago',
        action: { text: 'View deadline', link: '#' },
        bgColor: 'bg-yellow-50',
      },
    ],
  },
  {
    id: 2,
    group: 'Yesterday',
    items: [
      {
        id: 3,
        type: 'completion',
        user: { initials: 'AM', color: 'bg-green-600', name: 'Alice Martinez' },
        content: 'completed task "User authentication"',
        time: 'Yesterday at 4:30 PM',
        bgColor: 'bg-white',
      },
      {
        id: 4,
        type: 'comment',
        user: { initials: 'SK', color: 'bg-purple-600', name: 'Sarah Kim' },
        content: 'commented on "Bug fixes in drag-drop"',
        comment:
          '"I\'ve identified the issue with the drag functionality. Will push the fix today."',
        time: 'Yesterday at 2:15 PM',
        bgColor: 'bg-white',
      },
    ],
  },
];

export default function NotificationsView() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-4">
      <PageHeader
        title="Notifications"
        subtitle="Stay updated with your team's activities"
      >
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">
            Mark all as read
          </button>
          <div className="relative">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              All notifications
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </PageHeader>
      <div className="p-6">
        <div className="space-y-8">
          {notifications.map((group) => (
            <div key={group.id}>
              <h2 className="text-sm font-medium text-gray-600 mb-4">
                {group.group}
              </h2>
              <div className="space-y-2">
                {group.items.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg ${notification.bgColor} relative group`}
                  >
                    <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-4 w-4" />
                    </button>
                    <div className="flex gap-4">
                      <div
                        className={`w-10 h-10 rounded-full ${notification.user.color} flex items-center justify-center text-white shrink-0`}
                      >
                        {notification.user.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900">
                          <span className="font-medium">
                            {notification.user.name &&
                              `${notification.user.name} `}
                          </span>
                          {notification.content}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">
                            {notification.time}
                          </span>
                          {notification.action && (
                            <a
                              href={notification.action.link}
                              className="text-sm text-blue-600 hover:text-blue-700"
                            >
                              {notification.action.text}
                            </a>
                          )}
                        </div>
                        {notification.comment && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                            {notification.comment}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
