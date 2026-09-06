import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsBoardPage from "./pages/ProjectsBoardPage";
import ViewProjectPage from "./pages/ViewProjectPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import TaskStatusPage from "./pages/TaskStatusPage";
import ViewProjectMembersPage from "./pages/ViewProjectMembersPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminPage />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><ProjectsBoardPage /></ProtectedRoute>} />
      <Route path="/view-project" element={<ProtectedRoute><ViewProjectPage /></ProtectedRoute>} />
      <Route path="/my-projects" element={<ProtectedRoute><MyProjectsPage /></ProtectedRoute>} />
      <Route path="/task-status" element={<ProtectedRoute><TaskStatusPage /></ProtectedRoute>} />
      <Route path="/project-members" element={<ProtectedRoute><ViewProjectMembersPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
      
      {/* Create & Edit Project are Admin only */}
      <Route path="/create-project" element={<Navigate to="/admin" replace />} />
      <Route path="/edit-project" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;
