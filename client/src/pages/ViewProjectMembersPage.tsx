export default function ProjectMembersPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "sans-serif", color: "#1e293b" }}>
      
      {}
      <header style={{ 
        backgroundColor: "#ffffff", 
        borderBottom: "1px solid #e2e8f0", 
        padding: "12px 48px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.02)"
      }}>
        {}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ 
            width: "36px", 
            height: "36px", 
            backgroundColor: "#dbeafe", 
            borderRadius: "8px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#0f172a" }}>
            CollabBoard
          </span>
        </div>

        {}
        <nav style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <a href="#dashboard" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "15px" }}>Dashboard</a>
          <a href="#all-projects" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "15px" }}>All Projects</a>
          <a href="#my-projects" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "15px" }}>My Projects</a>
          <a href="#create-project" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "15px" }}>Create Project</a>
          <a href="#my-status" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "15px" }}>My Status</a>
        </nav>

        {}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {}
          <div style={{ position: "relative", cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span style={{ 
              position: "absolute", 
              top: "-6px", 
              right: "-6px", 
              backgroundColor: "#2563eb", 
              color: "#fff", 
              fontSize: "10px", 
              fontWeight: "bold", 
              borderRadius: "50%", 
              width: "16px", 
              height: "16px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center" 
            }}>5</span>
          </div>

          {}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#0ea5e9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a" }}>Dinithi Ran. ▾</span>
          </div>
        </div>
      </header>

      {}
      <main style={{ padding: "32px 48px" }}>
        
        {}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <a href="#back" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to DashBoard
          </a>

          <button style={{ 
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
            cursor: "pointer" 
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            Add Member
          </button>
        </div>

        {}
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px 0" }}>Project Member</h1>
        <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 24px 0" }}>Manage and view all members who are part of this project</p>

        {}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#3b82f6", color: "#ffffff", fontWeight: "bold" }}>
                <th style={{ padding: "14px 20px" }}>Member</th>
                <th style={{ padding: "14px 20px" }}>Role</th>
                <th style={{ padding: "14px 20px" }}>Email</th>
                <th style={{ padding: "14px 20px", textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Dinithi Ranathunga</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Project Manager</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>dinithiranathunga@pro.com</td>
                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                  <button style={{ backgroundColor: "#dbeafe", color: "#2563eb", border: "1px solid #bfdbfe", padding: "6px 14px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", marginRight: "8px" }}>View Profile</button>
                  <span style={{ cursor: "pointer", color: "#64748b" }}>⋮</span>
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Pasindu Perera</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Developer</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Pasinduperera@pro.com</td>
                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                  <button style={{ backgroundColor: "#dbeafe", color: "#2563eb", border: "1px solid #bfdbfe", padding: "6px 14px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", marginRight: "8px" }}>View Profile</button>
                  <span style={{ cursor: "pointer", color: "#64748b" }}>⋮</span>
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Nethmi Silva</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>UI/UX Desinger</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Nethmisilva@pro.com</td>
                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                  <button style={{ backgroundColor: "#dbeafe", color: "#2563eb", border: "1px solid #bfdbfe", padding: "6px 14px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", marginRight: "8px" }}>View Profile</button>
                  <span style={{ cursor: "pointer", color: "#64748b" }}>⋮</span>
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Tharindu Alvis</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>QA Engineer</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Tharindualvis@pro.com</td>
                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                  <button style={{ backgroundColor: "#dbeafe", color: "#2563eb", border: "1px solid #bfdbfe", padding: "6px 14px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", marginRight: "8px" }}>View Profile</button>
                  <span style={{ cursor: "pointer", color: "#64748b" }}>⋮</span>
                </td>
              </tr>

              <tr>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Kavindi Jayawardhana</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>Content Writer</td>
                <td style={{ padding: "16px 20px", fontWeight: "bold", color: "#0f172a" }}>kavindijarawaedhna@pro.com</td>
                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                  <button style={{ backgroundColor: "#dbeafe", color: "#2563eb", border: "1px solid #bfdbfe", padding: "6px 14px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", marginRight: "8px" }}>View Profile</button>
                  <span style={{ cursor: "pointer", color: "#64748b" }}>⋮</span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
          <span style={{ fontSize: "13px", color: "#64748b" }}>Showing 1 to 5 of 8 Members</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ cursor: "pointer", fontSize: "16px", color: "#64748b", padding: "0 6px" }}>‹</span>
            <span style={{ backgroundColor: "#2563eb", color: "#ffffff", width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>1</span>
            <span style={{ backgroundColor: "#f1f5f9", color: "#334155", width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>2</span>
            <span style={{ cursor: "pointer", fontSize: "16px", color: "#64748b", padding: "0 6px" }}>›</span>
          </div>
        </div>

      </main>
    </div>
  );
}