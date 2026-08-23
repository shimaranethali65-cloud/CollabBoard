export default function DashboardPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "sans-serif", color: "#1e293b" }}>
      
      {}
      <header style={{ 
        backgroundColor: "#ffffff", 
        borderBottom: "1px solid #e2e8f0", 
        padding: "14px 48px", 
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
          <a href="#dashboard" style={{ textDecoration: "none", color: "#0f172a", fontWeight: "bold", fontSize: "15px" }}>Dashboard</a>
          <a href="#all-projects" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "15px" }}>All Projects</a>
          <a href="#my-projects" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "15px" }}>My Projects</a>
          <a href="#create-project" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "15px" }}>Create Project</a>
          <a href="#my-status" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "15px" }}>My Status</a>
        </nav>

        {}
        <div style={{ 
          width: "38px", 
          height: "38px", 
          borderRadius: "50%", 
          backgroundColor: "#0f172a", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          cursor: "pointer"
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </header>

      {}
      <main style={{ padding: "28px 48px" }}>
        
        {}
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "24px", color: "#0f172a" }}>
          Welcome To <span style={{ color: "#3b82f6" }}>Kanban!!</span>
        </h1>

        {}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          
          <div style={{ backgroundColor: "#edf2f7", padding: "12px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>Total Projects</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>5</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#edf2f7", padding: "12px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>Total Tasks</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>24</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#edf2f7", padding: "12px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#881337" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>In Progress</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>8</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#edf2f7", padding: "12px 16px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1e293b" }}>Completed</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>6</div>
            </div>
          </div>

        </div>

        {}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
          
          {}
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Task Overview</h2>
              <span style={{ fontSize: "13px", color: "#475569", cursor: "pointer" }}>This week ▾</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
              <div style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "conic-gradient(#93c5fd 0% 41.7%, #fde047 41.7% 75%, #86efac 75% 100%)"
              }}></div>
              <div style={{ fontSize: "13px", fontWeight: "bold", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#93c5fd" }}></span>
                  <span>To do</span>
                  <span style={{ color: "#0f172a" }}>10 (41.7%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#fde047" }}></span>
                  <span>In Progress</span>
                  <span style={{ color: "#0f172a" }}>8 (33.3%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#86efac" }}></span>
                  <span>Completed</span>
                  <span style={{ color: "#0f172a" }}>6 (25.0%)</span>
                </div>
              </div>
            </div>
          </div>

          {}
          <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Projects</h2>
              <a href="#view" style={{ fontSize: "14px", color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}>View all</a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              
              {}
              <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #f1f5f9", padding: "12px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  <span style={{ cursor: "pointer", color: "#64748b" }}>⋮</span>
                </div>
                <div style={{ fontSize: "13px", fontWeight: "bold", color: "#0f172a" }}>WebSite Development</div>
                <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "12px" }}>12 Tasks</div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ flex: 1, height: "6px", backgroundColor: "#cbd5e1", borderRadius: "3px" }}>
                    <div style={{ width: "75%", height: "100%", backgroundColor: "#3b82f6", borderRadius: "3px" }}></div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: "bold" }}>75%</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#38bdf8", border: "1.5px solid #fff" }}></div>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#0284c7", border: "1.5px solid #fff", marginLeft: "-6px" }}></div>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#2563eb", border: "1.5px solid #fff", marginLeft: "-6px" }}></div>
                    <span style={{ fontSize: "9px", color: "#64748b", marginLeft: "2px" }}>+2</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: "bold" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Due: May 30,2026
                  </div>
                </div>
              </div>

              {}
              <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #f1f5f9", padding: "12px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  <span style={{ cursor: "pointer", color: "#64748b" }}>⋮</span>
                </div>
                <div style={{ fontSize: "13px", fontWeight: "bold", color: "#0f172a" }}>Mobile App</div>
                <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "12px" }}>8 Tasks</div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <div style={{ flex: 1, height: "6px", backgroundColor: "#cbd5e1", borderRadius: "3px" }}>
                    <div style={{ width: "60%", height: "100%", backgroundColor: "#0284c7", borderRadius: "3px" }}></div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: "bold" }}>60%</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#38bdf8", border: "1.5px solid #fff" }}></div>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#0284c7", border: "1.5px solid #fff", marginLeft: "-6px" }}></div>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#2563eb", border: "1.5px solid #fff", marginLeft: "-6px" }}></div>
                    <span style={{ fontSize: "9px", color: "#64748b", marginLeft: "2px" }}>+2</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: "bold" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Due: June5,2026
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {}
        <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Recent Tasks</h2>
            <a href="#tasks" style={{ fontSize: "14px", color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}>View all Tasks</a>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#dbeafe", color: "#1e3a8a", fontWeight: "bold" }}>
                <th style={{ padding: "12px 16px", borderRadius: "6px 0 0 6px" }}>Task</th>
                <th style={{ padding: "12px 16px" }}>Project</th>
                <th style={{ padding: "12px 16px", textAlign: "center" }}>Staus</th>
                <th style={{ padding: "12px 16px" }}>Due Date</th>
                <th style={{ padding: "12px 16px", borderRadius: "0 6px 6px 0" }}></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontWeight: "600" }}>Design Login Page</td>
                <td style={{ padding: "12px 16px", color: "#475569" }}>Website Development</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ backgroundColor: "#fef08a", color: "#0f172a", padding: "4px 16px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px" }}>In progress</span>
                </td>
                <td style={{ padding: "12px 16px", color: "#0f172a", fontWeight: "500" }}>Sep 5,2026</td>
                <td style={{ padding: "12px 16px", color: "#64748b", cursor: "pointer" }}>⋮</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontWeight: "600" }}>Create Database</td>
                <td style={{ padding: "12px 16px", color: "#475569" }}>Mobile App</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ backgroundColor: "#93c5fd", color: "#0f172a", padding: "4px 24px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px" }}>To do</span>
                </td>
                <td style={{ padding: "12px 16px", color: "#0f172a", fontWeight: "500" }}>Sep 10,2026</td>
                <td style={{ padding: "12px 16px", color: "#64748b", cursor: "pointer" }}>⋮</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontWeight: "600" }}>Testing</td>
                <td style={{ padding: "12px 16px", color: "#475569" }}>Website Development</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ backgroundColor: "#86efac", color: "#0f172a", padding: "4px 18px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px" }}>Completed</span>
                </td>
                <td style={{ padding: "12px 16px", color: "#0f172a", fontWeight: "500" }}>Sep 9,2026</td>
                <td style={{ padding: "12px 16px", color: "#64748b", cursor: "pointer" }}>⋮</td>
              </tr>
              <tr style={{ border: "2px solid #38bdf8", borderRadius: "6px" }}>
                <td style={{ padding: "12px 16px", fontWeight: "600" }}>Prepare UI Mockups</td>
                <td style={{ padding: "12px 16px", color: "#475569" }}>UI/UX Design</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ backgroundColor: "#fef08a", color: "#0f172a", padding: "4px 16px", borderRadius: "6px", fontWeight: "bold", fontSize: "13px" }}>In Progress</span>
                </td>
                <td style={{ padding: "12px 16px", color: "#0f172a", fontWeight: "500" }}>Sep 13,2026</td>
                <td style={{ padding: "12px 16px", color: "#64748b", cursor: "pointer" }}>⋮</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}