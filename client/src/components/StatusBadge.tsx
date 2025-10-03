import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-warning text-warning-foreground",
      icon: Clock,
    },
    approved: {
      label: "Approved",
      className: "bg-success text-success-foreground",
      icon: CheckCircle,
    },
    rejected: {
      label: "Rejected",
      className: "bg-destructive text-destructive-foreground",
      icon: XCircle,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} inline-flex items-center gap-1.5`} data-testid={`badge-status-${status}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
}
