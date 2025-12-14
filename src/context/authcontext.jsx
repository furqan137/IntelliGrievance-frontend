import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("intelli_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const authData = {
      ...res.data.user,
      token: res.data.token,
    };

    localStorage.setItem("intelli_user", JSON.stringify(authData));
    setUser(authData);

    return authData;
  };

  // 📝 REGISTER (FIXED: includes role)
  const register = async (name, email, password, role) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });

    return res.data;
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("intelli_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
