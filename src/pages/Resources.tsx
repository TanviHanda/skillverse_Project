import { useState } from 'react';

const resourcesData = [
  { id: 1, title: 'React Documentation', category: 'Articles', link: 'https://react.dev' },
  { id: 2, title: 'JavaScript Mastery Video', category: 'Videos', link: 'https://youtu.be/pN6jk0uUrD8?si=q1pfCEDbaRAljm2E' },
  { id: 3, title: 'Clean Code Book', category: 'Books', link: 'https://www.lkhibra.ma/books/clean-code.pdf' },
  { id: 4, title: 'VS Code Extensions', category: 'Tools', link: 'https://marketplace.visualstudio.com' },
  { id: 5, title: 'Advanced CSS Tips', category: 'Articles', link: 'https://youtu.be/2IV08sP9m3U?si=PMcm_oVlE8F-kuFJ' },
];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Articles', 'Videos', 'Books', 'Tools'];

  const filteredResources = selectedCategory === 'All' 
    ? resourcesData 
    : resourcesData.filter(r => r.category === selectedCategory);

  return (
    <div className="p-8 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-8">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-xl font-medium transition-all ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource List */}
      <div className="space-y-4">
        {filteredResources.map(r => (
          <div key={r.id} className="bg-gray-900 p-6 rounded-2xl border border-gray-800 flex justify-between items-center hover:border-gray-700 transition-all">
            <div>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">{r.category}</span>
            </div>
            <a 
              href={r.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gray-800 px-6 py-2 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all"
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}