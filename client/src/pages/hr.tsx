import { useLocation, Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { HRDashboard } from "@/components/HRDashboard";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/context/DataContext";

export default function HR() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { replacements, updateReplacementStatus } = useData();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setLocation("/");
  };

  const handleApproveReplacement = (id: string) => {
    updateReplacementStatus(id, "approved");
    toast({
      title: "Reemplazo aprobado",
      description: "La solicitud de reemplazo fue aprobada correctamente.",
    });
  };

  const handleRejectReplacement = (id: string) => {
    updateReplacementStatus(id, "rejected");
    toast({
      title: "Reemplazo rechazado",
      description: "La solicitud de reemplazo fue rechazada.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Encabezado */}
      <AppHeader title="Panel de Recursos Humanos" onLogout={handleLogout} />

      <main className="mx-auto max-w-md p-4 space-y-4">
        {/* Botón para ver historial */}
        <Link href="/history">
          <Button variant="outline" className="w-full h-12" data-testid="button-view-history">
            <History className="h-5 w-5 mr-2" />
            Ver Historial
          </Button>
        </Link>

        {/* Panel de reemplazos pendientes */}
        <HRDashboard
          replacements={replacements}
          onApprove={handleApproveReplacement}
          onReject={handleRejectReplacement}
        />
      </main>
    </div>
  );
}