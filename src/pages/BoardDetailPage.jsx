import {
  ArrowLeft,
  ChevronDown,
  MoreVertical,
  Plus,
  SlidersHorizontal,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddTaskModal from '../components/AddTaskModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import EditTaskModal from '../components/EditTaskModal';
import { projects, tasks, users } from '../data/dummy-data';

const BoardDetailPage = () => {
  const { id } = useParams();
  const projectId = Number.parseInt(id) || 1;
  const project = projects.find((p) => p.id === projectId) || projects[0];

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [tasksList, setTasksList] = useState(tasks);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterTag, setFilterTag] = useState('all');

  // Group tasks by status
  const getTasksByStatus = () => {
    const filteredTasks = tasksList.filter((task) => {
      const matchesProject = task.project === projectId;
      const matchesTag = filterTag === 'all' || task.tags.includes(filterTag);
      return matchesProject && matchesTag;
    });

    return {
      'To Do': filteredTasks.filter((t) => t.status === 'To Do'),
      'In Progress': filteredTasks.filter((t) => t.status === 'In Progress'),
      Review: filteredTasks.filter((t) => t.status === 'Review'),
      Done: filteredTasks.filter((t) => t.status === 'Done'),
    };
  };

  const tasksByStatus = getTasksByStatus();

  // Get all unique tags from tasks
  const allTags = [
    ...new Set(
      tasksList
        .filter((t) => t.project === projectId)
        .flatMap((task) => task.tags),
    ),
  ];

  const handleAddTask = (newTask) => {
    const newId = Math.max(...tasksList.map((t) => t.id)) + 1;
    const taskWithStatus = selectedStatus
      ? { ...newTask, status: selectedStatus }
      : newTask;
    setTasksList([...tasksList, { ...taskWithStatus, id: newId }]);
    setSelectedStatus(null);
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

  const handleAddTaskInColumn = (status) => {
    setSelectedStatus(status);
    setShowAddTaskModal(true);
  };

  return (
    <div>
      <div className="border-b border-gray-300">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Link to="/boards" className="text-gray-500 hover:text-gray-700">
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
            <div className="flex -space-x-2">
              {project.assignees.map((userId) => {
                const user = users.find((u) => u.id === userId);
                return (
                  <div
                    key={userId}
                    className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
                  >
                    {userId}
                  </div>
                );
              })}
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border-2 border-white">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button className="text-gray-700 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              Share
            </button>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  className="text-gray-700 p-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <div className="font-medium px-3 py-1">Filter by Tag</div>
                      <button
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                        onClick={() => {
                          setFilterTag('all');
                          setShowFilterDropdown(false);
                        }}
                      >
                        All Tags
                      </button>

                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                          onClick={() => {
                            setFilterTag(tag);
                            setShowFilterDropdown(false);
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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
      </div>

      <div className="p-6 flex gap-6 overflow-x-auto min-h-[calc(100vh-130px)]">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="min-w-[300px] w-[300px] flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    status === 'To Do'
                      ? 'bg-gray-400'
                      : status === 'In Progress'
                      ? 'bg-yellow-400'
                      : status === 'Review'
                      ? 'bg-purple-400'
                      : 'bg-green-400'
                  }`}
                ></span>
                {status}{' '}
                <span className="text-gray-500 text-sm ml-1">
                  {statusTasks.length}
                </span>
              </h3>

              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleAddTaskInColumn(status)}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {statusTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div
                      className={`px-2 py-1 rounded text-xs ${
                        task.tags[0] === 'Design'
                          ? 'bg-blue-100 text-blue-800'
                          : task.tags[0] === 'Development'
                          ? 'bg-purple-100 text-purple-800'
                          : task.tags[0] === 'Content'
                          ? 'bg-yellow-100 text-yellow-800'
                          : task.tags[0] === 'Research'
                          ? 'bg-green-100 text-green-800'
                          : task.tags[0] === 'Testing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : task.tags[0] === 'Complete'
                          ? 'bg-green-100 text-green-800'
                          : task.tags[0] === 'UI'
                          ? 'bg-blue-100 text-blue-800'
                          : task.tags[0] === 'Backend'
                          ? 'bg-red-100 text-red-800'
                          : task.tags[0] === 'UX'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {task.tags[0]}
                    </div>

                    <div className="relative group">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
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
                  </div>

                  <h4 className="font-medium mb-1">{task.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {task.description}
                  </p>

                  <div className="flex justify-between items-center">
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

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {task.comments > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">💬</span>{' '}
                          {task.comments}
                        </div>
                      )}

                      {task.attachments > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">📎</span>{' '}
                          {task.attachments}
                        </div>
                      )}

                      <div>{task.dueDate}</div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center"
                onClick={() => handleAddTaskInColumn(status)}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Task
              </button>
            </div>
          </div>
        ))}
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

export default BoardDetailPage;
