import {
  AlertTriangle,
  Calendar,
  Edit,
  ExternalLink,
  Info,
  MoreVertical,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import EditBoardModal from './EditBoardModal';
import { NavButtons } from './NavButtons';
import NewBoardModal from './NewBoardModal';
import { PageHeader } from './PageHeader';

const projects = [
  {
    id: 1,
    title: 'Website Redesign',
    description:
      'Complete overhaul of the company website with new branding and improved user experience.',
    tags: ['Design', 'Development'],
    tagColors: ['bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700'],
    progress: 60,
    dueIn: '2 weeks',
    dueDate: '2023-11-15',
    team: ['JL', 'AM', 'SK'],
    teamNames: ['John Lee', 'Alice Martinez', 'Sarah Kim'],
    createdBy: 'John Doe',
    createdAt: '2023-09-01',
    lastUpdated: '2023-10-25',
    totalTasks: 24,
    completedTasks: 14,
  },
  {
    id: 2,
    title: 'Marketing Campaign',
    description:
      'Q4 marketing campaign for product launch including social media, email, and content strategy.',
    tags: ['Marketing', 'Content'],
    tagColors: ['bg-green-100 text-green-700', 'bg-yellow-100 text-yellow-700'],
    progress: 35,
    dueIn: '1 month',
    dueDate: '2023-12-01',
    team: ['RS', 'LM'],
    teamNames: ['Robert Smith', 'Lisa Miller'],
    createdBy: 'Alice Martinez',
    createdAt: '2023-09-15',
    lastUpdated: '2023-10-20',
    totalTasks: 18,
    completedTasks: 6,
  },
  {
    id: 3,
    title: 'Product Launch',
    description:
      'Preparation and execution of the new product launch, including feature finalization and go-to-market strategy.',
    tags: ['Product', 'Launch'],
    tagColors: ['bg-blue-100 text-blue-700', 'bg-pink-100 text-pink-700'],
    progress: 15,
    dueIn: '3 months',
    dueDate: '2024-01-15',
    team: ['PK', 'RJ', 'MN'],
    teamNames: ['Paul Kim', 'Rachel Johnson', 'Mike Nelson'],
    createdBy: 'Sarah Kim',
    createdAt: '2023-10-01',
    lastUpdated: '2023-10-18',
    totalTasks: 32,
    completedTasks: 5,
  },
];

export default function BoardsView({ onBoardSelect }) {
  const [selectedBoardDetails, setSelectedBoardDetails] = useState(null);
  const [boardToEdit, setBoardToEdit] = useState(null);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleShowDetails = (e, project) => {
    e.stopPropagation();
    setSelectedBoardDetails(project);
  };

  const handleCloseDetails = () => {
    setSelectedBoardDetails(null);
  };

  const toggleMenu = (e, projectId) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  const handleEditBoard = (e, project) => {
    e.stopPropagation();
    setOpenMenuId(null);
    setBoardToEdit(project);
  };

  const handleDeleteBoard = (e, project) => {
    e.stopPropagation();
    setOpenMenuId(null);
    setBoardToDelete(project);
  };

  const handleSaveEdit = (updatedBoard) => {
    const index = projects.findIndex((p) => p.id === updatedBoard.id);
    if (index !== -1) {
      projects[index] = updatedBoard;
    }
    setBoardToEdit(null);
  };

  const handleCreateBoard = (newBoard) => {
    projects.push({
      ...newBoard,
      id: Math.max(...projects.map((p) => p.id)) + 1,
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      totalTasks: 0,
      completedTasks: 0,
    });
    setIsNewBoardOpen(false);
  };

  const handleConfirmDelete = (boardId) => {
    const index = projects.findIndex((p) => p.id === boardId);
    if (index !== -1) {
      projects.splice(index, 1);
    }
    setBoardToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Project Boards"
        subtitle="Manage and organize your team's tasks"
      >
        <NavButtons onNewBoard={() => setIsNewBoardOpen(true)} />
      </PageHeader>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow cursor-pointer relative"
              onClick={() => onBoardSelect && onBoardSelect(project.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 hover:bg-blue-50 text-blue-600 rounded"
                    onClick={(e) => handleShowDetails(e, project)}
                    title="Show board details"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                  <div
                    className="relative"
                    ref={openMenuId === project.id ? menuRef : null}
                  >
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={(e) => toggleMenu(e, project.id)}
                    >
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>

                    {openMenuId === project.id && (
                      <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border">
                        <div className="py-1">
                          <button
                            onClick={(e) => handleEditBoard(e, project)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Board
                          </button>
                          <button
                            onClick={(e) => handleDeleteBoard(e, project)}
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
                <span className="text-sm text-gray-600">
                  Due in {project.dueIn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Board Details Modal */}
      {selectedBoardDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">
                  {selectedBoardDetails.title}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      onBoardSelect && onBoardSelect(selectedBoardDetails.id)
                    }
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-full flex items-center gap-1"
                    title="Open board"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCloseDetails}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">
                  {selectedBoardDetails.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                <div className="flex gap-2">
                  {selectedBoardDetails.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${selectedBoardDetails.tagColors[i]}`}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Progress
                </h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>
                      {selectedBoardDetails.completedTasks} of{' '}
                      {selectedBoardDetails.totalTasks} tasks completed
                    </span>
                    <span>{selectedBoardDetails.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${selectedBoardDetails.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Timeline
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Created On</div>
                      <div className="text-sm">
                        {selectedBoardDetails.createdAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Due Date</div>
                      <div className="text-sm">
                        {selectedBoardDetails.dueDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Team Members
                </h3>
                <div className="space-y-2">
                  {selectedBoardDetails.teamNames.map((name, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                        {selectedBoardDetails.team[i]}
                      </div>
                      <span className="text-sm">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Created By</div>
                  <div>{selectedBoardDetails.createdBy}</div>
                </div>
                <div>
                  <div className="text-gray-500">Last Updated</div>
                  <div>{selectedBoardDetails.lastUpdated}</div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() =>
                  onBoardSelect && onBoardSelect(selectedBoardDetails.id)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Board
              </button>
            </div>
          </div>
        </div>
      )}

      <EditBoardModal
        isOpen={!!boardToEdit}
        onClose={() => setBoardToEdit(null)}
        board={boardToEdit}
        onSave={handleSaveEdit}
      />

      <NewBoardModal
        isOpen={isNewBoardOpen}
        onClose={() => setIsNewBoardOpen(false)}
        onCreate={handleCreateBoard}
      />

      {boardToDelete && (
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
                <span className="font-medium">{boardToDelete.title}</span>?
              </p>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setBoardToDelete(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmDelete(boardToDelete.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Board
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
