import { ChevronDown, Download } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
    completionRate: 92,
  },
  {
    name: 'Alice Martinez',
    initials: 'AM',
    color: 'bg-green-600',
    completionRate: 88,
  },
  {
    name: 'Sarah Kim',
    initials: 'SK',
    color: 'bg-purple-600',
    completionRate: 95,
  },
];

// Sample data for charts
const completionRateData = [
  { name: 'Day 1', value: 65 },
  { name: 'Day 2', value: 78 },
  { name: 'Day 3', value: 45 },
  { name: 'Day 4', value: 67 },
  { name: 'Day 5', value: 82 },
  { name: 'Day 6', value: 54 },
  { name: 'Day 7', value: 71 },
];

const teamPerformanceData = [
  { name: 'Day 1', value: 75 },
  { name: 'Day 2', value: 68 },
  { name: 'Day 3', value: 72 },
  { name: 'Day 4', value: 85 },
  { name: 'Day 5', value: 76 },
  { name: 'Day 6', value: 65 },
  { name: 'Day 7', value: 82 },
];

export default function ReportsView() {
  const [timeRange, setTimeRange] = useState('7d');

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
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Task Completion Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Team Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Member Performance */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium">Team Member Performance</h3>
          </div>
          <div className="divide-y">
            {teamMembers.map((member, i) => (
              <div key={i} className="p-6">
                <div className="flex items-center gap-4 mb-2">
                  <div
                    className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-white`}
                  >
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-600">
                      {member.completionRate}% completion rate
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${member.color} rounded-full`}
                    style={{ width: `${member.completionRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
