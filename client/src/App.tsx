import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Intro from "@/pages/Intro";
import NameEntry from "@/pages/NameEntry";
import Home from "@/pages/Home";
import GameHub from "@/pages/GameHub";
import Quiz from "@/pages/Quiz";
import Simulation from "@/pages/Simulation";
import Result from "@/pages/Result";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Intro} />
      <Route path="/name" component={NameEntry} />
      <Route path="/home" component={Home} />
      <Route path="/game" component={GameHub} />
      <Route path="/game/quiz" component={Quiz} />
      <Route path="/game/simulation" component={Simulation} />
      <Route path="/result" component={Result} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
