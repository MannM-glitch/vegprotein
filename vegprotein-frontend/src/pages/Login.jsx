import React from "react";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../components/ui/sign-up";

export default function Login() {
  const navigate = useNavigate();

  const handleSkip = () => {
    localStorage.setItem("token", "demo-token");
    navigate("/dashboard");
  };

  const handleSuccess = () => {
    localStorage.setItem("token", "demo-token");
    navigate("/dashboard");
  };

  return (
    <SignUp 
      onSkip={handleSkip} 
      onSuccess={handleSuccess} 
    />
  );
}
