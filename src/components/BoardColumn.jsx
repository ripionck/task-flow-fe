import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

const BoardColumn = ({ column, onAddTask, onEditTask, onDeleteTask }) => {
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
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
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
};

export default BoardColumn;
