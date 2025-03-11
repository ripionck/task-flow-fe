import { Calendar, ExternalLink, Tag, X } from 'lucide-react';

function BoardDetailsModal({ board, onClose, onOpenBoard }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold">{board.title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenBoard(board.id)}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded-full flex items-center gap-1"
                title="Open board"
              >
                <ExternalLink className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Description
            </h3>
            <p className="text-gray-700">{board.description}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
            <div className="flex gap-2">
              {board.tags.map((tag, i) => (
                <div key={i} className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${board.tagColors[i]}`}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Progress</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>
                  {board.completedTasks} of {board.totalTasks} tasks completed
                </span>
                <span>{board.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${board.progress}%` }}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Timeline</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Created On</div>
                  <div className="text-sm">{board.createdAt}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Due Date</div>
                  <div className="text-sm">{board.dueDate}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Team Members
            </h3>
            <div className="space-y-2">
              {board.teamNames.map((name, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                    {board.team[i]}
                  </div>
                  <span className="text-sm">{name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Created By</div>
              <div>{board.createdBy}</div>
            </div>
            <div>
              <div className="text-gray-500">Last Updated</div>
              <div>{board.lastUpdated}</div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={() => onOpenBoard(board.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Open Board
          </button>
        </div>
      </div>
    </div>
  );
}
export default BoardDetailsModal;
