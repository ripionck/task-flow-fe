import { Plus } from 'lucide-react';
import SearchIcon from './SearchIcon';

function NavButtons({ onNewTask, onNewBoard }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search tasks..."
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>
      {onNewTask && (
        <button
          onClick={onNewTask}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Task
        </button>
      )}
      {onNewBoard && (
        <button
          onClick={onNewBoard}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Board
        </button>
      )}
    </div>
  );
}
export default NavButtons;
