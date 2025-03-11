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
import { useEffect, useState } from 'react';
import PageHeader from './PageHeader';

const API_BASE = 'http://localhost:5000/api/users';
const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export default function TeamSpaceView() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState('team');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_BASE, {
          headers: getAuthHeader(),
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Add user to team
  const handleAddToTeam = async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/${userId}/add-member`, {
        method: 'PUT',
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error('Failed to add member');
      setUsers(
        users.map((u) => (u._id === userId ? { ...u, isTeamMember: true } : u)),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Remove user from team
  const handleRemoveFromTeam = async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/${userId}/remove-member`, {
        method: 'PUT',
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error('Failed to remove member');
      setUsers(
        users.map((u) =>
          u._id === userId ? { ...u, isTeamMember: false } : u,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Update user
  const handleUpdateUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE}/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Failed to update user');

      const updatedUser = await response.json();
      setUsers(users.map((u) => (u._id === updatedUser._id ? updatedUser : u)));
      setShowEditUserModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter users based on search term and view mode
  const filteredUsers = users.filter((user) => {
    const matchesSearch = ['name', 'email', 'role'].some((field) =>
      user[field]?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return matchesSearch && (viewMode === 'all' || user.isTeamMember);
  });

  // Stats data
  const stats = [
    {
      label: 'Total Members',
      value: users.filter((u) => u.isTeamMember).length,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                  <div className="text-2xl font-semibold">{stat.value}</div>
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
              {viewMode === 'team'
                ? users.filter((u) => u.isTeamMember).length
                : users.length}{' '}
              users
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
                  key={user._id}
                  className="p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white ${
                        user.isAdmin ? 'ring-2 ring-yellow-400' : ''
                      }`}
                    >
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
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
                    {/* Status */}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : user.status === 'Away'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status}
                    </span>

                    {/* Add/Remove Buttons */}
                    <div className="flex items-center gap-2">
                      {!user.isTeamMember ? (
                        <button
                          onClick={() => handleAddToTeam(user._id)}
                          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded flex items-center gap-1 text-sm"
                          title="Add to team"
                        >
                          <UserPlus className="h-4 w-4" />
                          <span className="hidden sm:inline">Add to Team</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemoveFromTeam(user._id)}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded flex items-center gap-1 text-sm"
                          title="Remove from team"
                          disabled={user.isAdmin}
                        >
                          <UserMinus className="h-4 w-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      )}

                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditUserModal(true);
                        }}
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

      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Edit User</h2>
              <button
                onClick={() => setShowEditUserModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleUpdateUser({
                  name: formData.get('name'),
                  email: formData.get('email'),
                  role: formData.get('role'),
                  status: formData.get('status'),
                  isAdmin: formData.get('isAdmin') === 'on',
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedUser?.name || ''}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedUser?.email || ''}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    defaultValue={selectedUser?.role || ''}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
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
                    name="isAdmin"
                    defaultChecked={selectedUser?.isAdmin || false}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Grant admin privileges
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditUserModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
