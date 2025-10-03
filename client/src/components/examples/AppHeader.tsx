import { AppHeader } from "../AppHeader";

export default function AppHeaderExample() {
  return (
    <div className="flex flex-col gap-4">
      <AppHeader 
        title="Create Replacement" 
        onLogout={() => console.log("Logout clicked")} 
      />
      <AppHeader 
        title="Replacements" 
        showMenu 
        onMenuClick={() => console.log("Menu clicked")}
        onLogout={() => console.log("Logout clicked")} 
      />
    </div>
  );
}
