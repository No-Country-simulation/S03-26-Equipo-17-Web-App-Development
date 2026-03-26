import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LandingPage } from "./features/landing/landingPage";
import { About } from "./features/landing/about/AboutSection";
import { Product } from "./features/landing/product/ProductSection";
import { Signin } from "./features/auth/signin/SigninSection";
import { Register } from "./features/auth/register/RegisterSection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);