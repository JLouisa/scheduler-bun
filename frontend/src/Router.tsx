import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App.js";
import ScheduleBoard from "./pages/scheduleboard/ScheduleBoard";
import Login from "./pages/login/Login";
import AdminBoard from "./pages/adminboard/AdminBoard.js";
import ForgotEmail from "./pages/forgot/ForgotEmail.js";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Navigate to="/scheduleboard" /> },
        { path: "/scheduleboard", element: <ScheduleBoard /> },
        { path: "/login", element: <Login /> },
        { path: "/admin", element: <AdminBoard /> },
        { path: "/forgot-password", element: <ForgotEmail /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export { Router };
