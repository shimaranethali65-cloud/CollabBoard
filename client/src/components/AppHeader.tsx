import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavigationBar from "./NavigationBar";

function AppHeader({ variant = "default" }: { variant?: "default" | "bar" }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  if (variant === "bar") {
    return (
      <div>
        <NavigationBar />
        <div style={{ textAlign: "right", padding: "8px 24px" }}>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{
              border: "none",
              background: "transparent",
              color: "#2563eb",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default AppHeader;
