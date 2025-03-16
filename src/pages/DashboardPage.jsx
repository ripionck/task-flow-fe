import {
  BarChart2,
  Bell,
  CheckCircle,
  Clock,
  FileText,
  Grid,
  MoreHorizontal,
  Plus,
  Star,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { activityLogs, projects, tasks, users } from '../data/dummy-data';

const DashboardPage = () => {
  // Calculate project stats
  const totalProjects = projects.length;
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const totalTasks = tasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  // Get upcoming deadlines
  const upcomingDeadlines = tasks
    .filter(
      (task) =>
        task.status !== 'Done' &&
        (task.dueDate.includes('in') || task.dueDate === 'tomorrow'),
    )
    .sort((a, b) => {
      const getDays = (dueDate) => {
        if (dueDate === 'tomorrow') return 1;
        const match = dueDate.match(/in (\d+) (\w+)/);
        if (!match) return 999;
        const [_, num, unit] = match;
        if (unit === 'days') return Number.parseInt(num);
        if (unit === 'weeks') return Number.parseInt(num) * 7;
        if (unit === 'months') return Number.parseInt(num) * 30;
        return 999;
      };
      return getDays(a.dueDate) - getDays(b.dueDate);
    })
    .slice(0, 3);

  return (
    <div className="p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, Alice
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s your project overview for today
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Total Projects',
            value: totalProjects,
            icon: Grid,
            color: 'blue',
            trend: '+2.5%',
          },
          {
            title: 'Active Tasks',
            value: totalTasks,
            icon: FileText,
            color: 'purple',
            trend: '+5.2%',
          },
          {
            title: 'Completed Tasks',
            value: completedTasks,
            icon: CheckCircle,
            color: 'green',
            trend: '+3.1%',
          },
          {
            title: 'Completion Rate',
            value: `${completionRate}%`,
            icon: TrendingUp,
            color: 'yellow',
            trend: '+1.2%',
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center text-${stat.color}-600`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-green-600 text-sm font-medium">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project Progress */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Project Progress</h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <BarChart2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {projects.slice(0, 4).map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/boards/${project.id}`}
                        className="font-semibold text-gray-900 hover:text-blue-600"
                      >
                        {project.name}
                      </Link>
                      {project.starred && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Due {project.dueDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.assignees.map((userId) => {
                        const user = users.find((u) => u.id === userId);
                        return (
                          <div
                            key={userId}
                            className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-sm font-medium border-2 border-white`}
                          >
                            {userId}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        {tasks.filter((t) => t.project === project.id).length}{' '}
                        tasks
                      </span>
                      <Link
                        to={`/boards/${project.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Board →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {upcomingDeadlines.map((task) => (
                <div key={task.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-500">Due {task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activityLogs.slice(0, 4).map((activity) => {
                const user = users.find((u) => u.id === activity.userId);
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-sm font-medium`}
                    >
                      {user.id}
                    </div>
                    <div>
                      <div className="text-sm">
                        <span className="font-medium">{user.name}</span>{' '}
                        {activity.action}{' '}
                        <span className="font-medium">
                          {activity.targetName}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.timeDisplay}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
