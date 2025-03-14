import {
  BarChart2,
  Calendar,
  CheckCircle,
  FileText,
  Grid,
  MoreHorizontal,
  PieChart,
  Plus,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  activityLogs,
  projects,
  tasks,
  taskStatusCounts,
  users,
} from '../data/dummy-data';

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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, Alice
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your projects today
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-300 rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <Grid className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Projects</div>
            <div className="text-2xl font-bold">{totalProjects}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Tasks</div>
            <div className="text-2xl font-bold">{totalTasks}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Completed</div>
            <div className="text-2xl font-bold">{completedTasks}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Completion Rate</div>
            <div className="text-2xl font-bold">{completionRate}%</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Project Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="font-medium">Project Progress</h2>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <BarChart2 className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="pb-4 border-b border-gray-300 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <Link
                        to={`/boards/${project.id}`}
                        className="font-medium hover:text-blue-600 flex items-center gap-2"
                      >
                        {project.name}
                        {project.starred && (
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        )}
                      </Link>
                      <span className="text-sm text-gray-500">
                        Due {project.dueDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {project.assignees.map((userId) => {
                          const user = users.find((u) => u.id === userId);
                          return (
                            <div
                              key={userId}
                              className={`w-6 h-6 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
                            >
                              {userId}
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {tasks.filter((t) => t.project === project.id).length}{' '}
                        tasks
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="font-medium">Recent Activity</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {activityLogs.map((activity) => {
                  const user = users.find((u) => u.id === activity.userId);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 border-b border-gray-300 last:border-0 last:pb-0"
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-medium`}
                      >
                        {user.id}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium">{user.name}</span>{' '}
                          {activity.action}{' '}
                          <span className="font-medium">
                            {activity.targetName}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
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

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Distribution */}
        <div>
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="font-medium">Task Distribution</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <PieChart className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="relative w-40 h-40">
                  {/* Simple pie chart visualization */}
                  <div
                    className="absolute inset-0 rounded-full border-8 border-blue-500"
                    style={{
                      clipPath:
                        'polygon(50% 50%, 0 0, 0 50%, 0 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0, 50% 0)',
                    }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-yellow-500"
                    style={{
                      clipPath: 'polygon(50% 50%, 100% 0, 50% 0, 0 0, 0 50%)',
                    }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-purple-500"
                    style={{
                      clipPath: 'polygon(50% 50%, 100% 100%, 100% 50%, 100% 0)',
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                      <div className="text-lg font-bold">{totalTasks}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">To Do</span>
                  </div>
                  <span className="text-sm font-medium">
                    {taskStatusCounts['To Do']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">In Progress</span>
                  </div>
                  <span className="text-sm font-medium">
                    {taskStatusCounts['In Progress']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Review</span>
                  </div>
                  <span className="text-sm font-medium">
                    {taskStatusCounts['Review']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Done</span>
                  </div>
                  <span className="text-sm font-medium">
                    {taskStatusCounts['Done']}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="font-medium">Upcoming Deadlines</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <Calendar className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {upcomingDeadlines.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 pb-4 border-b border-gray-300 last:border-0 last:pb-0"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        task.dueDate === 'tomorrow' ||
                        task.dueDate === 'in 1 day'
                          ? 'bg-red-500'
                          : task.dueDate.includes('in 2') ||
                            task.dueDate.includes('in 3')
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-gray-500">
                        {task.description}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex -space-x-2">
                          {task.assignees.map((userId) => {
                            const user = users.find((u) => u.id === userId);
                            return (
                              <div
                                key={userId}
                                className={`w-6 h-6 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
                              >
                                {userId}
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.dueDate === 'tomorrow' ||
                            task.dueDate === 'in 1 day'
                              ? 'bg-red-100 text-red-800'
                              : task.dueDate.includes('in 2') ||
                                task.dueDate.includes('in 3')
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          Due {task.dueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Overview */}
        <div>
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="p-4 border-b flex  border-gray-300 justify-between items-center">
              <h2 className="font-medium">Team Overview</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <Users className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-medium`}
                    >
                      {user.id}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">
                        {user.role} •{' '}
                        {
                          tasks.filter((t) => t.assignees.includes(user.id))
                            .length
                        }{' '}
                        tasks
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                ))}
                <button className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-1" /> View All Team Members
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
