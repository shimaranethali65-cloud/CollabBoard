import { useState, type CSSProperties, type FormEvent } from "react";
import leftArtwork from "../assets/registerpageleftimg.png";
import rightArtwork from "../assets/registerpagerightimg.png";

const fieldStyle: CSSProperties = {
  width: "100%",
  height: 32,
  boxSizing: "border-box",
  marginTop: 8,
  padding: "0 14px",
  border: "none",
  borderRadius: 10,
  outline: "none",
  backgroundColor: "#ffffff",
  color: "#6b7280",
  fontSize: 14,
  fontFamily: "Arial, Helvetica, sans-serif",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: 10,
  color: "#111827",
  fontSize: 14,
  fontWeight: 700,
};

function EditProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("High");
  const [member, setMember] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a project title.");
      return;
    }

    alert("Project changes saved successfully!");
  };

  const navigationLink: CSSProperties = {
    color: "#111111",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <header
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          boxSizing: "border-box",
          borderTop: "4px solid #292929",
          borderBottom: "2px solid #e5e5e5",
          backgroundColor: "#fafafa",
        }}
      >
        <a
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#111111",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              display: "grid",
              width: 25,
              height: 25,
              placeItems: "center",
              borderRadius: 4,
              backgroundColor: "#9ad7f5",
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            ✓
          </span>
          <strong style={{ fontSize: 15 }}>CollabBoard</strong>
        </a>

        <nav style={{ display: "flex", alignItems: "center", gap: 42 }}>
          <a href="/dashboard" style={navigationLink}>
            Dashboard
          </a>

          <a href="/projects" style={navigationLink}>
            All Projects
          </a>

          <a href="/my-projects" style={navigationLink}>
            My Projects
          </a>

          <a href="/create-project" style={navigationLink}>
            Create Project
          </a>

          <a href="/task-status" style={navigationLink}>
            My Status
          </a>

          <a
            href="/profile"
            aria-label="Profile"
            style={{
              display: "grid",
              width: 25,
              height: 25,
              placeItems: "center",
              borderRadius: "50%",
              backgroundColor: "#111111",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="#ffffff" />
              <path
                d="M4.5 21c.8-4 3.4-6.2 7.5-6.2s6.7 2.2 7.5 6.2"
                fill="#ffffff"
              />
            </svg>
          </a>
        </nav>
      </header>

      <section
        style={{
          position: "relative",
          minHeight: "calc(100vh - 44px)",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src={leftArtwork}
          alt=""
          style={{
            position: "absolute",
            top: 181,
            left: 0,
            width: 151,
            opacity: 0.85,
          }}
        />

        <img
          src={rightArtwork}
          alt=""
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 123,
            opacity: 0.85,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: 680,
            margin: "32px auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              marginBottom: 23,
              marginLeft: -89,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 60,
                height: 60,
                boxSizing: "border-box",
                border: "7px solid #202020",
                borderRadius: 10,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -18,
                  left: 19,
                  color: "#202020",
                  fontSize: 62,
                  fontWeight: 700,
                  transform: "rotate(-45deg)",
                }}
              >
                ✎
              </span>
            </div>

            <div>
              <h1 style={{ margin: 0, fontSize: 29 }}>
                <span style={{ color: "#3798df" }}>Edit</span> Project
              </h1>

              <p style={{ margin: "2px 0 0", fontSize: 18 }}>
                Update your project details and keep everything organized.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              width: 506,
              margin: "0 auto",
              padding: "18px 30px",
              boxSizing: "border-box",
              borderRadius: 10,
              backgroundColor: "#eaf1ff",
            }}
          >
            <label style={labelStyle}>
              Project Title
              <input
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter project title"
                style={fieldStyle}
              />
            </label>

            <label style={labelStyle}>
              Description
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Enter project description...."
                style={{
                  ...fieldStyle,
                  height: 74,
                  paddingTop: 12,
                  resize: "none",
                }}
              />
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 30,
              }}
            >
              <label style={labelStyle}>
                Due Date
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  style={fieldStyle}
                />
              </label>

              <label style={labelStyle}>
                Status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  style={fieldStyle}
                >
                  <option>To do</option>
                  <option>In progress</option>
                  <option>Done</option>
                </select>
              </label>
            </div>

            <label style={{ ...labelStyle, width: 167 }}>
              Priority Status
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                style={fieldStyle}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>

            <label style={labelStyle}>
              Project Members
              <select
                value={member}
                onChange={(event) => setMember(event.target.value)}
                style={fieldStyle}
              >
                <option value="">Select team members</option>
                <option>Sathish</option>
                <option>Alex</option>
                <option>Sarah</option>
              </select>
            </label>

            <div style={{ display: "flex", gap: 41, marginTop: 5 }}>
              <button
                type="button"
                onClick={() => window.history.back()}
                style={{
                  width: 124,
                  height: 30,
                  border: "none",
                  borderRadius: 10,
                  backgroundColor: "#c9cbd1",
                  color: "#111827",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  width: 164,
                  height: 30,
                  border: "none",
                  borderRadius: 10,
                  backgroundColor: "#399be0",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                + Save changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default EditProjectPage;