import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./error-page";
import Flights from "./routes/Fligts";
import Header from "./components/Header";
import Login from "./routes/Login";
import Sign from "./routes/Sign";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Root />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "flights",
    element: (
      <>
        <Header />
        <Flights />
      </>
    ),
  },
  {
    path: "login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "sign",
    element: (
      <>
        <Sign />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
