import "./styles/App.css";
import { Outlet } from "react-router-dom";
import { NavMenu } from "./components/landingPageComponents/navMenu";
import { FooterLandingPage } from "./components/landingPageComponents/footer";
import { LateralMenu } from "./components/CRM-Singin/lateralMenu";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavMenu />

      <main className="flex-1">
        <Outlet />
      </main>

      <FooterLandingPage />
      <LateralMenu />
    </div>
  );
}

export default App;