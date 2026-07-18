import { LayoutDashboard, Map, Users, FolderKanban, BookOpen, Sparkles, FolderGit2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Roadmap', icon: <Map size={20} />, path: '/roadmap' },
    { name: 'Communities', icon: <Users size={20} />, path: '/communities' },
    { name: 'Projects', icon: <FolderGit2 size={20} />, path: '/projects' },
    { name: 'Resources', icon: <BookOpen size={20} />, path: '/resources' },
    { name: 'AI Mentor', icon: <Sparkles size={20} />, path: '/ai-mentor' },
    
  ];

  return (
    <div className="w-64 bg-black border-r border-gray-800 p-6 flex flex-col justify-between h-screen">
      <div>
        <h1 className="text-white text-2xl font-bold mb-10 px-2">SkillVerse</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-xl transition-all ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-900'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-800 pt-6">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">JD</div>
          <div>
            <p className="font-bold">Jordan Davis</p>
            <p className="text-xs text-gray-400">Learning frontend</p>
          </div>
        </div>
      </div>
    </div>
  );
}