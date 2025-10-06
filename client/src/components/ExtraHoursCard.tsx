import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { CheckCircle, MapPin, User, Clock, Calendar, XCircle } from "lucide-react";

interface ExtraHoursCardProps {
  id: string;
  worker: string;
  workSite: string;
  hours: number;
  date: string;
  status: "pending" | "approved" | "rejected";
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function ExtraHoursCard({
  id,
  worker,
  workSite,
  hours,
  date,
  status,
  showActions = false,
  onApprove,
  onReject,
}: ExtraHoursCardProps) {
  return (
    <Card data-testid={`card-extra-hours-${id}`}>
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
            <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Worker</p>
              <p className="font-medium" data-testid={`text-worker-${id}`}>{worker}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Work Site</p>
              <p className="font-medium" data-testid={`text-work-site-${id}`}>{workSite}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2 border-t">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold text-primary" data-testid={`text-hours-${id}`}>
            {hours} {hours === 1 ? "hour" : "hours"}
          </span>
        </div>

        {showActions && status === "pending" && (
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => onApprove?.(id)}
              className="flex-1 h-10 bg-success text-success-foreground hover:bg-success"
              data-testid={`button-approve-hours-${id}`}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={() => onReject?.(id)}
              variant="destructive"
              className="flex-1 h-10"
              data-testid={`button-reject-hours-${id}`}
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
