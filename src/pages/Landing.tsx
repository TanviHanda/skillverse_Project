import { useNavigate } from 'react-router-dom';
import { FeatureCard } from '../components/FeatureCard';
export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-12 py-6">
        <h1 className="text-xl font-bold">SkillVerse</h1>
        <div className="flex gap-6 items-center">
          <button 
            onClick={() => navigate('/login')} 
            className="hover:text-indigo-400 transition"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/onboarding')} 
            className="bg-indigo-600 px-6 py-2 rounded-full font-medium hover:bg-indigo-500 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center pt-20 px-6">
        <h1 className="text-6xl md:text-8xl font-black max-w-4xl mx-auto leading-tight">
          Master your craft with <span className="text-indigo-400 italic">AI-driven</span> roadmaps.
        </h1>
        <p className="text-gray-400 text-lg mt-6 max-w-lg mx-auto">
          Personalized learning paths that adapt to your progress, goals, and pace.
        </p>
        <div className="flex gap-4 justify-center mt-10">
          <button 
            onClick={() => navigate('/ai-mentor')} 
            className="bg-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 transition"
          >
            Start Your Journey
          </button>
          <button 
            onClick={() => navigate('/roadmap')} 
            className="border border-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-900 transition"
          >
            View Roadmap
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-6">
        <FeatureCard icon="🧠" title="AI Mentor" desc="Get real-time feedback and explanations as you code." />
        <FeatureCard icon="🗺️" title="Adaptive Roadmaps" desc="Paths that change based on what you already know." />
      </section>
    </div>
  );
}