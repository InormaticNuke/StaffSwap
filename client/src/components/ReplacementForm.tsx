import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ReplacementFormProps {
  onSubmit: (data: {
    shiftType: "reemplazo" | "apoyo" | "induccion";
    workSite: string;
    date: string;
    absentWorker?: string;
    reason?: string;
    replacementWorker?: string;
    worker?: string;
    extraAmount: number;
    idImage?: File | null;
    photoImage?: File | null;
    unregisteredName?: string;
    unregisteredRut?: string;
    unregisteredPhone?: string;
    comments?: string;
  }) => void;
}

export function ReplacementForm({ onSubmit }: ReplacementFormProps) {
  const [shiftType, setShiftType] = useState<"reemplazo" | "apoyo" | "induccion" | "">("");
  const [workSite, setWorkSite] = useState("");
  const [date, setDate] = useState("");
  const [absentWorker, setAbsentWorker] = useState("");
  const [reason, setReason] = useState("");
  const [replacementWorker, setReplacementWorker] = useState("");
  const [worker, setWorker] = useState("");
  const [extraAmount, setExtraAmount] = useState("");
  const [comments, setComments] = useState("");

  const [idImage, setIdImage] = useState<File | null>(null);
  const [photoImage, setPhotoImage] = useState<File | null>(null);
  const [unregisteredName, setUnregisteredName] = useState("");
  const [unregisteredRut, setUnregisteredRut] = useState("");
  const [unregisteredPhone, setUnregisteredPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(extraAmount);

    if (!shiftType || !workSite || !date || isNaN(amount)) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    const data = {
      shiftType,
      workSite,
      date,
      absentWorker,
      reason,
      replacementWorker,
      worker,
      extraAmount: amount,
      idImage,
      photoImage,
      unregisteredName,
      unregisteredRut,
      unregisteredPhone,
      comments,
    };

    onSubmit(data);

    // Limpiar todo
    setShiftType("");
    setWorkSite("");
    setDate("");
    setAbsentWorker("");
    setReason("");
    setReplacementWorker("");
    setWorker("");
    setExtraAmount("");
    setComments("");
    setIdImage(null);
    setPhotoImage(null);
    setUnregisteredName("");
    setUnregisteredRut("");
    setUnregisteredPhone("");
  };

  const showAbsentWorker = shiftType === "reemplazo";
  const showReason = shiftType === "reemplazo";
  const showCommentField = shiftType === "apoyo" || shiftType === "induccion";
  const showWorkerSelector = showAbsentWorker || showCommentField;
  const showExtraImageFields =
    (shiftType === "reemplazo" && replacementWorker === "noPerson") ||
    (showCommentField && worker === "noPerson");

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Registrar Turno Extra</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Tipo de turno */}
          <div className="space-y-2">
            <Label htmlFor="shiftType">Tipo de turno</Label>
            <Select value={shiftType} onValueChange={setShiftType}>
              <SelectTrigger id="shiftType" className="h-12">
                <SelectValue placeholder="Selecciona tipo de turno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reemplazo">Reemplazo</SelectItem>
                <SelectItem value="apoyo">Apoyo</SelectItem>
                <SelectItem value="induccion">Inducción</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lugar de trabajo */}
          <div className="space-y-2">
            <Label htmlFor="workSite">Lugar de trabajo</Label>
            <Select value={workSite} onValueChange={setWorkSite}>
              <SelectTrigger id="workSite" className="h-12">
                <SelectValue placeholder="Selecciona un lugar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                <SelectItem value="office-downtown">Office Downtown</SelectItem>
                <SelectItem value="factory-north">Factory North</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fecha */}
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Trabajador ausente (solo reemplazo) */}
          {showAbsentWorker && (
            <div className="space-y-2">
              <Label htmlFor="absentWorker">Trabajador ausente</Label>
              <Select value={absentWorker} onValueChange={setAbsentWorker}>
                <SelectTrigger id="absentWorker" className="h-12">
                  <SelectValue placeholder="Selecciona trabajador ausente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Razón de ausencia (solo reemplazo) */}
          {showReason && (
            <div className="space-y-2">
              <Label htmlFor="reason">Razón de ausencia</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="reason" className="h-12">
                  <SelectValue placeholder="Selecciona una razón" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="licencia-medica">Licencia Médica</SelectItem>
                  <SelectItem value="vacaciones">Vacaciones</SelectItem>
                  <SelectItem value="asunto-personal">Asunto Personal</SelectItem>
                  <SelectItem value="falla-injustificada">Falla Injustificada</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Comentario (solo apoyo o inducción) */}
          {showCommentField && (
            <div className="space-y-2">
              <Label htmlFor="comments">Comentario del supervisor</Label>
              <Textarea
                id="comments"
                placeholder="Agrega observaciones sobre el turno (opcional)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}

          {/* Selector de trabajador */}
          {showWorkerSelector && (
            <div className="space-y-2">
              <Label htmlFor="replacementWorker">
                {shiftType === "reemplazo" ? "Reemplazante" : "Trabajador asignado"}
              </Label>
              <Select
                value={shiftType === "reemplazo" ? replacementWorker : worker}
                onValueChange={
                  shiftType === "reemplazo" ? setReplacementWorker : setWorker
                }
              >
                <SelectTrigger id="replacementWorker" className="h-12">
                  <SelectValue placeholder="Selecciona trabajador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noPerson">Persona No Enrolada</SelectItem>
                  <SelectItem value="alex-brown">Alex Brown</SelectItem>
                  <SelectItem value="emily-davis">Emily Davis</SelectItem>
                  <SelectItem value="chris-wilson">Chris Wilson</SelectItem>
                  <SelectItem value="lisa-moore">Lisa Moore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Monto extra */}
          <div className="space-y-2">
            <Label htmlFor="extraAmount">Monto extra</Label>
            <Select value={extraAmount} onValueChange={setExtraAmount}>
              <SelectTrigger id="extraAmount" className="h-12">
                <SelectValue placeholder="Selecciona monto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30000">30000</SelectItem>
                <SelectItem value="35000">35000</SelectItem>
                <SelectItem value="40000">40000</SelectItem>
                <SelectItem value="50000">50000</SelectItem>
                <SelectItem value="60000">60000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Datos de persona no enrolada */}
          {showExtraImageFields && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold text-primary">Datos de persona no enrolada</h3>

              <Input
                type="text"
                placeholder="Nombre completo"
                value={unregisteredName}
                onChange={(e) => setUnregisteredName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="RUT"
                value={unregisteredRut}
                onChange={(e) => setUnregisteredRut(e.target.value)}
              />
              <Input
                type="tel"
                placeholder="Teléfono"
                value={unregisteredPhone}
                onChange={(e) => setUnregisteredPhone(e.target.value)}
              />

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setIdImage(e.target.files?.[0] || null)}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoImage(e.target.files?.[0] || null)}
              />
            </div>
          )}

          <Button type="submit" className="h-12 w-full">
            Enviar registro
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}