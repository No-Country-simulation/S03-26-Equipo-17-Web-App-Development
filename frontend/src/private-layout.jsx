import { Outlet } from "react-router-dom";
import { LateralMenu } from "./components/CRM-Singin/lateralMenu";

const PrivateLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="w-64 bg-slate-900 text-white shrink-0">
                <LateralMenu />
            </aside>
            <main className="flex-1 bg-slate-50 p-8">
                <Outlet /> {/* Aquí caen Dashboard, Chats, etc. */}
            </main>
        </div>
    );
};

export default PrivateLayout;
