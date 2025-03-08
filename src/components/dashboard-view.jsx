import { AlertCircle, CheckCircle, ClipboardList, Clock } from 'lucide-react';
import { NavButtons } from './nav-buttons';
import { PageHeader } from './page-header';

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
  ],
};

function TaskColumn({ title, tasks }) {
  return (
    <div className="flex-1 min-w-[300px]">
      <h3 className="font-medium mb-4">{title}</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${task.tagColor}`}
              >
                {task.tag}
              </span>
              <span className="text-sm text-gray-500">Due in {task.dueIn}</span>
            </div>
            <h4 className="font-medium mb-1">{task.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            <div className="flex -space-x-2">
              {task.assignees.map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm border-2 border-white"
                >
                  {initials}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardView({ onNewTask }) {
  return (
    <div>
      <PageHeader title="Dashboard Overview">
        <NavButtons onNewTask={onNewTask} />
      </PageHeader>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-200"
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

        <div className="flex gap-6 overflow-x-auto pb-6">
          <TaskColumn title="To Do" tasks={tasks.todo} />
          <TaskColumn title="In Progress" tasks={tasks.inProgress} />
          <TaskColumn title="Done" tasks={tasks.done} />
        </div>
      </div>
    </div>
  );
}
