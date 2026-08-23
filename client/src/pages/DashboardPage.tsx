import React from "react";

export default function DashboardPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif", color: "#334155" }}>
      
      {/* Top Navigation Bar */}
      <header style={{ 
        backgroundColor: "#ffffff", 
        borderBottom: "1px solid #e2e8f0", 
        padding: "12px 40px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        boxShadow: "0px 1px 2px rgba(0,0,0,0.03)"
      }}>
        {/* Brand Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ 
            width: "32px", 
            height: "32px", 
            backgroundColor: "#dbeafe", 
            borderRadius: "8px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            color: "#2563eb",
            fontWeight: "bold",
            fontSize: "18px"
          }}>
            ✓
          </div>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b" }}>
            CollabBoard
          </span>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a href="#dashboard" style={{ textDecoration: "none", color: "#1e293b", fontWeight: "600", fontSize: "15px" }}>Dashboard</a>
          <a href="#all-projects" style={{ textDecoration: "none", color: "#475569", fontWeight: "500", fontSize: "15px" }}>All Projects</a>
          <a href="#my-projects" style={{ textDecoration: "none", color: "#475569", fontWeight: "500", fontSize: "15px" }}>My Projects</a>
          <a href="#create-project" style={{ textDecoration: "none", color: "#475569", fontWeight: "500", fontSize: "15px" }}>Create Project</a>
          <a href="#my-status" style={{ textDecoration: "none", color: "#475569", fontWeight: "500", fontSize: "15px" }}>My Status</a>
        </nav>

        {/* Profile Avatar */}
        <div style={{ 
          width: "36px", 
          height: "36px", 
          borderRadius: "50%", 
          backgroundColor: "#0f172a", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: "#ffffff",
          cursor: "pointer",
          fontSize: "16px"
        }}>
          👤
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: "28px 40px" }}>
        
        {/* Title */}
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#1e293b" }}>
          Welcome To <span style={{ color: "#3b82f6" }}>Kanban!!</span>
        </h1>

        {/* Top Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <StatCard label="Total Projects" value="5" />
          <StatCard label="Total Tasks" value="24" />
          <StatCard label="In Progress" value="8" />
          <StatCard label="Completed" value="6" />
        </div>

        {/* Middle Section */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "24px" }}>
          
          {/* Task Overview */}
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Task Overview</h3>
              <span style={{ fontSize: "12px", color: "#64748b" }}>This week ▾</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", height: "180px" }}>
              <div style={{ width: "120px", height: "120px", borderRadius: "50%", border: "12px solid #60a5fa", borderTopColor: "#fde047", borderRightColor: "#4ade80" }}></div>
              <div style={{ fontSize: "12px", lineHeight: "1.8" }}>
                <div><span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#93c5fd", marginRight: "8px" }}></span>To do: 10 (41.7%)</div>
                <div><span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#fde047", marginRight: "8px" }}></span>In Progress: 8 (33.3%)</div>
                <div><span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#4ade80", marginRight: "8px" }}></span>Completed: 6 (25.0%)</div>
              </div>
            </div>
          </div>

          {/* Small Projects Cards */}
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Projects</h3>
              <a href="#view" style={{ fontSize: "12px", color: "#3b82f6", textDecoration: "none" }}>View all</a>
            </div>

            <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
              <ProjectCard title="WebSite Development" tasks="12 Tasks" progress="75%" date="May 30, 2026" />
              <ProjectCard title="Mobile App" tasks="8 Tasks" progress="60%" date="June 5, 2026" />
            </div>
          </div>

        </div>

        {/* Recent Tasks Table */}
        <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Recent Tasks</h3>
            <a href="#tasks" style={{ fontSize: "12px", color: "#3b82f6", textDecoration: "none" }}>View all Tasks</a>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#eff6ff", color: "#1e293b" }}>
                <th style={{ padding: "10px" }}>Task</th>
                <th style={{ padding: "10px" }}>Project</th>
                <th style={{ padding: "10px" }}>Status</th>
                <th style={{ padding: "10px" }}>Due Date</th>
                <th style={{ padding: "10px" }}></th>
              </tr>
            </thead>
            <tbody>
              <TableRow task="Design Login Page" project="Website Development" status="In progress" statusBg="#fef08a" date="Sep 5, 2026" />
              <TableRow task="Create Database" project="Mobile App" status="To do" statusBg="#bfdbfe" date="Sep 10, 2026" />
              <TableRow task="Testing" project="Website Development" status="Completed" statusBg="#bbf7d0" date="Sep 9, 2026" />
              <TableRow task="Prepare UI Mockups" project="UI/UX Design" status="In Progress" statusBg="#fef08a" date="Sep 13, 2026" highlight />
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

// Subcomponents
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: "32px", height: "32px", backgroundColor: "#f1f5f9", borderRadius: "6px" }}></div>
      <div>
        <div style={{ fontSize: "11px", color: "#64748b" }}>{label}</div>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>{value}</div>
      </div>
    </div>
  );
}

function ProjectCard({ title, tasks, progress, date }: { title: string; tasks: string; progress: string; date: string }) {
  return (
    <div style={{ width: "130px", padding: "10px", backgroundColor: "#f0f9ff", border: "1px solid #e0f2fe", borderRadius: "8px", flexShrink: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <div style={{ width: "16px", height: "16px", backgroundColor: "#dbeafe", borderRadius: "3px" }}></div>
        <span style={{ color: "#94a3b8", cursor: "pointer", fontSize: "12px" }}>⋮</span>
      </div>
      <div style={{ fontSize: "11px", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
      <div style={{ fontSize: "9px", color: "#64748b", marginBottom: "8px" }}>{tasks}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
        <div style={{ width: "100%", height: "4px", backgroundColor: "#e2e8f0", borderRadius: "2px" }}>
          <div style={{ width: progress, height: "100%", backgroundColor: "#3b82f6", borderRadius: "2px" }}></div>
        </div>
        <span style={{ fontSize: "9px", fontWeight: "bold" }}>{progress}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "8px", color: "#64748b", paddingTop: "4px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", gap: "2px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#60a5fa" }}></div>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#2563eb" }}></div>
        </div>
        <span>{date}</span>
      </div>
    </div>
  );
}

function TableRow({ task, project, status, statusBg, date, highlight = false }: { task: string; project: string; status: string; statusBg: string; date: string; highlight?: boolean }) {
  return (
    <tr style={{ backgroundColor: highlight ? "#f0f9ff" : "transparent", borderBottom: "1px solid #f1f5f9" }}>
      <td style={{ padding: "10px", fontWeight: "500" }}>{task}</td>
      <td style={{ padding: "10px", color: "#64748b" }}>{project}</td>
      <td style={{ padding: "10px" }}>
        <span style={{ padding: "2px 8px", backgroundColor: statusBg, borderRadius: "4px", fontSize: "10px", fontWeight: "bold" }}>{status}</span>
      </td>
      <td style={{ padding: "10px", color: "#64748b" }}>{date}</td>
      <td style={{ padding: "10px", textAlign: "right", color: "#94a3b8" }}>⋮</td>
    </tr>
  );
}