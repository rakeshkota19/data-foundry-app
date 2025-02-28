import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import FilesPage from "./pages/FilesPage";
import Layout from "./pages/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { routes } from "./utils/constants";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.dashboard,

        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.files,
        element: (
          <ProtectedRoute>
            <FilesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
