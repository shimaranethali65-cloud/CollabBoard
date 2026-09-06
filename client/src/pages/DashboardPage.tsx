import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { getDashboardStats } from "../services/dashboardService";
import type { DashboardStats } from "../types";
import { formatDate, statusLabel } from "../types";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch((err) => console.error("Could not load dashboard stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const totalProjects = stats?.totalProjects ?? 0;
  const totalTasks = stats?.totalTasks ?? 0;
  const inProgress = stats?.inProgressTasks ?? 0;
  const completed = stats?.completedTasks ?? 0;
  const todo = stats?.todoTasks ?? 0;

  const totalCalc = todo + inProgress + completed;
  const todoPct = totalCalc > 0 ? Math.round((todo / totalCalc) * 100) : 0;
  const inProgPct = totalCalc > 0 ? Math.round((inProgress / totalCalc) * 100) : 0;
  const compPct = totalCalc > 0 ? Math.max(0, 100 - todoPct - inProgPct) : 0;

  const conicTodoEnd = todoPct;
  const conicInProgEnd = todoPct + inProgPct;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif", color: "#1e293b" }}>
      <style>{`
        .dashboard-main {
          padding: 28px 48px;
        }
        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .dashboard-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        .dashboard-recent-proj-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .dashboard-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 860px) {
          .dashboard-main {
            padding: 18px 14px;
          }
          .dashboard-split-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 540px) {
          .dashboard-stats-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-recent-proj-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <NavigationBar />

      <main className="dashboard-main">
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "24px", color: "#0f172a" }}>
          Welcome To <span style={{ color: "#3b82f6" }}>Kanban!!</span>
        </h1>

        {/* METRIC CARDS */}
        <div className="dashboard-stats-grid">
          <div style={{ backgroundColor: "#edf2f7", padding: "12px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>Total Projects</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>{totalProjects}</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#edf2f7", padding: "12px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>Total Tasks</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>{totalTasks}</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#edf2f7", padding: "12px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#881337" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>In Progress</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>{inProgress}</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#edf2f7", padding: "12px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>Completed</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>{completed}</div>
            </div>
          </div>
        </div>

        {/* CHARTS AND RECENT PROJECTS */}
        <div className="dashboard-split-grid">
          {/* TASK OVERVIEW */}
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Task Overview</h2>
              <span style={{ fontSize: "13px", color: "#475569" }}>Live Breakdown</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
              <div style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: totalCalc > 0
                  ? `conic-gradient(#93c5fd 0% ${conicTodoEnd}%, #fde047 ${conicTodoEnd}% ${conicInProgEnd}%, #86efac ${conicInProgEnd}% 100%)`
                  : "#e2e8f0"
              }}></div>
              <div style={{ fontSize: "13px", fontWeight: "bold", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#93c5fd" }}></span>
                  <span>To do</span>
                  <span style={{ color: "#0f172a" }}>{todo} ({todoPct}%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#fde047" }}></span>
                  <span>In Progress</span>
                  <span style={{ color: "#0f172a" }}>{inProgress} ({inProgPct}%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#86efac" }}></span>
                  <span>Completed</span>
                  <span style={{ color: "#0f172a" }}>{completed} ({compPct}%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT PROJECTS */}
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Projects</h2>
              <Link to="/projects" style={{ fontSize: "14px", color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}>View all</Link>
            </div>

            <div className="dashboard-recent-proj-grid">
              {stats?.recentProjects && stats.recentProjects.length > 0 ? (
                stats.recentProjects.slice(0, 2).map((project) => (
                  <div
                    key={project._id || project.id}
                    onClick={() => navigate(`/view-project?id=${project._id || project.id}`)}
                    style={{
                      backgroundColor: "#f0fdf4",
                      border: "1px solid #f1f5f9",
                      padding: "12px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      <span style={{ color: "#64748b" }}>⋮</span>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {project.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {project.description || "Project"}
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                      <div style={{ flex: 1, height: "6px", backgroundColor: "#cbd5e1", borderRadius: "3px" }}>
                        <div style={{ width: `${project.progress || (project.status === "COMPLETED" ? 100 : project.status === "IN_PROGRESS" ? 50 : 15)}%`, height: "100%", backgroundColor: "#3b82f6", borderRadius: "3px" }}></div>
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: "bold" }}>
                        {project.progress || (project.status === "COMPLETED" ? 100 : project.status === "IN_PROGRESS" ? 50 : 15)}%
                      </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#38bdf8", border: "1.5px solid #fff" }}></div>
                        <span style={{ fontSize: "9px", color: "#64748b", marginLeft: "4px" }}>
                          +{project.members?.length || 1}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: "bold" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {formatDate(project.dueDate)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", padding: "20px", textAlign: "center", color: "#64748b", fontSize: "13px" }}>
                  No recent projects found in database.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RECENT TASKS TABLE */}
        <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Recent Tasks</h2>
            <Link to="/task-status" style={{ fontSize: "14px", color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}>View all Tasks</Link>
          </div>

          <div className="responsive-table-wrapper">
            <table style={{ width: "100%", minWidth: "620px", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ backgroundColor: "#dbeafe", color: "#1e3a8a", fontWeight: "bold" }}>
                  <th style={{ padding: "12px 16px", borderRadius: "6px 0 0 6px" }}>Task</th>
                  <th style={{ padding: "12px 16px" }}>Project</th>
                  <th style={{ padding: "12px 16px", textAlign: "center" }}>Status</th>
                  <th style={{ padding: "12px 16px" }}>Due Date</th>
                  <th style={{ padding: "12px 16px", borderRadius: "0 6px 6px 0" }}></th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentTasks && stats.recentTasks.length > 0 ? (
                  stats.recentTasks.map((task) => {
                    const upper = (task.status || "TODO").toUpperCase();
                    const isDone = upper === "DONE" || upper === "COMPLETED";
                    const isInProg = upper === "IN_PROGRESS" || upper === "DOING";

                    const badgeBg = isDone ? "#86efac" : isInProg ? "#fef08a" : "#93c5fd";

                    return (
                      <tr
                        key={task._id}
                        onClick={() => navigate("/task-status")}
                        style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                      >
                        <td style={{ padding: "12px 16px", fontWeight: "600" }}>{task.title}</td>
                        <td style={{ padding: "12px 16px", color: "#475569" }}>
                          {typeof task.project === "object" && task.project !== null
                            ? task.project.name
                            : task.description || "General"}
                        </td>
                        <td style={{ padding: "12px 16px", textAlign: "center" }}>
                          <span
                            style={{
                              backgroundColor: badgeBg,
                              color: "#0f172a",
                              padding: "4px 16px",
                              borderRadius: "6px",
                              fontWeight: "bold",
                              fontSize: "13px",
                            }}
                          >
                            {statusLabel(task.status)}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", color: "#0f172a", fontWeight: "500" }}>
                          {formatDate(task.dueDate || task.createdAt)}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#64748b" }}>⋮</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} style={{ padding: "24px 16px", textAlign: "center", color: "#64748b" }}>
                      {loading ? "Loading tasks from database..." : "No tasks found in database."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}