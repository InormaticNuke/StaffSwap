import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DataProvider } from "@/context/DataContext";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Supervisor from "@/pages/supervisor";
import HR from "@/pages/hr";
import History from "@/pages/history";
import ExtraHours from "@/pages/extra-hours";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const userRole = localStorage.getItem("userRole");
  return userRole ? <Component {...rest} /> : <Redirect to="/" />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/supervisor">
        {(params) => <ProtectedRoute component={Supervisor} {...params} />}
      </Route>
      <Route path="/hr">
        {(params) => <ProtectedRoute component={HR} {...params} />}
      </Route>
      <Route path="/history">
        {(params) => <ProtectedRoute component={History} {...params} />}
      </Route>
      <Route path="/extra-hours">
        {(params) => <ProtectedRoute component={ExtraHours} {...params} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <Toaster />
          <Router />
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
