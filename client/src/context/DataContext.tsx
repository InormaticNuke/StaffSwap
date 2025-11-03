import { createContext, useContext, useState, ReactNode } from "react";

export interface Replacement {
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
  comments?: string;
}

export interface ExtraHours {
  id: string;
  worker: string;
  workSite: string;
  hours: number;
  date: string;
  status: "pending" | "approved" | "rejected";
}

interface DataContextType {
  replacements: Replacement[];
  extraHours: ExtraHours[];
  addReplacement: (replacement: any) => void;
  updateReplacementStatus: (id: string, status: "approved" | "rejected") => void;
  addExtraHours: (hours: Omit<ExtraHours, "id" | "status"> & { date: string }) => void;
  updateExtraHoursStatus: (id: string, status: "approved" | "rejected") => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // 🔹 Sin datos iniciales de prueba
  const [replacements, setReplacements] = useState<Replacement[]>([]);
  const [extraHours, setExtraHours] = useState<ExtraHours[]>([]);

  const addReplacement = (replacement: any) => {
    // 🔹 Si el formulario envía archivos, generamos URL locales
    let idImageUrl: string | null = null;
    let photoImageUrl: string | null = null;

    if (replacement.idImage instanceof File) {
      idImageUrl = URL.createObjectURL(replacement.idImage);
    }
    if (replacement.photoImage instanceof File) {
      photoImageUrl = URL.createObjectURL(replacement.photoImage);
    }

    const newReplacement: Replacement = {
      ...replacement,
      id: `r${Date.now()}`,
      status: "pending",
      date: new Date().toLocaleDateString("es-CL", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      idImageUrl,
      photoImageUrl,
    };

    setReplacements((prev) => [newReplacement, ...prev]);
  };

  const updateReplacementStatus = (id: string, status: "approved" | "rejected") => {
    setReplacements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const addExtraHours = (hours: Omit<ExtraHours, "id" | "status"> & { date: string }) => {
    const [year, month, day] = hours.date.split("-").map(Number);
    const workDate = new Date(year, month - 1, day);
    const formattedDate = workDate.toLocaleDateString("es-CL", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newExtraHours: ExtraHours = {
      ...hours,
      id: `eh${Date.now()}`,
      status: "pending",
      date: formattedDate,
    };
    setExtraHours((prev) => [newExtraHours, ...prev]);
  };

  const updateExtraHoursStatus = (id: string, status: "approved" | "rejected") => {
    setExtraHours((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status } : h))
    );
  };

  return (
    <DataContext.Provider
      value={{
        replacements,
        extraHours,
        addReplacement,
        updateReplacementStatus,
        addExtraHours,
        updateExtraHoursStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}