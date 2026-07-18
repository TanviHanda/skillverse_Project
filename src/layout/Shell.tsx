import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Icons from 'lucide-react';

const navItems = [
  ['LayoutDashboard', 'Dashboard', '/dashboard'],
  ['Map', 'Roadmap', '/roadmap'],
  ['Users', 'Communities', '/communities'],
  ['FolderKanban', 'Projects', '/projects'],
  ['Library', 'Resources', '/resources'],
  ['Sparkles', 'AI Mentor', '/mentor']
];

export const Shell = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(true);

  const Icon = ({ name }: { name: string }) => {
    const C = (Icons as any)[name] || Icons.Circle;
    return <C size={18} />;
  };

  return (
    <div className={`min-h-screen flex ${dark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <aside className="w-64 border-r border-gray-800 p-6 hidden md:flex flex-col justify-between">
        <nav className="flex flex-col gap-2">
          {navItems.map(([i, t, p]) => (
            <NavLink 
              to={p} 
              key={p} 
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800'}`
              }
            >
              <Icon name={i} />
              <span className="font-medium">{t}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Bottom (Settings + Profile) */}
        <div className="flex flex-col gap-4">
          <button onClick={() => setDark(!dark)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg">
            <Icons.Moon size={18} />
            {dark ? 'Dark mode' : 'Light mode'}
          </button>
          
          <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-xl">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">JD</div>
            <div className="flex-1 overflow-hidden">
              <p className="font-bold truncate">Jordan Davis</p>
              <p className="text-xs text-gray-400">Learning frontend</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Nav - visible only on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 flex justify-around p-4">
        {navItems.slice(0, 4).map(([i, t, p]) => (
          <NavLink to={p} key={p} className="flex flex-col items-center gap-1 text-xs">
            <Icon name={i} />
            {t}
          </NavLink>
        ))}
      </div>
    </div>
  );
};