import { useState } from "react";
import { useLocation, Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { HRDashboard } from "@/components/HRDashboard";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Replacement {
  id: string;
  absentWorker: string;
  replacementWorker: string;
  extraAmount: number;
  workSite: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

//todo: remove mock functionality
const initialReplacements: Replacement[] = [
  {
    id: "1",
    absentWorker: "John Doe",
    replacementWorker: "Alex Brown",
    extraAmount: 150.00,
    workSite: "Warehouse A",
    status: "pending",
    date: "Oct 3, 2025",
  },
  {
    id: "2",
    absentWorker: "Jane Smith",
    replacementWorker: "Emily Davis",
    extraAmount: 200.50,
    workSite: "Office Downtown",
    status: "pending",
    date: "Oct 2, 2025",
  },
  {
    id: "3",
    absentWorker: "Mike Johnson",
    replacementWorker: "Chris Wilson",
    extraAmount: 175.00,
    workSite: "Factory North",
    status: "approved",
    date: "Oct 1, 2025",
  },
];

export default function HR() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [replacements, setReplacements] = useState(initialReplacements);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setLocation("/");
  };

  const handleApprove = (id: string) => {
    //todo: remove mock functionality
    setReplacements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" as Replacement["status"] } : r))
    );
    toast({
      title: "Replacement approved",
      description: "The replacement request has been approved",
    });
  };

  const handleReject = (id: string) => {
    //todo: remove mock functionality
    setReplacements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" as Replacement["status"] } : r))
    );
    toast({
      title: "Replacement rejected",
      description: "The replacement request has been rejected",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="HR Dashboard" onLogout={handleLogout} />
      <main className="mx-auto max-w-md p-4 space-y-4">
        <Link href="/history">
          <Button variant="outline" className="w-full h-12" data-testid="button-view-history">
            <History className="h-5 w-5 mr-2" />
            View History
          </Button>
        </Link>
        <HRDashboard
          replacements={replacements}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </main>
    </div>
  );
}
