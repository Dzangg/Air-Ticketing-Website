import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Flights from "./routes/Fligts";
import Login from "./routes/Login";
import Register from "./routes/Register";
import UserAccount from "./components/UserAccount/UserAccount";
import AddFlights from "./components/AdminPage/AddFlights";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Root />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "flights",
    element: (
      <>
        <Flights />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: (
      <>
        <Login />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: (
      <>
        <Register />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "account",
    element: (
      <>
        <UserAccount />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "admin",
    element: (
      <>
        <AddFlights />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
