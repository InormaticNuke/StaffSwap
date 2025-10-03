import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";

interface AppHeaderProps {
  title: string;
  onLogout?: () => void;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export function AppHeader({ title, onLogout, showMenu = false, onMenuClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-card px-4">
      <div className="flex items-center gap-3">
        {showMenu && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onMenuClick}
            data-testid="button-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-semibold" data-testid="text-header-title">{title}</h1>
      </div>
      {onLogout && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onLogout}
          data-testid="button-logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      )}
    </header>
  );
}
