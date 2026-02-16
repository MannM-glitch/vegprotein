import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../components/ui/sign-up";
import { register, login, setAuth } from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  const handleSkip = () => {
    localStorage.setItem("token", "demo-token");
    navigate("/dashboard");
  };

  const handleAuth = async (email, password, isLogin = false) => {
    try {
      setAuthError(null);
      
      if (isLogin) {
        // Login flow
        const data = await login(email, password);
        localStorage.setItem("token", data.access_token);
        setAuth(data.access_token);
        return { success: true };
      } else {
        // Register flow
        await register(email, password);
        // After registration, login to get the token
        const data = await login(email, password);
        localStorage.setItem("token", data.access_token);
        setAuth(data.access_token);
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.detail || "Authentication failed";
      setAuthError(message);
      return { success: false, error: message };
    }
  };

  const handleSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <SignUp 
      onSkip={handleSkip} 
      onSuccess={handleSuccess}
      onAuth={handleAuth}
      authError={authError}
    />
  );
}

