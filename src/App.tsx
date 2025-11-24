import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// NEW: splash
import Splash from "./components/Splash";

const queryClient = new QueryClient();

const App = () => {
  // show splash once per tab/session
  const [showSplash, setShowSplash] = React.useState(
    () => sessionStorage.getItem("seen_splash") !== "1"
  );

  React.useEffect(() => {
    if (!showSplash) sessionStorage.setItem("seen_splash", "1");
  }, [showSplash]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* keep toasters available at all times */}
        <Toaster />
        <Sonner />

        <div className="relative min-h-screen">
          {showSplash && <Splash onDone={() => setShowSplash(false)} />}

          {/* fade in app after splash */}
          <div
            className={`transition-opacity duration-300 ${
              showSplash ? "opacity-0" : "opacity-100"
            }`}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
