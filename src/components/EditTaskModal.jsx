import { Calendar, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { users } from '../data/dummy-data';

const EditTaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('To Do');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title || '');
      setTaskDescription(task.description || '');
      setTaskStatus(task.status || 'To Do');
      setSelectedTags(task.tags || []);
      setSelectedAssignees(task.assignees || []);
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  const availableTags = [
    'Design',
    'Development',
    'Content',
    'Research',
    'Testing',
    'UI',
    'UX',
    'Backend',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) return;

    onSave({
      ...task,
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      assignees: selectedAssignees,
      tags: selectedTags.length > 0 ? selectedTags : ['Design'],
      dueDate: dueDate || task.dueDate,
    });

    onClose();
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleAssignee = (userId) => {
    if (selectedAssignees.includes(userId)) {
      setSelectedAssignees(selectedAssignees.filter((id) => id !== userId));
    } else {
      setSelectedAssignees([...selectedAssignees, userId]);
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Edit Task</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title*
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-100 text-blue-800 border-blue-200 border'
                        : 'bg-gray-100 text-gray-800 border-gray-200 border hover:bg-gray-200'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assignees
              </label>
              <div className="flex flex-wrap gap-2">
                {users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                      selectedAssignees.includes(user.id)
                        ? 'bg-blue-100 text-blue-800 border-blue-200 border'
                        : 'bg-gray-100 text-gray-800 border-gray-200 border hover:bg-gray-200'
                    }`}
                    onClick={() => toggleAssignee(user.id)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full ${user.color} flex items-center justify-center text-white text-xs`}
                    >
                      {user.id}
                    </div>
                    <span>{user.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., in 1 week, tomorrow"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={onClose}
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
  );
};

export default EditTaskModal;
