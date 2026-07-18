import { useState } from 'react';

const projectsData = [
  { id: 1, title: 'E-commerce App', tech: 'React', level: 'Hard', type: 'Job Interview' },
  { id: 2, title: 'Weather Dashboard', tech: 'JavaScript', level: 'Easy', type: 'Practice' },
  { id: 3, title: 'Task Manager', tech: 'TypeScript', level: 'Medium', type: 'Practice' },
  { id: 4, title: 'Portfolio Website', tech: 'React', level: 'Easy', type: 'Job Interview' },
];

export default function Projects() {
  const [filter, setFilter] = useState({ tech: 'All', level: 'All', type: 'All' });

  const filteredProjects = projectsData.filter((p) => {
    return (filter.tech === 'All' || p.tech === filter.tech) &&
           (filter.level === 'All' || p.level === filter.level) &&
           (filter.type === 'All' || p.type === filter.type);
  });

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Explore Projects</h1>
      
      {/* Filter Section */}
      <div className="flex gap-4 mb-8 bg-gray-900 p-4 rounded-xl">
        <select onChange={(e) => setFilter({...filter, tech: e.target.value})} className="bg-gray-800 p-2 rounded">
          <option value="All">All Tech</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
        </select>
        
        <select onChange={(e) => setFilter({...filter, level: e.target.value})} className="bg-gray-800 p-2 rounded">
          <option value="All">All Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select onChange={(e) => setFilter({...filter, type: e.target.value})} className="bg-gray-800 p-2 rounded">
          <option value="All">All Types</option>
          <option value="Practice">Practice</option>
          <option value="Job Interview">Job Interview</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((p) => (
          <div key={p.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold">{p.title}</h3>
            <p className="text-gray-400 mt-2">{p.tech} • {p.level} • {p.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}