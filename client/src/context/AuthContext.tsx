import { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const value = {
    user,
    setUser, 
  };

  return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
  );
}