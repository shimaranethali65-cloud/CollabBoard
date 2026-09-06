import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { getCurrentUser, loginUser, loginAdmin, registerUser } from "../services/authService";
import type { User } from "../types";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  adminLogin: (identifier: string, password: string) => Promise<void>;
  register: (payload: {
    name?: string;
    username: string;
    email?: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "collabboard_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const current = await getCurrentUser();
        setUser(current);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      login: async (identifier, password) => {
        const result = await loginUser({ username: identifier, password });
        localStorage.setItem(TOKEN_KEY, result.token);
        setToken(result.token);
        setUser(result.user);
      },
      adminLogin: async (identifier, password) => {
        const result = await loginAdmin({ username: identifier, password });
        localStorage.setItem(TOKEN_KEY, result.token);
        setToken(result.token);
        setUser(result.user);
      },
      register: async (payload) => {
        const result = await registerUser(payload);
        if (result.token) {
          localStorage.setItem(TOKEN_KEY, result.token);
          setToken(result.token);
          setUser(result.user);
        }
      },
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      },
      updateUser: (updatedUser: User) => {
        setUser(updatedUser);
      },
      refreshUser: async () => {
        try {
          const current = await getCurrentUser();
          setUser(current);
        } catch (err) {
          console.error("Failed to refresh user:", err);
        }
      }
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
