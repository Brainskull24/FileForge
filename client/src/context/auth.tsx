import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../lib/firebase";
import type { ReactNode } from "react";
import api from "../lib/axios";

type AuthType = "firebase" | "custom";

interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

interface User {
  email: string | null;
  name: string | null;
  uid: string;
  photo: string | null;
  role?: string;
  phone?: string;
  credits?: number;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: Date;
  address?: Address;
}

interface AuthContextType {
  user: User | null;
  token: string | null; // will only be used for Firebase
  authType: AuthType | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // Only used for Firebase
  const [authType, setAuthType] = useState<AuthType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setLoading(false); 
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // ✅ Firebase flow
        const token = await getIdToken(firebaseUser);
        const { email, displayName, uid, photoURL } = firebaseUser;

        const userData: User = {
          email,
          name: displayName,
          uid,
          photo: photoURL,
          credits: 0,
        };

        setUser(userData);
        setToken(token);
        setAuthType("firebase");
      } else {
        try {
          const res = await api.get("/account/details"); // token sent via cookie
          const backendUser = res.data;

          const userData: User = {
            email: backendUser.email,
            name: backendUser.name,
            uid: backendUser._id,
            photo: backendUser.profilePic || null,
            role: backendUser.role || "",
            phone: backendUser.phone || "",
            credits: backendUser.credits,
            createdAt: backendUser.createdAt,
            updatedAt: backendUser.updatedAt,
            lastLogin: backendUser.lastLogin,
            address: backendUser.address || {}, // structured address
          };

          setUser(userData);
          setToken(null);
          setAuthType("custom");
        } catch (error) {
          console.warn("No valid backend session");
          setUser(null);
          setToken(null);
          setAuthType(null);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    if (authType === "firebase") {
      await auth.signOut();
    } else if (authType === "custom") {
      await api.post("/auth/logout"); // optional if you build this route
    }

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
