import App from "./App";
import CurrentWeek from "./pages/currentWeek/CurrentWeek";
import RawWeek from "./pages/rawWeek/RawWeek";
import NextWeek from "./pages/nextWeek/NextWeek";
import Dashboard from "./pages/dashboard/Dashboard";
import ForgotEmail from "./pages/forgot/ForgotEmail";
import Login from "./pages/login/Login";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import CreatorPdf from "./components/pdf/CreatorPdf";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Navigate to="/currentweek" /> },
        { path: "/currentweek", element: <CurrentWeek /> },
        { path: "/nextweek", element: <NextWeek /> },
        { path: "/login", element: <Login /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/rawweek", element: <RawWeek /> },
        { path: "/rawweek/:id", element: <RawWeek /> },
        { path: "/forgot-password", element: <ForgotEmail /> },
        { path: "/pdf", element: <CreatorPdf /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export { Router };
