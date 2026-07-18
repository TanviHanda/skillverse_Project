import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import { Landing } from './pages/Landing';
import { RegisterForm } from './pages/RegisterForm';
import { Onboarding } from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import { Roadmap } from './pages/Roadmap';
import CommunitiesList from './pages/CommunitiesList';
import CommunityDetail from './pages/CommunityDetail';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import AiMentor from './pages/AiMentor';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/onboarding" element={<Onboarding />} />
      
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/communities" element={<CommunitiesList />} />
          <Route path="/communities/:id" element={<CommunityDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/ai-mentor" element={<AiMentor />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}