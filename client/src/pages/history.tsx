import { useLocation, Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { ReplacementHistory } from "@/components/ReplacementHistory";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

//todo: remove mock functionality
const mockReplacements = [
  {
    id: "1",
    absentWorker: "John Doe",
    replacementWorker: "Alex Brown",
    extraAmount: 150.00,
    workSite: "Warehouse A",
    status: "approved" as const,
    date: "Oct 3, 2025",
  },
  {
    id: "2",
    absentWorker: "Jane Smith",
    replacementWorker: "Emily Davis",
    extraAmount: 200.50,
    workSite: "Office Downtown",
    status: "pending" as const,
    date: "Oct 2, 2025",
  },
  {
    id: "3",
    absentWorker: "Mike Johnson",
    replacementWorker: "Chris Wilson",
    extraAmount: 175.00,
    workSite: "Factory North",
    status: "rejected" as const,
    date: "Oct 1, 2025",
  },
  {
    id: "4",
    absentWorker: "Sarah Williams",
    replacementWorker: "Lisa Moore",
    extraAmount: 125.00,
    workSite: "Warehouse B",
    status: "approved" as const,
    date: "Sep 30, 2025",
  },
];

export default function History() {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setLocation("/");
  };

  const role = localStorage.getItem("userRole");

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Replacement History" onLogout={handleLogout} />
      <main className="mx-auto max-w-md p-4 space-y-4">
        <Link href={role === "hr" ? "/hr" : "/supervisor"}>
          <Button variant="outline" className="w-full h-12" data-testid="button-back">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <ReplacementHistory replacements={mockReplacements} />
      </main>
    </div>
  );
}
