import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function CommunitiesList() {
  const [communities, setCommunities] = useState<any[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    api<any[]>('/communities').then(setCommunities);
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">Communities</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {communities.map((c) => (
          <div key={c.id} className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-indigo-500 transition-all">
            <h3 className="text-xl font-bold">{c.name}</h3>
            <p className="text-gray-400 mt-2">{c.description}</p>
            <button 
              onClick={() => nav(`/communities/${c.id}`)}
              className="mt-4 text-indigo-400 font-bold hover:underline"
            >
              Join Discussion →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}