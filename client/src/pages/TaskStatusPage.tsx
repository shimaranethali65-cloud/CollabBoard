import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

type IconName = "search" | "chevronDown" | "plus" | "calendar" | "clipboard";

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
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    chevronDown: <path d="m6 9 6 6 6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4.5V3h6v1.5M8.5 10h7M8.5 14h7" />
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

const columnStyles = {
  todo: {
    background: "#E0EDFF",
    border: "1px solid #C1D8FA",
    countBackground: "#C4DFFF",
    countColor: "#1684DD",
    buttonBorder: "#A8C9EF",
  },
  doing: {
    background: "#FBFEE6",
    border: "1px solid #E5E9BD",
    countBackground: "#FFE84E",
    countColor: "#5D5A00",
    buttonBorder: "#EBDF91",
  },
  done: {
    background: "#DEFFE5",
    border: "1px solid #BAF3C5",
    countBackground: "#8DE997",
    countColor: "#218333",
    buttonBorder: "#9BE7A8",
  },
};

// Define what a Task looks like coming from your database
interface BackendTask {
  _id: string;
  title: string;
  description: string;
  status: "To Do" | "Doing" | "Done";
  createdAt: string;
}

function TaskStatusPage() {
  // Grab the projectId from the URL (e.g., /task-status/:projectId)
  const { projectId } = useParams<{ projectId: string }>();
  
  const [tasks, setTasks] = useState<BackendTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${projectId}`);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        
        const data = await response.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, [projectId]);

  // Helper function to format the database date (e.g., "Oct 24")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Dynamically build the columns based on the fetched tasks
  const todoTasks = tasks.filter((t) => t.status === "To Do");
  const doingTasks = tasks.filter((t) => t.status === "Doing");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  const dynamicColumns = [
    { title: "To Do", count: todoTasks.length, type: "todo" as const, items: todoTasks },
    { title: "Doing", count: doingTasks.length, type: "doing" as const, items: doingTasks },
    { title: "Done", count: doneTasks.length, type: "done" as const, items: doneTasks },
  ];

  if (loading) return <div style={{ padding: "24px" }}>Loading task board...</div>;
  if (error) return <div style={{ padding: "24px", color: "red" }}>Error: {error}</div>;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        padding: "24px",
        background: "#F5F8FF",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#252525",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <NavigationBar style={{ margin: "-24px -24px 24px", flexShrink: 0 }} />

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginLeft: "4px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            background: "#3B9AE8",
            color: "#10283D",
          }}
        >
          <PageIcon name="clipboard" size={27} strokeWidth={2.2} />
        </div>

        <div>
          <h1
            style={{
              margin: 0,
              color: "#1887D8",
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: 700,
            }}
          >
            Task Board
          </h1>
          <p
            style={{
              margin: 0,
              color: "#3D3D3D",
              fontSize: "13px",
              lineHeight: "17px",
              fontWeight: 400,
            }}
          >
            Organize and track your tasks across different stages.
          </p>
        </div>
      </div>

      {/* BOARD */}
      <div
        style={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          padding: "16px",
          boxSizing: "border-box",
          background: "#E9F1FF",
          borderRadius: "18px",
          boxShadow: "0 3px 6px rgba(61,83,112,.10), 0 5px 13px rgba(61,83,112,.10)",
        }}
      >
        {/* TOOLBAR */}
        <div
          style={{
            height: "48px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              width: "190px",
              height: "32px",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              border: "1px solid #B9C2CF",
              borderRadius: "8px",
              background: "#FFFFFF",
              color: "#666666",
              fontSize: "12px",
              fontWeight: 400,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                position: "relative",
                width: "15px",
                height: "11px",
                display: "inline-block",
                borderRadius: "2px",
                background: "#7255FF",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "2px",
                  top: "-3px",
                  width: "7px",
                  height: "4px",
                  borderRadius: "1px 1px 0 0",
                  background: "#7255FF",
                }}
              />
            </span>

            <span>All Projects</span>
            <PageIcon name="chevronDown" size={16} strokeWidth={1.8} style={{ marginLeft: "auto" }} />
          </button>

          <div
            style={{
              width: "200px",
              height: "32px",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              boxSizing: "border-box",
              border: "1px solid #BCC4CF",
              borderRadius: "16px",
              background: "#FFFFFF",
              color: "#727272",
            }}
          >
            <PageIcon name="search" size={16} strokeWidth={1.8} />
            <input
              placeholder="Search tasks..."
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#444444",
                fontSize: "12px",
              }}
            />
          </div>
        </div>

        {/* COLUMNS */}
        <div
          style={{
            height: "222px",
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {dynamicColumns.map((column) => {
            const colors = columnStyles[column.type];

            return (
              <div
                key={column.title}
                style={{
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                  background: colors.background,
                  border: colors.border,
                }}
              >
                {/* COLUMN HEADER */}
                <div
                  style={{
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#242424",
                    }}
                  >
                    {column.title}
                  </span>

                  <span
                    style={{
                      width: "26px",
                      height: "26px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: colors.countBackground,
                      color: colors.countColor,
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {column.count}
                  </span>
                </div>

                {/* TASKS */}
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginTop: "8px",
                    overflowY: "auto",
                  }}
                >
                  {column.items.map((task) => (
                    <div
                      key={task._id}
                      style={{
                        minHeight: "94px",
                        padding: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        boxSizing: "border-box",
                        borderRadius: "7px",
                        background: "rgba(255,255,255,.72)",
                        border: "1px solid rgba(172,184,201,.52)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          lineHeight: "16px",
                          fontWeight: 700,
                          color: "#292929",
                        }}
                      >
                        {task.title}
                      </div>

                      <div
                        style={{
                          fontSize: "11px",
                          lineHeight: "14px",
                          color: "#8B8B8B",
                        }}
                      >
                        {task.description}
                      </div>

                      <div
                        style={{
                          marginTop: "auto",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "11px",
                          color: "#8B8B8B",
                        }}
                      >
                        <PageIcon name="calendar" size={12} strokeWidth={1.6} />
                        <span>{formatDate(task.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ADD TASK BUTTON */}
                <button
                  style={{
                    width: "100%",
                    height: "34px",
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    borderRadius: "6px",
                    border: `1px solid ${colors.buttonBorder}`,
                    background: "rgba(255,255,255,.38)",
                    color: "#2F95E6",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  <PageIcon name="plus" size={16} strokeWidth={1.8} />
                  <span>Add task</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TaskStatusPage;
