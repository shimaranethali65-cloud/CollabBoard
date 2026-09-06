import { Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Projects */}
      <Route path="/projects" element={<ProjectsBoardPage />} />
      <Route path="/view-project" element={<ViewProjectPage />} />
      <Route path="/my-projects" element={<MyProjectsPage />} />
      <Route path="/task-status" element={<TaskStatusPage />} />

      <Route
        path="/project-members"
        element={<ViewProjectMembersPage />}
      />

      <Route
        path="/create-project"
        element={<CreateProjectPage />}
      />

      <Route
        path="/edit-project"
        element={<EditProjectPage />}
      />

      {/* Profile */}
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;