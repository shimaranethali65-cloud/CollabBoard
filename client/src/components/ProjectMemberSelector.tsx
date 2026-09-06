import React, { useState, useEffect, useRef } from "react";
import { searchUsers } from "../services/userService";
import type { User } from "../types";

interface ProjectMemberSelectorProps {
  selectedMembers: User[];
  onChange: (members: User[]) => void;
  placeholder?: string;
  label?: string;
}

export default function ProjectMemberSelector({
  selectedMembers,
  onChange,
  placeholder = "Search by username to add members...",
  label = "Project Members"
}: ProjectMemberSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Search users dynamically from database
  useEffect(() => {
    let isCurrent = true;
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await searchUsers(searchTerm.trim());
        if (isCurrent && Array.isArray(users)) {
          // Filter out already selected members
          const filtered = users.filter(
            (u) => !selectedMembers.some((m) => (m._id || (m as any).id) === (u._id || (u as any).id))
          );
          setSearchResults(filtered);
        }
      } catch (err) {
        console.error("User search failed:", err);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchUsers, 150);
    return () => {
      isCurrent = false;
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, selectedMembers]);

  const handleMakeLeader = (index: number) => {
    if (index === 0) return;
    const updated = [...selectedMembers];
    const [promoted] = updated.splice(index, 1);
    updated.unshift(promoted);
    onChange(updated);
  };

  const handleAddMember = (user: User) => {
    onChange([...selectedMembers, user]);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleRemoveMember = (userId: string) => {
    onChange(selectedMembers.filter((m) => (m._id || (m as any).id) !== userId));
  };

  return (
    <div ref={containerRef} style={{ width: "100%", marginBottom: 14 }}>
      {label && (
        <span
          style={{
            display: "block",
            marginBottom: 8,
            color: "#111827",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {label} ({selectedMembers.length})
        </span>
      )}

      {/* Selected Members Chips */}
      {selectedMembers.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            {selectedMembers.map((member, index) => {
              const isLeader = index === 0;
              const memberId = member._id || (member as any).id;
              const displayName = member.name || member.username;
              const username = member.username || "user";
              return (
                <span
                  key={memberId}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 10px 5px 6px",
                    backgroundColor: isLeader ? "#fffbeb" : "#ffffff",
                    border: isLeader ? "1.5px solid #f59e0b" : "1px solid #bfdbfe",
                    borderRadius: "20px",
                    fontSize: "13px",
                    color: isLeader ? "#92400e" : "#1e3a8a",
                    boxShadow: isLeader
                      ? "0 2px 4px rgba(245, 158, 11, 0.15)"
                      : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: isLeader ? "#f59e0b" : "#3b82f6",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                  <span style={{ fontWeight: 700 }}>{displayName}</span>
                  <span style={{ color: isLeader ? "#d97706" : "#60a5fa", fontSize: "11px" }}>@{username}</span>
                  {isLeader ? (
                    <span
                      style={{
                        backgroundColor: "#fef3c7",
                        color: "#b45309",
                        border: "1px solid #fde68a",
                        padding: "1px 6px",
                        borderRadius: "10px",
                        fontSize: "10px",
                        fontWeight: "800",
                        letterSpacing: "0.4px",
                      }}
                    >
                      👑 Group Leader
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMakeLeader(index)}
                      title="Set this member as the Group Leader"
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        backgroundColor: "#fef3c7",
                        border: "1px solid #fde68a",
                        color: "#b45309",
                        borderRadius: "10px",
                        padding: "1px 6px",
                        cursor: "pointer",
                      }}
                    >
                      👑 Set Leader
                    </button>
                  )}
                  <button
                    type="button"
                    aria-label={`Remove ${displayName}`}
                    onClick={() => handleRemoveMember(memberId)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0 2px",
                      color: "#94a3b8",
                      fontSize: "14px",
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "2px",
                      borderRadius: "50%",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    ✕
                  </button>
                </span>
              );
            })}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ color: "#d97706" }}>👑</span>
            <span>
              The first assigned member is the <strong>Group Leader</strong> (only the leader can submit or transfer leadership).
            </span>
          </div>
        </div>
      )}

      {/* Search Input Container */}
      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: 38,
            boxSizing: "border-box",
            padding: "0 12px",
            backgroundColor: "#ffffff",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <span style={{ color: "#94a3b8", marginRight: 8, fontSize: 14 }}>🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            style={{
              flex: 1,
              height: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 13,
              color: "#1e293b",
              fontFamily: "inherit",
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              style={{
                border: "none",
                background: "none",
                color: "#94a3b8",
                cursor: "pointer",
                padding: "2px",
                fontSize: 12,
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown Suggestions */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "44px",
              left: 0,
              right: 0,
              maxHeight: "220px",
              overflowY: "auto",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              zIndex: 1000,
              padding: "6px",
            }}
          >
            {loading && (
              <div style={{ padding: "10px", textAlign: "center", color: "#64748b", fontSize: 13 }}>
                Searching users in database...
              </div>
            )}

            {!loading && searchResults.length === 0 && (
              <div style={{ padding: "10px", textAlign: "center", color: "#64748b", fontSize: 13 }}>
                {searchTerm ? `No users matching "${searchTerm}"` : "No additional users available"}
              </div>
            )}

            {!loading &&
              searchResults.map((user) => {
                const userId = user._id || (user as any).id;
                const displayName = user.name || user.username;
                return (
                  <div
                    key={userId}
                    onClick={() => handleAddMember(user)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: "#dbeafe",
                          color: "#2563eb",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
                          {displayName}
                        </div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>
                          @{user.username} {user.email ? `• ${user.email}` : ""}
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#2563eb",
                        fontWeight: 600,
                        backgroundColor: "#eff6ff",
                        padding: "3px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      + Add
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

