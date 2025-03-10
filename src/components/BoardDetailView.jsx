import {
  Calendar,
  ChevronLeft,
  Filter,
  MoreHorizontal,
  Plus,
  Share2,
  Star,
  Tag,
  Users,
} from 'lucide-react';
import { useState } from 'react';

// Sample board data
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
          dueDate: 'Oct 15',
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
          dueDate: 'Oct 18',
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
          dueDate: 'Oct 12',
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
          dueDate: 'Oct 10',
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
          dueDate: 'Completed',
          assignees: ['SK'],
          attachments: 3,
          comments: 2,
        },
      ],
    },
  ],
};

function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-3">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs px-2 py-1 rounded-full ${task.tagColor}`}>
          {task.tag}
        </span>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <h4 className="font-medium mb-1">{task.title}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {task.assignees.map((initials, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs border-2 border-white"
            >
              {initials}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 text-gray-500 text-xs">
          {task.attachments > 0 && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
              {task.attachments}
            </span>
          )}

          {task.comments > 0 && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              {task.comments}
            </span>
          )}

          <span className="text-xs">{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
}

function BoardColumn({ column, onAddTask }) {
  return (
    <div className="min-w-[280px] w-[280px] flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: column.color }}
          ></div>
          <h3 className="font-medium">{column.name}</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        <button
          onClick={() => onAddTask(column.id)}
          className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>
    </div>
  );
}

export default function BoardDetailView({ onNewTask }) {
  const [showFilters, setShowFilters] = useState(false);

  const handleAddTask = (columnId) => {
    if (onNewTask) onNewTask();
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

      {/* Filter Panel (conditionally rendered) */}
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
            />
          ))}

          {/* Add Column Button */}
          <div className="min-w-[280px] w-[280px] flex-shrink-0">
            <button className="w-full h-12 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Column
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
