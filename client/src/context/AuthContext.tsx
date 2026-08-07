import { createContext, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out.");
    }
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    getProfile,
    logout,
  };

  return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
  );
}