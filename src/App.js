import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import Dashboard from "./pages/Dashboard";
import CreateForm from "./components/CreateForm";
import Login from "./pages/Login";
import Home from "./components/Home";
import Layout from "./pages/Layout";
import Header from "./components/Header/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <Authenticator
            children={
              <>
                <Header /> <Dashboard />
              </>
            }
          />
        ),
      },
      {
        path: "/create",
        element: <Authenticator children={<CreateForm />} />,
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
