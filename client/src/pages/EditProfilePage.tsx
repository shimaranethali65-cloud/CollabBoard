import { useState, useEffect, type CSSProperties, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/userService";

const fieldStyle: CSSProperties = {
  width: "100%",
  height: 40,
  boxSizing: "border-box",
  marginTop: 8,
  padding: "0 14px",
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  outline: "none",
  backgroundColor: "#ffffff",
  color: "#1e293b",
  fontSize: 14,
  fontFamily: "Arial, Helvetica, sans-serif",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: 16,
  color: "#334155",
  fontSize: 14,
  fontWeight: 600,
};

function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername) {
      setMessage({ type: "error", text: "Username is required." });
      return;
    }

    try {
      setIsSubmitting(true);
      const updated = await updateProfile({
        name: trimmedName,
        username: trimmedUsername,
        email: trimmedEmail || undefined,
      });

      updateUser(updated);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to update profile. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#1e293b",
      }}
    >
      <style>{`
        .edit-profile-main {
          max-width: 600px;
          margin: 40px auto;
          padding: 0 16px;
        }
        .edit-profile-card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 36px 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);
          border: 1px solid #e2e8f0;
        }
        @media (max-width: 600px) {
          .edit-profile-main {
            margin: 20px auto;
            padding: 0 12px;
          }
          .edit-profile-card {
            padding: 24px 18px;
          }
        }
      `}</style>

      <NavigationBar />

      <main className="edit-profile-main">
        <div className="edit-profile-card">
          {/* Header */}
          <div style={{ marginBottom: 28, textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "#dbeafe",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: 28,
              }}
            >
              👤
            </div>
            <h1
              style={{
                margin: "0 0 8px 0",
                fontSize: 24,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Edit Profile
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>
              Update your account details and profile information.
            </p>
          </div>

          {message && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                marginBottom: 20,
                fontSize: 14,
                backgroundColor: message.type === "success" ? "#dcfce7" : "#fee2e2",
                color: message.type === "success" ? "#15803d" : "#b91c1c",
                border: `1px solid ${message.type === "success" ? "#bbf7d0" : "#fecaca"}`,
              }}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>
              Full Name
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={fieldStyle}
              />
            </label>

            <label style={labelStyle}>
              Username
              <input
                type="text"
                placeholder="e.g. janedoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={fieldStyle}
              />
            </label>

            <label style={labelStyle}>
              Email Address
              <input
                type="email"
                placeholder="e.g. jane.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={fieldStyle}
              />
            </label>

            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 32,
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/profile")}
                style={{
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#475569",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "10px 24px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: isSubmitting ? "#93c5fd" : "#2563eb",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
                }}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProfilePage;

