import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExtraHoursFormProps {
  onSubmit: (data: {
    worker: string;
    workSite: string;
    extraShiftType: string;
    LogExtraAmount: number;
    date: string;
  }) => void;
}

export function ExtraHoursForm({ onSubmit }: ExtraHoursFormProps) {
  const [worker, setWorker] = useState("");
  const [workSite, setWorkSite] = useState("");
  const [extraShiftType, setExtraShiftType] = useState("");
  const [extraAmount, setExtraAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(extraAmount);

    if (
      worker &&
      workSite &&
      extraShiftType &&
      !isNaN(parsedAmount) &&
      date
    ) {
      onSubmit({
        worker,
        workSite,
        extraShiftType,
        LogExtraAmount: parsedAmount,
        date,
      });

      // Limpiar formulario
      setWorker("");
      setWorkSite("");
      setExtraShiftType("");
      setExtraAmount("");
      setDate("");
    } else {
      alert("Por favor completa todos los campos antes de enviar.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Turno Extra</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Lugar de trabajo */}
          <div className="space-y-2">
            <Label htmlFor="workSiteHours">Lugar de trabajo</Label>
            <Select value={workSite} onValueChange={setWorkSite} required>
              <SelectTrigger id="workSiteHours" className="h-14">
                <SelectValue placeholder="Selecciona lugar de trabajo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                <SelectItem value="office-downtown">Office Downtown</SelectItem>
                <SelectItem value="factory-north">Factory North</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Trabajador */}
          <div className="space-y-2">
            <Label htmlFor="worker">Trabajador</Label>
            <Select value={worker} onValueChange={setWorker} required>
              <SelectTrigger id="worker" className="h-14">
                <SelectValue placeholder="Selecciona trabajador" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                <SelectItem value="alex-brown">Alex Brown</SelectItem>
                <SelectItem value="emily-davis">Emily Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de turno extra */}
          <div className="space-y-2">
            <Label htmlFor="extraShiftType">Tipo de turno extra</Label>
            <Select value={extraShiftType} onValueChange={setExtraShiftType} required>
              <SelectTrigger id="extraShiftType" className="h-14">
                <SelectValue placeholder="Selecciona tipo de turno extra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cobertura">Cobertura</SelectItem>
                <SelectItem value="emergencia">Emergencia</SelectItem>
                <SelectItem value="apoyo">Apoyo</SelectItem>
                <SelectItem value="sustitucion">Sustitución</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Monto extra */}
          <div className="space-y-2">
            <Label htmlFor="LogExtraAmount">Monto extra</Label>
            <Select value={extraAmount} onValueChange={setExtraAmount} required>
              <SelectTrigger id="LogExtraAmount" className="h-12">
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

          {/* Fecha */}
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-14 w-full border rounded-md px-3"
              required
            />
          </div>

          {/* Botón */}
          <Button type="submit" className="h-12 w-full">
            Registrar Turno Extra
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}