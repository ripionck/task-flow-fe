import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

const TaskCard = ({ task, onEditTask, onDeleteTask }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUpdateTask = (e) => {
    e.stopPropagation();
    onEditTask(task);
    setIsMenuOpen(false);
  };

  const handleDeleteTask = (e) => {
    e.stopPropagation();
    onDeleteTask(task);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-3">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs px-2 py-1 rounded-full ${task.tagColor}`}>
          {task.tag}
        </span>
        <div className="relative">
          <button
            className="text-gray-400 hover:text-gray-600 p-1"
            onClick={handleMenuToggle}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border">
              <div className="py-1">
                <button
                  onClick={handleUpdateTask}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Edit className="h-4 w-4" />
                  Update Task
                </button>
                <button
                  onClick={handleDeleteTask}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Task
                </button>
              </div>
            </div>
          )}
        </div>
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
          <span className="text-xs">{task.dueIn}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
