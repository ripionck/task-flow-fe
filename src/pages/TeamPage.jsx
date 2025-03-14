import {
  Check,
  ChevronDown,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  User,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AddMemberModal from '../components/AddMemberModal';
import { tasks, users } from '../data/dummy-data';

const TeamPage = () => {
  const [view, setView] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState('All Departments');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const departmentDropdownRef = useRef(null);
  const roleDropdownRef = useRef(null);

  // Extend user data with additional information for the team page
  const extendedUsers = users.map((user) => {
    const userTasks = tasks.filter((t) => t.assignees.includes(user.id));
    return {
      ...user,
      role: [
        'Product Manager',
        'Designer',
        'Developer',
        'Marketing Specialist',
        'QA Engineer',
      ][Math.floor(Math.random() * 5)],
      department: ['Design', 'Development', 'Marketing', 'Product', 'QA'][
        Math.floor(Math.random() * 5)
      ],
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${
        Math.floor(Math.random() * 900) + 100
      }-${Math.floor(Math.random() * 9000) + 1000}`,
      tasks: userTasks,
      tasksCompleted: userTasks.filter((t) => t.status === 'Done').length,
      tasksInProgress: userTasks.filter((t) => t.status === 'In Progress')
        .length,
      tasksPending: userTasks.filter((t) => t.status === 'To Do').length,
    };
  });

  // Get unique departments and roles for filters
  const departments = [
    'All Departments',
    ...new Set(extendedUsers.map((user) => user.department)),
  ];
  const roles = [
    'All Roles',
    ...new Set(extendedUsers.map((user) => user.role)),
  ];

  // Filter users based on search term and filters
  useEffect(() => {
    let result = extendedUsers;

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseSearch) ||
          user.email.toLowerCase().includes(lowerCaseSearch) ||
          user.role.toLowerCase().includes(lowerCaseSearch) ||
          user.department.toLowerCase().includes(lowerCaseSearch),
      );
    }

    // Apply department filter
    if (selectedDepartment !== 'All Departments') {
      result = result.filter((user) => user.department === selectedDepartment);
    }

    // Apply role filter
    if (selectedRole !== 'All Roles') {
      result = result.filter((user) => user.role === selectedRole);
    }

    setFilteredUsers(result);
  }, [searchTerm, selectedDepartment, selectedRole]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        departmentDropdownRef.current &&
        !departmentDropdownRef.current.contains(event.target)
      ) {
        setShowDepartmentDropdown(false);
      }
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target)
      ) {
        setShowRoleDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddMember = (newMember) => {
    // In a real app, you would add the new member to your state or make an API call
    console.log('Adding new member:', newMember);
    // For demo purposes, we'll just close the modal
    setShowAddModal(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSelectedDepartment('All Departments');
    setSelectedRole('All Roles');
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Team
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your team members and their roles
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-2 borde border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 text-sm border border-gray-300 rounded-md ${
              view === 'grid'
                ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
            onClick={() => setView('grid')}
          >
            Grid View
          </button>
          <button
            className={`px-3 py-1 text-sm border border-gray-300 rounded-md ${
              view === 'list'
                ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
            onClick={() => setView('list')}
          >
            List View
          </button>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Department Filter */}
          <div className="relative" ref={departmentDropdownRef}>
            <button
              onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <Filter className="w-4 h-4" />
              {selectedDepartment}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showDepartmentDropdown && (
              <div className="absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div className="py-1 max-h-60 overflow-auto">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setShowDepartmentDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      {selectedDepartment === dept && (
                        <Check className="w-4 h-4 mr-2 text-blue-600" />
                      )}
                      <span
                        className={
                          selectedDepartment === dept ? 'font-medium' : ''
                        }
                      >
                        {dept}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Filter */}
          <div className="relative" ref={roleDropdownRef}>
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <Filter className="w-4 h-4" />
              {selectedRole}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showRoleDropdown && (
              <div className="absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div className="py-1 max-h-60 overflow-auto">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedRole(role);
                        setShowRoleDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      {selectedRole === role && (
                        <Check className="w-4 h-4 mr-2 text-blue-600" />
                      )}
                      <span
                        className={selectedRole === role ? 'font-medium' : ''}
                      >
                        {role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {(selectedDepartment !== 'All Departments' ||
            selectedRole !== 'All Roles') && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredUsers.length} of {extendedUsers.length} team members
      </div>

      {filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-8 text-center">
          <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No team members found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm
              ? `No results for "${searchTerm}"`
              : 'No team members match the selected filters'}
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6 text-center">
                <div
                  className={`w-20 h-20 rounded-full ${user.color} mx-auto flex items-center justify-center text-white text-2xl font-medium mb-4`}
                >
                  {user.id}
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {user.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  {user.role}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-3">
                  {user.department}
                </p>

                <div className="flex justify-center gap-3 mb-4">
                  <button className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <User className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-700 px-6 py-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {user.tasks.length}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Total Tasks
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {user.tasksCompleted}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Completed
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {user.tasksInProgress}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      In Progress
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b  dark:border-gray-600">
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-300">
                    Name
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-300">
                    Role
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-300">
                    Department
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-300">
                    Email
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-300">
                    Phone
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-300">
                    Tasks
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-300 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-white font-medium`}
                        >
                          {user.id}
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {user.role}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {user.department}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {user.phone}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {user.tasks.length}
                        </span>
                        <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (user.tasksCompleted / user.tasks.length) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className={`px-2 py-1 rounded-full text-xs inline-block ${
                          user.tasksInProgress > 0
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}
                      >
                        {user.tasksInProgress > 0 ? 'Active' : 'Available'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddMember}
      />
    </div>
  );
};

export default TeamPage;
