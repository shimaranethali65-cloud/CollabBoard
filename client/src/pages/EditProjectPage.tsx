import React, { useState } from "react";

export default function EditProjectPage() {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("High");
  const [selectedMember, setSelectedMember] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ projectTitle, description, dueDate, status, priority, selectedMember });
    alert("Project changes saved successfully!");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "'Inter', sans-serif", color: "#1e293b" }}>
      
      {/* --- TOP NAVBAR --- */}
      <header style={{ 
        height: "64px", 
        borderBottom: "1px solid #e2e8f0", 
        padding: "0 48px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        backgroundColor: "#ffffff"
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
            color: "#3b82f6", 
            fontWeight: "bold",
            fontSize: "18px"
          }}>
            ✓
          </div>
          <span style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>CollabBoard</span>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <a href="#dashboard" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "16px" }}>Dashboard</a>
          <a href="#projects" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "16px" }}>Projects</a>
          <a href="#members" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "16px" }}>Members</a>
          <a href="#tasks" style={{ textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "16px" }}>Tasks</a>
        </nav>

        {/* Profile Avatar */}
        <div style={{ 
          width: "38px", 
          height: "38px", 
          borderRadius: "50%", 
          backgroundColor: "#000000", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          color: "#ffffff", 
          fontSize: "18px",
          cursor: "pointer"
        }}>
          👤
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px", position: "relative" }}>
        
        {/* Header Title with Icon */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "32px" }}>
          <div style={{ 
            width: "56px", 
            height: "56px", 
            border: "3px solid #1e293b", 
            borderRadius: "14px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontSize: "28px"
          }}>
            ✏️
          </div>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 4px 0", color: "#0f172a" }}>
              <span style={{ color: "#3b82f6" }}>Edit</span> Project
            </h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: "15px" }}>
              Update your project details and keep everything organized.
            </p>
          </div>
        </div>

        {/* Body Layout: Left Decoration, Center Form, Right Illustration Placeholder */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Left Decorative Image Vector */}
          <div style={{ width: "220px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ 
              width: "180px", 
              height: "220px", 
              backgroundColor: "#eff6ff", 
              borderRadius: "16px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: "60px" 
            }}>
              🪴
            </div>
          </div>

          {/* Center Form Container */}
          <form onSubmit={handleSave} style={{ 
            backgroundColor: "#edf4ff", 
            width: "520px", 
            borderRadius: "16px", 
            padding: "32px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "18px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)"
          }}>
            
            {/* Project Title */}
            <div>
              <label style={labelStyle}>Project Title</label>
              <input 
                type="text" 
                placeholder="Enter project title" 
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                style={inputStyle} 
              />
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description</label>
              <textarea 
                rows={3} 
                placeholder="Enter project description...." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, resize: "none" }} 
              />
            </div>

            {/* Due Date & Status (Row) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Due Date</label>
                <div style={{ position: "relative" }}>
                  <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: "36px" }} 
                  />
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.5, fontSize: "14px" }}>📅</span>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)} 
                  style={inputStyle}
                >
                  <option value="To do">To do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Priority Status */}
            <div>
              <label style={labelStyle}>Priority Status</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)} 
                style={{ ...inputStyle, width: "50%" }}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Project Members */}
            <div>
              <label style={labelStyle}>Project Members</label>
              <div style={{ position: "relative" }}>
                <select 
                  value={selectedMember} 
                  onChange={(e) => setSelectedMember(e.target.value)} 
                  style={{ ...inputStyle, paddingLeft: "36px" }}
                >
                  <option value="">Select team members</option>
                  <option value="dinithi">Dinithi Ranathunga</option>
                  <option value="pasindu">Pasindu Perera</option>
                  <option value="nethmi">Nethmi Silva</option>
                </select>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.5, fontSize: "14px" }}>👤</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <button type="button" style={{ 
                flex: 1, 
                padding: "10px", 
                borderRadius: "8px", 
                border: "none", 
                backgroundColor: "#cbd5e1", 
                color: "#1e293b", 
                fontWeight: "600", 
                cursor: "pointer" 
              }}>
                Cancel
              </button>
              <button type="submit" style={{ 
                flex: 1, 
                padding: "10px", 
                borderRadius: "8px", 
                border: "none", 
                backgroundColor: "#3b82f6", 
                color: "#ffffff", 
                fontWeight: "600", 
                cursor: "pointer" 
              }}>
                + Save changes
              </button>
            </div>

          </form>

          {/* Right Decorative Image Vector */}
          <div style={{ width: "240px", display: "flex", justifyContent: "center" }}>
            <div style={{ 
              width: "220px", 
              height: "260px", 
              backgroundColor: "#f1f5f9", 
              borderRadius: "20px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: "70px" 
            }}>
              💻
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

// Inline Styles for Form Inputs
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#1e293b",
  marginBottom: "6px"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ffffff",
  backgroundColor: "#ffffff",
  fontSize: "14px",
  outline: "none",
  color: "#334155",
  boxSizing: "border-box"
};