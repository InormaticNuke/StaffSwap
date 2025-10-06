import { useLocation, Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { ExtraHoursForm } from "@/components/ExtraHoursForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ExtraHours() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setLocation("/");
  };

  const handleSubmit = (data: any) => {
    //todo: remove mock functionality
    console.log("Extra hours logged:", data);
    toast({
      title: "Extra hours submitted",
      description: "HR has been notified for approval",
    });
  };

  const role = localStorage.getItem("userRole");

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Log Extra Hours" onLogout={handleLogout} />
      <main className="mx-auto max-w-md p-4 space-y-4">
        <Link href={role === "hr" ? "/hr" : "/supervisor"}>
          <Button variant="outline" className="w-full h-12" data-testid="button-back">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <ExtraHoursForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
