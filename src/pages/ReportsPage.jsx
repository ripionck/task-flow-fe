import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Dummy data for reports
const projectCompletionData = [
  { name: 'Website Redesign', completed: 85, remaining: 15 },
  { name: 'Mobile App Development', completed: 65, remaining: 35 },
  { name: 'Marketing Campaign', completed: 100, remaining: 0 },
  { name: 'Database Migration', completed: 45, remaining: 55 },
  { name: 'User Research', completed: 90, remaining: 10 },
];

const taskStatusData = {
  completed: 124,
  inProgress: 45,
  pending: 32,
  overdue: 8,
};

const teamPerformanceData = [
  { name: 'Design Team', tasksCompleted: 87, avgCompletionTime: '2.3 days' },
  {
    name: 'Development Team',
    tasksCompleted: 134,
    avgCompletionTime: '3.1 days',
  },
  { name: 'Marketing Team', tasksCompleted: 56, avgCompletionTime: '1.8 days' },
  { name: 'QA Team', tasksCompleted: 92, avgCompletionTime: '1.2 days' },
];

const taskDistributionData = [
  { name: 'Completed', value: taskStatusData.completed, color: '#10B981' },
  { name: 'In Progress', value: taskStatusData.inProgress, color: '#3B82F6' },
  { name: 'Pending', value: taskStatusData.pending, color: '#F59E0B' },
  { name: 'Overdue', value: taskStatusData.overdue, color: '#EF4444' },
];

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-[180px] p-2 border rounded-md"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button className="p-2 bg-gray-100 rounded-md">Overview</button>
          <button className="p-2 bg-gray-100 rounded-md">Projects</button>
          <button className="p-2 bg-gray-100 rounded-md">Tasks</button>
          <button className="p-2 bg-gray-100 rounded-md">Team</button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Projects</span>
                <span className="text-gray-400">📊</span>
              </div>
              <div className="text-2xl font-bold mt-2">12</div>
              <p className="text-xs text-gray-500">+2 from last {timeRange}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Tasks</span>
                <span className="text-gray-400">✅</span>
              </div>
              <div className="text-2xl font-bold mt-2">209</div>
              <p className="text-xs text-gray-500">+24 from last {timeRange}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Team Members</span>
                <span className="text-gray-400">👥</span>
              </div>
              <div className="text-2xl font-bold mt-2">16</div>
              <p className="text-xs text-gray-500">+3 from last {timeRange}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overdue Tasks</span>
                <span className="text-gray-400">⚠️</span>
              </div>
              <div className="text-2xl font-bold mt-2">8</div>
              <p className="text-xs text-red-500">+2 from last {timeRange}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-lg font-bold">Project Completion</h2>
              <p className="text-sm text-gray-500">
                Project progress across all active projects
              </p>
              <BarChart
                width={500}
                height={300}
                data={projectCompletionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#3B82F6" />
                <Bar dataKey="remaining" fill="#EF4444" />
              </BarChart>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-lg font-bold">Task Distribution</h2>
              <p className="text-sm text-gray-500">Tasks by status</p>
              <PieChart width={400} height={300}>
                <Pie
                  data={taskDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {taskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* New Team Performance Chart */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold">Team Performance</h2>
            <p className="text-sm text-gray-500">
              Tasks completed and average completion time by team
            </p>
            <BarChart
              width={800}
              height={300}
              data={teamPerformanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#10B981"
                tickFormatter={(value) => value.replace(' days', '')}
              />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="tasksCompleted"
                fill="#3B82F6"
                name="Tasks Completed"
              />
              <Bar
                yAxisId="right"
                dataKey="avgCompletionTime"
                fill="#10B981"
                name="Avg. Completion Time (days)"
                tickFormatter={(value) => value.replace(' days', '')}
              />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
