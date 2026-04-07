import { Outlet } from "react-router-dom";
import { LateralMenu } from "./components/CRM-Singin/lateralMenu";

const PrivateLayout = () => {
    return (
        <div classNameName="flex min-h-screen">
            <LateralMenu />
            <main classNameName="flex-1 bg-slate-50">
                <Outlet /> {/* Aquí caen Dashboard, Chats, etc. */}
            </main>
        </div>
    );
};

export default PrivateLayout;
