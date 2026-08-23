import React, { useState } from "react";

export default function DashboardPage() {
  // Photo 1 (topNav) හෝ Photo 2 (sidebar) අතර මාරු වීමට:
  const [layoutType, setLayoutType] = useState<"topNav" | "sidebar">("topNav");

  const members = [
    { name: "Dinithi Ranathunga", role: "Project Manager", email: "dinithiranathunga@pro.com" },
    { name: "Pasindu Perera", role: "Developer", email: "Pasinduperera@pro.com" },
    { name: "Nethmi Silva", role: "UI/UX Desinger", email: "Nethmisilva@pro.com" },
    { name: "Tharindu Alvis", role: "QA Engineer", email: "Tharindualvis@pro.com" },
    { name: "Kavindi Jayawardhana", role: "Content Writer", email: "kavindijarawaedhna@pro.com" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif", color: "#334155" }}>
      
      {/* Dynamic Layout Wrapper */}
      <div style={{ display: layoutType === "sidebar" ? "flex" : "block", minHeight: "100vh" }}>

        {/* --- PHOTO 1: LEFT SIDEBAR LAYOUT --- */}
        {layoutType === "sidebar" && (
          <aside style={{ width: "220px", backgroundColor: "#e2e8f0", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "24px", height: "24px", border: "2px solid #3b82f6", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6", fontWeight: "bold", fontSize: "14px" }}>✓</div>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b" }}>CollabBoard</span>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <NavItem icon="🏠" label="Dashboard" active />
              <NavItem icon="🎛️" label="Boards" />
              <NavItem icon="📦" label="Project" />
              <NavItem icon="☑️" label="Tasks" />
              <NavItem icon="📅" label="Calender" />
              <NavItem icon="👥" label="Member" />
              <NavItem icon="⚙️" label="Settings" />
            </nav>
          </aside>
        )}

        {/* Right / Main Container */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

          {/* --- PHOTO 2: TOP NAVIGATION BAR --- */}
          {layoutType === "topNav" ? (
            <header style={{ 
              backgroundColor: "#ffffff", 
              borderBottom: "1px solid #e2e8f0", 
              padding: "12px 40px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.03)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", backgroundColor: "#dbeafe", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontWeight: "bold", fontSize: "18px" }}>✓</div>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b" }}>CollabBoard</span>
              </div>

              <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                <a href="#dashboard" style={{ textDecoration: "none", color: "#1e293b", fontWeight: "600", fontSize: "15px" }}>Dashboard</a>
                <a href="#all-projects" style={{ textDecoration: "none", color: "#475569", fontWeight: "500", fontSize: "15px" }}>All Projects</a>
                <a href="#my-projects" style={{ textDecoration: "none", color: "#475569", fontWeight: "500", fontSize: "15px" }}>My Projects</a>
                <a href="#create-project" style={{ textDecoration: "none", color: "#475569", fontWeight: "500", fontSize: "15px" }}>Create Project</a>
                <a href="#my-status" style={{ textDecoration: "none", color: "#475569", fontWeight: "500", fontSize: "15px" }}>My Status</a>
              </nav>

              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", cursor: "pointer", fontSize: "16px" }}>👤</div>
            </header>
          ) : (
            /* Sidebar Layout Top Bar */
            <header style={{ backgroundColor: "#ffffff", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #cbd5e1" }}>
              <div style={{ fontSize: "20px", cursor: "pointer" }}>☰</div>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span style={{ cursor: "pointer", fontSize: "18px" }}>🔍</span>
                <div style={{ position: "relative", cursor: "pointer" }}>
                  <span style={{ fontSize: "20px" }}>🔔</span>
                  <span style={{ position: "absolute", top: "-6px", right: "-6px", backgroundColor: "#3b82f6", color: "#ffffff", borderRadius: "50%", padding: "2px 6px", fontSize: "10px", fontWeight: "bold" }}>5</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#60a5fa", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "14px" }}>👤</div>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>Dinithi Ran.</span>
                </div>
              </div>
            </header>
          )}

          {/* --- MAIN CONTENT AREA --- */}
          <main style={{ padding: "28px 40px", flex: 1 }}>
            
            {/* View Switcher Toggle Button */}
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: "bold", color: "#64748b" }}>Switch Layout:</span>
              <button 
                onClick={() => setLayoutType("topNav")} 
                style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: layoutType === "topNav" ? "#3b82f6" : "#ffffff", color: layoutType === "topNav" ? "#ffffff" : "#334155", cursor: "pointer", fontSize: "12px" }}>
                Top Nav (Photo 2)
              </button>
              <button 
                onClick={() => setLayoutType("sidebar")} 
                style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: layoutType === "sidebar" ? "#3b82f6" : "#ffffff", color: layoutType === "sidebar" ? "#ffffff" : "#334155", cursor: "pointer", fontSize: "12px" }}>
                Sidebar (Photo 1)
              </button>
            </div>

            {/* Dashboard Content Header */}
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#1e293b" }}>
              Welcome To <span style={{ color: "#3b82f6" }}>Kanban!!</span>
            </h1>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
              <StatCard label="Total Projects" value="5" />
              <StatCard label="Total Tasks" value="24" />
              <StatCard label="In Progress" value="8" />
              <StatCard label="Completed" value="6" />
            </div>

            {/* Members Section (From Photo 1 View) */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: "24px" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", fontWeight: "bold" }}>Project Members</div>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#3b82f6", color: "#ffffff" }}>
                    <th style={{ padding: "12px 20px" }}>Member</th>
                    <th style={{ padding: "12px 20px" }}>Role</th>
                    <th style={{ padding: "12px 20px" }}>Email</th>
                    <th style={{ padding: "12px 20px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 20px", fontWeight: "bold" }}>{m.name}</td>
                      <td style={{ padding: "12px 20px" }}>{m.role}</td>
                      <td style={{ padding: "12px 20px" }}>{m.email}</td>
                      <td style={{ padding: "12px 20px", textAlign: "center" }}>
                        <button style={{ backgroundColor: "#e0f2fe", color: "#2563eb", border: "1px solid #93c5fd", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>View Profile</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </main>
        </div>
      </div>
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

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 14px",
      borderRadius: "6px",
      backgroundColor: active ? "#3b82f6" : "transparent",
      color: active ? "#ffffff" : "#334155",
      fontWeight: active ? "bold" : "500",
      fontSize: "14px",
      cursor: "pointer"
    }}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}