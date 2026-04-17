import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LandingPage } from "./features/landing/landingPage";
import { About } from "./features/landing/about/AboutSection";
import { Product } from "./features/landing/product/ProductSection";
import { Signin } from "./features/auth/signin/SigninSection";
import { Register } from "./features/auth/register/RegisterSection";
import { Chats } from "./protected-routes/chats/chats";
import { Dashboard } from "./protected-routes/dashboard/dashboard";
import { Contacts } from "./protected-routes/contacts/contacts";
import { Settings } from "./protected-routes/settings/settings";
import ProtectedRoute from "./protected-routes/protected-route";
import PrivateLayout from "./private-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Este es el layout de la Landing Pública
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <About /> },
      { path: "product", element: <Product /> },
      { path: "signin", element: <Signin /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    // El CRM privado (Después de iniciar sesión)
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "chats", element: <Chats /> },
      { path: "contacts", element: <Contacts /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);