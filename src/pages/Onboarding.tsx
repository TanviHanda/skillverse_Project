import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client'; 

const domains = [
  { id: 'frontend', label: 'Frontend Development', icon: '💻' },
  { id: 'backend', label: 'Backend Development', icon: '⚙️' },
  { id: 'stock', label: 'Stock Market', icon: '📈' },
  { id: 'uiux', label: 'UI/UX Design', icon: '🎨' },
  { id: 'video', label: 'Video Editing', icon: '🎬' }
];

const levels = [
  { id: 'beginner', label: 'Beginner', desc: 'I am just starting out.' },
  { id: 'intermediate', label: 'Intermediate', desc: 'I have some experience.' },
  { id: 'advanced', label: 'Advanced', desc: 'I am a pro looking to refine skills.' }
];

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({ domain: '', level: '' });
  const [loading, setLoading] = useState(false); // Loading state add kiya
  const navigate = useNavigate();

  const handleDomainSelect = (id: string) => {
    setSelection({ ...selection, domain: id });
    setStep(2); 
  };

  const handleLevelSelect = (id: string) => {
    setSelection({ ...selection, level: id });
  };

  const finishOnboarding = async () => {
    setLoading(true);
    try {
      console.log("Onboarding Complete:", selection);
      
      // API call add kardi
      await api('/profile/onboarding', {
        method: 'POST',
        body: JSON.stringify(selection)
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to save onboarding:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6">
      {step === 1 && (
        <div className="w-full max-w-5xl">
          <h1 className="text-5xl font-black text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            What are you here to master?
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {domains.map((d) => (
              <button key={d.id} onClick={() => handleDomainSelect(d.id)} className="p-8 bg-[#121212] rounded-3xl border border-gray-800 hover:border-indigo-500 transition-all text-left">
                <div className="text-4xl mb-4">{d.icon}</div>
                <h3 className="text-lg font-semibold">{d.label}</h3>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-10">What is your current level?</h1>
          <div className="grid gap-4">
            {levels.map((l) => (
              <button
                key={l.id}
                onClick={() => handleLevelSelect(l.id)}
                className={`p-6 rounded-2xl border transition-all ${
                  selection.level === l.id ? 'bg-indigo-900/20 border-indigo-500' : 'bg-[#121212] border-gray-800'
                }`}
              >
                <h3 className="text-xl font-bold">{l.label}</h3>
                <p className="text-gray-400">{l.desc}</p>
              </button>
            ))}
          </div>
          
          <div className="mt-10 flex gap-4 justify-center">
            <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white">Back</button>
            <button 
              disabled={!selection.level || loading}
              onClick={finishOnboarding}
              className="bg-white text-black px-10 py-3 rounded-2xl font-bold disabled:opacity-50"
            >
              {loading ? "Saving..." : "Complete Setup →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}