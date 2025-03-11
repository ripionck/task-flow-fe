import { Edit, Info, MoreVertical, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

function BoardProjectCard({
  project,
  onShowDetails,
  onEdit,
  onDelete,
  onBoardSelect,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setOpenMenu(!openMenu);
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={() => onBoardSelect && onBoardSelect(project.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded"
            onClick={(e) => onShowDetails(e, project)}
            title="Show board details"
          >
            <Info className="h-4 w-4" />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={toggleMenu}
            >
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </button>
            {openMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border">
                <div className="py-1">
                  <button
                    onClick={(e) => onEdit(e, project)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Board
                  </button>
                  <button
                    onClick={(e) => onDelete(e, project)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Board
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {project.description}
      </p>
      <div className="flex gap-2 mb-4">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className={`text-xs px-2 py-1 rounded-full ${project.tagColors[i]}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {project.team.map((member, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm border-2 border-white"
              title={project.teamNames[i]}
            >
              {member}
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-600">Due in {project.dueIn}</span>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBoardSelect && onBoardSelect(project.id);
          }}
          className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
        >
          View All Tasks
        </button>
      </div>
    </div>
  );
}

export default BoardProjectCard;
