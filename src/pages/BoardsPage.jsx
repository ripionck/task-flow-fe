import { ChevronDown, Info, MoreVertical, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddBoardModal from '../components/AddBoardModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import EditBoardModal from '../components/EditBoardModal';
import { projects, users } from '../data/dummy-data';

const BoardsPage = () => {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectsList, setProjectsList] = useState(projects);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterTag, setFilterTag] = useState('all');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleAddBoard = (newBoard) => {
    const newId = Math.max(...projectsList.map((p) => p.id)) + 1;
    const newProject = {
      ...newBoard,
      id: newId,
      assignees: ['AM', 'JL'],
      progress: 0,
    };
    setProjectsList([...projectsList, newProject]);
  };

  const handleEditBoard = (updatedBoard) => {
    setProjectsList(
      projectsList.map((project) =>
        project.id === updatedBoard.id
          ? { ...project, ...updatedBoard }
          : project,
      ),
    );
    setProjectToEdit(null);
    setShowEditBoardModal(false);
  };

  const handleDeleteBoard = () => {
    if (projectToDelete) {
      setProjectsList(projectsList.filter((p) => p.id !== projectToDelete.id));
      setProjectToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const openEditModal = (project, e) => {
    e.stopPropagation();
    setProjectToEdit(project);
    setShowEditBoardModal(true);
    // Don't close the dropdown immediately to prevent race conditions
    setTimeout(() => {
      setOpenDropdownId(null);
    }, 100);
  };

  const openDeleteModal = (project, e) => {
    e.stopPropagation();
    setProjectToDelete(project);
    setShowDeleteModal(true);
    // Don't close the dropdown immediately to prevent race conditions
    setTimeout(() => {
      setOpenDropdownId(null);
    }, 100);
  };

  const filteredProjects = projectsList.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = filterTag === 'all' || project.tags.includes(filterTag);

    return matchesSearch && matchesTag;
  });

  // Get all unique tags from projects
  const allTags = [...new Set(projectsList.flatMap((project) => project.tags))];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on a button that needs the dropdown
      if (
        event.target.closest('button') &&
        (event.target.textContent.includes('Edit Board') ||
          event.target.textContent.includes('Delete Board'))
      ) {
        return;
      }

      // Otherwise close the dropdown
      if (openDropdownId !== null) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Boards</h1>
          <p className="text-gray-600">
            Manage and organize your team&apos;s tasks
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search boards..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <span>
                Filter: {filterTag === 'all' ? 'All Tags' : filterTag}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <button
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                    onClick={() => {
                      setFilterTag('all');
                      setShowFilterDropdown(false);
                    }}
                  >
                    All Tags
                  </button>

                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        setFilterTag(tag);
                        setShowFilterDropdown(false);
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            onClick={() => setShowAddBoardModal(true)}
          >
            <Plus className="w-5 h-5" />
            New Board
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Info className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(
                          openDropdownId === project.id ? null : project.id,
                        );
                      }}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openDropdownId === project.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <div className="p-1">
                          <button
                            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
                            onClick={(e) => openEditModal(project, e)}
                          >
                            Edit Board
                          </button>
                          <button
                            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 text-red-600"
                            onClick={(e) => openDeleteModal(project, e)}
                          >
                            Delete Board
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm ${
                      tag === 'Design'
                        ? 'bg-blue-100 text-blue-800'
                        : tag === 'Development'
                        ? 'bg-purple-100 text-purple-800'
                        : tag === 'Marketing'
                        ? 'bg-green-100 text-green-800'
                        : tag === 'Content'
                        ? 'bg-yellow-100 text-yellow-800'
                        : tag === 'Product'
                        ? 'bg-blue-100 text-blue-800'
                        : tag === 'Launch'
                        ? 'bg-pink-100 text-pink-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
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
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {project.assignees.map((userId) => {
                    const user = users.find((u) => u.id === userId);
                    return (
                      <div
                        key={userId}
                        className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
                      >
                        {userId}
                      </div>
                    );
                  })}
                </div>

                <div className="text-gray-600 text-sm">
                  Due {project.dueDate}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 p-3">
              <Link
                to={`/boards/${project.id}`}
                className="w-full text-blue-600 text-center hover:text-blue-800 text-sm font-medium block"
              >
                View Board
              </Link>
            </div>
          </div>
        ))}
      </div>

      <AddBoardModal
        isOpen={showAddBoardModal}
        onClose={() => setShowAddBoardModal(false)}
        onAdd={handleAddBoard}
      />

      {projectToEdit && (
        <EditBoardModal
          isOpen={showEditBoardModal}
          onClose={() => {
            setShowEditBoardModal(false);
            setProjectToEdit(null);
          }}
          onSave={handleEditBoard}
          project={projectToEdit}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleDeleteBoard}
        itemType="board"
        itemName={projectToDelete?.name}
      />
    </div>
  );
};

export default BoardsPage;
