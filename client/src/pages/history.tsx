import { useLocation, Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { ReplacementHistory } from "@/components/ReplacementHistory";
import { ExtraHoursCard } from "@/components/ExtraHoursCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Filter } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/context/DataContext";

export default function History() {
  const [, setLocation] = useLocation();
  const [hoursFilter, setHoursFilter] = useState<string>("all");
  const { replacements, extraHours } = useData();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setLocation("/");
  };

  const filteredExtraHours = extraHours.filter((h) => {
    if (hoursFilter === "all") return true;
    return h.status === hoursFilter;
  });

  const role = localStorage.getItem("userRole");

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="History" onLogout={handleLogout} />
      <main className="mx-auto max-w-md p-4 space-y-4">
        <Link href={role === "hr" ? "/hr" : "/supervisor"}>
          <Button variant="outline" className="w-full h-12" data-testid="button-back">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Tabs defaultValue="replacements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="replacements" data-testid="tab-replacements-history">
              Replacements
            </TabsTrigger>
            <TabsTrigger value="hours" data-testid="tab-hours-history">
              Extra Hours
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="replacements" className="mt-4">
            <ReplacementHistory replacements={replacements} />
          </TabsContent>
          
          <TabsContent value="hours" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select value={hoursFilter} onValueChange={setHoursFilter}>
                  <SelectTrigger className="h-10 w-40" data-testid="select-filter-hours">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredExtraHours.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                      <Filter className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-medium">No extra hours found</p>
                    <p className="text-sm text-muted-foreground">
                      {hoursFilter === "all" ? "No extra hours have been logged yet" : `No ${hoursFilter} extra hours`}
                    </p>
                  </div>
                ) : (
                  filteredExtraHours.map((hours) => (
                    <ExtraHoursCard key={hours.id} {...hours} />
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
