import { useState } from "react";
import { ReplacementCard } from "./ReplacementCard";
import { ClipboardList } from "lucide-react";

interface Replacement {
  id: string;
  absentWorker: string;
  replacementWorker: string;
  extraAmount: number;
  workSite: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

interface HRDashboardProps {
  replacements: Replacement[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function HRDashboard({ replacements, onApprove, onReject }: HRDashboardProps) {
  const pendingReplacements = replacements.filter((r) => r.status === "pending");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-2">
        <ClipboardList className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Pending Approvals</h2>
          <p className="text-sm text-muted-foreground">
            {pendingReplacements.length} {pendingReplacements.length === 1 ? "request" : "requests"} waiting
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {pendingReplacements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ClipboardList className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium">All caught up!</p>
            <p className="text-sm text-muted-foreground">
              No pending replacement requests at the moment
            </p>
          </div>
        ) : (
          pendingReplacements.map((replacement) => (
            <ReplacementCard
              key={replacement.id}
              {...replacement}
              showActions
              onApprove={onApprove}
              onReject={onReject}
            />
          ))
        )}
      </div>
    </div>
  );
}
