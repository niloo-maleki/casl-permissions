
import { AuthProvider } from "./context/AuthContext";
import Router from "./router/Router";

function App() {

  const useName = localStorage.getItem('useName')

  return (
    <AuthProvider initialRole={useName}>
      <Router />
    </AuthProvider>
  );
}

export default App;
