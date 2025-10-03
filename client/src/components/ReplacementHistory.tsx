import { useState } from "react";
import { ReplacementCard } from "./ReplacementCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface Replacement {
  id: string;
  absentWorker: string;
  replacementWorker: string;
  extraAmount: number;
  workSite: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

interface ReplacementHistoryProps {
  replacements: Replacement[];
}

export function ReplacementHistory({ replacements }: ReplacementHistoryProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredReplacements = replacements.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="h-10 w-40" data-testid="select-filter">
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
        {filteredReplacements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <Filter className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium">No replacements found</p>
            <p className="text-sm text-muted-foreground">
              {filter === "all" ? "No replacements have been created yet" : `No ${filter} replacements`}
            </p>
          </div>
        ) : (
          filteredReplacements.map((replacement) => (
            <ReplacementCard key={replacement.id} {...replacement} />
          ))
        )}
      </div>
    </div>
  );
}
