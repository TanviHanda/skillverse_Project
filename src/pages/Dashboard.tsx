import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <p className="text-gray-400 text-sm uppercase tracking-widest">Your Learning</p>
          <h1 className="text-4xl font-bold mt-1">Welcome back, Student.</h1>
        </div>
        <button 
          onClick={() => navigate('/roadmap')} 
          className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-medium transition-all"
        >
          Continue Learning →
        </button>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard title="Courses Completed" value="12" />
        <StatsCard title="Hours Learned" value="48" />
        <StatsCard title="Current Streak" value="5 Days" />
      </div>

      {/* Recent Courses */}
      <h2 className="text-2xl font-semibold mb-6">Continue Watching</h2>
      <div className="space-y-4">
        <CourseCard title="Advanced React Patterns" progress={75} />
        <CourseCard title="Tailwind CSS Masterclass" progress={30} />
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string;
  value: string | number;
}

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

interface CourseCardProps {
  title: string;
  progress: number;
}

function CourseCard({ title, progress }: CourseCardProps) {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/roadmap')}
      className="cursor-pointer bg-gray-900 border border-gray-800 p-6 rounded-2xl flex items-center justify-between hover:border-gray-600 transition-all"
    >
      <div className="flex-1">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="w-full bg-gray-700 h-2 rounded-full mt-3 max-w-sm">
          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <span className="text-indigo-400 font-bold">{progress}%</span>
    </div>
  )
}