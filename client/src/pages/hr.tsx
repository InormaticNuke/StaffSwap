import { useState } from "react";
import { useLocation, Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { HRDashboard } from "@/components/HRDashboard";
import { ExtraHoursCard } from "@/components/ExtraHoursCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, ClipboardList } from "lucide-react";
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

interface ExtraHours {
  id: string;
  worker: string;
  workSite: string;
  hours: number;
  date: string;
  status: "pending" | "approved" | "rejected";
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
];

//todo: remove mock functionality
const initialExtraHours: ExtraHours[] = [
  {
    id: "eh1",
    worker: "Mike Johnson",
    workSite: "Factory North",
    hours: 4.5,
    date: "Oct 3, 2025",
    status: "pending",
  },
  {
    id: "eh2",
    worker: "Sarah Williams",
    workSite: "Warehouse B",
    hours: 3.0,
    date: "Oct 2, 2025",
    status: "pending",
  },
];

export default function HR() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [replacements, setReplacements] = useState(initialReplacements);
  const [extraHours, setExtraHours] = useState(initialExtraHours);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setLocation("/");
  };

  const handleApproveReplacement = (id: string) => {
    //todo: remove mock functionality
    setReplacements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" as Replacement["status"] } : r))
    );
    toast({
      title: "Replacement approved",
      description: "The replacement request has been approved",
    });
  };

  const handleRejectReplacement = (id: string) => {
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

  const handleApproveHours = (id: string) => {
    //todo: remove mock functionality
    setExtraHours((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "approved" as ExtraHours["status"] } : h))
    );
    toast({
      title: "Extra hours approved",
      description: "The extra hours request has been approved",
    });
  };

  const handleRejectHours = (id: string) => {
    //todo: remove mock functionality
    setExtraHours((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "rejected" as ExtraHours["status"] } : h))
    );
    toast({
      title: "Extra hours rejected",
      description: "The extra hours request has been rejected",
      variant: "destructive",
    });
  };

  const pendingExtraHours = extraHours.filter((h) => h.status === "pending");
  const pendingReplacements = replacements.filter((r) => r.status === "pending");

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

        <Tabs defaultValue="replacements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="replacements" data-testid="tab-replacements">
              Replacements ({pendingReplacements.length})
            </TabsTrigger>
            <TabsTrigger value="hours" data-testid="tab-extra-hours">
              Extra Hours ({pendingExtraHours.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="replacements" className="mt-4">
            <HRDashboard
              replacements={replacements}
              onApprove={handleApproveReplacement}
              onReject={handleRejectReplacement}
            />
          </TabsContent>
          
          <TabsContent value="hours" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <ClipboardList className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Pending Extra Hours</h2>
                  <p className="text-sm text-muted-foreground">
                    {pendingExtraHours.length} {pendingExtraHours.length === 1 ? "request" : "requests"} waiting
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {pendingExtraHours.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                      <ClipboardList className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-medium">All caught up!</p>
                    <p className="text-sm text-muted-foreground">
                      No pending extra hours requests at the moment
                    </p>
                  </div>
                ) : (
                  pendingExtraHours.map((hours) => (
                    <ExtraHoursCard
                      key={hours.id}
                      {...hours}
                      showActions
                      onApprove={handleApproveHours}
                      onReject={handleRejectHours}
                    />
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
