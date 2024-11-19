import { Routes, Route, Navigate } from "react-router-dom";
import CustomerPage from "@src/features/customer/CustomerPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "@src/features/dashboard/Dashboard";
import LoginPage from "@src/features/login/LoginPage";
import ManagePage from "@src/features/manage/ManagePage";
import TranslationPanel from "@src/Translation/TranslationPanel";

interface RouteMenu {
  path: string;
  element: JSX.Element;
}

const routeMenus: RouteMenu[] = [
  {
    path: '/customer',
    element: <CustomerPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/manage',
    element: <ManagePage />,
  },
    {
    path: '/translate',
    element: <TranslationPanel />,
  }

]

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<ProtectedRoutes />}>
        {
          routeMenus.map(({ element, path }) => {
            return (
              <Route key={path} path={path} element={
                element
              } />
            )
          })
        }

      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
