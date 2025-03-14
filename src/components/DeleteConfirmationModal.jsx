import { AlertTriangle, X } from 'lucide-react';
import PropTypes from 'prop-types';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemType = 'task',
  itemName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-red-600">
            Delete {itemType}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Are you sure?</h3>
              <p className="text-gray-600">This action cannot be undone.</p>
            </div>
          </div>

          <p className="mb-6">
            You are about to delete the {itemType}{' '}
            <span className="font-medium">{itemName}</span>. This will
            permanently remove the {itemType} and all associated data.
          </p>

          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={onConfirm}
            >
              Delete {itemType}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemType: PropTypes.string,
  itemName: PropTypes.string,
};

DeleteConfirmationModal.defaultProps = {
  isOpen: false,
  itemType: 'task',
  itemName: '',
};

export default DeleteConfirmationModal;
