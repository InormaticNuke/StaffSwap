import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { CheckCircle, MapPin, Users, DollarSign, Calendar, XCircle } from "lucide-react";

interface ReplacementCardProps {
  id: string;
  absentWorker: string;
  replacementWorker: string;
  extraAmount: number;
  workSite: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function ReplacementCard({
  id,
  absentWorker,
  replacementWorker,
  extraAmount,
  workSite,
  status,
  date,
  showActions = false,
  onApprove,
  onReject,
}: ReplacementCardProps) {
  return (
    <Card data-testid={`card-replacement-${id}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {date}
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Absent</p>
              <p className="font-medium" data-testid={`text-absent-worker-${id}`}>{absentWorker}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Replacement</p>
              <p className="font-medium" data-testid={`text-replacement-worker-${id}`}>{replacementWorker}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm" data-testid={`text-work-site-${id}`}>{workSite}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-primary">
            <DollarSign className="h-4 w-4" />
            <span data-testid={`text-extra-amount-${id}`}>{extraAmount.toFixed(2)}</span>
          </div>
        </div>

        {showActions && status === "pending" && (
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => onApprove?.(id)}
              className="flex-1 h-10 bg-success text-success-foreground hover:bg-success"
              data-testid={`button-approve-${id}`}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={() => onReject?.(id)}
              variant="destructive"
              className="flex-1 h-10"
              data-testid={`button-reject-${id}`}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
