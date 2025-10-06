import { useState } from "react";
import { useLocation, Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { ReplacementForm } from "@/components/ReplacementForm";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Supervisor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setLocation("/");
  };

  const handleSubmit = (data: any) => {
    //todo: remove mock functionality
    console.log("Replacement created:", data);
    toast({
      title: "Replacement submitted",
      description: "HR has been notified for approval",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Create Replacement" onLogout={handleLogout} />
      <main className="mx-auto max-w-md p-4 space-y-4">
        <Link href="/history">
          <Button
            variant="outline"
            className="w-full h-12"
            data-testid="button-view-history"
          >
            <History className="h-5 w-5 mr-2" />
            View History
          </Button>
        </Link>
        <ReplacementForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
