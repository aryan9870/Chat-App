import { createContext, useState } from "react";
import api from "../api/axios";


export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
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

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    getProfile
  };

  return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
  );
}