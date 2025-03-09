import { MoreVertical } from 'lucide-react';
import { NavButtons } from './nav-buttons';
import { PageHeader } from './page-header';

const projects = [
  {
    id: 1,
    title: 'Website Redesign',
    tags: ['Design', 'Development'],
    tagColors: ['bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700'],
    progress: 60,
    dueIn: '2 weeks',
    team: ['JL', 'AM', 'SK'],
  },
  {
    id: 2,
    title: 'Marketing Campaign',
    tags: ['Marketing', 'Content'],
    tagColors: ['bg-green-100 text-green-700', 'bg-yellow-100 text-yellow-700'],
    progress: 35,
    dueIn: '1 month',
    team: ['RS', 'LM'],
  },
  {
    id: 3,
    title: 'Product Launch',
    tags: ['Product', 'Launch'],
    tagColors: ['bg-blue-100 text-blue-700', 'bg-pink-100 text-pink-700'],
    progress: 15,
    dueIn: '3 months',
    team: ['PK', 'RJ', 'MN'],
  },
];

export default function BoardsView({ onNewBoard, onBoardSelect }) {
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
            <div
              key={project.id}
              className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onBoardSelect && onBoardSelect(project.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <button
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </div>

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
    </div>
  );
}
