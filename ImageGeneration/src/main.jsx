import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/HeroSection.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ImageGeneration from "./components/ImageGeneration.jsx";
import PricingPage from "./components/Pricing.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/imagegeneration",
        element: (
          <PrivateRoute>
            <ImageGeneration />
          </PrivateRoute>
        ),
      },
      {
        path: "/pricing",
        element: <PricingPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
