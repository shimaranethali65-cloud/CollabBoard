import { useNavigate } from "react-router-dom";
import dashboardImage from "../assets/Landing Page .png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .landing-page {
          min-height: 100vh;
          background: #ffffff;
          color: #333333;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* ================= NAVBAR ================= */

        .navbar {
          height: 82px;
          margin: 28px 25px 0;
          padding: 0 28px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: #f1eeee;
          border-radius: 8px;

          box-shadow: 0 7px 12px rgba(0, 0, 0, 0.18);
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .logo-icon {
          width: 30px;
          height: 30px;

          border: 4px solid #a8d0e8;
          border-radius: 5px;

          position: relative;
        }

        .logo-icon::after {
          content: "✓";

          position: absolute;
          right: -8px;
          bottom: -8px;

          color: #79b8db;
          font-size: 20px;
          font-weight: bold;
        }

        .logo {
          font-size: 25px;
          font-weight: 600;
          color: #444444;
        }

        .nav-buttons {
          display: flex;
          gap: 18px;
        }

        .nav-button {
          border: none;
          background: #a8d0e8;

          padding: 8px 25px;
          border-radius: 6px;

          font-size: 20px;
          color: #333333;

          cursor: pointer;
          transition: 0.2s;
        }

        .nav-button:hover {
          background: #8fc2df;
        }

        /* ================= HERO ================= */

        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 45px;

          margin: 22px 25px 0;
          min-height: 330px;
        }

        .hero-text {
          width: 48%;
          padding-left: 3px;
        }

        .hero-title {
          margin: 0;

          font-size: 52px;
          line-height: 1.1;
          font-weight: 600;

          color: #444444;
        }

        .blue-text {
          color: #a8d0e8;
        }

        .hero-description {
          max-width: 480px;

          margin-top: 24px;

          font-size: 19px;
          line-height: 1.4;

          color: #444444;
        }

        .hero-image {
          width: 52%;
          max-width: 600px;

          height: 300px;

          object-fit: contain;
          object-position: center;

          display: block;
        }

        /* ================= FEATURES ================= */

        .features-section {
          margin: 24px 25px 25px;

          padding: 12px 12px 22px;

          background: #f1eeee;

          border-radius: 8px;

          box-shadow: 0 7px 12px rgba(0, 0, 0, 0.18);
        }

        .features-title {
          margin: 0;

          text-align: center;

          font-size: 25px;
          font-weight: 500;

          color: #222222;
        }

        .features-subtitle {
          margin: 10px 0 28px;

          text-align: center;

          font-size: 17px;

          color: #444444;
        }

        .features {
          display: grid;

          grid-template-columns: repeat(4, 1fr);

          gap: 16px;
        }

        .feature-card {
          min-height: 110px;

          padding: 12px 14px;

          background: #ffffff;

          border-radius: 2px;

          box-shadow: 0 5px 9px rgba(0, 0, 0, 0.18);
        }

        .feature-header {
          display: flex;
          align-items: center;

          gap: 6px;

          margin-bottom: 7px;
        }

        .feature-icon {
          font-size: 22px;
        }

        .feature-card h3 {
          margin: 0;

          font-size: 17px;
          font-weight: 500;

          color: #333333;
        }

        .feature-card p {
          margin: 0;

          font-size: 13px;
          line-height: 1.3;

          color: #444444;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 900px) {

          .hero {
            flex-direction: column;
            text-align: center;
          }

          .hero-text,
          .hero-image {
            width: 100%;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-image {
            max-width: 600px;
          }

          .features {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {

          .navbar {
            height: 70px;
            margin: 15px;
            padding: 0 15px;
          }

          .logo {
            font-size: 20px;
          }

          .nav-buttons {
            gap: 8px;
          }

          .nav-button {
            padding: 7px 13px;
            font-size: 15px;
          }

          .hero {
            margin: 25px 15px 0;
          }

          .hero-title {
            font-size: 40px;
          }

          .hero-description {
            font-size: 16px;
          }

          .hero-image {
            height: auto;
          }

          .features-section {
            margin: 20px 15px;
          }

          .features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="landing-page">

        {/* Navbar */}
        <nav className="navbar">

          <div className="logo-section">
            <div className="logo-icon"></div>

            <div className="logo">
              CollabBoard
            </div>
          </div>

          <div className="nav-buttons">

            {/* Navigate to Sign Up page */}
            <button
              className="nav-button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>

            {/* Navigate to Login page */}
            <button
              className="nav-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </nav>


        {/* Hero Section */}
        <section className="hero">

          <div className="hero-text">

            <h1 className="hero-title">

              <span className="blue-text">
                Simple Task
              </span>

              <br />

              <span className="blue-text">
                Management
              </span>

              <br />

              for Modern Teams

            </h1>

            <p className="hero-description">
              Plan tasks, collaborate with your team,
              and track project progress — all in one place.
            </p>

          </div>


          <img
            src={dashboardImage}
            alt="CollabBoard task management dashboard"
            className="hero-image"
          />

        </section>


        {/* Features Section */}
        <section className="features-section">

          <h2 className="features-title">
            Everything Your Team needs
          </h2>

          <p className="features-subtitle">
            Powerful features to help you plan, track,
            and collaborate effortlessly.
          </p>


          <div className="features">

            {/* Feature 1 */}
            <div className="feature-card">

              <div className="feature-header">

                <span className="feature-icon">
                  👥
                </span>

                <h3>
                  Team Collaboration
                </h3>

              </div>

              <p>
                Work together in real-time and keep
                everyone on the same page.
              </p>

            </div>


            {/* Feature 2 */}
            <div className="feature-card">

              <div className="feature-header">

                <span className="feature-icon">
                  ✅
                </span>

                <h3>
                  Kanban Boards
                </h3>

              </div>

              <p>
                Visualize your work, move tasks across
                stages, and stay organized.
              </p>

            </div>


            {/* Feature 3 */}
            <div className="feature-card">

              <div className="feature-header">

                <span className="feature-icon">
                  📊
                </span>

                <h3>
                  Track Progress
                </h3>

              </div>

              <p>
                Monitor tasks, deadlines, and project
                progress with ease.
              </p>

            </div>


            {/* Feature 4 */}
            <div className="feature-card">

              <div className="feature-header">

                <span className="feature-icon">
                  🔒
                </span>

                <h3>
                  Secure & Reliable
                </h3>

              </div>

              <p>
                Your data is safe with us. Built with
                security and performance in mind.
              </p>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default LandingPage;