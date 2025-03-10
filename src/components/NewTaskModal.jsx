import { Calendar, X } from 'lucide-react';
import { useState } from 'react';

export default function NewTaskModal({
  isOpen,
  onClose,
  onSubmit,
  preSelectedStatus = 'todo',
}) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: preSelectedStatus,
    priority: 'medium',
    assignees: [],
    tags: [],
  });

  const [assigneeInput, setAssigneeInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
    onClose();
  };

  const addAssignee = () => {
    if (assigneeInput.trim()) {
      setTaskData((prev) => ({
        ...prev,
        assignees: [...prev.assignees, assigneeInput.trim()],
      }));
      setAssigneeInput('');
    }
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setTaskData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={taskData.title}
              onChange={(e) =>
                setTaskData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              value={taskData.description}
              onChange={(e) =>
                setTaskData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={taskData.dueDate}
                  onChange={(e) =>
                    setTaskData((prev) => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={taskData.status}
                onChange={(e) =>
                  setTaskData((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="flex gap-4">
              {['low', 'medium', 'high'].map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={taskData.priority === priority}
                    onChange={(e) =>
                      setTaskData((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  <span className="capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignees
            </label>
            <div className="flex gap-2 mb-2">
              {taskData.assignees.map((assignee, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                >
                  {assignee}
                  <button
                    type="button"
                    onClick={() =>
                      setTaskData((prev) => ({
                        ...prev,
                        assignees: prev.assignees.filter((_, i) => i !== index),
                      }))
                    }
                    className="hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={assigneeInput}
                onChange={(e) => setAssigneeInput(e.target.value)}
                placeholder="Add assignee"
              />
              <button
                type="button"
                onClick={addAssignee}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              {taskData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setTaskData((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((_, i) => i !== index),
                      }))
                    }
                    className="hover:text-gray-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
