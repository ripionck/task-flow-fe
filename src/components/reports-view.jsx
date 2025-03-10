import { ChevronDown, Download } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PageHeader } from './page-header';

const metrics = [
  {
    label: 'Total Tasks',
    value: '247',
    change: { value: '12%', trend: 'up' },
    period: 'vs last period',
  },
  {
    label: 'Completed Tasks',
    value: '184',
    change: { value: '8%', trend: 'up' },
    period: 'vs last period',
  },
  {
    label: 'Team Velocity',
    value: '32',
    change: { value: '3%', trend: 'down' },
    period: 'vs last period',
  },
  {
    label: 'Overdue Tasks',
    value: '12',
    change: { value: '5%', trend: 'up' },
    period: 'vs last period',
  },
];

const teamMembers = [
  {
    name: 'John Doe',
    initials: 'JD',
    color: 'bg-blue-600',
    colorHex: '#2563eb',
    completionRate: 92,
  },
  {
    name: 'Alice Martinez',
    initials: 'AM',
    color: 'bg-green-600',
    colorHex: '#16a34a',
    completionRate: 88,
  },
  {
    name: 'Sarah Kim',
    initials: 'SK',
    color: 'bg-purple-600',
    colorHex: '#9333ea',
    completionRate: 95,
  },
];

// Task completion data for pie chart
const taskCompletionData = [
  { name: 'Completed', value: 184, color: '#4ade80' }, // green-400
  { name: 'In Progress', value: 51, color: '#facc15' }, // yellow-400
  { name: 'Not Started', value: 12, color: '#f87171' }, // red-400
];

// Enhanced data for team performance chart
const teamPerformanceData = [
  { day: 'Mon', value: 75 },
  { day: 'Tue', value: 68 },
  { day: 'Wed', value: 72 },
  { day: 'Thu', value: 85 },
  { day: 'Fri', value: 76 },
  { day: 'Sat', value: 65 },
  { day: 'Sun', value: 82 },
];

// Member performance data for the bar chart
const memberPerformanceData = teamMembers.map((member) => ({
  name: member.name,
  completionRate: member.completionRate,
  color: member.colorHex,
}));

export default function ReportsView() {
  const [timeRange, setTimeRange] = useState('7d');

  // Custom label for pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Track team performance and project progress"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg">
              Last 7 days
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </PageHeader>
      <div className="p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
              <div className="text-3xl font-semibold mb-2">{metric.value}</div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${
                    metric.change.trend === 'up'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {metric.change.trend === 'up' ? '↑' : '↓'}{' '}
                  {metric.change.value}
                </span>
                <span className="text-sm text-gray-500">{metric.period}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Completion Rate Pie Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Task Completion Rate</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskCompletionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} Tasks`, null]} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Updated Team Performance Chart using Recharts */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Team Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                  <Bar dataKey="value" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Team Member Performance with Recharts */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium">Team Member Performance</h3>
          </div>
          <div className="p-6">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={memberPerformanceData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Completion Rate']}
                  />
                  <Bar
                    dataKey="completionRate"
                    background={{ fill: '#f9fafb' }}
                  >
                    {memberPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
