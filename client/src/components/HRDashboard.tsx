import { ClipboardList } from "lucide-react";
import { ReplacementCard } from "./ReplacementCard";
import { Badge } from "@/components/ui/badge";

interface Replacement {
  id: string;
  shiftType: "reemplazo" | "apoyo" | "induccion";
  absentWorker?: string;
  reason?: string;
  replacementWorker?: string;
  worker?: string;
  extraAmount: number;
  workSite: string;
  status: "pending" | "approved" | "rejected";
  date: string;

  // Datos adicionales
  unregisteredName?: string;
  unregisteredRut?: string;
  unregisteredPhone?: string;
  idImageUrl?: string | null;
  photoImageUrl?: string | null;
}

interface HRDashboardProps {
  replacements: Replacement[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function HRDashboard({ replacements, onApprove, onReject }: HRDashboardProps) {
  const pendingRequests = replacements.filter((r) => r.status === "pending");

  const getShiftColor = (shiftType: string) => {
    switch (shiftType) {
      case "reemplazo":
        return "bg-blue-100 text-blue-700";
      case "apoyo":
        return "bg-green-100 text-green-700";
      case "induccion":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-5">
      {/* Encabezado principal */}
      <div className="flex items-center gap-3 pb-2 border-b">
        <ClipboardList className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Solicitudes Pendientes</h2>
          <p className="text-sm text-muted-foreground">
            {pendingRequests.length}{" "}
            {pendingRequests.length === 1 ? "solicitud pendiente" : "solicitudes pendientes"}
          </p>
        </div>
      </div>

      {/* Sin solicitudes */}
      {pendingRequests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ClipboardList className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium">¡Todo al día!</p>
          <p className="text-sm text-muted-foreground">
            No hay solicitudes pendientes en este momento.
          </p>
        </div>
      )}

      {/* Listado de solicitudes */}
      <div className="space-y-5">
        {pendingRequests.map((req) => (
          <div key={req.id} className="space-y-2">
            {/* Etiqueta tipo de turno */}
            <div className="flex justify-start">
              <Badge className={`${getShiftColor(req.shiftType)} text-xs px-3 py-1 rounded-full`}>
                {req.shiftType.charAt(0).toUpperCase() + req.shiftType.slice(1)}
              </Badge>
            </div>

            {/* Tarjeta */}
            <ReplacementCard
              {...req}
              showActions
              onApprove={onApprove}
              onReject={onReject}
            />
          </div>
        ))}
      </div>
    </div>
  );
}