import { useState } from 'react';
import { X, ImageIcon } from 'lucide-react';

export default function NewBoardModal({ isOpen, onClose, onSubmit }) {
  const [boardData, setBoardData] = useState({
    title: '',
    description: '',
    tags: [],
    columns: [
      { name: 'To Do', color: '#E3E3E3' },
      { name: 'In Progress', color: '#E3E3E3' },
      { name: 'Done', color: '#E3E3E3' },
    ],
    coverImage: null,
  });

  const [tagInput, setTagInput] = useState('');
  const [columnInput, setColumnInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(boardData);
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setBoardData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const addColumn = () => {
    if (columnInput.trim()) {
      setBoardData((prev) => ({
        ...prev,
        columns: [
          ...prev.columns,
          { name: columnInput.trim(), color: '#E3E3E3' },
        ],
      }));
      setColumnInput('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBoardData((prev) => ({
          ...prev,
          coverImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Create New Board</h2>
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
              Cover Image
            </label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              {boardData.coverImage ? (
                <div className="relative">
                  <img
                    src={boardData.coverImage || '/placeholder.svg'}
                    alt="Board cover"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setBoardData((prev) => ({ ...prev, coverImage: null }))
                    }
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <label className="cursor-pointer text-blue-600 hover:text-blue-700">
                    Upload Image
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

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
              placeholder="Enter board title"
            />
          </div>

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
              placeholder="Enter board description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {boardData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setBoardData((prev) => ({
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Columns
            </label>
            <div className="space-y-2 mb-2">
              {boardData.columns.map((column, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"
                >
                  <input
                    type="color"
                    value={column.color}
                    onChange={(e) =>
                      setBoardData((prev) => ({
                        ...prev,
                        columns: prev.columns.map((col, i) =>
                          i === index ? { ...col, color: e.target.value } : col,
                        ),
                      }))
                    }
                    className="w-6 h-6 rounded"
                  />
                  <input
                    type="text"
                    value={column.name}
                    onChange={(e) =>
                      setBoardData((prev) => ({
                        ...prev,
                        columns: prev.columns.map((col, i) =>
                          i === index ? { ...col, name: e.target.value } : col,
                        ),
                      }))
                    }
                    className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setBoardData((prev) => ({
                        ...prev,
                        columns: prev.columns.filter((_, i) => i !== index),
                      }))
                    }
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={columnInput}
                onChange={(e) => setColumnInput(e.target.value)}
                placeholder="Add column"
              />
              <button
                type="button"
                onClick={addColumn}
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
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
