
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext";
import Router from "./router/Router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { usePermissions } from "./hooks/usePermissions";
import { Loading } from "@shatel/ui-kit";


function App() {
  const useName = localStorage.getItem('useName')
  const { i18n } = useTranslation()
  const { loading } = usePermissions()

  useEffect(() => {
    document.body.dir = i18n.dir()
  }, [i18n, i18n.language])
  
  if(loading) return <Loading/>

  
  return (
    <AuthProvider initialRole={useName}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />

    </AuthProvider>
  );
}

export default App;
