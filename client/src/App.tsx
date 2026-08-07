import { Routes, Route, Navigate } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Spinner from "./pages/Spinner";

import { Toaster } from "react-hot-toast";

import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  
  const { user, loading, getProfile } = useContext(AuthContext);
  console.log("Current user:", user);

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster position="top-center" />
      <Routes>  
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
