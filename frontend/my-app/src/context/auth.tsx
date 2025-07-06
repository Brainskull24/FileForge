import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../lib/firebase";
import type { ReactNode } from "react";

type AuthType = "firebase" | "custom";

interface User {
  email: string | null;
  name: string | null;
  uid: string;
  photo: string | null;
  role?: string;
  university?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  authType: AuthType | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authType, setAuthType] = useState<AuthType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Handle Firebase user
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser);
        const { email, displayName, uid, photoURL } = firebaseUser;

        const userData: User = {
          email,
          name: displayName,
          uid,
          photo: photoURL,
        };

        setUser(userData);
        setToken(token);
        setAuthType("firebase");

        localStorage.setItem("authType", "firebase");
        localStorage.setItem("token", token);
      } else {
        // 2. Try loading custom backend user from localStorage
        const stored = localStorage.getItem("backendUser");
        const storedToken = localStorage.getItem("token");

        if (stored && storedToken) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setToken(storedToken);
          setAuthType("custom");
        } else {
          setUser(null);
          setToken(null);
          setAuthType(null);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    // Firebase logout
    auth.signOut();

    // Clear backend auth
    localStorage.removeItem("backendUser");
    localStorage.removeItem("token");
    localStorage.removeItem("authType");

    setUser(null);
    setToken(null);
    setAuthType(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, authType, loading, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
