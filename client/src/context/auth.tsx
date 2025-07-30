// Fixed AuthContext with proper logout handling
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import api from "../lib/axios";
import { toast } from "sonner";

interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface User {
  email: string | null;
  name: string | null;
  uid: string;
  profilePic: string | null;
  role?: string;
  phone?: string;
  credits?: number;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: Date;
  address?: Address;
  verified: boolean;
  provider?: string;
  providerId?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  deductCredits: (count: number, credits: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      setLoading(true);

      // First try to get fresh data from backend
      const res = await api.get("/account/details");
      const backendUser = res.data;

      const userData: User = {
        email: backendUser.email,
        name: backendUser.name,
        uid: backendUser._id,
        profilePic: backendUser.profilePic,
        role: backendUser.role || "",
        phone: backendUser.phone || "",
        credits: backendUser.credits,
        createdAt: backendUser.createdAt,
        updatedAt: backendUser.updatedAt,
        lastLogin: backendUser.lastLogin,
        verified: backendUser.verified || false,
        provider: backendUser.provider || "",
        providerId: backendUser.providerId || "",
        address: backendUser.address || {},
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      // If backend call fails, clear everything
      setUser(null);
      localStorage.removeItem("user");

      // Only as fallback, check if we have stored user data
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem("user");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
      await api.post("/auth/logout");
      await checkAuth();
    } catch (error) {
      toast.error("Logout completed, but there was a server error");
    }
  };

  const deductCredits = async (count: number, creditsPerUnit: number) => {
    const creditCost = count * creditsPerUnit;

    try {
      const { data } = await api.put("/account/credit", {
        creditsDeducted: creditCost,
      });

      // Defensive update
      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          credits: data?.user?.credits ?? data?.credits ?? prev.credits ?? 0,
        };
      });
    } catch (error) {
      toast.error("Failed to deduct credits" + error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, logout, deductCredits, checkAuth }}
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
