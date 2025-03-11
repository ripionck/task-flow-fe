import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Clock,
  Filter,
} from 'lucide-react';
import PageHeader from './PageHeader';
import TaskColumn from './TaskColumn';

const stats = [
  {
    label: 'Total Tasks',
    value: 24,
    icon: ClipboardList,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'In Progress',
    value: 8,
    icon: Clock,
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    label: 'Completed',
    value: 12,
    icon: CheckCircle,
    color: 'bg-green-50 text-green-600',
  },
  {
    label: 'Due Soon',
    value: 4,
    icon: AlertCircle,
    color: 'bg-red-50 text-red-600',
  },
];

const tasks = {
  todo: [
    {
      id: 1,
      title: 'Update dashboard layout',
      description: 'Implement new dashboard design with updated metrics',
      tag: 'Design',
      tagColor: 'bg-blue-100 text-blue-700',
      dueIn: '2 days',
      assignees: ['JL', 'AM'],
    },
    {
      id: 2,
      title: 'API Integration',
      description: 'Connect with Google Calendar API',
      tag: 'Development',
      tagColor: 'bg-purple-100 text-purple-700',
      dueIn: '4 days',
      assignees: ['SK'],
    },
    {
      id: 5,
      title: 'Create onboarding flow',
      description: 'Design and implement user onboarding experience',
      tag: 'UX',
      tagColor: 'bg-indigo-100 text-indigo-700',
      dueIn: '1 week',
      assignees: ['JL'],
    },
  ],
  inProgress: [
    {
      id: 3,
      title: 'Bug fixes in drag-drop',
      description: 'Fix issues with task dragging between columns',
      tag: 'Testing',
      tagColor: 'bg-yellow-100 text-yellow-700',
      dueIn: 'tomorrow',
      assignees: ['RS'],
    },
    {
      id: 6,
      title: 'Implement dark mode',
      description: 'Add dark mode support to all components',
      tag: 'UI',
      tagColor: 'bg-gray-100 text-gray-700',
      dueIn: '3 days',
      assignees: ['AM', 'SK'],
    },
  ],
  done: [
    {
      id: 4,
      title: 'User authentication',
      description: 'Implement user login and registration',
      tag: 'Complete',
      tagColor: 'bg-green-100 text-green-700',
      dueIn: 'Completed',
      assignees: ['TK'],
    },
    {
      id: 7,
      title: 'Database schema design',
      description: 'Create initial database schema for user data',
      tag: 'Backend',
      tagColor: 'bg-red-100 text-red-700',
      dueIn: 'Completed',
      assignees: ['JD'],
    },
  ],
};

export default function DashboardView({ onNewTask }) {
  return (
    <div>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Track and manage your tasks"
      ></PageHeader>

      <div className="p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Tasks</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </button>
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Projects</option>
              <option>Website Redesign</option>
              <option>Mobile App</option>
              <option>Marketing Campaign</option>
            </select>
          </div>
        </div>

        {/* Task Columns */}
        <div className="flex gap-6 overflow-x-auto pb-6">
          <TaskColumn
            title="To Do"
            tasks={tasks.todo}
            count={tasks.todo.length}
            onAddTask={onNewTask}
          />
          <TaskColumn
            title="In Progress"
            tasks={tasks.inProgress}
            count={tasks.inProgress.length}
            onAddTask={onNewTask}
          />
          <TaskColumn
            title="Done"
            tasks={tasks.done}
            count={tasks.done.length}
            onAddTask={onNewTask}
          />
        </div>
      </div>
    </div>
  );
}
