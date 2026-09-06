import React from "react";

export type AdminTab = "dashboard" | "create" | "projects";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  pendingCount: number;
  totalProjects: number;
  adminName?: string;
  adminEmail?: string;
  onLogout: () => void;
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({
  activeTab,
  onTabChange,
  pendingCount,
  totalProjects,
  adminName = "Administrator",
  adminEmail = "admin@collabboard.dev",
  onLogout,
  isOpenOnMobile = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const navItems = [
    {
      id: "dashboard" as AdminTab,
      label: "Dashboard",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
      badge: pendingCount > 0 ? `${pendingCount} pending` : undefined,
      badgeColor: "#ea580c",
      badgeBg: "#ffedd5",
    },
    {
      id: "create" as AdminTab,
      label: "Create Project",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
    {
      id: "projects" as AdminTab,
      label: "View Projects",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
      badge: totalProjects > 0 ? `${totalProjects}` : undefined,
      badgeColor: "#94a3b8",
      badgeBg: "#1e293b",
    },
  ];

  const handleNavClick = (tabId: AdminTab) => {
    onTabChange(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      <style>{`
        .admin-sidebar {
          width: 260px;
          height: 100vh;
          position: sticky;
          top: 0;
          background-color: #0f172a;
          color: #f8fafc;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          box-sizing: border-box;
          border-right: 1px solid #1e293b;
          font-family: Arial, Helvetica, sans-serif;
          z-index: 50;
        }

        .sidebar-close-btn {
          display: none;
        }

        .admin-sidebar-backdrop {
          display: none;
        }

        @media (max-width: 1023px) {
          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 280px;
            z-index: 1000;
            transform: ${isOpenOnMobile ? "translateX(0)" : "translateX(-100%)"};
            transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: ${isOpenOnMobile ? "4px 0 25px rgba(0,0,0,0.6)" : "none"};
          }

          .sidebar-close-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
            margin-left: auto;
          }

          .sidebar-close-btn:hover {
            color: #ffffff;
            background-color: #1e293b;
          }

          .admin-sidebar-backdrop {
            display: ${isOpenOnMobile ? "block" : "none"};
            position: fixed;
            inset: 0;
            background-color: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(2px);
            z-index: 999;
          }
        }
      `}</style>

      {/* Backdrop for mobile */}
      <div
        className="admin-sidebar-backdrop"
        onClick={onCloseMobile}
        aria-label="Close sidebar"
      />

      <aside className="admin-sidebar">
        {/* BRAND HEADER */}
        <div
          style={{
            padding: "20px 18px",
            borderBottom: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#2563eb",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.4)",
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px", fontWeight: "bold", color: "#ffffff", letterSpacing: "-0.2px" }}>
                  CollabBoard
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    padding: "2px 7px",
                    borderRadius: "6px",
                    backgroundColor: "#7c3aed",
                    color: "#ffffff",
                  }}
                >
                  Admin Panel
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* NAVIGATION SECTION */}
        <div style={{ padding: "20px 14px", flex: 1, overflowY: "auto" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: "#64748b",
              letterSpacing: "0.8px",
              padding: "0 10px 10px",
            }}
          >
            Management Menu
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "11px 14px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: isActive ? "#2563eb" : "transparent",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  fontSize: "14px",
                  fontWeight: isActive ? "700" : "600",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s, color 0.15s",
                  boxShadow: isActive ? "0 2px 8px rgba(37, 99, 235, 0.35)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#1e293b";
                    e.currentTarget.style.color = "#f8fafc";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#94a3b8";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: isActive ? "#ffffff" : "#60a5fa" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "2px 7px",
                      borderRadius: "10px",
                      backgroundColor: isActive ? "#1e40af" : item.badgeBg,
                      color: isActive ? "#ffffff" : item.badgeColor,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* QUICK STATS WIDGET */}
        <div
          style={{
            marginTop: "28px",
            padding: "14px",
            borderRadius: "10px",
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#cbd5e1", marginBottom: "8px" }}>
            Admin Actions
          </div>
          <div style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "17px" }}>
            • Set project member capacity
            <br />
            • Review submitted projects
            <br />
            • Approve & officially complete
          </div>
        </div>
      </div>

      {/* FOOTER & PROFILE */}
      <div
        style={{
          padding: "16px 14px",
          borderTop: "1px solid #1e293b",
          backgroundColor: "#090d16",
        }}
      >
        {/* User Chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 10px",
            borderRadius: "8px",
            backgroundColor: "#1e293b",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#7c3aed",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            AD
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#f8fafc",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {adminName}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748b",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {adminEmail}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <button
            type="button"
            onClick={onLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#7f1d1d",
              color: "#fca5a5",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#991b1b")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7f1d1d")}
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}


