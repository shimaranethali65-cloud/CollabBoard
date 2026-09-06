import { useState, useRef, useEffect, type CSSProperties } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "All Projects", to: "/projects" },
  { label: "My Projects", to: "/my-projects" },
  { label: "My Status", to: "/task-status" },
];

function NavigationBar({ style }: { style?: CSSProperties }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        .collab-navbar {
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 14px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0px 1px 3px rgba(0,0,0,0.02);
          font-family: Arial, Helvetica, sans-serif;
          box-sizing: border-box;
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
        }

        .desktop-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .mobile-toggle-btn {
          display: none;
          background: none;
          border: none;
          padding: 6px;
          cursor: pointer;
          color: #334155;
          border-radius: 6px;
          align-items: center;
          justify-content: center;
        }

        .mobile-toggle-btn:hover {
          background-color: #f1f5f9;
        }

        .mobile-nav-drawer {
          display: none;
        }

        @media (max-width: 768px) {
          .collab-navbar {
            padding: 12px 16px;
          }

          .desktop-links {
            display: none;
          }

          .mobile-toggle-btn {
            display: flex;
          }

          .mobile-nav-drawer {
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            padding: 12px 16px 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            z-index: 99;
            gap: 4px;
          }
        }
      `}</style>

      <header className="collab-navbar" style={style}>
        {/* Left: Hamburger (on mobile) + Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            className="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          <NavLink
            to="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                backgroundColor: "#dbeafe",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a", whiteSpace: "nowrap" }}>
              CollabBoard
            </span>
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#0f172a" : "#334155",
                fontWeight: isActive ? "700" : "600",
                fontSize: "15px",
                borderBottom: isActive ? "2px solid #2563eb" : "2px solid transparent",
                paddingBottom: "4px",
                transition: "color 0.15s, border-color 0.15s",
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Profile & Dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            type="button"
            aria-label="User Profile"
            title={user?.name || user?.username || "Profile"}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
              padding: 0,
              flexShrink: 0,
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "44px",
                right: "0",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)",
                border: "1px solid #e2e8f0",
                minWidth: "200px",
                maxWidth: "calc(100vw - 32px)",
                overflow: "hidden",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f1f5f9",
                  backgroundColor: "#f8fafc",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#0f172a",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user?.name || user?.username || "CollabBoard User"}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginTop: "2px",
                  }}
                >
                  @{user?.username || "user"}
                </div>
              </div>

              <div style={{ padding: "6px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    border: "none",
                    backgroundColor: "transparent",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  View Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/edit-profile");
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                    border: "none",
                    backgroundColor: "transparent",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                    navigate("/login");
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#dc2626",
                    border: "none",
                    backgroundColor: "transparent",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "#2563eb" : "#334155",
                  fontWeight: isActive ? "700" : "600",
                  fontSize: "15px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#eff6ff" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                })}
              >
                <span>{link.label}</span>
                <span>›</span>
              </NavLink>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

export default NavigationBar;
