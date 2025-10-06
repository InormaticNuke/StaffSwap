import { useLocation, Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { ReplacementForm } from "@/components/ReplacementForm";
import { Button } from "@/components/ui/button";
import { History, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/context/DataContext";

export default function Supervisor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { addReplacement } = useData();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setLocation("/");
  };

  const handleSubmit = (data: any) => {
    addReplacement(data);
    toast({
      title: "Replacement submitted",
      description: "HR has been notified for approval",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Create Replacement" onLogout={handleLogout} />
      <main className="mx-auto max-w-md p-4 space-y-4">
        <div className="flex gap-3">
          <Link href="/history" className="flex-1">
            <Button
              variant="outline"
              className="w-full h-12"
              data-testid="button-view-history"
            >
              <History className="h-5 w-5 mr-2" />
              History
            </Button>
          </Link>
          <Link href="/extra-hours" className="flex-1">
            <Button
              variant="outline"
              className="w-full h-12"
              data-testid="button-log-hours"
            >
              <Clock className="h-5 w-5 mr-2" />
              Log Hours
            </Button>
          </Link>
        </div>
        <ReplacementForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
