import {
  ArrowLeft,
  ChevronDown,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddTaskModal from '../components/AddTaskModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import EditTaskModal from '../components/EditTaskModal';
import { projects, tasks, users } from '../data/dummy-data';

const AllTasksPage = () => {
  const { id } = useParams();
  const projectId = Number.parseInt(id) || 1;
  const project = projects.find((p) => p.id === projectId) || projects[0];

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [tasksList, setTasksList] = useState(tasks);

  const [sortBy, setSortBy] = useState('status');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter tasks based on status and search query
  const filteredTasks = tasksList.filter((task) => {
    const matchesProject = task.project === projectId;
    const matchesStatus =
      filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesStatus && matchesSearch;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'status') {
      const statusOrder = { 'To Do': 1, 'In Progress': 2, Review: 3, Done: 4 };
      return statusOrder[a.status] - statusOrder[b.status];
    } else if (sortBy === 'dueDate') {
      // Simple sort for demo purposes
      return a.dueDate.localeCompare(b.dueDate);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleAddTask = (newTask) => {
    const newId = Math.max(...tasksList.map((t) => t.id)) + 1;
    setTasksList([...tasksList, { ...newTask, id: newId }]);
  };

  const handleEditTask = (updatedTask) => {
    setTasksList(
      tasksList.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      setTasksList(tasksList.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setShowEditTaskModal(true);
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <div className="border-b border-gray-300">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Link
              to={`/boards/${projectId}`}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <h1 className="text-xl font-bold flex items-center gap-2">
              {project.name}
              <button className="text-yellow-400">
                <Star className="w-5 h-5 fill-yellow-400" />
              </button>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              onClick={() => setShowAddTaskModal(true)}
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">All Tasks</h2>
          <p className="text-gray-600">
            View and manage all tasks for {project.name}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <Filter className="w-4 h-4" />
                <span>
                  Status: {filterStatus === 'all' ? 'All' : filterStatus}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showStatusDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setFilterStatus('all');
                        setShowStatusDropdown(false);
                      }}
                    >
                      All
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setFilterStatus('To Do');
                        setShowStatusDropdown(false);
                      }}
                    >
                      To Do
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setFilterStatus('In Progress');
                        setShowStatusDropdown(false);
                      }}
                    >
                      In Progress
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setFilterStatus('Review');
                        setShowStatusDropdown(false);
                      }}
                    >
                      Review
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setFilterStatus('Done');
                        setShowStatusDropdown(false);
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <span>
                  Sort by:{' '}
                  {sortBy === 'status'
                    ? 'Status'
                    : sortBy === 'dueDate'
                    ? 'Due Date'
                    : 'Title'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setSortBy('status');
                        setShowSortDropdown(false);
                      }}
                    >
                      Status
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setSortBy('dueDate');
                        setShowSortDropdown(false);
                      }}
                    >
                      Due Date
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setSortBy('title');
                        setShowSortDropdown(false);
                      }}
                    >
                      Title
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="text-left p-4 font-medium text-gray-600">
                  Task
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Assignees
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Due Date
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Tags
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-gray-300 last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-gray-500">
                        {task.description}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs inline-block ${
                        task.status === 'To Do'
                          ? 'bg-gray-100 text-gray-800'
                          : task.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : task.status === 'Review'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.status}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {task.assignees.map((userId) => {
                        const user = users.find((u) => u.id === userId);
                        return (
                          <div
                            key={userId}
                            className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
                            title={user.name}
                          >
                            {userId}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{task.dueDate}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded text-xs ${
                            tag === 'Design'
                              ? 'bg-blue-100 text-blue-800'
                              : tag === 'Development'
                              ? 'bg-purple-100 text-purple-800'
                              : tag === 'Content'
                              ? 'bg-yellow-100 text-yellow-800'
                              : tag === 'Research'
                              ? 'bg-green-100 text-green-800'
                              : tag === 'Testing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : tag === 'Complete'
                              ? 'bg-green-100 text-green-800'
                              : tag === 'UI'
                              ? 'bg-blue-100 text-blue-800'
                              : tag === 'Backend'
                              ? 'bg-red-100 text-red-800'
                              : tag === 'UX'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="relative group">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-300 rounded-lg shadow-lg z-10 hidden group-hover:block">
                        <div className="p-1">
                          <button
                            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
                            onClick={() => openEditModal(task)}
                          >
                            Edit Task
                          </button>
                          <button
                            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-red-600"
                            onClick={() => openDeleteModal(task)}
                          >
                            Delete Task
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onAdd={handleAddTask}
        projectId={projectId}
      />

      <EditTaskModal
        isOpen={showEditTaskModal}
        onClose={() => setShowEditTaskModal(false)}
        onSave={handleEditTask}
        task={taskToEdit}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteTask}
        itemType="task"
        itemName={taskToDelete?.title}
      />
    </div>
  );
};

export default AllTasksPage;
