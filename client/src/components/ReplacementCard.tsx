import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import {
  CheckCircle,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  XCircle,
  FileText,
  Info,
  UserPlus,
  IdCard,
  Shirt,
  MessageSquare,
} from "lucide-react";

interface ReplacementCardProps {
  id: string;
  shiftType: "reemplazo" | "apoyo" | "induccion";
  absentWorker?: string;
  reason?: string;
  replacementWorker?: string;
  worker?: string;
  extraAmount: number | string;
  workSite: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  approvalLetterUrl?: string | null;
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;

  // Campos adicionales
  comments?: string; // 🔹 Nuevo campo para Apoyo e Inducción
  unregisteredName?: string;
  unregisteredRut?: string;
  unregisteredPhone?: string;
  idImageUrl?: string | null;
  photoImageUrl?: string | null;
}

export function ReplacementCard({
  id,
  shiftType,
  absentWorker,
  reason,
  replacementWorker,
  worker,
  extraAmount,
  workSite,
  status,
  date,
  approvalLetterUrl,
  showActions = false,
  onApprove,
  onReject,
  comments,
  unregisteredName,
  unregisteredRut,
  unregisteredPhone,
  idImageUrl,
  photoImageUrl,
}: ReplacementCardProps) {
  const formattedAmount = Number(extraAmount) || 0;
  const workerName =
    shiftType === "reemplazo" ? replacementWorker : worker || "No especificado";
  const isUnregistered = workerName === "noPerson";

  return (
    <Card data-testid={`card-replacement-${id}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {date}
        </div>
        <StatusBadge status={status} />
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Tipo de turno */}
        <div className="flex items-center gap-2 border-b pb-2">
          <Info className="h-5 w-5 text-primary" />
          <p className="font-semibold capitalize">
            Tipo de turno:{" "}
            <span className="text-primary font-normal">{shiftType}</span>
          </p>
        </div>

        {/* Si es REEMPLAZO, mostrar ausente + razón */}
        {shiftType === "reemplazo" && (
          <>
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Trabajador ausente
                </p>
                <p className="font-medium">
                  {absentWorker || "No especificado"}
                </p>
              </div>
            </div>

            {reason && (
              <div className="border rounded-lg p-3 bg-blue-50">
                <p className="font-semibold text-blue-700 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-600" /> Razón de ausencia
                </p>
                <p className="text-gray-700 mt-1">{reason}</p>
              </div>
            )}
          </>
        )}

        {/* Si es APOYO o INDUCCIÓN, mostrar comentarios */}
        {(shiftType === "apoyo" || shiftType === "induccion") && comments && (
          <div className="border rounded-lg p-3 bg-green-50">
            <p className="font-semibold text-green-700 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-green-600" /> Comentario del turno
            </p>
            <p className="text-gray-700 mt-1">{comments}</p>
          </div>
        )}

        {/* Trabajador asignado */}
        <div className="flex items-start gap-2 pt-2">
          <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Persona asignada</p>
            <p className="font-medium capitalize">
              {isUnregistered ? "Persona no enrolada" : workerName}
            </p>
          </div>
        </div>

        {/* Lugar y monto */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{workSite}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-primary">
            <DollarSign className="h-4 w-4" />
            <span>{formattedAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Persona no enrolada */}
        {isUnregistered && (
          <div className="p-3 border border-amber-300 rounded-lg bg-amber-50 mt-3 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <UserPlus className="h-4 w-4 text-amber-600" />
              <p className="font-semibold text-amber-700">Persona No Enrolada</p>
            </div>

            <div className="space-y-1 text-sm">
              <p>
                <strong>Nombre:</strong> {unregisteredName || "No ingresado"}
              </p>
              <p>
                <strong>RUT:</strong> {unregisteredRut || "No ingresado"}
              </p>
              <p>
                <strong>Teléfono:</strong> {unregisteredPhone || "No ingresado"}
              </p>
            </div>

            {(idImageUrl || photoImageUrl) && (
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                {idImageUrl && (
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <IdCard className="h-3 w-3" /> Cédula de Identidad
                    </p>
                    <img
                      src={idImageUrl}
                      alt="CI"
                      className="w-full sm:w-40 rounded-lg shadow border"
                    />
                  </div>
                )}
                {photoImageUrl && (
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Shirt className="h-3 w-3" /> Foto con Indumentaria
                    </p>
                    <img
                      src={photoImageUrl}
                      alt="Uniforme"
                      className="w-full sm:w-40 rounded-lg shadow border"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Botones de acción */}
        {showActions && status === "pending" && (
          <>
            <hr className="my-3 border-t" />
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => onApprove?.(id)}
                className="flex-1 h-10 bg-success text-success-foreground hover:bg-success/90"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Aprobar
              </Button>
              <Button
                onClick={() => onReject?.(id)}
                variant="destructive"
                className="flex-1 h-10"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Rechazar
              </Button>
            </div>
          </>
        )}

      </CardContent>
    </Card>
  );
}
