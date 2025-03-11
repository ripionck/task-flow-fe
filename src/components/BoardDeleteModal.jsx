import { AlertTriangle } from 'lucide-react';

function BoardDeleteModal({ board, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold">Delete Board</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete{' '}
            <span className="font-medium">{board.title}</span>? This action
            cannot be undone and all tasks associated with this board will be
            permanently deleted.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(board.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BoardDeleteModal;
