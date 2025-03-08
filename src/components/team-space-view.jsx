import {
  CheckSquare,
  ClipboardList,
  MoreVertical,
  Plus,
  Users,
} from 'lucide-react';
import { PageHeader } from './page-header';

const stats = [
  {
    label: 'Total Members',
    value: '12',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Active Projects',
    value: '8',
    icon: ClipboardList,
    color: 'bg-green-100 text-green-600',
  },
  {
    label: 'Tasks Completed',
    value: '45',
    icon: CheckSquare,
    color: 'bg-purple-100 text-purple-600',
  },
];

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Project Manager',
    initials: 'JD',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 2,
    name: 'Alice Martinez',
    role: 'Lead Developer',
    initials: 'AM',
    status: 'Away',
    statusColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 3,
    name: 'Sarah Kim',
    role: 'UI/UX Designer',
    initials: 'SK',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
  },
];

export default function TeamSpaceView() {
  return (
    <div>
      <PageHeader
        title="Team Space"
        subtitle="Manage your team and collaborators"
      >
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Invite Member
        </button>
      </PageHeader>
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <section className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Team Members</h2>
          </div>
          <div className="divide-y">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {member.initials}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${member.statusColor}`}
                  >
                    {member.status}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
