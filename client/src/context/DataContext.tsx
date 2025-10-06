import { createContext, useContext, useState, ReactNode } from "react";

export interface Replacement {
  id: string;
  absentWorker: string;
  replacementWorker: string;
  extraAmount: number;
  workSite: string;
  status: "pending" | "approved" | "rejected";
  date: string;
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
  addReplacement: (replacement: Omit<Replacement, "id" | "status" | "date">) => void;
  updateReplacementStatus: (id: string, status: "approved" | "rejected") => void;
  addExtraHours: (hours: Omit<ExtraHours, "id" | "status"> & { date: string }) => void;
  updateExtraHoursStatus: (id: string, status: "approved" | "rejected") => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialReplacements: Replacement[] = [
  {
    id: "1",
    absentWorker: "John Doe",
    replacementWorker: "Alex Brown",
    extraAmount: 150.00,
    workSite: "Warehouse A",
    status: "pending",
    date: "Oct 3, 2025",
  },
  {
    id: "2",
    absentWorker: "Jane Smith",
    replacementWorker: "Emily Davis",
    extraAmount: 200.50,
    workSite: "Office Downtown",
    status: "pending",
    date: "Oct 2, 2025",
  },
];

const initialExtraHours: ExtraHours[] = [
  {
    id: "eh1",
    worker: "Mike Johnson",
    workSite: "Factory North",
    hours: 4.5,
    date: "Oct 3, 2025",
    status: "pending",
  },
  {
    id: "eh2",
    worker: "Sarah Williams",
    workSite: "Warehouse B",
    hours: 3.0,
    date: "Oct 2, 2025",
    status: "pending",
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [replacements, setReplacements] = useState<Replacement[]>(initialReplacements);
  const [extraHours, setExtraHours] = useState<ExtraHours[]>(initialExtraHours);

  const addReplacement = (replacement: Omit<Replacement, "id" | "status" | "date">) => {
    const newReplacement: Replacement = {
      ...replacement,
      id: `r${Date.now()}`,
      status: "pending",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setReplacements((prev) => [newReplacement, ...prev]);
  };

  const updateReplacementStatus = (id: string, status: "approved" | "rejected") => {
    setReplacements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const addExtraHours = (hours: Omit<ExtraHours, "id" | "status"> & { date: string }) => {
    const [year, month, day] = hours.date.split('-').map(Number);
    const workDate = new Date(year, month - 1, day);
    const formattedDate = workDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    
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
