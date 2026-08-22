function ProjectsBoardPage() {
  const projects = [
    {
      name: "DonorBridge",
      type: "Web Application",
      priority: "Medium",
      dueDate: "19.11.2026",
    },
    {
      name: "FixFinder",
      type: "Mobile Application",
      priority: "High",
      dueDate: "19.11.2026",
    },
    {
      name: "BlindMatch",
      type: "Web Application",
      priority: "Low",
      dueDate: "19.11.2026",
    },
    {
      name: "CollabBoard",
      type: "Web Application",
      priority: "High",
      dueDate: "19.11.2026",
    },
    {
      name: "LecturerFinder",
      type: "Mobile Application",
      priority: "Medium",
      dueDate: "19.11.2026",
    },
    {
      name: "UMS",
      type: "Web Application",
      priority: "High",
      dueDate: "19.11.2026",
    },
    {
      name: "BloodDonate",
      type: "Mobile Application",
      priority: "Low",
      dueDate: "19.11.2026",
    },
  ];

  return (
    <>
      <style>{`

        /* ==============================
           RESET
        ============================== */

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
        }


        /* ==============================
           FULL APPLICATION
        ============================== */

        .projects-page {
          width: 100%;
          min-height: 100vh;

          display: flex;

          margin: 0;
          padding: 0;

          background: #ffffff;
        }


        /* ==============================
           SIDEBAR
        ============================== */

       .sidebar {
  width: 183px;
  min-width: 183px;
  height: 100vh;
  background: #dddddd;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

/* LOGO + NAME */
.sidebar-logo {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding-left: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #333333;
}

/* BLUE LOGO */
.sidebar-logo img {
  width: 25px;
  height: 25px;
  object-fit: contain;
}

/* MENU */
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

/* MENU BUTTONS */
.sidebar-button {
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 6px;
  background: #c8c4c5;
  color: #222222;
  font-size: 16px;
  cursor: pointer;
}

.sidebar-button:hover {
  background: #bebabb;
}

        /* ==============================
           MAIN CONTENT
        ============================== */

        .main-content {
          flex: 1;

          min-width: 0;
          min-height: 100vh;

          padding: 22px 25px 40px 20px;

          background: #ffffff;
        }


        /* TITLE */

        .page-title {
          margin: 0;

          font-size: 24px;

          line-height: 29px;

          font-weight: 600;

          color: #333333;
        }

        .page-subtitle {
          margin: 2px 0 26px;

          font-size: 12px;

          line-height: 15px;

          color: #333333;
        }


        /* ==============================
           SEARCH
        ============================== */

        .search-container {
          width: 185px;
          height: 38px;

          display: flex;
          align-items: center;

          margin-bottom: 18px;

          background: #ffffff;

          border-radius: 4px;

          box-shadow:
            0 5px 9px rgba(0, 0, 0, 0.20);
        }

        .search-icon {
          margin-left: 10px;

          font-size: 24px;

          color: #aaaaaa;
        }

        .search-input {
          width: 145px;
          height: 38px;

          border: none;
          outline: none;

          padding: 0 5px;

          font-size: 16px;

          color: #555555;
        }

        .search-input::placeholder {
          color: #999999;
        }


        /* ==============================
           PROJECT TABLE
        ============================== */

        .projects-table {
          width: 100%;

          max-width: 100%;

          min-height: 385px;

          padding: 14px 21px 15px;

          background: #ffffff;

          border-radius: 3px;

          box-shadow:
            0 5px 10px rgba(0, 0, 0, 0.18);
        }


        /* TABLE GRID */

        .table-header,
        .project-row {
          display: grid;

          grid-template-columns:
            1.6fr
            1.3fr
            1fr
            1fr;

          align-items: center;
        }


        /* HEADER */

        .table-header {
          height: 30px;

          margin-bottom: 5px;
        }

        .table-header span {
          font-size: 14px;

          font-weight: 600;

          color: #222222;
        }


        /* ROWS */

        .project-row {
          height: 41px;
        }

        .project-name,
        .project-type,
        .due-date {
          font-size: 14px;

          color: #444444;
        }


        /* ==============================
           PRIORITY
        ============================== */

        .priority {
          display: flex;

          align-items: center;

          gap: 8px;

          font-size: 14px;

          color: #444444;
        }

        .priority-dot {
          width: 15px;
          height: 15px;

          border-radius: 50%;

          display: inline-block;

          flex-shrink: 0;
        }

        .priority-high {
          background: #74130b;
        }

        .priority-medium {
          background: #c94d35;
        }

        .priority-low {
          background: #68f33d;
        }


        /* ==============================
           DUE DATE
        ============================== */

        .due-date {
          display: flex;

          align-items: center;

          gap: 5px;

          white-space: nowrap;
        }

        .clock-icon {
          font-size: 16px;

          color: #333333;
        }

      `}</style>


      <div className="projects-page">


        {/* ============================
            SIDEBAR
        ============================ */}

        <aside className="sidebar">

          <div className="sidebar-logo">

            <div className="logo-check"></div>

            <span>
              CollabBoard
            </span>

          </div>


          <div className="sidebar-menu">

            <button className="sidebar-button">
              All Projects
            </button>

            <button className="sidebar-button">
              My Projects
            </button>

            <button className="sidebar-button">
              Create Project
            </button>

            <button className="sidebar-button">
              My Status
            </button>

            <button className="sidebar-button">
              My Account
            </button>

          </div>

        </aside>


        {/* ============================
            MAIN CONTENT
        ============================ */}

        <main className="main-content">


          <h1 className="page-title">
            All Projects
          </h1>


          <p className="page-subtitle">
            View and manage All Tasks
          </p>


          {/* SEARCH */}

          <div className="search-container">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              className="search-input"
              placeholder="Search"
            />

          </div>


          {/* PROJECT TABLE */}

          <div className="projects-table">


            {/* HEADER */}

            <div className="table-header">

              <span>
                Project
              </span>

              <span>
                Type
              </span>

              <span>
                Priority
              </span>

              <span>
                Due Date
              </span>

            </div>


            {/* PROJECTS */}

            {projects.map((project) => (

              <div
                className="project-row"
                key={project.name}
              >

                <span className="project-name">
                  {project.name}
                </span>


                <span className="project-type">
                  {project.type}
                </span>


                <span className="priority">

                  <span
                    className={`priority-dot ${
                      project.priority === "High"
                        ? "priority-high"
                        : project.priority === "Medium"
                        ? "priority-medium"
                        : "priority-low"
                    }`}
                  />

                  {project.priority}

                </span>


                <span className="due-date">

                  <span className="clock-icon">
                    ◷
                  </span>

                  {project.dueDate}

                </span>

              </div>

            ))}

          </div>

        </main>

      </div>
    </>
  );
}

export default ProjectsBoardPage;