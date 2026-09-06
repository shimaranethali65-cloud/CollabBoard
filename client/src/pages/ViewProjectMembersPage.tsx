import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { getProjectMembers, addProjectMember, changeProjectLeader } from "../services/projectService";
import { searchUsers } from "../services/userService";
import { useAuth } from "../context/AuthContext";

interface MemberItem {
  id: string;
  name: string;
  role: string;
  email: string;
  isLeader?: boolean;
}

export default function ProjectMembersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("id");
  const { user } = useAuth();
  const currentUserId = user?._id || (user as any)?.id;

  const [members, setMembers] = useState<MemberItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadMembers = async () => {
    setLoading(true);
    if (projectId) {
      try {
        const data = await getProjectMembers(projectId);
        if (Array.isArray(data) && data.length > 0) {
          const mapped: MemberItem[] = data.map((m: any, idx: number) => ({
            id: m._id || m.id || m.userId || String(idx + 1),
            name: m.name || m.user?.name || m.user?.username || "Project Member",
            role: m.role || (m.isLeader ? "LEADER" : "MEMBER"),
            email: m.email || m.user?.email || "member@collabboard.dev",
            isLeader: Boolean(m.isLeader || m.role === "LEADER"),
          }));
          setMembers(mapped);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.warn("Could not load project members:", err);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const users = await searchUsers("");
        if (Array.isArray(users) && users.length > 0) {
          const mapped: MemberItem[] = users.map((u, idx) => ({
            id: u._id || String(idx + 1),
            name: u.name || u.username,
            role: "Team Member",
            email: u.email,
            isLeader: false,
          }));
          setMembers(mapped);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.warn("Could not load system users:", err);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadMembers();
  }, [projectId]);

  const isCurrentLeader = Boolean(
    currentUserId && members.some((m) => m.id === currentUserId && (m.role === "LEADER" || m.isLeader))
  );

  const handleTransferLeadership = async (targetMember: MemberItem) => {
    if (!projectId) return;
    const confirmTransfer = window.confirm(
      `Are you sure you want to transfer project leadership to ${targetMember.name}? Only the leader can submit the project or transfer leadership.`
    );
    if (!confirmTransfer) return;

    try {
      await changeProjectLeader(projectId, targetMember.id);
      alert(`Project leadership transferred to ${targetMember.name}!`);
      await loadMembers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to transfer leadership");
    }
  };

  const handleAddMember = async () => {
    const name = window.prompt("Enter member full name:");
    if (!name || !name.trim()) return;
    const role = window.prompt("Enter member role (e.g. Developer, Designer, QA):") || "Developer";
    const email = window.prompt("Enter member email:") || `${name.toLowerCase().replace(/\s+/g, "")}@pro.com`;

    const newMember: MemberItem = {
      id: Date.now().toString(),
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
    };

    setMembers((prev) => [newMember, ...prev]);

    if (projectId) {
      try {
        await addProjectMember(projectId, newMember.id);
      } catch (e) {
        // Local state updated as fallback
      }
    }
  };

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(members.length / pageSize));
  const currentMembers = members.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        fontFamily: "sans-serif",
        color: "#1e293b",
      }}
    >
      <style>{`
        .members-main {
          padding: 32px 48px;
        }
        .members-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .members-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          gap: 12px;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .members-main {
            padding: 18px 14px;
          }
        }
      `}</style>

      <NavigationBar />

      <main className="members-main">
        <div className="members-top-bar">
          <Link
            to={projectId ? `/view-project?id=${projectId}` : "/dashboard"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#475569",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {projectId ? "Back to Project" : "Back to Dashboard"}
          </Link>

          <button
            onClick={handleAddMember}
            style={{
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            Add Member
          </button>
        </div>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#0f172a",
            margin: "0 0 4px 0",
          }}
        >
          Project Members
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 24px 0" }}>
          Manage and view all members who are part of this project
        </p>

        {loading ? (
          <p style={{ color: "#64748b" }}>Loading members...</p>
        ) : (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <div className="responsive-table-wrapper">
              <table
                style={{
                  width: "100%",
                  minWidth: "620px",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                  >
                    <th style={{ padding: "14px 20px" }}>Member</th>
                    <th style={{ padding: "14px 20px" }}>Role</th>
                    <th style={{ padding: "14px 20px" }}>Email</th>
                    <th style={{ padding: "14px 20px", textAlign: "right" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentMembers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: "24px",
                          textAlign: "center",
                          color: "#64748b",
                        }}
                      >
                        {loading ? "Loading members from database..." : "No members found in database."}
                      </td>
                    </tr>
                  ) : (
                    currentMembers.map((member) => (
                    <tr
                      key={member.id}
                      style={{ borderBottom: "1px solid #f1f5f9" }}
                    >
                      <td
                        style={{
                          padding: "16px 20px",
                          fontWeight: "bold",
                          color: "#0f172a",
                        }}
                      >
                        {member.name}
                      </td>
                      <td
                        style={{
                          padding: "16px 20px",
                          fontWeight: "bold",
                          color: "#0f172a",
                        }}
                      >
                        {member.role === "LEADER" || member.isLeader ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              backgroundColor: "#fef3c7",
                              color: "#b45309",
                              border: "1px solid #fde68a",
                              padding: "4px 10px",
                              borderRadius: "9999px",
                              fontSize: "12px",
                              fontWeight: "800",
                              letterSpacing: "0.5px",
                            }}
                          >
                            👑 LEADER
                          </span>
                        ) : (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              backgroundColor: "#f1f5f9",
                              color: "#475569",
                              border: "1px solid #e2e8f0",
                              padding: "4px 10px",
                              borderRadius: "9999px",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {member.role || "MEMBER"}
                          </span>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "16px 20px",
                          fontWeight: "bold",
                          color: "#0f172a",
                        }}
                      >
                        {member.email}
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        {projectId && isCurrentLeader && member.id !== currentUserId && (
                          <button
                            onClick={() => handleTransferLeadership(member)}
                            title="Transfer project leadership to this member"
                            style={{
                              backgroundColor: "#fffbeb",
                              color: "#b45309",
                              border: "1px solid #fde68a",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontWeight: "bold",
                              fontSize: "12px",
                              cursor: "pointer",
                              marginRight: "8px",
                            }}
                          >
                            👑 Make Leader
                          </button>
                        )}
                        <button
                          onClick={() => navigate("/profile")}
                          style={{
                            backgroundColor: "#dbeafe",
                            color: "#2563eb",
                            border: "1px solid #bfdbfe",
                            padding: "6px 14px",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            fontSize: "13px",
                            cursor: "pointer",
                            marginRight: "8px",
                          }}
                        >
                          View Profile
                        </button>
                        <span style={{ cursor: "pointer", color: "#64748b" }}>
                          ⋮
                        </span>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="members-pagination">
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            Showing {members.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
            {Math.min(currentPage * pageSize, members.length)} of {members.length}{" "}
            Members
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              style={{
                cursor: currentPage > 1 ? "pointer" : "default",
                fontSize: "16px",
                color: currentPage > 1 ? "#64748b" : "#cbd5e1",
                padding: "0 6px",
              }}
            >
              ‹
            </span>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <span
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                style={{
                  backgroundColor:
                    currentPage === idx + 1 ? "#2563eb" : "#f1f5f9",
                  color: currentPage === idx + 1 ? "#ffffff" : "#334155",
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {idx + 1}
              </span>
            ))}
            <span
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              style={{
                cursor: currentPage < totalPages ? "pointer" : "default",
                fontSize: "16px",
                color: currentPage < totalPages ? "#64748b" : "#cbd5e1",
                padding: "0 6px",
              }}
            >
              ›
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}