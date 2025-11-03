import { useState } from "react";
import { ReplacementForm } from "./ReplacementForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReplacementData {
  id: number;
  shiftType: "reemplazo" | "apoyo" | "induccion";
  absentWorker?: string;
  reason?: string;
  replacementWorker?: string;
  worker?: string;
  extraAmount: number;
  workSite: string;
  date: string;
  status: "pending" | "approved" | "rejected";

  // Datos de persona no enrolada
  unregisteredName?: string;
  unregisteredRut?: string;
  unregisteredPhone?: string;
  idImageUrl?: string | null;
  photoImageUrl?: string | null;
}

export default function ReplacementManager() {
  const [replacements, setReplacements] = useState<ReplacementData[]>([]);

  const handleFormSubmit = (data: any) => {
    let idImageUrl: string | null = null;
    let photoImageUrl: string | null = null;

    // Simulamos las imágenes con URLs locales
    if (data.idImage) idImageUrl = URL.createObjectURL(data.idImage);
    if (data.photoImage) photoImageUrl = URL.createObjectURL(data.photoImage);

    const newReplacement: ReplacementData = {
      id: Date.now(),
      shiftType: data.shiftType,
      absentWorker: data.absentWorker,
      reason: data.reason,
      replacementWorker: data.replacementWorker,
      worker: data.worker,
      extraAmount: data.extraAmount,
      workSite: data.workSite,
      date: data.date,
      status: "pending",
      unregisteredName: data.unregisteredName,
      unregisteredRut: data.unregisteredRut,
      unregisteredPhone: data.unregisteredPhone,
      idImageUrl,
      photoImageUrl,
    };

    setReplacements((prev) => [...prev, newReplacement]);
  };

  const handleApprove = (id: number) => {
    setReplacements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
  };

  const handleReject = (id: number) => {
    setReplacements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

  return (
    <div className="space-y-6">
      {/* Formulario */}
      <ReplacementForm onSubmit={handleFormSubmit} />

      {/* Cartas de resumen */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {replacements.map((r) => (
          <Card key={r.id} className="border rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{new Date(r.date).toLocaleDateString()}</span>
                <Badge
                  variant={
                    r.status === "pending"
                      ? "secondary"
                      : r.status === "approved"
                      ? "default"
                      : "destructive"
                  }
                >
                  {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p>
                <strong>Tipo de Turno:</strong>{" "}
                <span className="capitalize">{r.shiftType}</span>
              </p>
              {r.shiftType === "reemplazo" && (
                <>
                  <p><strong>Ausente:</strong> {r.absentWorker}</p>
                  <p><strong>Razón:</strong> {r.reason}</p>
                  <p><strong>Reemplazo:</strong> {r.replacementWorker}</p>
                </>
              )}
              {(r.shiftType === "apoyo" || r.shiftType === "induccion") && (
                <p><strong>Trabajador:</strong> {r.worker}</p>
              )}
              <p><strong>Lugar:</strong> {r.workSite}</p>
              <p><strong>Monto Extra:</strong> ${r.extraAmount.toFixed(2)}</p>

              {/* Persona no enrolada */}
              {r.replacementWorker === "noPerson" ||
              r.worker === "noPerson" ? (
                <div className="border p-3 rounded-lg bg-yellow-50 space-y-2">
                  <p className="font-semibold text-yellow-800">
                    Persona No Enrolada
                  </p>
                  <p><strong>Nombre:</strong> {r.unregisteredName || "—"}</p>
                  <p><strong>RUT:</strong> {r.unregisteredRut || "—"}</p>
                  <p><strong>Teléfono:</strong> {r.unregisteredPhone || "—"}</p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    {r.idImageUrl && (
                      <img
                        src={r.idImageUrl}
                        alt="Cédula"
                        className="rounded-lg border shadow-sm w-full sm:w-40"
                      />
                    )}
                    {r.photoImageUrl && (
                      <img
                        src={r.photoImageUrl}
                        alt="Indumentaria"
                        className="rounded-lg border shadow-sm w-full sm:w-40"
                      />
                    )}
                  </div>
                </div>
              ) : null}

              {/* Botones */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => handleApprove(r.id)}
                  disabled={r.status !== "pending"}
                >
                  ✅ Aprobar
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleReject(r.id)}
                  disabled={r.status !== "pending"}
                >
                  ❌ Rechazar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
