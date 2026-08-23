import type { CSSProperties } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "All Projects", to: "/projects" },
  { label: "My Projects", to: "/my-projects" },
  { label: "Create Project", to: "/create-project" },
  { label: "My Status", to: "/task-status" },
];

function NavigationBar({ style }: { style?: CSSProperties }) {
  return (
    <header
      style={{
        height: "58px",
        padding: "0 42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(15, 23, 42, .05)",
        fontFamily: "Arial, Helvetica, sans-serif",
        ...style,
      }}
    >
      <NavLink
        to="/dashboard"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          color: "#1F2937",
          fontSize: "15px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        <span
          style={{
            width: "23px",
            height: "23px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            border: "3px solid #9BD5F5",
            borderRadius: "4px",
            color: "#5BAEDE",
          }}
        >
          ✓
        </span>
        CollabBoard
      </NavLink>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "50px",
          marginLeft: "auto",
          marginRight: "52px",
        }}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              color: isActive ? "#111827" : "#374151",
              fontSize: "14px",
              fontWeight: isActive ? 700 : 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/profile"
        aria-label="Open profile"
        style={{
          width: "22px",
          height: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#050505",
          color: "#FFFFFF",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 21c.7-4.1 3.2-6 7.5-6s6.8 1.9 7.5 6" />
        </svg>
      </NavLink>
    </header>
  );
}

export default NavigationBar;
