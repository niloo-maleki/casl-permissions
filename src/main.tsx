import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import './assets/styles/main.css';
import './plugins/i18n.ts';
import { Loading, ToastContainer } from "@shatel/ui-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './instruments.ts'

const queryClient = new QueryClient();

const startApp = async () => {


  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<Loading />}>
            <App />
            <ToastContainer
              position={'bottom-right'}
              rtl='rtl'
            />
          </Suspense>
        </Router>
      </QueryClientProvider>
    </StrictMode>
  );
};

startApp();