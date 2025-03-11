function TaskColumn({ title, tasks, count, onAddTask }) {
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {count}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${task.tagColor}`}
              >
                {task.tag}
              </span>
              <span className="text-sm text-gray-500">Due in {task.dueIn}</span>
            </div>
            <h4 className="font-medium mb-1">{task.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {task.assignees.map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm border-2  border-gray-200"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskColumn;
