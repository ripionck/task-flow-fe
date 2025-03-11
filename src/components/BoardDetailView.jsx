import {
  Calendar,
  ChevronLeft,
  Filter,
  Plus,
  Share2,
  Star,
  Tag,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import BoardColumn from './BoardColumn';
import TaskDeleteModal from './TaskDeleteModal';
import TaskEditModal from './TaskEditModal';

// Full board data with columns
const boardData = {
  id: 1,
  title: 'Website Redesign',
  description: 'Complete overhaul of the company website with new branding',
  isFavorite: true,
  members: [
    { id: 1, initials: 'JD', color: 'bg-blue-600' },
    { id: 2, initials: 'AM', color: 'bg-green-600' },
    { id: 3, initials: 'SK', color: 'bg-purple-600' },
  ],
  columns: [
    {
      id: 1,
      name: 'To Do',
      color: '#E3E3E3',
      tasks: [
        {
          id: 1,
          title: 'Create wireframes',
          description:
            'Design initial wireframes for homepage and product pages',
          tag: 'Design',
          tagColor: 'bg-blue-100 text-blue-700',
          dueDate: '2023-10-15',
          dueIn: 'Oct 15',
          status: 'todo',
          priority: 'high',
          assignees: ['JD', 'AM'],
          attachments: 2,
          comments: 3,
        },
        {
          id: 2,
          title: 'Content audit',
          description: 'Review existing content and identify gaps',
          tag: 'Content',
          tagColor: 'bg-yellow-100 text-yellow-700',
          dueDate: '2023-10-18',
          dueIn: 'Oct 18',
          status: 'todo',
          priority: 'medium',
          assignees: ['SK'],
          attachments: 1,
          comments: 0,
        },
      ],
    },
    {
      id: 2,
      name: 'In Progress',
      color: '#FEF3C7',
      tasks: [
        {
          id: 3,
          title: 'Design system',
          description: 'Create a consistent design system for the website',
          tag: 'Design',
          tagColor: 'bg-blue-100 text-blue-700',
          dueDate: '2023-10-12',
          dueIn: 'Oct 12',
          status: 'inProgress',
          priority: 'medium',
          assignees: ['AM'],
          attachments: 4,
          comments: 7,
        },
      ],
    },
    {
      id: 3,
      name: 'Review',
      color: '#DBEAFE',
      tasks: [
        {
          id: 4,
          title: 'Homepage prototype',
          description: 'Interactive prototype for homepage',
          tag: 'Development',
          tagColor: 'bg-purple-100 text-purple-700',
          dueDate: '2023-10-10',
          dueIn: 'Oct 10',
          status: 'review',
          priority: 'high',
          assignees: ['JD', 'SK'],
          attachments: 0,
          comments: 5,
        },
      ],
    },
    {
      id: 4,
      name: 'Done',
      color: '#DCFCE7',
      tasks: [
        {
          id: 5,
          title: 'Competitor analysis',
          description:
            'Research competitor websites and identify opportunities',
          tag: 'Research',
          tagColor: 'bg-green-100 text-green-700',
          dueDate: '2023-10-05',
          dueIn: 'Completed',
          status: 'done',
          priority: 'medium',
          assignees: ['SK'],
          attachments: 3,
          comments: 2,
        },
      ],
    },
  ],
};

const BoardDetailView = ({ onNewTask }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddTask = (columnId) => {
    if (onNewTask) onNewTask();
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateTaskSubmit = (updatedTask) => {
    console.log('Task updated:', updatedTask);
    setIsEditModalOpen(false);
  };

  const handleDeleteTaskConfirm = (taskId) => {
    console.log('Task deleted:', taskId);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Board Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-3 mb-4">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold">{boardData.title}</h1>
          <button
            className={`p-1 rounded ${
              boardData.isFavorite
                ? 'text-yellow-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Star
              className="h-5 w-5"
              fill={boardData.isFavorite ? 'currentColor' : 'none'}
            />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {boardData.members.map((member) => (
                <div
                  key={member.id}
                  className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white text-sm border-2 border-white`}
                >
                  {member.initials}
                </div>
              ))}
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm border-2 border-white hover:bg-gray-200">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <button
              onClick={onNewTask}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>
        </div>
      </div>
      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b p-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Assignee
              </label>
              <div className="flex items-center gap-2 border rounded-lg p-2">
                <Users className="h-4 w-4 text-gray-400" />
                <select className="bg-transparent border-none focus:outline-none text-sm">
                  <option>All Members</option>
                  {boardData.members.map((member) => (
                    <option key={member.id}>{member.initials}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Due Date
              </label>
              <div className="flex items-center gap-2 border rounded-lg p-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <select className="bg-transparent border-none focus:outline-none text-sm">
                  <option>All Dates</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Tags</label>
              <div className="flex items-center gap-2 border rounded-lg p-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <select className="bg-transparent border-none focus:outline-none text-sm">
                  <option>All Tags</option>
                  <option>Design</option>
                  <option>Development</option>
                  <option>Content</option>
                  <option>Research</option>
                </select>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 mt-5">
              Clear Filters
            </button>
          </div>
        </div>
      )}
      {/* Board Content */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-6 h-full">
          {boardData.columns.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>
      {/* Modals */}
      <TaskEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateTaskSubmit}
        task={taskToEdit}
      />
      <TaskDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteTaskConfirm}
        task={taskToDelete}
      />
    </div>
  );
};

export default BoardDetailView;
