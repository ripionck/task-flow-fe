import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const defaultBoard = {
  title: '',
  description: '',
  tags: [],
  tagColors: [],
  dueDate: '',
  team: [],
  teamNames: [],
};

export default function EditBoardModal({ isOpen, onClose, board, onSave }) {
  const [boardData, setBoardData] = useState(defaultBoard);
  const [tagInput, setTagInput] = useState('');

  // Initialize form when board prop changes
  useEffect(() => {
    if (board) {
      setBoardData(board);
    } else {
      setBoardData(defaultBoard);
    }
  }, [board]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(boardData);
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setBoardData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
        tagColors: [
          ...prev.tagColors,
          { bg: '#f3f4f6', text: '#374151' }, // Default hex colors
        ],
      }));
      setTagInput('');
    }
  };

  const updateTagColor = (index, type, value) => {
    const newColors = [...boardData.tagColors];
    newColors[index] = {
      ...newColors[index],
      [type]: value,
    };
    setBoardData((prev) => ({ ...prev, tagColors: newColors }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit Board</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Board Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={boardData.title}
              onChange={(e) =>
                setBoardData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={boardData.description}
              onChange={(e) =>
                setBoardData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {boardData.tags.map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: boardData.tagColors[i]?.bg,
                    color: boardData.tagColors[i]?.text,
                  }}
                >
                  {tag}
                  <div className="flex gap-1 ml-2">
                    <input
                      type="color"
                      value={boardData.tagColors[i]?.bg || '#f3f4f6'}
                      onChange={(e) => updateTagColor(i, 'bg', e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer"
                    />
                    <input
                      type="color"
                      value={boardData.tagColors[i]?.text || '#374151'}
                      onChange={(e) =>
                        updateTagColor(i, 'text', e.target.value)
                      }
                      className="w-6 h-6 rounded cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setBoardData((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((_, index) => index !== i),
                        tagColors: prev.tagColors.filter(
                          (_, index) => index !== i,
                        ),
                      }))
                    }
                    className="text-gray-500 hover:text-gray-700"
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

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={boardData.dueDate}
              onChange={(e) =>
                setBoardData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
          </div>

          {/* Team Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Members
            </label>
            <div className="space-y-2 mb-3">
              {boardData.teamNames.map((name, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                      {boardData.team[i]}
                    </div>
                    <span className="text-sm">{name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setBoardData((prev) => ({
                        ...prev,
                        team: prev.team.filter((_, index) => index !== i),
                        teamNames: prev.teamNames.filter(
                          (_, index) => index !== i,
                        ),
                      }))
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <select
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const newMember = e.target.value;
                  if (newMember) {
                    const [initials, name] = newMember.split('|');
                    setBoardData((prev) => ({
                      ...prev,
                      team: [...prev.team, initials],
                      teamNames: [...prev.teamNames, name],
                    }));
                  }
                }}
              >
                <option value="">Add team member</option>
                <option value="DW|David Wilson">David Wilson</option>
                <option value="ET|Emma Thompson">Emma Thompson</option>
                <option value="JB|James Brown">James Brown</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
