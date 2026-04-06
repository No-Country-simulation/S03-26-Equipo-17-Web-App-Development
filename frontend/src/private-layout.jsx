import { Outlet } from "react-router-dom";
import { LateralMenu } from "./components/CRM-Singin/lateralMenu";

const PrivateLayout = () => {
    return (
        <div className="flex min-h-screen">
            <LateralMenu />
            <main className="flex-1 bg-slate-50">
                <Outlet /> {/* Aquí caen Dashboard, Chats, etc. */}
            </main>
        </div>
    );
};

export default PrivateLayout;
