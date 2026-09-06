import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import {
  getTasks,
  updateTask,
  createBoardTask
} from "../services/taskService";
import {
  getMyProjects,
  unenrollFromProject,
  submitProject,
} from "../services/projectService";
import { useAuth } from "../context/AuthContext";
import type { Task, Project } from "../types";
import { formatDate } from "../types";

type IconName = "search" | "chevronDown" | "plus" | "calendar" | "clipboard";

function PageIcon({
  name,
  size = 16,
  strokeWidth = 2,
  style,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  const iconContent: Record<IconName, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    chevronDown: <path d="m6 9 6 6 6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4.5V3h6v1.5M8.5 10h7M8.5 14h7" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {iconContent[name]}
    </svg>
  );
}

type KanbanTask = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  status: "todo" | "doing" | "done";
  rawStatus: string;
};

const columnStyles = {
  todo: {
    background: "#E0EDFF",
    border: "1px solid #C1D8FA",
    countBackground: "#C4DFFF",
    countColor: "#1684DD",
    buttonBorder: "#A8C9EF",
  },
  doing: {
    background: "#FBFEE6",
    border: "1px solid #E5E9BD",
    countBackground: "#FFE84E",
    countColor: "#5D5A00",
    buttonBorder: "#EBDF91",
  },
  done: {
    background: "#DEFFE5",
    border: "1px solid #BAF3C5",
    countBackground: "#8DE997",
    countColor: "#218333",
    buttonBorder: "#9BE7A8",
  },
};

const mapDbTaskToKanban = (task: Task): KanbanTask => {
  const upper = (task.status || "TODO").toUpperCase();
  let status: "todo" | "doing" | "done" = "todo";
  if (upper === "DONE" || upper === "COMPLETED") {
    status = "done";
  } else if (upper === "IN_PROGRESS" || upper === "DOING") {
    status = "doing";
  }

  const projectTitle =
    typeof task.project === "object" && task.project !== null
      ? task.project.name
      : task.description || "General Task";

  return {
    id: task._id,
    title: task.title,
    subtitle: projectTitle,
    date: formatDate(task.dueDate || task.createdAt),
    status,
    rawStatus: task.status,
  };
};

function TaskStatusPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const queryParams = new URLSearchParams(location.search);
  const initialProjectId = queryParams.get("projectId") || "";

  const [viewMode, setViewMode] = useState<"projects" | "tasks">("projects");
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchEnrolledProjects = async () => {
    try {
      setLoading(true);
      const data = await getMyProjects();
      if (Array.isArray(data)) {
        const currentId = user?._id || (user as any)?.id;
        // Keep strictly projects where user is enrolled as a member or owner
        const enrolledOnly = data.filter((p) => {
          if (!currentId) return true;
          const isOwner = p.owner && String(p.owner._id || (p.owner as any)?.id) === String(currentId);
          const isMember = Array.isArray(p.members) && p.members.some((m: any) => {
            const mId = typeof m === "string" ? m : m._id || m.id || m.userId;
            const mUsername = typeof m === "object" ? m.username : null;
            return (
              (mId && String(mId) === String(currentId)) ||
              (mUsername && user?.username && mUsername.toLowerCase() === user.username.toLowerCase())
            );
          });
          return isOwner || isMember;
        });
        setProjects(enrolledOnly);
      }
    } catch (err) {
      console.error("Could not fetch enrolled projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch only enrolled projects for this user's status board
  useEffect(() => {
    if (user) {
      fetchEnrolledProjects();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Fetch tasks from database belonging to enrolled projects
  useEffect(() => {
    getTasks(selectedProjectId || undefined)
      .then((data) => {
        if (Array.isArray(data)) {
          const enrolledProjectIds = new Set(projects.map((p) => p._id || p.id));
          const filtered = data.filter((t) => {
            const projId = typeof t.project === "object" && t.project !== null ? t.project._id : t.project;
            if (!projId) return true;
            return enrolledProjectIds.has(String(projId));
          });
          setTasks(filtered.map(mapDbTaskToKanban));
        } else {
          setTasks([]);
        }
      })
      .catch((err) => {
        console.error("Could not fetch tasks:", err);
        setTasks([]);
      });
  }, [selectedProjectId, projects]);

  const handleStatusChange = async (
    taskId: string,
    newStatus: "todo" | "doing" | "done"
  ) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    const backendStatus =
      newStatus === "doing"
        ? "IN_PROGRESS"
        : newStatus === "done"
        ? "DONE"
        : "TODO";

    try {
      await updateTask(taskId, { status: backendStatus });
    } catch (err) {
      console.error("Failed to update task status in database:", err);
    }
  };

  const handleAddTask = async (columnType: "todo" | "doing" | "done") => {
    const title = window.prompt("Enter task title:");
    if (!title || !title.trim()) return;

    const backendStatus =
      columnType === "doing"
        ? "IN_PROGRESS"
        : columnType === "done"
        ? "DONE"
        : "TODO";

    try {
      const created = await createBoardTask({
        title: title.trim(),
        status: backendStatus,
        projectId: selectedProjectId || undefined,
      });

      if (created) {
        const kanban = mapDbTaskToKanban(created);
        setTasks((prev) => [kanban, ...prev]);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create task");
    }
  };

  const handleProjectUnenroll = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to unenroll from this project?")) {
      return;
    }
    try {
      setActionLoading(projectId);
      await unenrollFromProject(projectId);
      await fetchEnrolledProjects();
      alert("Successfully unenrolled from project.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to unenroll from project");
    } finally {
      setActionLoading(null);
    }
  };

  const handleProjectSubmit = async (projectId: string) => {
    if (!window.confirm("Submit this project for Admin approval?")) return;
    try {
      setActionLoading(projectId);
      await submitProject(projectId);
      await fetchEnrolledProjects();
      alert("Project submitted successfully! It is now in the Admin panel awaiting review.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to submit project");
    } finally {
      setActionLoading(null);
    }
  };

  const currentUserId = user?._id || (user as any)?.id;

  const isUserEnrolledInProject = (project: Project) => {
    if (!currentUserId || !project.members) return false;
    return project.members.some((m: any) => {
      const mId = typeof m === "string" ? m : m._id || m.id || m.userId;
      const mUsername = typeof m === "object" ? m.username : null;
      return (
        (mId && String(mId) === String(currentUserId)) ||
        (mUsername && user?.username && mUsername.toLowerCase() === user.username.toLowerCase())
      );
    });
  };

  const isProjectOwner = (project: Project) => {
    if (!currentUserId || !project.owner) return false;
    const ownerId = project.owner._id || (project.owner as any)?.id;
    return ownerId && String(ownerId) === String(currentUserId);
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    if (selectedProjectId && (p._id || p.id) !== selectedProjectId) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }
    return true;
  });

  // Categorize Projects according to required workflow:
  // To Do: Filling the members (members.length < requiredMembers)
  // Doing: Members filled but not finished (members.length >= requiredMembers & not done)
  // Done: Admin approved (status === "DONE")
  const todoProjects = filteredProjects.filter(
    (p) =>
      !p.isClosed &&
      p.status !== "DONE" &&
      p.status !== "COMPLETED" &&
      (p.members?.length || 0) < (p.requiredMembers || 3)
  );

  const doingProjects = filteredProjects.filter(
    (p) =>
      !p.isClosed &&
      p.status !== "DONE" &&
      p.status !== "COMPLETED" &&
      (p.members?.length || 0) >= (p.requiredMembers || 3)
  );

  const doneProjects = filteredProjects.filter(
    (p) => p.status === "DONE" || p.status === "COMPLETED"
  );

  const projectColumns = [
    {
      type: "todo" as const,
      title: "To Do (Filling Members)",
      subtitle: "Filling required team members",
      count: todoProjects.length,
      projects: todoProjects,
    },
    {
      type: "doing" as const,
      title: "Doing (Members Filled)",
      subtitle: "Team filled & project started",
      count: doingProjects.length,
      projects: doingProjects,
    },
    {
      type: "done" as const,
      title: "Done (Admin Approved)",
      subtitle: "Admin approved & finished",
      count: doneProjects.length,
      projects: doneProjects,
    },
  ];

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const taskColumns = [
    {
      type: "todo" as const,
      title: "To Do",
      count: filteredTasks.filter((t) => t.status === "todo").length,
      tasks: filteredTasks.filter((t) => t.status === "todo"),
    },
    {
      type: "doing" as const,
      title: "Doing",
      count: filteredTasks.filter((t) => t.status === "doing").length,
      tasks: filteredTasks.filter((t) => t.status === "doing"),
    },
    {
      type: "done" as const,
      title: "Done",
      count: filteredTasks.filter((t) => t.status === "done").length,
      tasks: filteredTasks.filter((t) => t.status === "done"),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        background: "#F5F8FF",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#252525",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        .status-main {
          padding: 24px 48px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .status-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .status-toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .status-search-box {
          width: 220px;
          height: 34px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          box-sizing: border-box;
          border: 1px solid #BCC4CF;
          border-radius: 17px;
          background: #FFFFFF;
          color: #727272;
        }
        .kanban-board-grid {
          flex: 1;
          min-height: 460px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 8px;
        }
        @media (max-width: 960px) {
          .status-main {
            padding: 16px 12px;
          }
          .kanban-board-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .status-search-box {
            width: 100%;
            flex: 1;
            min-width: 140px;
          }
        }
      `}</style>

      <NavigationBar />

      <main className="status-main">
        {/* HEADER */}
        <div className="status-header">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "#3B9AE8",
                color: "#10283D",
              }}
            >
              <PageIcon name="clipboard" size={27} strokeWidth={2.2} />
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#1887D8",
                  fontSize: "20px",
                  lineHeight: "24px",
                  fontWeight: 700,
                }}
              >
                My Enrolled Projects Status
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#3D3D3D",
                  fontSize: "13px",
                  lineHeight: "17px",
                  fontWeight: 400,
                }}
              >
                Showing only your enrolled projects: To Do (Filling members) • Doing (Members filled & started) • Done (Admin approved)
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => navigate("/projects")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ffffff",
                color: "#2563eb",
                border: "1px solid #bfdbfe",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              All Projects Table →
            </button>
          </div>
        </div>

        {/* BOARD */}
        <div
          style={{
            width: "100%",
            flex: 1,
            minHeight: "560px",
            padding: "16px",
            boxSizing: "border-box",
            background: "#E9F1FF",
            borderRadius: "18px",
            boxShadow:
              "0 3px 6px rgba(61,83,112,.10), 0 5px 13px rgba(61,83,112,.10)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* TOOLBAR */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            {/* VIEW MODE SWITCHER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#dbeafe",
                padding: "4px",
                borderRadius: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode("projects")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  backgroundColor: viewMode === "projects" ? "#2563eb" : "transparent",
                  color: viewMode === "projects" ? "#ffffff" : "#1e40af",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                Projects Lifecycle ({filteredProjects.length})
              </button>

              <button
                type="button"
                onClick={() => setViewMode("tasks")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  backgroundColor: viewMode === "tasks" ? "#2563eb" : "transparent",
                  color: viewMode === "tasks" ? "#ffffff" : "#1e40af",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                Subtasks Board ({filteredTasks.length})
              </button>
            </div>

            <div className="status-toolbar-right">
              {/* PROJECT FILTER DROPDOWN */}
              <div
                style={{
                  height: "34px",
                  padding: "0 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "1px solid #B9C2CF",
                  borderRadius: "8px",
                  background: "#FFFFFF",
                  color: "#444444",
                  fontSize: "13px",
                }}
              >
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#333333",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <option value="">All My Projects ({projects.length})</option>
                  {projects.map((p) => (
                    <option key={p._id || p.id} value={p._id || p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SEARCH */}
              <div className="status-search-box">
                <PageIcon name="search" size={16} strokeWidth={1.8} />

                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={viewMode === "projects" ? "Search projects..." : "Search tasks..."}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#444444",
                    fontSize: "12px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* BOARD COLUMNS */}
          {loading ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              Loading from database...
            </div>
          ) : viewMode === "projects" ? (
            /* PROJECTS LIFECYCLE COLUMNS */
            <>
              {projects.length === 0 && (
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px dashed #93c5fd",
                    padding: "36px 24px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(37, 99, 235, 0.04)",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>📋</div>
                  <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px" }}>
                    No Enrolled Projects Yet
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      margin: "0 0 16px",
                      maxWidth: "460px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Your Status Page tracks projects you have joined. Explore available projects to enroll and track their progress through To Do, Doing, and Done!
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/projects")}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "8px",
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      border: "none",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
                    }}
                  >
                    Browse Available Projects →
                  </button>
                </div>
              )}

              <div className="kanban-board-grid">
              {projectColumns.map((column) => {
                const colors = columnStyles[column.type];

                return (
                  <div
                    key={column.title}
                    style={{
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      padding: "14px",
                      boxSizing: "border-box",
                      borderRadius: "12px",
                      background: colors.background,
                      border: colors.border,
                    }}
                  >
                    {/* COLUMN HEADER */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 4px",
                        marginBottom: "4px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#1e293b",
                          }}
                        >
                          {column.title}
                        </div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>
                          {column.subtitle}
                        </div>
                      </div>

                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: colors.countBackground,
                          color: colors.countColor,
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {column.count}
                      </span>
                    </div>

                    {/* PROJECT CARDS */}
                    <div
                      style={{
                        flex: 1,
                        minHeight: "340px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        marginTop: "10px",
                        overflowY: "auto",
                      }}
                    >
                      {column.projects.length === 0 ? (
                        <div
                          style={{
                            padding: "36px 12px",
                            textAlign: "center",
                            color: "#8c9ba5",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          No projects in this stage
                        </div>
                      ) : (
                        column.projects.map((proj) => {
                          const pId = proj._id || proj.id;
                          const enrolled = isUserEnrolledInProject(proj);
                          const owner = isProjectOwner(proj);
                          const membersCount = Array.isArray(proj.members)
                            ? proj.members.length
                            : 0;
                          const reqMembers = proj.requiredMembers || 3;
                          const fillPct = Math.min(
                            100,
                            Math.round((membersCount / reqMembers) * 100)
                          );

                          const isLeader = Boolean(
                            currentUserId && (
                              (proj.leaderId && String(proj.leaderId) === String(currentUserId)) ||
                              (!proj.leaderId && Array.isArray(proj.members) && proj.members.length > 0 && String((proj.members[0] as any)._id || (proj.members[0] as any).id || (proj.members[0] as any).userId) === String(currentUserId))
                            )
                          );

                          return (
                            <div
                              key={pId}
                              style={{
                                padding: "14px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                boxSizing: "border-box",
                                borderRadius: "10px",
                                background: "#ffffff",
                                border: "1px solid rgba(172,184,201,.45)",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                              }}
                            >
                              {/* TITLE & PRIORITY */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "space-between",
                                  gap: "8px",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => navigate(`/view-project?id=${pId}`)}
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    padding: 0,
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                    fontWeight: 700,
                                    color: "#0f172a",
                                    textAlign: "left",
                                    cursor: "pointer",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#2563eb")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "#0f172a")
                                  }
                                >
                                  {proj.name}
                                </button>

                                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                  {isLeader && (
                                    <span
                                      style={{
                                        fontSize: "10px",
                                        fontWeight: 800,
                                        padding: "2px 6px",
                                        borderRadius: "10px",
                                        backgroundColor: "#fef3c7",
                                        color: "#b45309",
                                        border: "1px solid #fde68a",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      👑 LEADER
                                    </span>
                                  )}
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: 700,
                                      padding: "2px 6px",
                                      borderRadius: "10px",
                                      backgroundColor:
                                        proj.priority === "HIGH"
                                          ? "#fee2e2"
                                          : proj.priority === "LOW"
                                          ? "#dcfce7"
                                          : "#fef3c7",
                                      color:
                                        proj.priority === "HIGH"
                                          ? "#dc2626"
                                          : proj.priority === "LOW"
                                          ? "#15803d"
                                          : "#d97706",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {proj.priority || "MEDIUM"}
                                  </span>
                                </div>
                              </div>

                              {/* DESCRIPTION */}
                              <div
                                style={{
                                  fontSize: "12px",
                                  lineHeight: "16px",
                                  color: "#64748b",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {proj.description || "No description provided."}
                              </div>

                              {/* CAPACITY & PROGRESS BAR */}
                              <div style={{ marginTop: "4px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    color: "#475569",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <span>
                                    {membersCount} / {reqMembers} Members Enrolled
                                  </span>
                                  <span style={{ color: "#2563eb" }}>{fillPct}%</span>
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    height: "6px",
                                    backgroundColor: "#e2e8f0",
                                    borderRadius: "3px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: `${fillPct}%`,
                                      height: "100%",
                                      backgroundColor:
                                        fillPct >= 100 ? "#10b981" : "#3b82f6",
                                      borderRadius: "3px",
                                      transition: "width 0.3s ease",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* STAGE STATUS PILL */}
                              <div
                                style={{
                                  marginTop: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  fontSize: "11px",
                                }}
                              >
                                {column.type === "todo" ? (
                                  <span style={{ color: "#0284c7", fontWeight: 600 }}>
                                    Need {Math.max(0, reqMembers - membersCount)} more
                                    member{reqMembers - membersCount === 1 ? "" : "s"}
                                  </span>
                                ) : column.type === "doing" ? (
                                  proj.status === "SUBMITTED" ? (
                                    <span
                                      style={{
                                        color: "#2563eb",
                                        fontWeight: 700,
                                        backgroundColor: "#eff6ff",
                                        padding: "2px 6px",
                                        borderRadius: "4px",
                                        border: "1px solid #bfdbfe",
                                      }}
                                    >
                                      Submitted (Pending Review)
                                    </span>
                                  ) : (
                                    <span style={{ color: "#d97706", fontWeight: 600 }}>
                                      Team Filled • In Progress
                                    </span>
                                  )
                                ) : (
                                  <span
                                    style={{
                                      color: "#059669",
                                      fontWeight: 700,
                                      backgroundColor: "#ecfdf5",
                                      padding: "2px 6px",
                                      borderRadius: "4px",
                                      border: "1px solid #a7f3d0",
                                    }}
                                  >
                                    Admin Approved ✓
                                  </span>
                                )}

                                <span style={{ color: "#94a3b8" }}>
                                  {proj.dueDate
                                    ? formatDate(proj.dueDate)
                                    : "No deadline"}
                                </span>
                              </div>

                              {/* ACTIONS */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginTop: "6px",
                                  paddingTop: "8px",
                                  borderTop: "1px solid #f1f5f9",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => navigate(`/view-project?id=${pId}`)}
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: "#2563eb",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    cursor: "pointer",
                                    padding: "2px 4px",
                                  }}
                                >
                                  View Project →
                                </button>

                                {column.type === "todo" && (
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span
                                      style={{
                                        fontSize: "11px",
                                        color: "#16a34a",
                                        fontWeight: 700,
                                        backgroundColor: "#dcfce7",
                                        padding: "3px 8px",
                                        borderRadius: "6px",
                                      }}
                                    >
                                      Enrolled ✓
                                    </span>
                                    {!owner && (
                                      <button
                                        type="button"
                                        disabled={actionLoading === pId}
                                        onClick={() => handleProjectUnenroll(pId)}
                                        style={{
                                          fontSize: "11px",
                                          fontWeight: 600,
                                          color: "#dc2626",
                                          backgroundColor: "#fee2e2",
                                          border: "1px solid #fecaca",
                                          borderRadius: "6px",
                                          padding: "3px 8px",
                                          cursor: actionLoading === pId ? "not-allowed" : "pointer",
                                        }}
                                        title="Unenroll from this project"
                                      >
                                        {actionLoading === pId ? "..." : "Unenroll"}
                                      </button>
                                    )}
                                  </div>
                                )}

                                {column.type === "doing" && (
                                  proj.status === "SUBMITTED" ? (
                                    <span
                                      style={{
                                        fontSize: "11px",
                                        color: "#ea580c",
                                        fontWeight: 700,
                                        backgroundColor: "#ffedd5",
                                        padding: "3px 8px",
                                        borderRadius: "6px",
                                        border: "1px solid #fed7aa",
                                      }}
                                    >
                                      Awaiting Admin Review
                                    </span>
                                  ) : (
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                      {!owner && (
                                        <button
                                          type="button"
                                          disabled={actionLoading === pId}
                                          onClick={() => handleProjectUnenroll(pId)}
                                          style={{
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: "#64748b",
                                            backgroundColor: "#f1f5f9",
                                            border: "1px solid #cbd5e1",
                                            borderRadius: "6px",
                                            padding: "3px 8px",
                                            cursor: actionLoading === pId ? "not-allowed" : "pointer",
                                          }}
                                          title="Unenroll from this project"
                                        >
                                          {actionLoading === pId ? "..." : "Unenroll"}
                                        </button>
                                      )}
                                      {isLeader ? (
                                        <button
                                          type="button"
                                          disabled={actionLoading === pId}
                                          onClick={() => handleProjectSubmit(pId)}
                                          style={{
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            color: "#ffffff",
                                            backgroundColor: "#16a34a",
                                            border: "none",
                                            borderRadius: "6px",
                                            padding: "4px 10px",
                                            cursor: actionLoading === pId ? "not-allowed" : "pointer",
                                            boxShadow: "0 1px 3px rgba(22, 163, 74, 0.2)",
                                          }}
                                        >
                                          {actionLoading === pId ? "Submitting..." : "Submit Project"}
                                        </button>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: "#64748b",
                                            backgroundColor: "#f8fafc",
                                            padding: "3px 8px",
                                            borderRadius: "6px",
                                            border: "1px solid #e2e8f0",
                                          }}
                                          title="Only the project leader has the authority to submit this project"
                                        >
                                          Leader submits
                                        </span>
                                      )}
                                    </div>
                                  )
                                )}

                                {column.type === "done" && (
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      color: "#15803d",
                                      fontWeight: 700,
                                      backgroundColor: "#dcfce7",
                                      padding: "3px 8px",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    Admin Approved ✓
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
              </div>
            </>
          ) : (
            /* SUBTASKS COLUMNS (LEGACY KANBAN) */
            <div className="kanban-board-grid">
              {taskColumns.map((column) => {
                const colors = columnStyles[column.type];

                return (
                  <div
                    key={column.title}
                    style={{
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      padding: "12px",
                      boxSizing: "border-box",
                      borderRadius: "10px",
                      background: colors.background,
                      border: colors.border,
                    }}
                  >
                    {/* COLUMN HEADER */}
                    <div
                      style={{
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#242424",
                        }}
                      >
                        {column.title}
                      </span>

                      <span
                        style={{
                          width: "26px",
                          height: "26px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: colors.countBackground,
                          color: colors.countColor,
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {column.count}
                      </span>
                    </div>

                    {/* TASKS */}
                    <div
                      style={{
                        flex: 1,
                        minHeight: "340px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        overflowY: "auto",
                      }}
                    >
                      {column.tasks.length === 0 ? (
                        <div
                          style={{
                            padding: "24px 12px",
                            textAlign: "center",
                            color: "#8c9ba5",
                            fontSize: "12px",
                          }}
                        >
                          No tasks in this column
                        </div>
                      ) : (
                        column.tasks.map((task) => (
                          <div
                            key={task.id}
                            style={{
                              padding: "12px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                              boxSizing: "border-box",
                              borderRadius: "8px",
                              background: "rgba(255,255,255,.92)",
                              border: "1px solid rgba(172,184,201,.52)",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                gap: "6px",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "13px",
                                  lineHeight: "16px",
                                  fontWeight: 700,
                                  color: "#292929",
                                }}
                              >
                                {task.title}
                              </div>

                              <select
                                value={task.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    task.id,
                                    e.target.value as "todo" | "doing" | "done"
                                  )
                                }
                                style={{
                                  fontSize: "11px",
                                  padding: "2px 4px",
                                  borderRadius: "4px",
                                  border: "1px solid #bfdbfe",
                                  background: "#ffffff",
                                  color: "#1e40af",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                }}
                                title="Change status"
                              >
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                              </select>
                            </div>

                            <div
                              style={{
                                fontSize: "11px",
                                lineHeight: "14px",
                                color: "#64748b",
                                fontWeight: 500,
                              }}
                            >
                              {task.subtitle}
                            </div>

                            <div
                              style={{
                                marginTop: "6px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                fontSize: "11px",
                                color: "#8B8B8B",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <PageIcon
                                  name="calendar"
                                  size={12}
                                  strokeWidth={1.6}
                                />
                                <span>{task.date}</span>
                              </div>

                              <div style={{ display: "flex", gap: "4px" }}>
                                {task.status !== "todo" && (
                                  <button
                                    onClick={() =>
                                      handleStatusChange(task.id, "todo")
                                    }
                                    style={{
                                      fontSize: "10px",
                                      padding: "2px 5px",
                                      borderRadius: "4px",
                                      border: "1px solid #bfdbfe",
                                      background: "#eff6ff",
                                      color: "#1d4ed8",
                                      cursor: "pointer",
                                    }}
                                    title="Move to To Do"
                                  >
                                    ← To Do
                                  </button>
                                )}
                                {task.status !== "doing" && (
                                  <button
                                    onClick={() =>
                                      handleStatusChange(task.id, "doing")
                                    }
                                    style={{
                                      fontSize: "10px",
                                      padding: "2px 5px",
                                      borderRadius: "4px",
                                      border: "1px solid #fde047",
                                      background: "#fefce8",
                                      color: "#854d0e",
                                      cursor: "pointer",
                                    }}
                                    title="Move to Doing"
                                  >
                                    Doing
                                  </button>
                                )}
                                {task.status !== "done" && (
                                  <button
                                    onClick={() =>
                                      handleStatusChange(task.id, "done")
                                    }
                                    style={{
                                      fontSize: "10px",
                                      padding: "2px 5px",
                                      borderRadius: "4px",
                                      border: "1px solid #86efac",
                                      background: "#f0fdf4",
                                      color: "#15803d",
                                      cursor: "pointer",
                                    }}
                                    title="Move to Done"
                                  >
                                    Done ✓
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* ADD TASK */}
                    <button
                      onClick={() => handleAddTask(column.type)}
                      style={{
                        width: "100%",
                        height: "34px",
                        marginTop: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                        borderRadius: "6px",
                        border: `1px solid ${colors.buttonBorder}`,
                        background: "rgba(255,255,255,.5)",
                        color: "#2F95E6",
                        fontSize: "12px",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      <PageIcon name="plus" size={16} strokeWidth={1.8} />
                      <span>Add task</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TaskStatusPage;
