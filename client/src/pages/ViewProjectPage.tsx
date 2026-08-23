import React from "react";

type IconName = "arrowLeft" | "calendar" | "users" | "user" | "userPlus";

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
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
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

const members = [
  "Sathish",
  "Alex",
  "Sarah",
  "Noah",
  "John",
];

const technologies = [
  "HTML",
  "CSS",
  "React",
  "JavaScript",
  "Node.js",
  "MySQL",
];

function ViewProjectPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        padding: "12px 28px 18px",
        boxSizing: "border-box",
        background: "#F5F8FF",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#252525",
      }}
    >
      {/* BACK */}
      <button
        style={{
          height: "15px",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: "4px",
          border: "none",
          background: "transparent",
          color: "#4C4C4C",
          fontSize: "9px",
          fontWeight: 400,
          cursor: "pointer",
        }}
      >
        <PageIcon name="arrowLeft" size={13} strokeWidth={1.8} />
        <span>Back to Projects</span>
      </button>

      {/* VIEW PROJECTS */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "27px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#1D1D1D",
          fontSize: "10px",
          fontWeight: 700,
        }}
      >
        <span>View Projects</span>

        <div
          style={{
            width: "33px",
            height: "27px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            background: "#3A9AE8",
            color: "#09243A",
          }}
        >
          <PageIcon name="users" size={21} strokeWidth={2.3} />
        </div>
      </div>

      {/* PROJECT CARD */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "258px",
          marginTop: "23px",
          padding: "20px 17px",
          boxSizing: "border-box",
          overflow: "hidden",
          borderRadius: "14px",
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
                fontSize: "12px",
                lineHeight: "14px",
                fontWeight: 700,
                color: "#252525",
              }}
            >
              Web Development Project
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                color: "#686868",
                fontSize: "8px",
              }}
            >
              <span style={{ color: "#E53D3D", display: "flex" }}>
                <PageIcon name="calendar" size={12} strokeWidth={1.8} />
              </span>

              <span>45 Days Left</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p
            style={{
              margin: "7px 0 9px",
              color: "#555555",
              fontSize: "9px",
              lineHeight: "13px",
              fontWeight: 400,
            }}
          >
            Build a modern web application for university students.
            <br />
            This project focuses on creating a web application using modern
            <br />
            technologies.
          </p>

          {/* PROJECT INFO */}
          <div
            style={{
              color: "#444444",
              fontSize: "9px",
              lineHeight: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "62px",
                  flexShrink: 0,
                }}
              >
                Project Type
              </span>

              <span style={{ marginLeft: "-2px" }}>:</span>

              <span>Group Project</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "62px",
                  flexShrink: 0,
                }}
              >
                Difficulty
              </span>

              <span style={{ marginLeft: "-2px" }}>:</span>

              <span>Intermediate</span>
            </div>
          </div>

          {/* REQUIREMENTS */}
          <ul
            style={{
              margin: "5px 0 0",
              padding: 0,
              listStyle: "none",
              color: "#4B4B4B",
              fontSize: "9px",
              lineHeight: "14px",
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
                  marginRight: "5px",
                  color: "#2F95E7",
                  fontSize: "10px",
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
                  marginRight: "5px",
                  color: "#2F95E7",
                  fontSize: "10px",
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
                  marginRight: "5px",
                  color: "#2F95E7",
                  fontSize: "10px",
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
              width: "175px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                marginBottom: "4px",
                color: "#5E5E5E",
                fontSize: "7px",
              }}
            >
              <PageIcon name="user" size={11} strokeWidth={1.8} />

              <span>5 Members</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "9px",
                rowGap: "4px",
              }}
            >
              {members.map((member) => (
                <div
                  key={member}
                  style={{
                    height: "14px",
                    padding: "0 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    boxSizing: "border-box",
                    borderRadius: "7px",
                    background: "#E8EDF3",
                    color: "#505050",
                    fontSize: "7px",
                    boxShadow:
                      "0 2px 4px rgba(0,0,0,.08)",
                  }}
                >
                  <PageIcon name="user" size={8} strokeWidth={2} />

                  <span>{member}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TECHNOLOGY TAGS */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "72px",
              width: "152px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: "5px 7px",
            }}
          >
            {technologies.map((technology) => (
              <span
                key={technology}
                style={{
                  padding: "4px 10px",
                  borderRadius: "12px",
                  background: "#DFEAFF",
                  color: "#3C8FDA",
                  fontSize: "8px",
                  fontWeight: 600,
                  lineHeight: "9px",
                }}
              >
                {technology}
              </span>
            ))}
          </div>

          {/* PROJECT ACTIONS */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <button
              style={{
                height: "17px",
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                border: "1px solid #9DC9F0",
                borderRadius: "6px",
                background: "#FFFFFF",
                color: "#3189D6",
                fontSize: "8px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <PageIcon name="users" size={11} strokeWidth={1.9} />
              <span>View Members</span>
            </button>

            <button
              style={{
                height: "17px",
                padding: "0 11px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                border: "none",
                borderRadius: "6px",
                background: "#3B9BE8",
                color: "#FFFFFF",
                fontSize: "8px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <PageIcon name="userPlus" size={12} strokeWidth={1.9} />
              <span>Enroll</span>
            </button>
          </div>
        </div>

        {/* LAPTOP ILLUSTRATION */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "60px",
            width: "93px",
            height: "75px",
            opacity: 0.92,
            transform: "translateX(-50%) scale(1.72)",
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
