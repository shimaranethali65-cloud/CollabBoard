import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { getMyProjects } from "../services/projectService";
import type { Project } from "../types";

function MyProjectsPage() {
  const navigate = useNavigate();
  const [realProjects, setRealProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProjects()
      .then((data) => {
        if (Array.isArray(data)) {
          setRealProjects(data);
        }
      })
      .catch((err) => console.error("Could not load my projects:", err))
      .finally(() => setLoading(false));
  }, []);

  const projectsToDisplay = realProjects.map((p, idx) => ({
    _id: p._id || p.id || String(idx),
    icon: idx % 3 === 0 ? "📁" : idx % 3 === 1 ? "📱" : "◎",
    name: p.name,
    description: p.description,
    members: p.members || [],
    iconBackground: idx % 3 === 0 ? "#eadcf3" : idx % 3 === 1 ? "#d9f3df" : "#fff4c7",
  }));

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f7f7f7;
          color: #252b33;
        }

        /* =========================
           NAVIGATION BAR
        ========================= */

        .navbar {
          height: 60px;
          background: #ffffff;
          border-bottom: 1px solid #d8dce2;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 55px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;

          font-size: 22px;
          font-weight: 700;
        }

        .logo-icon {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #d9ebf5;
          color: #4c98c5;

          border-radius: 7px;
          font-size: 24px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 55px;
        }

        .nav-links a {
          text-decoration: none;
          color: #252b33;
          font-size: 18px;
          font-weight: 500;
        }

        .nav-links a:hover {
          color: #2f80bd;
        }

        .profile-icon {
          width: 34px;
          height: 34px;

          background: #111;
          color: white;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;
        }

        /* =========================
           PAGE
        ========================= */

        .my-projects-page {
          min-height: calc(100vh - 60px);
          background: #f7f7f7;
          padding: 55px 80px;
        }

        /* HEADER */

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-bottom: 40px;
        }

        .projects-title {
          margin: 0;
          font-size: 36px;
          font-weight: 700;
        }

        .projects-subtitle {
          margin: 5px 0 0;
          font-size: 22px;
          color: #555;
        }

        .new-project-button {
          background: #2f80bd;
          color: #ffffff;

          border: none;

          padding: 16px 30px;

          font-size: 20px;

          cursor: pointer;
        }

        .new-project-button:hover {
          background: #246da5;
        }

        /* =========================
           PROJECT LIST
        ========================= */

        .projects-container {
          width: 85%;
          margin: 0 auto;

          display: flex;
          flex-direction: column;

          gap: 25px;
        }

        /* SMALLER PROJECT CARD */

        .project-card {
          background: #e4eaf4;

          min-height: 155px;

          padding: 25px 30px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          position: relative;
        }

        .project-card:hover {
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
        }

        /* LEFT SIDE */

        .project-left {
          display: flex;
          align-items: flex-start;

          gap: 20px;
        }

        .project-icon-box {
          width: 70px;
          height: 60px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 30px;
        }

        .project-content h2 {
          margin: 0 0 8px;

          font-size: 27px;
        }

        .project-description {
          margin: 0;

          font-size: 18px;

          color: #444;

          max-width: 420px;

          line-height: 1.3;
        }

        /* MEMBERS */

        .members-row {
          display: flex;
          align-items: center;

          margin-top: 15px;
        }

        .member-circle {
          width: 34px;
          height: 34px;

          border-radius: 50%;

          background: linear-gradient(
            135deg,
            #5ac8e2,
            #2676bb
          );

          border: 2px solid #e4eaf4;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 17px;

          margin-right: -7px;
        }

        .member-count {
          margin-left: 14px;

          font-size: 18px;
        }

        /* RIGHT SIDE */

        .project-right {
          display: flex;
          align-items: center;

          gap: 40px;

          margin-right: 25px;
        }

        .more-button {
          position: absolute;

          top: 10px;
          right: 20px;

          border: none;
          background: transparent;

          font-size: 30px;

          cursor: pointer;
        }

        .view-project-button {
          background: transparent;

          border: 2px solid #222;

          border-radius: 6px;

          padding: 10px 18px;

          font-size: 19px;

          cursor: pointer;

          white-space: nowrap;
        }

        .view-project-button:hover {
          background: #d5dce7;
        }

        .arrow-button {
          font-size: 40px;
          font-weight: 300;
        }

        /* =========================
           MOBILE RESPONSIVE
        ========================= */

        @media (max-width: 900px) {

          .navbar {
            padding: 0 20px;
          }

          .nav-links {
            gap: 20px;
          }

          .nav-links a {
            font-size: 14px;
          }

          .my-projects-page {
            padding: 35px 20px;
          }

          .projects-container {
            width: 100%;
          }

          .project-card {
            flex-direction: column;

            align-items: flex-start;

            gap: 25px;
          }

          .project-right {
            width: 100%;

            justify-content: flex-end;

            margin-right: 0;
          }
        }

        @media (max-width: 650px) {
          .my-projects-page {
            padding: 20px 14px;
          }

          .projects-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 24px;
          }

          .projects-title {
            font-size: 26px;
          }

          .projects-subtitle {
            font-size: 15px;
          }

          .new-project-button {
            font-size: 14px;
            padding: 10px 16px;
            width: 100%;
            text-align: center;
          }

          .project-card {
            padding: 18px 16px;
          }

          .project-left {
            gap: 12px;
          }

          .project-icon-box {
            width: 48px;
            height: 48px;
            font-size: 22px;
          }

          .project-content h2 {
            font-size: 20px;
          }

          .project-description {
            font-size: 14px;
          }
        }
      `}</style>

      {/* =========================
          NAVIGATION BAR
      ========================= */}

      <NavigationBar />

      {/* =========================
          MAIN PAGE
      ========================= */}

      <main className="my-projects-page">

        <div className="projects-header">
          <div>
            <h1 className="projects-title">
              My Project
            </h1>

            <p className="projects-subtitle">
              projects you’ve enrolled in
            </p>
          </div>

          <button
            className="new-project-button"
            type="button"
            onClick={() => navigate("/projects")}
          >
            Browse All Projects →
          </button>
        </div>

        <div className="projects-container">
          {loading && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                color: "#64748b",
                fontSize: "18px",
              }}
            >
              Loading your projects from database...
            </div>
          )}

          {!loading && projectsToDisplay.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: "1px dashed #cbd5e1",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📁</div>
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>
                No projects enrolled yet
              </h2>
              <p style={{ fontSize: "16px", color: "#64748b", margin: "0 0 24px" }}>
                You haven't enrolled in any projects yet. Browse available projects and enroll to collaborate!
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => navigate("/projects")}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#2f80bd",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Browse Available Projects
                </button>
              </div>
            </div>
          )}

          {!loading &&
            projectsToDisplay.map((project, index) => {
              const membersCount = project.members ? project.members.length : 0;
              return (
                <div
                  className="project-card"
                  key={project._id || index}
                >
                  {/* LEFT SIDE */}
                  <div className="project-left">
                    <div
                      className="project-icon-box"
                      style={{
                        backgroundColor: project.iconBackground,
                      }}
                    >
                      {project.icon}
                    </div>

                    <div className="project-content">
                      <h2>{project.name}</h2>
                      <p className="project-description">
                        {project.description || "No project description provided."}
                      </p>

                      <div className="members-row">
                        {membersCount > 0 ? (
                          <>
                            {project.members.slice(0, 3).map((m: any, mIdx: number) => {
                              const name = typeof m === "string" ? m : m.name || m.username || "M";
                              return (
                                <div
                                  key={mIdx}
                                  className="member-circle"
                                  title={name}
                                  style={{ color: "#ffffff", fontSize: "12px", fontWeight: "bold" }}
                                >
                                  {name.charAt(0).toUpperCase()}
                                </div>
                              );
                            })}
                            <span className="member-count">
                              {membersCount} {membersCount === 1 ? "Member" : "Members"}
                            </span>
                          </>
                        ) : (
                          <span style={{ fontSize: "14px", color: "#64748b" }}>
                            0 Members
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="project-right">
                    <button
                      className="view-project-button"
                      type="button"
                      onClick={() => navigate(`/view-project?id=${project._id}`)}
                    >
                      View Project
                    </button>

                    <button
                      className="arrow-button"
                      type="button"
                      style={{ border: "none", background: "none", cursor: "pointer", font: "inherit" }}
                      onClick={() => navigate(`/view-project?id=${project._id}`)}
                    >
                      →
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

      </main>
    </>
  );
}

export default MyProjectsPage;