import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import smmIcons from "../assets/smm-icons.jpg";

type IconName = "arrowLeft" | "users" | "user" | "userPlus";

function PageIcon({
  name,
  size = 16,
  strokeWidth = 2,
  style,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  const iconContent: Record<IconName, React.ReactNode> = {
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3.5 20c.6-3.2 2.4-5 5.5-5s4.9 1.8 5.5 5M14 16c2.8-.4 4.8.9 5.5 4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21c.7-4.1 3.2-6 7.5-6s6.8 1.9 7.5 6" />
      </>
    ),
    userPlus: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M1.5 21c.7-4.1 3.2-6 7.5-6M19 8v8M15 12h8" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {iconContent[name]}
    </svg>
  );
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  members: string[];
}

function ViewProjectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setError("No project selected.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);

        if (!response.ok) {
          throw new Error("Failed to load project details");
        }

        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const members = project?.members ?? [];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        padding: "12px 28px 18px",
        boxSizing: "border-box",
        background: "#F5F8FF",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#252525",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <NavigationBar style={{ margin: "-12px -28px 24px" }} />

      {/* BACK */}
      <button
        onClick={() => navigate("/projects")}
        style={{
          height: "15px",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: "4px",
          border: "none",
          background: "transparent",
          color: "#4C4C4C",
          fontSize: "14px",
          fontWeight: 400,
          cursor: "pointer",
        }}
      >
        <PageIcon name="arrowLeft" size={13} strokeWidth={1.8} />
        <span>Back to Projects</span>
      </button>

      {/* PROJECT CARD */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 190px)",
          flex: "0 0 auto",
          minHeight: 0,
          marginTop: "23px",
          padding: "32px",
          boxSizing: "border-box",
          overflow: "hidden",
          borderRadius: "18px",
          background: "#FFFFFF",
          boxShadow:
            "0 3px 6px rgba(61,83,112,.10), 0 5px 12px rgba(61,83,112,.12)",
        }}
      >
        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          {/* TITLE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "24px",
                lineHeight: "30px",
                fontWeight: 700,
                color: "#252525",
              }}
            >
              {loading ? "Loading Project..." : project?.name ?? "Project Not Found"}
            </h1>
          </div>

          {/* DESCRIPTION */}
          <p
            style={{
              margin: "14px 0 16px",
              color: "#555555",
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 400,
            }}
            >
            {loading && "Loading project details..."}
            {!loading && error && error}
            {!loading && !error && project?.description}
          </p>

          {/* PROJECT INFO */}
          <div
            style={{
              color: "#444444",
              fontSize: "16px",
              lineHeight: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  width: "120px",
                  flexShrink: 0,
                }}
              >
                Project Type
              </span>

              <span style={{ marginLeft: "-2px" }}>:</span>

              <span>{members.length > 1 ? "Group Project" : "Individual Project"}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  width: "120px",
                  flexShrink: 0,
                }}
              >
                Status
              </span>

              <span style={{ marginLeft: "-2px" }}>:</span>

              <span>{project?.status ?? "Not available"}</span>
            </div>
          </div>

          {/* REQUIREMENTS */}
          <ul
            style={{
              margin: "14px 0 0",
              padding: 0,
              listStyle: "none",
              color: "#4B4B4B",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                  color: "#2F95E7",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                ✓
              </span>

              <span>Create responsive user interface.</span>
            </li>

            <li
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                  color: "#2F95E7",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                ✓
              </span>

              <span>Develop backend functionality.</span>
            </li>

            <li
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                  color: "#2F95E7",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                ✓
              </span>

              <span>Connect application to database.</span>
            </li>
          </ul>

          {/* MEMBERS */}
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "340px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px",
                color: "#5E5E5E",
                fontSize: "13px",
              }}
            >
              <PageIcon name="user" size={16} strokeWidth={1.8} />

              <span>{members.length} Members</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "14px",
                rowGap: "8px",
              }}
            >
              {members.map((member) => (
                <div
                  key={member}
                  style={{
                    height: "28px",
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxSizing: "border-box",
                    borderRadius: "14px",
                    background: "#E8EDF3",
                    color: "#505050",
                    fontSize: "12px",
                    boxShadow:
                      "0 2px 4px rgba(0,0,0,.08)",
                  }}
                >
                  <PageIcon name="user" size={13} strokeWidth={2} />

                  <span>{member}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECT ACTIONS */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              onClick={() => navigate("/project-members")}
              style={{
                height: "36px",
                padding: "0 18px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                border: "1px solid #9DC9F0",
                borderRadius: "8px",
                background: "#FFFFFF",
                color: "#3189D6",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <PageIcon name="users" size={17} strokeWidth={1.9} />
              <span>View Members</span>
            </button>

            <button
              onClick={() => navigate("/my-projects")}
              style={{
                height: "36px",
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                borderRadius: "8px",
                background: "#3B9BE8",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <PageIcon name="userPlus" size={17} strokeWidth={1.9} />
              <span>Enroll</span>
            </button>
          </div>
        </div>

          {/* LAPTOP ILLUSTRATION */}
          <img
            src={smmIcons}
            alt="Team members collaborating with laptops"
            style={{
              position: "absolute",
              left: "53%",
              top: "130px",
              width: "410px",
              height: "410px",
              objectFit: "contain",
              opacity: 0.45,
              transform: "translateX(-50%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              display: "none",
              position: "absolute",
            left: "53%",
            top: "155px",
            width: "150px",
            height: "120px",
            opacity: 0.92,
            transform: "translateX(-50%) scale(2.4)",
            transformOrigin: "center",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {/* SCREEN */}
          <div
            style={{
              position: "absolute",
              left: "15px",
              top: "4px",
              width: "66px",
              height: "50px",
              padding: "4px",
              boxSizing: "border-box",
              border: "2px solid #B9C1CC",
              borderRadius: "3px",
              background: "#F9FBFF",
              transform: "skew(-7deg) rotate(2deg)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "2px",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "3px",
                  background: "#83B8ED",
                }}
              />

              <span
                style={{
                  width: "4px",
                  height: "3px",
                  background: "#83B8ED",
                }}
              />

              <span
                style={{
                  width: "4px",
                  height: "3px",
                  background: "#83B8ED",
                }}
              />
            </div>

            <div
              style={{
                width: "48px",
                height: "3px",
                marginTop: "4px",
                background: "#DBE6F3",
              }}
            />

            <div
              style={{
                width: "32px",
                height: "3px",
                marginTop: "4px",
                background: "#DBE6F3",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3,1fr)",
                gap: "3px",
                marginTop: "5px",
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <span
                  key={item}
                  style={{
                    height: "5px",
                    background: "#DCE8F5",
                  }}
                />
              ))}
            </div>
          </div>

          {/* LAPTOP BASE */}
          <div
            style={{
              position: "absolute",
              left: "8px",
              bottom: "17px",
              width: "81px",
              height: "5px",
              borderRadius: "0 0 5px 5px",
              background: "#AEB7C3",
              transform: "skew(-7deg)",
            }}
          />

          {/* DECORATIVE SHADOW */}
          <div
            style={{
              position: "absolute",
              right: "1px",
              bottom: 0,
              width: "25px",
              height: "12px",
              borderRadius: "8px",
              background: "#DBE9F7",
              transform: "rotate(-24deg)",
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default ViewProjectPage;
