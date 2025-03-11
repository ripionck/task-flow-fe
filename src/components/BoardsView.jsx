import { useEffect, useRef, useState } from 'react';
import BoardDeleteModal from './BoardDeleteModal';
import BoardDetailsModal from './BoardDetailsModal';
import BoardEditModal from './BoardEditModal';
import BoardProjectCard from './BoardProjectCard';
import NavButtons from './NavButtons';
import PageHeader from './PageHeader';

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

export default function BoardsView({ onNewBoard, onBoardSelect }) {
  const [selectedBoardDetails, setSelectedBoardDetails] = useState(null);
  const [boardToEdit, setBoardToEdit] = useState(null);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShowDetails = (e, project) => {
    e.stopPropagation();
    setSelectedBoardDetails(project);
  };

  const handleCloseDetails = () => {
    setSelectedBoardDetails(null);
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
    console.log('Saving updated board:', updatedBoard);
    setBoardToEdit(null);
  };

  const handleConfirmDelete = (boardId) => {
    console.log('Deleting board with ID:', boardId);
    setBoardToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Project Boards"
        subtitle="Manage and organize your team's tasks"
      >
        <NavButtons onNewBoard={onNewBoard} />
      </PageHeader>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <BoardProjectCard
              key={project.id}
              project={project}
              onShowDetails={handleShowDetails}
              onEdit={handleEditBoard}
              onDelete={handleDeleteBoard}
              onBoardSelect={onBoardSelect}
            />
          ))}
        </div>
      </div>

      {selectedBoardDetails && (
        <BoardDetailsModal
          board={selectedBoardDetails}
          onClose={handleCloseDetails}
          onOpenBoard={onBoardSelect}
        />
      )}

      {boardToEdit && (
        <BoardEditModal
          board={boardToEdit}
          onSave={handleSaveEdit}
          onClose={() => setBoardToEdit(null)}
        />
      )}

      {boardToDelete && (
        <BoardDeleteModal
          board={boardToDelete}
          onConfirm={handleConfirmDelete}
          onClose={() => setBoardToDelete(null)}
        />
      )}
    </div>
  );
}
