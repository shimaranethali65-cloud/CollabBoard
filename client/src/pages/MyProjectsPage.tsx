function MyProjectsPage() {
  const projects = [
    {
      icon: "📁",
      title: "Kanban Application",
      description: "A task management application using Kanban board.",
      iconBackground: "#eadcf3",
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Building a cross platform mobile application.",
      iconBackground: "#d9f3df",
    },
    {
      icon: "◎",
      title: "Website Redesign",
      description: "Redesigning the company website UI/UX",
      iconBackground: "#fff4c7",
    },
  ];

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

          .nav-links {
            display: none;
          }

          .projects-header {
            flex-direction: column;

            align-items: flex-start;

            gap: 20px;
          }

          .projects-title {
            font-size: 30px;
          }
        }
      `}</style>

      {}

      <nav className="navbar">
        <div className="nav-logo">
          <div className="logo-icon">✓</div>
          <span>CollabBoard</span>
        </div>

        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">All Projects</a>
          <a href="#">My Projects</a>
          <a href="#">Create Project</a>
          <a href="#">My Status</a>
        </div>

        <div className="profile-icon">
          👤
        </div>
      </nav>

      {}

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

          <button className="new-project-button">
            + &nbsp;New Project
          </button>
        </div>

        <div className="projects-container">

          {projects.map((project, index) => (

            <div
              className="project-card"
              key={index}
            >

              <button className="more-button">
                ⋮
              </button>

              {/* LEFT SIDE */}

              <div className="project-left">

                <div
                  className="project-icon-box"
                  style={{
                    backgroundColor:
                      project.iconBackground,
                  }}
                >
                  {project.icon}
                </div>

                <div className="project-content">

                  <h2>
                    {project.title}
                  </h2>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="members-row">

                    <div className="member-circle">
                      👤
                    </div>

                    <div className="member-circle">
                      👤
                    </div>

                    <span className="member-count">
                      +2
                    </span>

                  </div>

                </div>

              </div>

              {/* RIGHT SIDE */}

              <div className="project-right">

                <button className="view-project-button">
                  View Project
                </button>

                <span className="arrow-button">
                  →
                </span>

              </div>

            </div>

          ))}

        </div>

      </main>
    </>
  );
}

export default MyProjectsPage;