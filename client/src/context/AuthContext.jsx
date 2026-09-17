import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("nuzio_token") || null);
  const [loading, setLoading] = useState(true);

  // Modal Visibility States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.getMe();
        setUser(data.user);
      } catch (err) {
        console.warn("Auth token invalid, clearing state:", err.message);
        localStorage.removeItem("nuzio_token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const handleAuthSuccess = (data) => {
    localStorage.setItem("nuzio_token", data.token);
    setToken(data.token);
    setUser(data.user);
    setIsAuthModalOpen(false);
  };

  const login = async (email, password) => {
    const data = await api.login(email, password);
    handleAuthSuccess(data);
    return data;
  };

  const demoLogin = async () => {
    const data = await api.demoLogin();
    handleAuthSuccess(data);
    return data;
  };

  const register = async (userData) => {
    const data = await api.register(userData);
    handleAuthSuccess(data);
    setIsOnboardingModalOpen(true); // show onboarding wizard immediately after register
    return data;
  };

  const logout = () => {
    localStorage.removeItem("nuzio_token");
    setToken(null);
    setUser(null);
  };

  const updatePreferences = async (newPrefs) => {
    const data = await api.updatePreferences(newPrefs);
    setUser(data.user);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        demoLogin,
        register,
        logout,
        updatePreferences,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isOnboardingModalOpen,
        setIsOnboardingModalOpen,
        isCustomModalOpen,
        setIsCustomModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
