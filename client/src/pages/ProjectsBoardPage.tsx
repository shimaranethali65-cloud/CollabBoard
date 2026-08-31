import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProjectMember {
  name: string;
  email?: string;
  role?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status?: string;
  members?: ProjectMember[];
}

function ProjectsBoardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");

        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return projects;
    }

    return projects.filter((project) =>
      [
        project.name,
        project.description,
        project.status,
        ...(project.members?.map((member) => member.name) ?? []),
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))
    );
  }, [projects, searchTerm]);

  const getMemberNames = (project: Project) => {
    const names = (project.members ?? [])
      .map((member) => member.name)
      .filter((name) => name && name !== "Project Manager");

    return names.length > 0 ? names.join(", ") : "No members";
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background: #ffffff;
          color: #333333;
        }

        .projects-page {
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
        }

        .top-navbar {
          width: 100%;
          height: 58px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          background: #ffffff;
          border-bottom: 2px solid #e5e5e5;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 7px;
          min-width: 350px;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          border: 5px solid #9bd3f1;
          border-radius: 4px;
          position: relative;
          flex-shrink: 0;
        }

        .logo-icon::after {
          content: "";
          position: absolute;
          width: 15px;
          height: 8px;
          border-left: 4px solid #9bd3f1;
          border-bottom: 4px solid #9bd3f1;
          transform: rotate(-45deg);
          left: 6px;
          top: 7px;
        }

        .brand-name {
          font-size: 22px;
          font-weight: 600;
          color: #222222;
          white-space: nowrap;
        }

        .nav-links {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 27px;
        }

        .nav-link {
          border: none;
          background: transparent;
          color: #111111;
          font-size: 16px;
          padding: 8px 0;
          cursor: pointer;
          white-space: nowrap;
        }

        .nav-link.active,
        .nav-link:hover {
          color: #6bbce8;
        }

        .profile-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #000000;
          position: relative;
          flex-shrink: 0;
          margin-left: 15px;
        }

        .profile-icon::before {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          background: #ffffff;
          border-radius: 50%;
          top: 7px;
          left: 12px;
        }

        .profile-icon::after {
          content: "";
          position: absolute;
          width: 18px;
          height: 10px;
          background: #ffffff;
          border-radius: 12px 12px 7px 7px;
          bottom: 6px;
          left: 8px;
        }

        .main-content {
          width: 100%;
          padding: 29px 16px 50px;
        }

        .page-title {
          margin: 0;
          font-size: 27px;
          line-height: 34px;
          font-weight: 600;
          color: #333333;
        }

        .page-subtitle {
          margin: 3px 0 29px 2px;
          font-size: 13px;
          line-height: 17px;
          color: #333333;
        }

        .search-container {
          width: 308px;
          height: 39px;
          display: flex;
          align-items: center;
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.22);
          margin-bottom: 23px;
        }

        .search-icon {
          width: 28px;
          margin-left: 12px;
          font-size: 29px;
          line-height: 1;
          color: #b5b5b5;
          transform: rotate(-20deg);
        }

        .search-input {
          flex: 1;
          height: 39px;
          border: none;
          outline: none;
          background: transparent;
          padding: 0 8px;
          font-size: 20px;
          color: #555555;
        }

        .search-input::placeholder {
          color: #999999;
        }

        .projects-table {
          width: 100%;
          min-height: 430px;
          padding: 17px 25px 25px 34px;
          background: #ffffff;
          border-radius: 2px;
          box-shadow: 0 5px 11px rgba(0, 0, 0, 0.2);
        }

        .table-header,
        .project-row {
          display: grid;
          grid-template-columns: 1fr 1.1fr 0.7fr 0.7fr 0.55fr;
          align-items: center;
          column-gap: 24px;
        }

        .table-header {
          height: 38px;
          margin-bottom: 5px;
        }

        .table-header span {
          font-size: 18px;
          font-weight: 600;
          color: #222222;
        }

        .project-row {
          min-height: 62px;
          border-top: 1px solid #eeeeee;
        }

        .project-name,
        .project-description,
        .project-members {
          font-size: 16px;
          color: #444444;
        }

        .project-status {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          color: #444444;
          white-space: nowrap;
        }

        .status-dot {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
          background: #9bd3f1;
        }

        .view-project-button {
          width: 105px;
          height: 32px;
          border-radius: 4px;
          color: #222222;
          font-size: 14px;
          line-height: 16px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
          border: none;
          background: #9bd3f1;
        }

        .view-project-button:hover {
          background: #78c3e9;
        }

        .view-project-button:active {
          transform: scale(0.97);
        }

        @media (max-width: 1100px) {
          .brand {
            min-width: 250px;
          }

          .nav-links {
            gap: 17px;
          }

          .nav-link {
            font-size: 14px;
          }

          .projects-table {
            overflow-x: auto;
          }

          .table-header,
          .project-row {
            min-width: 950px;
          }
        }

        @media (max-width: 700px) {
          .top-navbar {
            height: auto;
            min-height: 58px;
            flex-wrap: wrap;
            padding: 10px;
          }

          .brand {
            flex: 1;
            min-width: auto;
          }

          .nav-links {
            order: 3;
            width: 100%;
            overflow-x: auto;
            justify-content: flex-start;
            padding-top: 8px;
          }

          .profile-icon {
            margin-left: 10px;
          }

          .main-content {
            padding: 25px 12px;
          }

          .search-container {
            width: 100%;
            max-width: 308px;
          }

          .projects-table {
            overflow-x: auto;
          }

          .table-header,
          .project-row {
            min-width: 950px;
          }
        }
      `}</style>

      <div className="projects-page">
        <header className="top-navbar">
          <div className="brand">
            <div className="logo-icon"></div>
            <span className="brand-name">CollabBoard</span>
          </div>

          <nav className="nav-links">
            <button className="nav-link" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>

            <button className="nav-link active" onClick={() => navigate("/projects")}>
              All Projects
            </button>

            <button className="nav-link" onClick={() => navigate("/my-projects")}>
              My Projects
            </button>

            <button className="nav-link" onClick={() => navigate("/create-project")}>
              Create Project
            </button>

            <button className="nav-link" onClick={() => navigate("/project")}>
              My Project
            </button>
          </nav>

          <div
            className="profile-icon"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          ></div>
        </header>

        <main className="main-content">
          <h1 className="page-title">All Projects</h1>

          <p className="page-subtitle">View and manage all projects</p>

          <div className="search-container">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="projects-table">
            <div className="table-header">
              <span>Project</span>
              <span>Description</span>
              <span>Status</span>
              <span>Members</span>
              <span>Action</span>
            </div>

            {loading && (
              <div className="project-row">
                <span className="project-name">Loading projects...</span>
              </div>
            )}

            {!loading && error && (
              <div className="project-row">
                <span className="project-name">{error}</span>
              </div>
            )}

            {!loading && !error && filteredProjects.length === 0 && (
              <div className="project-row">
                <span className="project-name">No projects found</span>
              </div>
            )}

            {!loading &&
              !error &&
              filteredProjects.map((project) => (
                <div className="project-row" key={project.id}>
                  <span className="project-name">{project.name}</span>

                  <span className="project-description">{project.description}</span>

                  <span className="project-status">
                    <span className="status-dot" />
                    {project.status || "Not set"}
                  </span>

                  <span className="project-members">{getMemberNames(project)}</span>

                  <button
                    className="view-project-button"
                    onClick={() => navigate(`/project?id=${project.id}`)}
                  >
                    View Project
                  </button>
                </div>
              ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default ProjectsBoardPage;
