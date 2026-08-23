function ProfilePage() {
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
           NAVBAR
        ========================= */

        .profile-navbar {
          height: 48px;
          background: #ffffff;
          border-bottom: 1px solid #d8dce2;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 45px;
        }

        .profile-logo {
          display: flex;
          align-items: center;
          gap: 12px;

          font-size: 18px;
          font-weight: 700;
        }

        .profile-logo-icon {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #d9ebf5;
          color: #5a9fc7;

          border-radius: 5px;
          font-size: 22px;
        }

        .profile-nav-links {
          display: flex;
          gap: 55px;
          align-items: center;
        }

        .profile-nav-links a {
          text-decoration: none;
          color: #252b33;
          font-size: 17px;
        }

        .profile-nav-links a:hover {
          color: #2f80bd;
        }

        .top-profile-icon {
          width: 28px;
          height: 28px;

          background: #111;
          color: white;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 15px;
        }

        /* =========================
           MAIN PAGE
        ========================= */

        .profile-page {
          min-height: calc(100vh - 48px);

          display: grid;
          grid-template-columns: 38% 62%;

          padding: 18px 65px 25px;

          background: #f7f7f7;
        }

        /* =========================
           LEFT SIDE
        ========================= */

        .profile-left {
          padding: 22px 15px;
          background: #f4f4f4;
          min-height: 730px;
        }

        .profile-left h1 {
          margin: 0 0 4px;
          font-size: 27px;
        }

        .profile-left > p {
          margin: 0;
          font-size: 20px;
          color: #363b42;
        }

        /* PROFILE IMAGE */

        .profile-image-container {
          width: 120px;
          height: 120px;

          margin: 120px auto 65px;

          border-radius: 50%;

          background: #c6d9ec;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 70px;

          position: relative;
        }

        .camera-button {
          position: absolute;

          width: 50px;
          height: 50px;

          right: -8px;
          bottom: -8px;

          border-radius: 50%;

          background: #111;

          color: white;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 25px;

          border: 3px solid #f4f4f4;
        }

        .profile-name {
          text-align: center;

          font-size: 30px;

          margin: 0;
        }

        .role-button {
          display: block;

          width: 250px;

          margin: 38px auto;

          padding: 16px;

          border: none;

          border-radius: 12px;

          background: #c9daec;

          color: #2865a0;

          font-size: 21px;

          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
        }

        /* =========================
           RIGHT SIDE
        ========================= */

        .profile-right {
          background: #e1e8f4;

          min-height: 720px;

          padding: 48px 20px;

          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
        }

        .details-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .detail-row {
          display: flex;
          align-items: center;

          gap: 22px;

          font-size: 24px;
        }

        .detail-icon {
          width: 32px;

          font-size: 30px;

          display: flex;
          justify-content: center;
        }

        /* ABOUT */

        .about-section {
          margin-top: 65px;
        }

        .about-section h2 {
          margin: 0 0 8px;

          font-size: 28px;
        }

        .about-section p {
          margin: 0;

          max-width: 700px;

          font-size: 24px;

          line-height: 1.15;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 900px) {

          .profile-navbar {
            padding: 0 20px;
          }

          .profile-nav-links {
            gap: 20px;
          }

          .profile-page {
            grid-template-columns: 1fr;

            padding: 20px;
          }

          .profile-left {
            min-height: auto;

            padding-bottom: 40px;
          }

          .profile-image-container {
            margin: 60px auto 35px;
          }

          .profile-right {
            min-height: auto;
          }
        }

        @media (max-width: 600px) {

          .profile-nav-links {
            display: none;
          }

          .profile-page {
            padding: 10px;
          }

          .detail-row {
            font-size: 18px;
          }

          .about-section p {
            font-size: 19px;
          }
        }
      `}</style>

      {/* =========================
          NAVIGATION BAR
      ========================= */}

      <nav className="profile-navbar">

        <div className="profile-logo">
          <div className="profile-logo-icon">✓</div>
          <span>CollabBoard</span>
        </div>

        <div className="profile-nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Projects</a>
          <a href="#">Members</a>
          <a href="#">Tasks</a>
        </div>

        <div className="top-profile-icon">
          👤
        </div>

      </nav>

      {/* =========================
          PROFILE PAGE
      ========================= */}

      <main className="profile-page">

        {/* LEFT SIDE */}

        <section className="profile-left">

          <h1>Profile Preview</h1>

          <p>
            This is how others will see your profile.
          </p>

          <div className="profile-image-container">

            👤

            <div className="camera-button">
              📷
            </div>

          </div>

          <h2 className="profile-name">
            Jane Doe
          </h2>

          <button className="role-button">
            Project Member
          </button>

        </section>


        {/* RIGHT SIDE */}

        <section className="profile-right">

          <div className="details-container">

            <div className="detail-row">
              <span className="detail-icon">✉</span>
              <span>jane.doe@gmail.com</span>
            </div>

            <div className="detail-row">
              <span className="detail-icon">☎</span>
              <span>+94 77 123 4567</span>
            </div>

            <div className="detail-row">
              <span className="detail-icon">⌖</span>
              <span>Colombo,Sri Lanka</span>
            </div>

            <div className="detail-row">
              <span className="detail-icon">▣</span>
              <span>Member since May 2024</span>
            </div>

          </div>


          {/* ABOUT SECTION */}

          <div className="about-section">

            <h2>About</h2>

            <p>
              Passionate about building impactful solutions and
              collaborating with amazing teams.
            </p>

          </div>

        </section>

      </main>
    </>
  );
}

export default ProfilePage;