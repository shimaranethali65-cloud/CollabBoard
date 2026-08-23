import { useState } from "react";

function CreateProjectPage() {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("High");
  const [members, setMembers] = useState("");

  const handleCreateProject = () => {
    alert("Project Created Successfully!");
  };

  const handleCancel = () => {
    setProjectTitle("");
    setDescription("");
    setDueDate("");
    setStatus("To do");
    setPriority("High");
    setMembers("");
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f6f6f6;
          color: #252a31;
        }

        /* =========================
           NAVBAR
        ========================= */

        .create-navbar {
          height: 52px;
          background: #ffffff;
          border-bottom: 1px solid #d9dce1;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 70px;
        }

        .create-logo {
          display: flex;
          align-items: center;
          gap: 10px;

          font-size: 20px;
          font-weight: bold;
        }

        .create-logo-icon {
          width: 32px;
          height: 32px;

          background: #d9ebf5;
          color: #5b9fc7;

          border-radius: 5px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 23px;
        }

        .create-nav-links {
          display: flex;
          align-items: center;
          gap: 45px;
        }

        .create-nav-links a {
          text-decoration: none;
          color: #252a31;
          font-size: 19px;
        }

        .create-nav-links a:hover {
          color: #367eb6;
        }

        .create-profile {
          width: 30px;
          height: 30px;

          background: #111;
          color: white;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* =========================
           MAIN PAGE
        ========================= */

        .create-page {
          min-height: calc(100vh - 52px);

          position: relative;

          padding: 28px 80px;

          overflow: hidden;
        }

        /* =========================
           HEADER
        ========================= */

        .create-header {
          display: flex;
          align-items: center;

          gap: 25px;

          margin-bottom: 28px;
        }

        .plus-icon {
          width: 60px;
          height: 60px;

          border: 7px solid #303236;
          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 52px;
          font-weight: bold;

          line-height: 1;
        }

        .create-heading h1 {
          margin: 0;

          font-size: 30px;
          letter-spacing: 1px;
        }

        .create-heading h1 span {
          color: #4b85b5;
        }

        .create-heading p {
          margin: 2px 0 0;

          font-size: 18px;
          color: #454a52;
        }

        /* =========================
           FORM BOX
        ========================= */

        .form-container {
          width: 510px;

          margin-left: 190px;

          background: #dce4f1;

          padding: 18px 30px;

          border-radius: 10px;

          box-shadow:
            0 5px 18px rgba(0, 0, 0, 0.08);
        }

        .form-group {
          margin-bottom: 10px;
        }

        .form-group label {
          display: block;

          margin-bottom: 8px;

          font-size: 15px;
          font-weight: 600;
        }

        input,
        textarea,
        select {
          width: 100%;

          border: none;
          outline: none;

          background: #f7f7f7;

          color: #333;

          font-size: 15px;

          border-radius: 12px;

          padding: 10px 14px;
        }

        textarea {
          height: 74px;

          resize: none;
        }

        input::placeholder,
        textarea::placeholder {
          color: #85898e;
        }

        /* =========================
           TWO COLUMNS
        ========================= */

        .two-columns {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 30px;
        }

        .small-field {
          width: 100%;
        }

        /* =========================
           FORM ICON INPUT
        ========================= */

        .input-icon {
          position: relative;
        }

        .input-icon span {
          position: absolute;

          left: 13px;
          top: 50%;

          transform: translateY(-50%);

          font-size: 17px;

          z-index: 1;
        }

        .input-icon input {
          padding-left: 38px;
        }

        /* =========================
           BUTTONS
        ========================= */

        .form-buttons {
          display: flex;
          align-items: center;

          gap: 42px;

          margin-top: 8px;
        }

        .cancel-button {
          width: 125px;

          border: none;

          background: #bfc5cf;

          color: #30343a;

          border-radius: 10px;

          padding: 8px;

          font-size: 15px;

          cursor: pointer;
        }

        .create-button {
          width: 165px;

          border: none;

          background: #4b89bd;

          color: white;

          border-radius: 10px;

          padding: 8px;

          font-size: 15px;
          font-weight: 600;

          cursor: pointer;
        }

        .cancel-button:hover {
          background: #aeb5c0;
        }

        .create-button:hover {
          background: #3676aa;
        }

        /* =========================
           DECORATION LEFT
        ========================= */

        .left-decoration {
          position: absolute;

          left: -40px;
          top: 135px;

          width: 190px;
          height: 270px;

          background:
            linear-gradient(
              135deg,
              #e3edf9,
              #f6f8fb
            );

          border-radius: 0 60px 60px 0;

          opacity: 0.9;

          display: flex;
          align-items: flex-end;
          justify-content: center;

          padding-bottom: 25px;
        }

        .laptop {
          width: 145px;
          height: 90px;

          background: #b7c3d2;

          border: 5px solid #68717d;

          border-radius: 5px;

          transform: rotate(8deg);

          position: relative;
        }

        .laptop::after {
          content: "";

          position: absolute;

          width: 170px;
          height: 10px;

          background: #7d8794;

          bottom: -15px;
          left: -17px;

          border-radius: 4px;
        }

        .coffee {
          position: absolute;

          width: 48px;
          height: 55px;

          right: 5px;
          bottom: 15px;

          background: #dce7f4;

          border-radius: 5px 5px 18px 18px;

          border: 2px solid #c2cfdf;
        }

        /* =========================
           DECORATION RIGHT
        ========================= */

        .right-decoration {
          position: absolute;

          right: -20px;
          bottom: 0;

          width: 150px;
          height: 390px;

          background:
            linear-gradient(
              180deg,
              #edf3fb,
              #dce7f7
            );

          display: flex;
          align-items: flex-end;
          justify-content: center;

          gap: 5px;

          padding-bottom: 35px;
        }

        .folder {
          width: 40px;
          height: 120px;

          background: #769ad2;

          border-radius: 4px;

          box-shadow:
            5px 0 10px rgba(0,0,0,0.1);
        }

        .folder:nth-child(2) {
          height: 145px;
          background: #5e87c5;
        }

        .folder:nth-child(3) {
          height: 110px;
          background: #87a7db;
        }

        .plant {
          position: absolute;

          top: 85px;

          width: 4px;
          height: 100px;

          background: #6388c2;
        }

        .leaf {
          position: absolute;

          width: 45px;
          height: 20px;

          background: #9bb9e5;

          border-radius: 100% 0;

          transform-origin: left center;
        }

        .leaf1 {
          top: 105px;
          left: 48px;
          transform: rotate(30deg);
        }

        .leaf2 {
          top: 135px;
          left: 70px;
          transform: rotate(-35deg);
        }

        .leaf3 {
          top: 160px;
          left: 45px;
          transform: rotate(40deg);
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 950px) {

          .create-navbar {
            padding: 0 25px;
          }

          .create-nav-links {
            gap: 20px;
          }

          .form-container {
            margin-left: auto;
            margin-right: auto;
          }

          .left-decoration,
          .right-decoration {
            display: none;
          }
        }

        @media (max-width: 650px) {

          .create-nav-links {
            display: none;
          }

          .create-page {
            padding: 25px 20px;
          }

          .create-header {
            gap: 15px;
          }

          .create-heading h1 {
            font-size: 25px;
          }

          .create-heading p {
            font-size: 15px;
          }

          .form-container {
            width: 100%;
            padding: 20px;
          }

          .two-columns {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .form-buttons {
            justify-content: space-between;
            gap: 10px;
          }
        }
      `}</style>

      {/* ================= NAVBAR ================= */}

      <nav className="create-navbar">

        <div className="create-logo">
          <div className="create-logo-icon">✓</div>
          <span>CollabBoard</span>
        </div>

        <div className="create-nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Projects</a>
          <a href="#">Members</a>
          <a href="#">Tasks</a>
        </div>

        <div className="create-profile">
          👤
        </div>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="create-page">

        {/* LEFT DECORATION */}

        <div className="left-decoration">
          <div className="laptop"></div>
          <div className="coffee"></div>
        </div>


        {/* HEADER */}

        <div className="create-header">

          <div className="plus-icon">
            +
          </div>

          <div className="create-heading">

            <h1>
              <span>Create</span> Project
            </h1>

            <p>
              Add a new project and start collaborating with your team.
            </p>

          </div>

        </div>


        {/* FORM */}

        <div className="form-container">

          {/* PROJECT TITLE */}

          <div className="form-group">

            <label>Project Title</label>

            <input
              type="text"
              placeholder="Enter project title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />

          </div>


          {/* DESCRIPTION */}

          <div className="form-group">

            <label>Description</label>

            <textarea
              placeholder="Enter project description...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>


          {/* DATE AND STATUS */}

          <div className="two-columns">

            <div className="form-group">

              <label>Due Date</label>

              <div className="input-icon">

                <span>▣</span>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />

              </div>

            </div>


            <div className="form-group">

              <label>Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>To do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

            </div>

          </div>


          {/* PRIORITY */}

          <div className="form-group small-field">

            <label>Priority Status</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ width: "170px" }}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

          </div>


          {/* PROJECT MEMBERS */}

          <div className="form-group">

            <label>Project Members</label>

            <div className="input-icon">

              <span>♙</span>

              <input
                type="text"
                placeholder="Select team members"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
              />

            </div>

          </div>


          {/* BUTTONS */}

          <div className="form-buttons">

            <button
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="create-button"
              onClick={handleCreateProject}
            >
              + Create Project
            </button>

          </div>

        </div>


        {/* RIGHT DECORATION */}

        <div className="right-decoration">

          <div className="plant"></div>

          <div className="leaf leaf1"></div>
          <div className="leaf leaf2"></div>
          <div className="leaf leaf3"></div>

          <div className="folder"></div>
          <div className="folder"></div>
          <div className="folder"></div>

        </div>

      </main>
    </>
  );
}

export default CreateProjectPage;