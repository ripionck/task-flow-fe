import {
  CheckSquare,
  ClipboardList,
  Edit,
  Search,
  UserMinus,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import PageHeader from './PageHeader';

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

// All available users in the system
const allUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Project Manager',
    initials: 'JD',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    isTeamMember: true,
    isAdmin: true,
  },
  {
    _id: 2,
    name: 'Alice Martinez',
    email: 'alice@example.com',
    role: 'Lead Developer',
    initials: 'AM',
    status: 'Away',
    statusColor: 'bg-yellow-100 text-yellow-700',
    isTeamMember: true,
    isAdmin: false,
  },
  {
    id: 3,
    name: 'Sarah Kim',
    email: 'sarah@example.com',
    role: 'UI/UX Designer',
    initials: 'SK',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    isTeamMember: true,
    isAdmin: false,
  },
  {
    id: 4,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'Backend Developer',
    initials: 'RJ',
    status: 'Inactive',
    statusColor: 'bg-gray-100 text-gray-700',
    isTeamMember: false,
    isAdmin: false,
  },
  {
    id: 5,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Content Writer',
    initials: 'ED',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    isTeamMember: false,
    isAdmin: false,
  },
  {
    id: 6,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'QA Engineer',
    initials: 'MB',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    isTeamMember: true,
    isAdmin: false,
  },
  {
    id: 7,
    name: 'Lisa Thompson',
    email: 'lisa@example.com',
    role: 'Product Manager',
    initials: 'LT',
    status: 'Away',
    statusColor: 'bg-yellow-100 text-yellow-700',
    isTeamMember: false,
    isAdmin: false,
  },
];

export default function TeamSpaceView() {
  const [users, setUsers] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState('team'); // "team" or "all"

  // Filter users based on search term and view mode
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (viewMode === 'all' || (viewMode === 'team' && user.isTeamMember)),
  );

  const handleAddToTeam = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isTeamMember: true } : user,
      ),
    );
  };

  const handleRemoveFromTeam = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isTeamMember: false } : user,
      ),
    );
  };

  const handleUserActionClick = (user, action) => {
    if (action === 'add') {
      handleAddToTeam(user.id);
    } else if (action === 'remove') {
      handleRemoveFromTeam(user.id);
    } else if (action === 'edit') {
      setSelectedUser(user);
      setShowAddUserModal(true);
    }
  };

  const teamMemberCount = users.filter((user) => user.isTeamMember).length;

  return (
    <div>
      <PageHeader
        title="Team Space"
        subtitle="Manage your team and collaborators"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'team' ? 'all' : 'team')}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            {viewMode === 'team' ? 'View All Users' : 'View Team Members'}
          </button>
        </div>
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
                  <div className="text-2xl font-semibold">
                    {i === 0 ? teamMemberCount : stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Team Members */}
        <section className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium">
              {viewMode === 'team' ? 'Team Members' : 'All Users'}
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length} of{' '}
              {viewMode === 'team' ? teamMemberCount : users.length} users
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No users found matching your search criteria.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white ${
                        user.isAdmin ? 'ring-2 ring-yellow-400' : ''
                      }`}
                    >
                      {user.initials}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {user.name}
                        {user.isAdmin && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-xs text-gray-500">{user.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${user.statusColor}`}
                    >
                      {user.status}
                    </span>

                    <div className="flex items-center gap-2">
                      {!user.isTeamMember ? (
                        <button
                          onClick={() => handleUserActionClick(user, 'add')}
                          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded flex items-center gap-1 text-sm"
                          title="Add to team"
                        >
                          <UserPlus className="h-4 w-4" />
                          <span className="hidden sm:inline">Add to Team</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUserActionClick(user, 'remove')}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded flex items-center gap-1 text-sm"
                          title="Remove from team"
                          disabled={user.isAdmin} // Prevent removing admins
                        >
                          <UserMinus className="h-4 w-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleUserActionClick(user, 'edit')}
                        className="p-1.5 hover:bg-gray-100 text-gray-600 rounded"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add/Edit User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {selectedUser ? 'Edit User' : 'Add New User'}
              </h2>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser?.name || ''}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={selectedUser?.email || ''}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser?.role || ''}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter role (e.g. Developer, Designer)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  defaultValue={selectedUser?.status || 'Active'}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Away">Away</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isTeamMember"
                  defaultChecked={selectedUser?.isTeamMember || true}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isTeamMember"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Add to team immediately
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAdmin"
                  defaultChecked={selectedUser?.isAdmin || false}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isAdmin"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Grant admin privileges
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedUser ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
