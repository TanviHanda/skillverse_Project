import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/client";
import { Button } from "../components/Button";

export function RegisterForm() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [strength, setStrength] = useState({ label: '', color: 'bg-gray-700', width: '0%' });

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);

  const handlePasswordChange = (val: string) => {
    setFormData({ ...formData, password: val });
    if (!val) setStrength({ label: '', color: 'bg-gray-700', width: '0%' });
    else {
      const hasAlpha = /[a-zA-Z]/.test(val);
      const hasNum = /[0-9]/.test(val);
      const hasSpecial = /[!@#$%^&*]/.test(val);
      const count = [hasAlpha, hasNum, hasSpecial].filter(Boolean).length;
      if (count === 1) setStrength({ label: 'Weak', color: 'bg-red-500', width: '33%' });
      else if (count === 2) setStrength({ label: 'Medium', color: 'bg-yellow-500', width: '66%' });
      else setStrength({ label: 'Strong', color: 'bg-green-500', width: '100%' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid(formData.email)) { setError("Invalid email format"); return; }
    
    setBusy(true);
    setError(''); 
    try {
      const r = await authApi.signup(formData.name, formData.email, formData.password);
      
      if (r && r.token) {
        localStorage.setItem('skillhub_token', r.token);
        localStorage.setItem('user', JSON.stringify(r.user));
        nav('/dashboard'); 
      } else {
        setError("Registration succeeded, but login data missing.");
      }
    } catch (e: any) { 
      setError(e.message || "Registration failed"); 
    } finally { 
      setBusy(false); 
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card">
        <h1>Ready to make<br/><em>real progress?</em></h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <input 
            type="text" placeholder="Full Name" required
            className="p-3 bg-gray-800 rounded-xl text-white border border-gray-700"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email" required
            className="p-3 bg-gray-800 rounded-xl text-white border border-gray-700"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <div className="flex flex-col gap-1">
            <input 
              type="password" placeholder="Password" required
              className="p-3 bg-gray-800 rounded-xl text-white border border-gray-700"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {formData.password && (
              <div className="flex flex-col gap-1 mt-1">
                <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strength.color}`} style={{ width: strength.width }} />
                </div>
                <span className={`text-[11px] font-bold ${strength.color.replace('bg-', 'text-')}`}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>
          <Button type="submit" variant="primary" disabled={busy || strength.label !== 'Strong'}>
            {busy ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
        {error && <small className="text-red-500 mt-2 block">{error}</small>}
      </div>
    </div>
  );
}