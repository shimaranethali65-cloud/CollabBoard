import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import smmIcons from "../assets/smm-icons.jpg";
import {
  getProjectById,
  enrollInProject,
  unenrollFromProject,
  submitProject,
  changeProjectLeader,
} from "../services/projectService";
import { useAuth } from "../context/AuthContext";
import type { Project } from "../types";
import { daysLeft } from "../types";

type IconName =
  | "arrowLeft"
  | "calendar"
  | "users"
  | "user"
  | "userPlus"
  | "userMinus"
  | "check"
  | "share"
  | "send";

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
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3.5 20c.6-3.2 2.4-5 5.5-5s4.9 1.8 5.5 5M14 16c2.8-.4 4.8.9 5.5 4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21c.7-4.1 3.2-6 7.5-6s6.8 1.9 7.5 6" />
      </>
    ),
    userPlus: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M1.5 21c.7-4.1 3.2-6 7.5-6M19 8v8M15 12h8" />
      </>
    ),
    userMinus: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M1.5 21c.7-4.1 3.2-6 7.5-6M15 12h7" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </>
    ),
    send: (
      <>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
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



function ViewProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get("id");
  const [project, setProject] = useState<Project | null>(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then(setProject)
        .catch((err) => console.error("Could not load project:", err));
    }
  }, [projectId]);

  const currentUserId = user?._id || (user as any)?.id;
  const isOwner = Boolean(
    currentUserId &&
    project?.owner &&
    String(project.owner._id || (project.owner as any)?.id) === String(currentUserId)
  );

  const isEnrolled = Boolean(
    currentUserId &&
    project?.members &&
    project.members.some((m: any) => {
      const mId = typeof m === "string" ? m : m._id || m.id || m.userId;
      const mUsername = typeof m === "object" ? m.username : null;
      const mEmail = typeof m === "object" ? m.email : null;
      return (
        (mId && String(mId) === String(currentUserId)) ||
        (mUsername && user?.username && mUsername.toLowerCase() === user.username.toLowerCase()) ||
        (mEmail && user?.email && mEmail.toLowerCase() === user.email.toLowerCase())
      );
    })
  );

  const isLeader = Boolean(
    currentUserId &&
    project?.leaderId &&
    String(project.leaderId) === String(currentUserId)
  );

  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [changingLeader, setChangingLeader] = useState(false);

  const handleChangeLeader = async (newLeaderId: string, newLeaderName: string) => {
    if (!projectId) return;
    if (!window.confirm(`Transfer project leadership to ${newLeaderName}? Only the leader can submit the project or transfer leadership.`)) {
      return;
    }
    try {
      setChangingLeader(true);
      await changeProjectLeader(projectId, newLeaderId);
      alert(`Project leadership successfully transferred to ${newLeaderName}!`);
      const updated = await getProjectById(projectId);
      setProject(updated);
      setShowLeaderModal(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to change project leader");
    } finally {
      setChangingLeader(false);
    }
  };

  const handleEnroll = async () => {
    if (!projectId) {
      alert("No project selected to enroll in.");
      return;
    }
    if (user?.role === "ADMIN") {
      alert("Administrator accounts cannot enroll in projects. Please log in with a regular user account at /login to participate in projects.");
      return;
    }
    try {
      setEnrolling(true);
      await enrollInProject(projectId);
      const updated = await getProjectById(projectId);
      setProject(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to enroll");
    } finally {
      setEnrolling(false);
    }
  };

  const handleUnenroll = async () => {
    if (!projectId) {
      alert("No project selected to unenroll from.");
      return;
    }
    try {
      setEnrolling(true);
      await unenrollFromProject(projectId);
      const updated = await getProjectById(projectId);
      setProject(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to unenroll");
    } finally {
      setEnrolling(false);
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitProject = async () => {
    if (!projectId) return;
    if (!isLeader) {
      alert("Only the project leader has the authority to submit the project for Admin approval.");
      return;
    }
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit this project for Admin approval? Once submitted, the admin will review and mark it as officially Done."
    );
    if (!confirmSubmit) return;

    try {
      setSubmitting(true);
      await submitProject(projectId);
      alert("Project submitted successfully! It is now in the Admin panel awaiting final approval.");
      const updated = await getProjectById(projectId);
      setProject(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to submit project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .view-project-container {
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: Arial, Helvetica, sans-serif;
          color: #252525;
          display: flex;
          flex-direction: column;
          width: 100%;
          overflow-x: hidden;
        }

        .view-project-main {
          max-width: 1060px;
          width: 100%;
          margin: 0 auto;
          padding: 24px 28px 48px;
          box-sizing: border-box;
          flex: 1;
        }

        .view-project-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .view-project-card {
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(61, 83, 112, 0.06);
          padding: 32px;
          box-sizing: border-box;
        }

        .view-project-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin: 20px 0;
        }

        .view-project-members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .view-project-actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }

        .view-project-action-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .view-project-main {
            padding: 16px 14px 36px;
          }

          .view-project-card {
            padding: 20px 16px;
            border-radius: 12px;
          }

          .view-project-info-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .view-project-members-grid {
            grid-template-columns: 1fr;
          }

          .view-project-actions-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .view-project-action-group {
            width: 100%;
            flex-direction: column;
          }

          .view-project-action-group button,
          .view-project-action-group span {
            width: 100%;
            justify-content: center;
            box-sizing: border-box;
          }
        }
      `}</style>

      <div className="view-project-container">
        <NavigationBar />

        <main className="view-project-main">
          {/* NAVIGATION TOP ROW */}
          <div className="view-project-nav-row">
            <button
              onClick={() => navigate("/projects")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: "none",
                background: "transparent",
                color: "#475569",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                padding: "6px 0",
              }}
            >
              <PageIcon name="arrowLeft" size={16} strokeWidth={2} />
              <span>Back to Projects</span>
            </button>

            <button
              onClick={() => navigate("/projects")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "8px",
                backgroundColor: "#eff6ff",
                color: "#1d4ed8",
                border: "1px solid #bfdbfe",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <PageIcon name="users" size={16} strokeWidth={2} />
              <span>Browse All Projects</span>
            </button>
          </div>

          {/* MAIN PROJECT CARD */}
          <section className="view-project-card">
            {/* TITLE & DEADLINE ROW */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "14px",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: "24px",
                  lineHeight: "32px",
                  fontWeight: 800,
                  color: "#0f172a",
                }}
              >
                {project?.name || "Project Details"}
              </h1>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <PageIcon name="calendar" size={15} strokeWidth={2} />
                <span>{project?.dueDate ? daysLeft(project.dueDate) : "No deadline set"}</span>
              </div>
            </div>

            {/* STAGE LIFECYCLE BANNER */}
            <div
              style={{
                margin: "12px 0 16px",
                padding: "12px 16px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                flexWrap: "wrap",
                backgroundColor: project?.isClosed
                  ? "#fef2f2"
                  : project?.status === "DONE"
                  ? "#ecfdf5"
                  : project?.status === "SUBMITTED"
                  ? "#eff6ff"
                  : (project?.members?.length || 0) >= (project?.requiredMembers || 1)
                  ? "#fefce8"
                  : "#f0f9ff",
                border: `1px solid ${
                  project?.isClosed
                    ? "#fecaca"
                    : project?.status === "DONE"
                    ? "#a7f3d0"
                    : project?.status === "SUBMITTED"
                    ? "#bfdbfe"
                    : (project?.members?.length || 0) >= (project?.requiredMembers || 1)
                    ? "#fef08a"
                    : "#bae6fd"
                }`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span
                  style={{
                    padding: "3px 9px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 700,
                    backgroundColor: project?.isClosed
                      ? "#ef4444"
                      : project?.status === "DONE"
                      ? "#10b981"
                      : project?.status === "SUBMITTED"
                      ? "#2563eb"
                      : (project?.members?.length || 0) >= (project?.requiredMembers || 1)
                      ? "#d97706"
                      : "#0284c7",
                    color: "#ffffff",
                  }}
                >
                  {project?.isClosed
                    ? "CLOSED"
                    : project?.status === "DONE"
                    ? "DONE"
                    : project?.status === "SUBMITTED"
                    ? "SUBMITTED"
                    : (project?.members?.length || 0) >= (project?.requiredMembers || 1)
                    ? "DOING"
                    : "TO DO"}
                </span>

                <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
                  {project?.isClosed
                    ? "This project is closed by the admin."
                    : project?.status === "DONE"
                    ? "Official Status: DONE! Approved by Admin."
                    : project?.status === "SUBMITTED"
                    ? "Official Status: SUBMITTED! Waiting for Admin to review and approve."
                    : (project?.members?.length || 0) >= (project?.requiredMembers || 1)
                    ? `Official Status: DOING (Started)! Required team capacity (${project?.members?.length || 0}/${project?.requiredMembers || 3}) reached.`
                    : `Official Status: TO DO (Filling members): ${project?.members?.length || 0} of ${project?.requiredMembers || 3} members enrolled. Starts when full.`}
                </span>
              </div>

              <button
                type="button"
                onClick={handleShare}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  backgroundColor: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  color: "#334155",
                  cursor: "pointer",
                }}
                title="Copy direct link to share project"
              >
                <PageIcon name="share" size={13} strokeWidth={2} />
                <span>{copied ? "Link Copied!" : "Share Link"}</span>
              </button>
            </div>

            {/* DESCRIPTION */}
            <p
              style={{
                margin: "14px 0 20px",
                color: "#475569",
                fontSize: "15px",
                lineHeight: "24px",
              }}
            >
              {project?.description || "No project description provided."}
            </p>

            {/* INFO & TECHNOLOGIES GRID */}
            <div className="view-project-info-grid">
              {/* LEFT: SPECS */}
              <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>
                  Project Overview
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Status:</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>{project?.status || "PLANNING"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Priority:</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>{project?.priority || "MEDIUM"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Owner:</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>
                      {project?.owner?.name || project?.owner?.username || "Project Admin"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Capacity:</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>
                      {project?.requiredMembers || 3} Members
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: TECHNOLOGIES */}
              <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>
                  Tech Stack & Skills
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {(project?.technologies && project.technologies.length > 0
                    ? project.technologies
                    : ["Full Stack", "Web Development"]
                  ).map((technology) => (
                    <span
                      key={technology}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "16px",
                        background: "#dbeafe",
                        color: "#1d4ed8",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ENROLLED MEMBERS SECTION */}
            <div style={{ marginTop: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                  <PageIcon name="user" size={17} strokeWidth={2} />
                  <span>
                    Enrolled Members ({Array.isArray(project?.members) ? project.members.length : 0} / {project?.requiredMembers || 3})
                  </span>
                </div>

                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  {(project?.members?.length || 0) >= (project?.requiredMembers || 3)
                    ? "✓ Team capacity reached"
                    : `${(project?.requiredMembers || 3) - (project?.members?.length || 0)} spot(s) remaining`}
                </span>
              </div>

              {/* Member chips */}
              {Array.isArray(project?.members) && project.members.length > 0 ? (
                <div className="view-project-members-grid">
                  {project.members.map((m: any) => {
                    const mId = typeof m === "string" ? m : m._id || m.id;
                    const mName = typeof m === "string" ? m : m.name || m.username || m.email || "Member";
                    const mIsLeader = Boolean(project?.leaderId && String(project.leaderId) === String(mId));

                    return (
                      <div
                        key={mId || mName}
                        style={{
                          padding: "8px 12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                          borderRadius: "8px",
                          background: mIsLeader ? "#fef3c7" : "#f1f5f9",
                          border: mIsLeader ? "1px solid #fde68a" : "1px solid #e2e8f0",
                          color: mIsLeader ? "#92400e" : "#334155",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
                          <PageIcon name="user" size={14} strokeWidth={2} />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {mName}
                          </span>
                        </div>
                        {mIsLeader && (
                          <span
                            style={{
                              backgroundColor: "#f59e0b",
                              color: "#ffffff",
                              fontSize: "10px",
                              fontWeight: 800,
                              padding: "2px 6px",
                              borderRadius: "4px",
                              letterSpacing: "0.5px",
                              flexShrink: 0,
                            }}
                          >
                            👑 LEADER
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px dashed #cbd5e1",
                    borderRadius: "8px",
                    padding: "16px",
                    textAlign: "center",
                    color: "#64748b",
                    fontSize: "13px",
                    fontStyle: "italic",
                  }}
                >
                  No members enrolled yet. The first person to enroll is automatically designated as the Group Leader!
                </div>
              )}
            </div>

            {/* ACTION BUTTONS BAR */}
            <div className="view-project-actions-bar">
              {/* Left group */}
              <div className="view-project-action-group">
                <button
                  type="button"
                  onClick={() => navigate(projectId ? `/project-members?id=${projectId}` : "/project-members")}
                  style={{
                    height: "38px",
                    padding: "0 16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <PageIcon name="users" size={16} strokeWidth={2} />
                  <span>View Member Roster</span>
                </button>
              </div>

              {/* Right group */}
              <div className="view-project-action-group">
                {/* SUBMIT PROJECT & LEADER CONTROLS */}
                {!project?.isClosed &&
                  project?.status !== "DONE" &&
                  project?.status !== "SUBMITTED" &&
                  isLeader && (
                    <button
                      type="button"
                      disabled={changingLeader}
                      onClick={() => setShowLeaderModal(true)}
                      style={{
                        height: "38px",
                        padding: "0 14px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        border: "1px solid #f59e0b",
                        borderRadius: "8px",
                        background: "#fffbeb",
                        color: "#b45309",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                      title="Transfer project leadership to another team member"
                    >
                      <PageIcon name="user" size={15} strokeWidth={2} />
                      <span>👑 Transfer Leader</span>
                    </button>
                  )}

                {!project?.isClosed &&
                  project?.status !== "DONE" &&
                  project?.status !== "SUBMITTED" &&
                  isLeader &&
                  (project?.members?.length || 0) >= (project?.requiredMembers || 1) && (
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleSubmitProject}
                      style={{
                        height: "38px",
                        padding: "0 18px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        border: "none",
                        borderRadius: "8px",
                        background: submitting ? "#6ee7b7" : "#10b981",
                        color: "#FFFFFF",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: submitting ? "not-allowed" : "pointer",
                        boxShadow: "0 2px 6px rgba(16, 185, 129, 0.3)",
                      }}
                      title="Submit completed project to Admin for review (Leader only)"
                    >
                      <PageIcon name="send" size={15} strokeWidth={2} />
                      <span>{submitting ? "Submitting..." : "Submit Project (Leader)"}</span>
                    </button>
                  )}

                {isEnrolled && !isLeader && !project?.isClosed && project?.status !== "DONE" && (
                  <span
                    style={{
                      height: "38px",
                      padding: "0 12px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#f8fafc",
                      color: "#64748b",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                    title="Only the project leader has authority to submit the project"
                  >
                    <span>Team Member (Leader submits)</span>
                  </span>
                )}

                {/* STATUS BADGES & ENROLLMENT BUTTONS */}
                {project?.isClosed ? (
                  <span
                    style={{
                      height: "38px",
                      padding: "0 16px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      backgroundColor: "#fee2e2",
                      color: "#dc2626",
                      border: "1px solid #fca5a5",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    <span>Project Closed</span>
                  </span>
                ) : project?.status === "DONE" ? (
                  <span
                    style={{
                      height: "38px",
                      padding: "0 16px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      backgroundColor: "#ecfdf5",
                      color: "#059669",
                      border: "1px solid #6ee7b7",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    <PageIcon name="check" size={15} strokeWidth={2.5} />
                    <span>Officially Done (Approved)</span>
                  </span>
                ) : project?.status === "SUBMITTED" ? (
                  <span
                    style={{
                      height: "38px",
                      padding: "0 16px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      backgroundColor: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    <PageIcon name="check" size={15} strokeWidth={2.5} />
                    <span>Submitted (Under Review)</span>
                  </span>
                ) : user?.role === "ADMIN" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        height: "38px",
                        padding: "0 16px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        backgroundColor: "#fef3c7",
                        color: "#b45309",
                        border: "1px solid #fde68a",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                      title="Logged in as Administrator"
                    >
                      <PageIcon name="user" size={15} strokeWidth={2} />
                      <span>Admin Mode</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate("/admin")}
                      style={{
                        height: "38px",
                        padding: "0 16px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: "#0f172a",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      <span>Manage in Admin Panel →</span>
                    </button>
                  </div>
                ) : isEnrolled ? (
                  <>
                    <span
                      style={{
                        height: "38px",
                        padding: "0 16px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        backgroundColor: "#dcfce7",
                        color: "#15803d",
                        border: "1px solid #bbf7d0",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                    >
                      <PageIcon name="check" size={15} strokeWidth={2.5} />
                      <span>Enrolled</span>
                    </span>

                    <button
                      type="button"
                      disabled={enrolling}
                      onClick={handleUnenroll}
                      style={{
                        height: "38px",
                        padding: "0 18px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        border: "1px solid #fca5a5",
                        borderRadius: "8px",
                        background: enrolling ? "#fecaca" : "#fee2e2",
                        color: "#dc2626",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: enrolling ? "not-allowed" : "pointer",
                      }}
                      title="Unenroll from this project"
                    >
                      <PageIcon name="userMinus" size={17} strokeWidth={1.9} />
                      <span>{enrolling ? "Updating..." : "Unenroll"}</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    disabled={enrolling}
                    onClick={handleEnroll}
                    style={{
                      height: "38px",
                      padding: "0 22px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      border: "none",
                      borderRadius: "8px",
                      background: enrolling ? "#93c5fd" : "#2563eb",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: enrolling ? "not-allowed" : "pointer",
                      boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
                    }}
                  >
                    <PageIcon name="userPlus" size={17} strokeWidth={1.9} />
                    <span>{enrolling ? "Enrolling..." : "Enroll in Project"}</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* CHANGE LEADER MODAL */}
        {showLeaderModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: "16px",
            }}
            onClick={() => setShowLeaderModal(false)}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "24px 20px",
                borderRadius: "14px",
                width: "92vw",
                maxWidth: "420px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: 800, color: "#0f172a" }}>
                Transfer Project Leadership
              </h3>
              <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#64748b", lineHeight: 1.4 }}>
                Select an enrolled team member to transfer project leadership. Only the leader has the power to change the leader and submit the project.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "240px", overflowY: "auto", marginBottom: "20px" }}>
                {(project?.members || [])
                  .filter((m: any) => String(m._id || m.id) !== String(project?.leaderId))
                  .map((m: any) => {
                    const mId = m._id || m.id;
                    const mName = m.name || m.username || m.email || "Member";
                    return (
                      <button
                        key={mId}
                        type="button"
                        disabled={changingLeader}
                        onClick={() => handleChangeLeader(mId, mName)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          backgroundColor: "#f8fafc",
                          color: "#1e293b",
                          fontSize: "13px",
                          fontWeight: 700,
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eff6ff")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                      >
                        <span>{mName}</span>
                        <span style={{ fontSize: "12px", color: "#2563eb" }}>Make Leader →</span>
                      </button>
                    );
                  })}
                {(project?.members || []).filter((m: any) => String(m._id || m.id) !== String(project?.leaderId)).length === 0 && (
                  <p style={{ color: "#94a3b8", fontSize: "13px", fontStyle: "italic", textAlign: "center", margin: "12px 0" }}>
                    No other enrolled team members to transfer leadership to.
                  </p>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowLeaderModal(false)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#ffffff",
                    color: "#475569",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewProjectPage;
