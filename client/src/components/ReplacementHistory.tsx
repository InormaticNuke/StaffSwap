import { ClipboardList } from "lucide-react";
import { ReplacementCard } from "./ReplacementCard";

interface Replacement {
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

  // Datos adicionales
  comments?: string; // 🔹 Comentario para apoyo e inducción
  unregisteredName?: string;
  unregisteredRut?: string;
  unregisteredPhone?: string;
  idImageUrl?: string | null;
  photoImageUrl?: string | null;
}

interface ReplacementHistoryProps {
  replacements: Replacement[];
}

export function ReplacementHistory({ replacements }: ReplacementHistoryProps) {
  if (replacements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ClipboardList className="h-12 w-12 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium">No hay registros</p>
        <p className="text-sm text-muted-foreground">
          Aún no se han creado solicitudes de reemplazo, apoyo o inducción
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {replacements.map((r) => (
        <ReplacementCard
          key={r.id}
          id={r.id}
          shiftType={r.shiftType}
          absentWorker={r.absentWorker}
          reason={r.reason}
          replacementWorker={r.replacementWorker}
          worker={r.worker}
          extraAmount={r.extraAmount}
          workSite={r.workSite}
          status={r.status}
          date={r.date}
          approvalLetterUrl={r.approvalLetterUrl}
          comments={r.comments} // ✅ Muestra comentarios si existen
          unregisteredName={r.unregisteredName}
          unregisteredRut={r.unregisteredRut}
          unregisteredPhone={r.unregisteredPhone}
          idImageUrl={r.idImageUrl}
          photoImageUrl={r.photoImageUrl}
        />
      ))}
    </div>
  );
}