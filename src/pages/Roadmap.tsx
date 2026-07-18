import { useNavigate } from 'react-router-dom';

export function Roadmap() {
  const navigate = useNavigate();

  const roadmapSteps = [
    { id: 'html', title: "HTML & Basics", desc: "Understand structure and semantic tags.", status: "completed" },
    { id: 'css', title: "CSS Mastery", desc: "Layouts, Flexbox, Grid, and Animations.", status: "completed" },
    { id: 'js', title: "JavaScript Fundamentals", desc: "ES6+, DOM manipulation, and logic.", status: "current" },
    { id: 'react-basics', title: "React Basics", desc: "Components, Props, and State management.", status: "pending" },
    { id: 'react-advanced', title: "Advanced React", desc: "Hooks, Context API, and Performance.", status: "pending" },
  ];

  return (
    <div className="p-8 text-white max-w-4xl">
      <p className="text-gray-400 text-sm uppercase tracking-widest">Your Path</p>
      <h1 className="text-4xl font-bold mt-1 mb-12">Frontend Developer Roadmap</h1>

      <div className="space-y-8">
        {roadmapSteps.map((step, index) => (
          <div key={index} className="flex gap-6 group">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${step.status === 'completed' ? 'bg-green-500 border-green-500' : 
                  step.status === 'current' ? 'bg-indigo-600 border-indigo-600' : 'bg-gray-800 border-gray-600'}`}>
                {step.status === 'completed' ? '✓' : index + 1}
              </div>
              {index !== roadmapSteps.length - 1 && <div className="w-0.5 h-full bg-gray-800 my-2"></div>}
            </div>

            {/* Content */}
            <div className={`flex-1 p-6 rounded-2xl border transition-all ${step.status === 'current' ? 'bg-gray-900 border-indigo-500/50' : 'bg-gray-900 border-gray-800 hover:border-gray-600'}`}>
              <h3 className="font-bold text-lg">{step.title}</h3>
              <p className="text-gray-400 mt-1">{step.desc}</p>
              
              {step.status === 'pending' && (
                <button 
                  onClick={() => navigate(`/lesson/${step.id}`)} 
                  className="text-indigo-400 font-bold hover:underline mt-2 block"
                >
                  Start Lesson →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}