import { useState } from "react";
import { useLocation } from "wouter";
import { LoginForm } from "@/components/LoginForm";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = (username: string, password: string) => {
    //todo: remove mock functionality
    if (username === "supervisor" && password === "pass") {
      localStorage.setItem("userRole", "supervisor");
      toast({
        title: "Login successful",
        description: "Welcome back, Supervisor!",
      });
      setLocation("/supervisor");
    } else if (username === "hr" && password === "pass") {
      localStorage.setItem("userRole", "hr");
      toast({
        title: "Login successful",
        description: "Welcome back, HR Manager!",
      });
      setLocation("/hr");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}
