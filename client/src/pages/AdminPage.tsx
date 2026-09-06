import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar, { type AdminTab } from "../components/AdminSidebar";
import ProjectMemberSelector from "../components/ProjectMemberSelector";
import { useAuth } from "../context/AuthContext";
import {
  getAdminOverview,
  createProject,
  updateProject,
  approveProject,
  closeProject,
  updateProjectDeadline,
} from "../services/projectService";
import type { Project, AdminOverview, User } from "../types";
import { formatDate } from "../types";

export default function AdminPage() {
  const { user, adminLogin, logout } = useAuth();
  const navigate = useNavigate();

  // Overview state
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter & search state for projects tab
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Admin login fallback state if not logged in as ADMIN
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin123");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Create project form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [requiredMembers, setRequiredMembers] = useState(3);
  const [technologies, setTechnologies] = useState("React, TypeScript, Node.js");
  const [createMembers, setCreateMembers] = useState<User[]>([]);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  // Edit deadline modal state
  const [editingDeadlineProjectId, setEditingDeadlineProjectId] = useState<string | null>(null);
  const [newDeadline, setNewDeadline] = useState("");
  const [isUpdatingDeadline, setIsUpdatingDeadline] = useState(false);

  // Edit project modal state (Admin can edit all project details)
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("TODO");
  const [editPriority, setEditPriority] = useState("MEDIUM");
  const [editRequiredMembers, setEditRequiredMembers] = useState(3);
  const [editDueDate, setEditDueDate] = useState("");
  const [editTechnologies, setEditTechnologies] = useState("");
  const [editMembers, setEditMembers] = useState<User[]>([]);
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const data = await getAdminOverview();
      setOverview(data);
    } catch (err) {
      console.error("Failed to load admin overview:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchOverview();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      await adminLogin(adminUsername, adminPassword);
      showToast("Logged in as Administrator successfully!");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Invalid admin credentials");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a project title");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a project description");
      return;
    }

    try {
      setIsSubmittingProject(true);
      const techArray = technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await createProject({
        name: title.trim(),
        description: description.trim(),
        dueDate: date || undefined,
        status: "TODO",
        priority,
        requiredMembers: Number(requiredMembers) || 3,
        technologies: techArray,
        members: createMembers.map((m) => m._id || (m as any).id),
      });

      setCreateSuccess(true);
      setTitle("");
      setDescription("");
      setDate("");
      setRequiredMembers(3);
      setCreateMembers([]);
      showToast("Project created and published for enrollment!");
      await fetchOverview();
      setTimeout(() => {
        setCreateSuccess(false);
        setActiveTab("projects");
      }, 1000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setEditName(project.name || "");
    setEditDescription(project.description || "");
    setEditStatus(project.status || "TODO");
    setEditPriority(project.priority || "MEDIUM");
    setEditRequiredMembers(project.requiredMembers || 3);
    setEditDueDate(project.dueDate ? project.dueDate.slice(0, 10) : "");
    setEditTechnologies(project.technologies ? project.technologies.join(", ") : "");
    setEditMembers(
      Array.isArray(project.members)
        ? project.members.map((m: any) => ({
            _id: m._id || m.id || m.userId,
            name: m.name || m.username || "Member",
            username: m.username || "user",
            email: m.email || "",
          }))
        : []
    );
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    if (!editName.trim()) {
      alert("Project name cannot be empty");
      return;
    }

    try {
      setIsSavingProject(true);
      const techArray = editTechnologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const projectId = editingProject._id || (editingProject as any).id;
      await updateProject(projectId, {
        name: editName.trim(),
        description: editDescription.trim(),
        status: editStatus,
        priority: editPriority,
        requiredMembers: Number(editRequiredMembers) || 3,
        dueDate: editDueDate || undefined,
        technologies: techArray,
        members: editMembers.map((m) => m._id || (m as any).id),
      });

      showToast(`Project "${editName.trim()}" updated successfully!`);
      setEditingProject(null);
      await fetchOverview();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update project");
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleApproveProject = async (projectId: string) => {
    if (!window.confirm("Approve this project and mark it as officially Done?")) {
      return;
    }
    try {
      await approveProject(projectId);
      showToast("Project approved and officially marked as Done!");
      await fetchOverview();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to approve project");
    }
  };

  const handleCloseProject = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to close this project?")) {
      return;
    }
    try {
      await closeProject(projectId);
      showToast("Project closed successfully.");
      await fetchOverview();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to close project");
    }
  };

  const handleSaveDeadline = async () => {
    if (!editingDeadlineProjectId) return;
    try {
      setIsUpdatingDeadline(true);
      await updateProjectDeadline(editingDeadlineProjectId, newDeadline || undefined);
      showToast("Project deadline updated successfully!");
      setEditingDeadlineProjectId(null);
      await fetchOverview();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update deadline");
    } finally {
      setIsUpdatingDeadline(false);
    }
  };

  const handleShareProject = (projectId: string, projectName: string) => {
    const url = `${window.location.origin}/view-project?id=${projectId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showToast(`Share link copied for "${projectName}"!`);
      })
      .catch(() => {
        window.prompt("Share Project Link:", url);
      });
  };

  const stats = overview?.stats;
  const pendingApprovals = overview?.pendingApprovals || [];
  const allProjects = overview?.allProjects || [];

  // Filtered projects for the "View Projects" tab
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Status filter
      if (statusFilter !== "ALL") {
        if (statusFilter === "CLOSED" && !(project.isClosed || project.status === "CLOSED")) return false;
        if (statusFilter === "TODO" && project.status !== "TODO") return false;
        if (statusFilter === "DOING" && project.status !== "DOING" && (project.status as any) !== "IN_PROGRESS") return false;
        if (statusFilter === "SUBMITTED" && project.status !== "SUBMITTED") return false;
        if (statusFilter === "DONE" && project.status !== "DONE" && (project.status as any) !== "COMPLETED") return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = project.name.toLowerCase().includes(query);
        const matchDesc = project.description?.toLowerCase().includes(query);
        const matchTech = project.technologies?.some((t) => t.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchTech) return false;
      }
      return true;
    });
  }, [allProjects, statusFilter, searchQuery]);

  // If user is not an admin, render Admin Login view
  if (!user || user.role !== "ADMIN") {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "Arial, Helvetica, sans-serif" }}>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "40px 36px",
            borderRadius: "16px",
            border: "1px solid #334155",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            textAlign: "center",
            width: "100%",
            maxWidth: "420px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#ffffff", margin: "0 0 6px" }}>
            Admin Panel Login
          </h1>
          <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 24px", lineHeight: "1.4" }}>
            Sign in with administrative credentials to manage project creation, member quotas, deadlines, and approvals.
          </p>

          {loginError && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                backgroundColor: "#7f1d1d",
                color: "#fecaca",
                fontSize: "13px",
                marginBottom: "18px",
                border: "1px solid #991b1b",
                textAlign: "left",
              }}
            >
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#cbd5e1", marginBottom: "6px" }}>
                Admin Username
              </label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="admin"
                required
                style={{
                  width: "100%",
                  height: "42px",
                  boxSizing: "border-box",
                  padding: "0 14px",
                  borderRadius: "8px",
                  border: "1px solid #475569",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "22px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#cbd5e1", marginBottom: "6px" }}>
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  height: "42px",
                  boxSizing: "border-box",
                  padding: "0 14px",
                  borderRadius: "8px",
                  border: "1px solid #475569",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              style={{
                width: "100%",
                height: "44px",
                backgroundColor: isLoggingIn ? "#3b82f6" : "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "14px",
                cursor: isLoggingIn ? "not-allowed" : "pointer",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.4)",
                transition: "background 0.15s",
              }}
            >
              {isLoggingIn ? "Authenticating..." : "Login to Admin Portal"}
            </button>
          </form>

          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#0f172a",
              border: "1px dashed #334155",
              fontSize: "12px",
              color: "#94a3b8",
              textAlign: "center",
            }}
          >
            Default Admin: <strong style={{ color: "#ffffff" }}>admin</strong> /{" "}
            <strong style={{ color: "#ffffff" }}>admin123</strong>
          </div>

          <div style={{ marginTop: "16px" }}>
            <button
              type="button"
              onClick={() => navigate("/projects")}
              style={{
                background: "none",
                border: "none",
                color: "#60a5fa",
                fontSize: "13px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              ← Back to User Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .admin-page-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: Arial, Helvetica, sans-serif;
          width: 100%;
          overflow-x: hidden;
        }

        .admin-main-workspace {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow-y: auto;
        }

        .admin-header-bar {
          position: sticky;
          top: 0;
          z-index: 40;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 16px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .admin-hamburger-btn {
          display: none;
          background: none;
          border: none;
          padding: 6px;
          cursor: pointer;
          color: #1e293b;
          border-radius: 6px;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .admin-hamburger-btn:hover {
          background-color: #f1f5f9;
        }

        .admin-content-main {
          flex: 1;
          padding: 28px 36px;
        }

        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }

        .admin-pending-card {
          background-color: #ffffff;
          border-radius: 12px;
          border: 1px solid #fed7aa;
          padding: 20px 24px;
          box-shadow: 0 2px 8px rgba(234, 88, 12, 0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .admin-pending-left {
          max-width: 60%;
        }

        .admin-pending-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .admin-quick-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .admin-form-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        @media (max-width: 1200px) {
          .admin-stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1023px) {
          .admin-hamburger-btn {
            display: flex;
          }
        }

        @media (max-width: 860px) {
          .admin-pending-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .admin-pending-left {
            max-width: 100% !important;
          }

          .admin-pending-actions {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .admin-header-bar {
            padding: 12px 16px;
          }

          .admin-content-main {
            padding: 16px 14px;
          }

          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .admin-quick-actions-grid {
            grid-template-columns: 1fr;
          }

          .admin-form-two-col {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .admin-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="admin-page-container">
        {/* 1. SEPARATE VERTICAL ADMIN NAVBAR */}
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingCount={pendingApprovals.length}
          totalProjects={allProjects.length}
          adminName={user.name || user.username || "Administrator"}
          adminEmail={user.email || "admin@collabboard.dev"}
          onLogout={logout}
          isOpenOnMobile={sidebarOpen}
          onCloseMobile={() => setSidebarOpen(false)}
        />

        {/* 2. MAIN ADMIN WORKSPACE */}
        <div className="admin-main-workspace">
          {/* TOP HEADER BAR */}
          <header className="admin-header-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                className="admin-hamburger-btn"
                aria-label="Open sidebar menu"
                onClick={() => setSidebarOpen(true)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#64748b", fontWeight: "600" }}>
                  <span>Admin Portal</span>
                  <span>/</span>
                  <span style={{ color: "#0f172a", fontWeight: "700", textTransform: "capitalize" }}>
                    {activeTab === "dashboard" && "Dashboard"}
                    {activeTab === "create" && "Create Project"}
                    {activeTab === "projects" && "View Projects"}
                  </span>
                </div>
                <h1 style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>
                  {activeTab === "dashboard" && "Admin Dashboard & Approvals"}
                  {activeTab === "create" && "Create New Project"}
                  {activeTab === "projects" && "Project Progress & Management"}
                </h1>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {activeTab !== "create" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("create")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 16px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
                  }}
                >
                  <span>+</span>
                  <span>Create Project</span>
                </button>
              )}

              <button
                type="button"
                onClick={fetchOverview}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#475569",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                title="Refresh overview data"
              >
                <span>🔄</span>
                <span>Refresh</span>
              </button>
            </div>
          </header>

          {/* CONTENT AREA */}
          <main className="admin-content-main">
            {/* TAB 1: DASHBOARD */}
            {activeTab === "dashboard" && (
              <div>
                {/* METRIC SUMMARY CARDS */}
                <div className="admin-stats-grid">
                <div style={{ backgroundColor: "#ffffff", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700" }}>TOTAL PROJECTS</div>
                  <div style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>
                    {stats?.totalProjects ?? 0}
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", padding: "18px", borderRadius: "12px", border: "1px solid #dbeafe" }}>
                  <div style={{ fontSize: "12px", color: "#2563eb", fontWeight: "700" }}>FILLING (TO DO)</div>
                  <div style={{ fontSize: "26px", fontWeight: "800", color: "#1d4ed8", marginTop: "4px" }}>
                    {stats?.todoProjects ?? 0}
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", padding: "18px", borderRadius: "12px", border: "1px solid #fef3c7" }}>
                  <div style={{ fontSize: "12px", color: "#d97706", fontWeight: "700" }}>STARTED (DOING)</div>
                  <div style={{ fontSize: "26px", fontWeight: "800", color: "#b45309", marginTop: "4px" }}>
                    {stats?.doingProjects ?? 0}
                  </div>
                </div>

                <div style={{ backgroundColor: "#fff7ed", padding: "18px", borderRadius: "12px", border: "2px solid #fdba74" }}>
                  <div style={{ fontSize: "12px", color: "#ea580c", fontWeight: "800" }}>PENDING APPROVAL</div>
                  <div style={{ fontSize: "26px", fontWeight: "800", color: "#c2410c", marginTop: "4px" }}>
                    {stats?.submittedProjects ?? 0}
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", padding: "18px", borderRadius: "12px", border: "1px solid #dcfce7" }}>
                  <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: "700" }}>APPROVED (DONE)</div>
                  <div style={{ fontSize: "26px", fontWeight: "800", color: "#15803d", marginTop: "4px" }}>
                    {stats?.doneProjects ?? 0}
                  </div>
                </div>

                <div style={{ backgroundColor: "#ffffff", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700" }}>CLOSED</div>
                  <div style={{ fontSize: "26px", fontWeight: "800", color: "#475569", marginTop: "4px" }}>
                    {stats?.closedProjects ?? 0}
                  </div>
                </div>
              </div>

              {/* PENDING APPROVALS QUEUE SECTION */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span>Pending Approval Queue</span>
                      {pendingApprovals.length > 0 && (
                        <span
                          style={{
                            fontSize: "12px",
                            backgroundColor: "#ffedd5",
                            color: "#c2410c",
                            padding: "3px 8px",
                            borderRadius: "10px",
                            fontWeight: "700",
                          }}
                        >
                          {pendingApprovals.length} requiring review
                        </span>
                      )}
                    </h2>
                    <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>
                      Submitted projects waiting for administrator sign-off and official completion.
                    </p>
                  </div>
                </div>

                {pendingApprovals.length === 0 ? (
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "40px 24px",
                      textAlign: "center",
                      borderRadius: "12px",
                      border: "1px dashed #cbd5e1",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎉</div>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>
                      No Pending Submissions
                    </h3>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                      All completed projects have been reviewed and approved.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {pendingApprovals.map((project) => {
                      const projectId = project._id || (project as any).id;
                      return (
                        <div
                          key={projectId}
                          className="admin-pending-card"
                        >
                          <div className="admin-pending-left">
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                              <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "#0f172a" }}>
                                {project.name}
                              </h3>
                              <span
                                style={{
                                  backgroundColor: "#ffedd5",
                                  color: "#c2410c",
                                  padding: "3px 10px",
                                  borderRadius: "12px",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                }}
                              >
                                Ready for Review
                              </span>
                            </div>
                            <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#475569", lineHeight: "1.4" }}>
                              {project.description}
                            </p>
                            <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#64748b", flexWrap: "wrap" }}>
                              <span>👥 Roster: {project.members?.length || 0} / {project.requiredMembers || 3} Members</span>
                              <span>📅 Deadline: {formatDate(project.dueDate)}</span>
                              <span>🕒 Submitted: {project.submittedAt ? formatDate(project.submittedAt) : "Recently"}</span>
                            </div>
                          </div>

                          <div className="admin-pending-actions">
                            <button
                              type="button"
                              onClick={() => handleShareProject(projectId, project.name)}
                              style={{
                                padding: "8px 12px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                backgroundColor: "#ffffff",
                                color: "#475569",
                                fontSize: "12px",
                                fontWeight: "600",
                                cursor: "pointer",
                              }}
                            >
                              🔗 Share
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditModal(project)}
                              style={{
                                padding: "8px 12px",
                                borderRadius: "8px",
                                border: "1px solid #cbd5e1",
                                backgroundColor: "#ffffff",
                                color: "#2563eb",
                                fontSize: "12px",
                                fontWeight: "600",
                                cursor: "pointer",
                              }}
                            >
                              ✏️ Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => navigate(`/view-project?id=${projectId}`)}
                              style={{
                                padding: "8px 14px",
                                borderRadius: "8px",
                                border: "1px solid #bfdbfe",
                                backgroundColor: "#eff6ff",
                                color: "#1d4ed8",
                                fontSize: "12px",
                                fontWeight: "700",
                                cursor: "pointer",
                              }}
                            >
                              View Details
                            </button>

                            <button
                              type="button"
                              onClick={() => handleApproveProject(projectId)}
                              style={{
                                padding: "8px 18px",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: "#16a34a",
                                color: "#ffffff",
                                fontSize: "12px",
                                fontWeight: "700",
                                cursor: "pointer",
                                boxShadow: "0 2px 4px rgba(22, 163, 74, 0.25)",
                              }}
                            >
                              ✓ Approve & Complete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* QUICK ACTIONS BANNER */}
              <div className="admin-quick-actions-grid">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "22px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h3 style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
                    🚀 Create & Publish Projects
                  </h3>
                  <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#64748b", lineHeight: "1.4" }}>
                    Admins have exclusive permission to initialize projects and set the required team member capacity.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("create")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Go to Create Project →
                  </button>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "22px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h3 style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
                    📊 Monitor Progress & Edit
                  </h3>
                  <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#64748b", lineHeight: "1.4" }}>
                    Track member enrollment fill rates, edit project details, adjust deadlines, or close projects.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("projects")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      backgroundColor: "#0f172a",
                      color: "#ffffff",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    View All Projects ({allProjects.length}) →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CREATE PROJECT */}
          {activeTab === "create" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                padding: "32px 36px",
                maxWidth: "680px",
                margin: "0 auto",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>
                Create & Publish Project
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 24px" }}>
                Set up a new project with the required member count. Once published, users can view and enroll until capacity is reached, after which work officially begins.
              </p>

              {createSuccess && (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    backgroundColor: "#dcfce7",
                    color: "#15803d",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "20px",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  ✓ Project created and published successfully!
                </div>
              )}

              <form onSubmit={handleCreateProject}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Mobile Banking Application"
                    required
                    style={{
                      width: "100%",
                      height: "38px",
                      boxSizing: "border-box",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain the project scope and expectations..."
                    required
                    rows={3}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      outline: "none",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div className="admin-form-two-col">
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                      Required Team Members (Capacity) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={requiredMembers}
                      onChange={(e) => setRequiredMembers(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      required
                      style={{
                        width: "100%",
                        height: "38px",
                        boxSizing: "border-box",
                        padding: "0 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                    <span style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", display: "block" }}>
                      The project officially starts once this many members enroll.
                    </span>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                      Project Deadline
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        width: "100%",
                        height: "38px",
                        boxSizing: "border-box",
                        padding: "0 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div className="admin-form-two-col" style={{ marginBottom: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                      Priority Level
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      style={{
                        width: "100%",
                        height: "38px",
                        boxSizing: "border-box",
                        padding: "0 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <option value="HIGH">High</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="LOW">Low</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      placeholder="e.g. React, Node.js, Python"
                      style={{
                        width: "100%",
                        height: "38px",
                        boxSizing: "border-box",
                        padding: "0 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <ProjectMemberSelector
                    selectedMembers={createMembers}
                    onChange={setCreateMembers}
                    label="Assign Project Members"
                    placeholder="Search users to assign to this project..."
                  />
                </div>

                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab("projects")}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      backgroundColor: "#ffffff",
                      color: "#475569",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingProject}
                    style={{
                      padding: "10px 24px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: isSubmittingProject ? "#93c5fd" : "#2563eb",
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: isSubmittingProject ? "not-allowed" : "pointer",
                      boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
                    }}
                  >
                    {isSubmittingProject ? "Publishing Project..." : "Publish Project"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: VIEW PROJECTS (WITH PROGRESS & EDIT PROJECT) */}
          {activeTab === "projects" && (
            <div>
              {/* TOOLBAR: SEARCH & STATUS FILTER */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                {/* Search Input */}
                <div style={{ position: "relative", width: "320px", maxWidth: "100%" }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects or technologies..."
                    style={{
                      width: "100%",
                      height: "38px",
                      boxSizing: "border-box",
                      padding: "0 12px 0 34px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "13px",
                      backgroundColor: "#ffffff",
                      outline: "none",
                    }}
                  />
                  <span style={{ position: "absolute", left: "10px", top: "10px", color: "#94a3b8", fontSize: "14px" }}>
                    🔍
                  </span>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                        background: "none",
                        border: "none",
                        color: "#94a3b8",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Status Filter Pills */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {[
                    { id: "ALL", label: `All (${allProjects.length})` },
                    { id: "TODO", label: `Filling (${stats?.todoProjects ?? 0})` },
                    { id: "DOING", label: `Started (${stats?.doingProjects ?? 0})` },
                    { id: "SUBMITTED", label: `Pending (${stats?.submittedProjects ?? 0})` },
                    { id: "DONE", label: `Done (${stats?.doneProjects ?? 0})` },
                    { id: "CLOSED", label: `Closed (${stats?.closedProjects ?? 0})` },
                  ].map((filter) => {
                    const isSelected = statusFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => setStatusFilter(filter.id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          border: isSelected ? "1px solid #2563eb" : "1px solid #e2e8f0",
                          backgroundColor: isSelected ? "#2563eb" : "#ffffff",
                          color: isSelected ? "#ffffff" : "#475569",
                          fontSize: "12px",
                          fontWeight: isSelected ? "700" : "600",
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PROJECTS TABLE */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                }}
              >
                <div className="responsive-table-wrapper">
                  <table style={{ width: "100%", minWidth: "820px", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569" }}>
                      <th style={{ padding: "14px 20px" }}>Project Name & Scope</th>
                      <th style={{ padding: "14px 20px", width: "220px" }}>Team Roster Progress</th>
                      <th style={{ padding: "14px 20px" }}>Status</th>
                      <th style={{ padding: "14px 20px" }}>Deadline</th>
                      <th style={{ padding: "14px 20px", textAlign: "right" }}>Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: "36px", textAlign: "center", color: "#64748b" }}>
                          No projects matched your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((project) => {
                        const projectId = project._id || (project as any).id;
                        const enrolledCount = project.members?.length || 0;
                        const reqCount = project.requiredMembers || 3;
                        const percent = Math.min(100, Math.round((enrolledCount / reqCount) * 100));
                        const isFilled = enrolledCount >= reqCount;

                        let statusBadgeBg = "#e2e8f0";
                        let statusBadgeColor = "#334155";
                        let statusText = project.status;

                        if (project.isClosed || project.status === "CLOSED") {
                          statusBadgeBg = "#f1f5f9";
                          statusBadgeColor = "#64748b";
                          statusText = "Closed";
                        } else if (project.status === "DONE" || (project.status as any) === "COMPLETED") {
                          statusBadgeBg = "#dcfce7";
                          statusBadgeColor = "#15803d";
                          statusText = "Done (Approved)";
                        } else if (project.status === "SUBMITTED") {
                          statusBadgeBg = "#ffedd5";
                          statusBadgeColor = "#c2410c";
                          statusText = "Submitted for Review";
                        } else if (project.status === "DOING" || (project.status as any) === "IN_PROGRESS") {
                          statusBadgeBg = "#fef9c3";
                          statusBadgeColor = "#854d0e";
                          statusText = "Doing (Officially Started)";
                        } else {
                          statusBadgeBg = "#dbeafe";
                          statusBadgeColor = "#1e40af";
                          statusText = "To Do (Filling Roster)";
                        }

                        return (
                          <tr key={projectId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            {/* 1. Name & Scope */}
                            <td style={{ padding: "16px 20px" }}>
                              <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "14px" }}>
                                {project.name}
                              </div>
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: "#64748b",
                                  maxWidth: "280px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  marginTop: "2px",
                                }}
                              >
                                {project.description}
                              </div>
                              {project.technologies && project.technologies.length > 0 && (
                                <div style={{ display: "flex", gap: "4px", marginTop: "6px", flexWrap: "wrap" }}>
                                  {project.technologies.map((tech, idx) => (
                                    <span
                                      key={idx}
                                      style={{
                                        fontSize: "10px",
                                        padding: "1px 6px",
                                        borderRadius: "4px",
                                        backgroundColor: "#f1f5f9",
                                        color: "#475569",
                                      }}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </td>

                            {/* 2. Team Roster Progress */}
                            <td style={{ padding: "16px 20px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px", fontSize: "12px" }}>
                                <span style={{ fontWeight: "700", color: isFilled ? "#16a34a" : "#2563eb" }}>
                                  {enrolledCount} / {reqCount} Members
                                </span>
                                <span style={{ color: "#64748b", fontSize: "11px" }}>
                                  {percent}%
                                </span>
                              </div>
                              {/* Progress bar */}
                              <div style={{ width: "100%", height: "6px", backgroundColor: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
                                <div
                                  style={{
                                    width: `${percent}%`,
                                    height: "100%",
                                    backgroundColor: isFilled ? "#16a34a" : "#2563eb",
                                    borderRadius: "3px",
                                    transition: "width 0.3s ease",
                                  }}
                                />
                              </div>
                              <div style={{ fontSize: "11px", color: isFilled ? "#16a34a" : "#64748b", marginTop: "4px" }}>
                                {isFilled ? "✓ Capacity reached" : `⏳ ${reqCount - enrolledCount} more to start`}
                              </div>
                            </td>

                            {/* 3. Status Badge */}
                            <td style={{ padding: "16px 20px" }}>
                              <span
                                style={{
                                  backgroundColor: statusBadgeBg,
                                  color: statusBadgeColor,
                                  padding: "4px 10px",
                                  borderRadius: "12px",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  whiteSpace: "nowrap",
                                  display: "inline-block",
                                }}
                              >
                                {statusText}
                              </span>
                            </td>

                            {/* 4. Deadline */}
                            <td style={{ padding: "16px 20px", color: "#334155", fontSize: "12px" }}>
                              {formatDate(project.dueDate)}
                            </td>

                            {/* 5. Admin Actions */}
                            <td style={{ padding: "16px 20px", textAlign: "right" }}>
                              <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                                {/* EDIT PROJECT BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => openEditModal(project)}
                                  style={{
                                    padding: "5px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid #bfdbfe",
                                    backgroundColor: "#eff6ff",
                                    color: "#1d4ed8",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                  }}
                                  title="Edit full project details"
                                >
                                  ✏️ Edit
                                </button>

                                {/* EDIT DEADLINE BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingDeadlineProjectId(projectId);
                                    setNewDeadline(project.dueDate ? project.dueDate.slice(0, 10) : "");
                                  }}
                                  style={{
                                    padding: "5px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid #cbd5e1",
                                    backgroundColor: "#ffffff",
                                    color: "#475569",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                  }}
                                  title="Edit deadline"
                                >
                                  📅 Deadline
                                </button>

                                {/* APPROVE BUTTON */}
                                {project.status === "SUBMITTED" && (
                                  <button
                                    type="button"
                                    onClick={() => handleApproveProject(projectId)}
                                    style={{
                                      padding: "5px 10px",
                                      borderRadius: "6px",
                                      border: "none",
                                      backgroundColor: "#16a34a",
                                      color: "#ffffff",
                                      fontSize: "12px",
                                      fontWeight: "700",
                                      cursor: "pointer",
                                    }}
                                    title="Approve and mark as Done"
                                  >
                                    ✓ Approve
                                  </button>
                                )}

                                {/* SHARE BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => handleShareProject(projectId, project.name)}
                                  style={{
                                    padding: "5px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid #cbd5e1",
                                    backgroundColor: "#ffffff",
                                    color: "#475569",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                  }}
                                  title="Copy share link"
                                >
                                  🔗 Share
                                </button>

                                {/* CLOSE BUTTON */}
                                {!project.isClosed && project.status !== "CLOSED" && (
                                  <button
                                    type="button"
                                    onClick={() => handleCloseProject(projectId)}
                                    style={{
                                      padding: "5px 10px",
                                      borderRadius: "6px",
                                      border: "1px solid #fca5a5",
                                      backgroundColor: "#fee2e2",
                                      color: "#dc2626",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      cursor: "pointer",
                                    }}
                                    title="Close project"
                                  >
                                    Close
                                  </button>
                                )}

                                {/* VIEW BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => navigate(`/view-project?id=${projectId}`)}
                                  style={{
                                    padding: "5px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid #cbd5e1",
                                    backgroundColor: "#ffffff",
                                    color: "#0f172a",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                  }}
                                  title="View project tasks and board"
                                >
                                  View ↗
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. EDIT PROJECT MODAL (CAN EDIT ANY PROJECT DETAILS) */}
      {editingProject && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px 20px",
              borderRadius: "16px",
              width: "94vw",
              maxWidth: "560px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>
                Edit Project
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                style={{ background: "none", border: "none", fontSize: "18px", color: "#94a3b8", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                  Project Name *
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    height: "38px",
                    padding: "0 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                  Description *
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  required
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>

              <div className="admin-form-two-col">
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Required Member Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={editRequiredMembers}
                    onChange={(e) => setEditRequiredMembers(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    required
                    style={{
                      width: "100%",
                      height: "38px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    style={{
                      width: "100%",
                      height: "38px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <option value="TODO">To Do (Filling)</option>
                    <option value="DOING">Doing (Started)</option>
                    <option value="SUBMITTED">Submitted for Review</option>
                    <option value="DONE">Done (Approved)</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-two-col">
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Priority
                  </label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    style={{
                      width: "100%",
                      height: "38px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    style={{
                      width: "100%",
                      height: "38px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editTechnologies}
                  onChange={(e) => setEditTechnologies(e.target.value)}
                  placeholder="e.g. React, Node.js, PostgreSQL"
                  style={{
                    width: "100%",
                    height: "38px",
                    padding: "0 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <ProjectMemberSelector
                  selectedMembers={editMembers}
                  onChange={setEditMembers}
                  label="Assigned Project Members"
                  placeholder="Search users to assign/reassign..."
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: isSavingProject ? "#93c5fd" : "#2563eb",
                    color: "#ffffff",
                    cursor: isSavingProject ? "not-allowed" : "pointer",
                    fontSize: "13px",
                    fontWeight: "700",
                    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.25)",
                  }}
                >
                  {isSavingProject ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT DEADLINE QUICK MODAL */}
      {editingDeadlineProjectId && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px 20px",
              borderRadius: "14px",
              width: "90vw",
              maxWidth: "380px",
              boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ margin: "0 0 12px", fontSize: "18px", color: "#0f172a" }}>Edit Project Deadline</h3>
            <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#64748b" }}>
              Select a new deadline date for this project.
            </p>
            <input
              type="date"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              style={{
                width: "100%",
                height: "38px",
                padding: "0 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                boxSizing: "border-box",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            />
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setEditingDeadlineProjectId(null)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUpdatingDeadline}
                onClick={handleSaveDeadline}
                style={{
                  padding: "8px 18px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  cursor: isUpdatingDeadline ? "not-allowed" : "pointer",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                {isUpdatingDeadline ? "Saving..." : "Save Deadline"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
    </>
  );
}

