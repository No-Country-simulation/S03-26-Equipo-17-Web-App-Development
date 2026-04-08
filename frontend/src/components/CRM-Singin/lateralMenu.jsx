import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutGrid,
    MessageSquare,
    Users,
    Settings,
    Plus,
    LogOut,
} from "lucide-react";

export const LateralMenu = () => {
    const navigate = useNavigate();

    const primaryLinks = [
        { name: "Dashboard", icon: <LayoutGrid size={22} />, path: "/dashboard" },
        {
            name: "Chats",
            icon: <MessageSquare size={22} />,
            path: "/dashboard/chats",
        },
        {
            name: "Contactos",
            icon: <Users size={22} />,
            path: "/dashboard/contacts",
        },
        {
            name: "Settings",
            icon: <Settings size={22} />,
            path: "/dashboard/settings",
        },
    ];

    const handleLogout = () => {
        // Aquí irá tu lógica de borrar token/contexto
        console.log("Cerrando sesión...");
        navigate("/login");
    };

    return (
        <aside className="w-64 bg-[#1e2638] text-slate-400 h-screen flex flex-col p-4 shadow-xl">
            {/* Sección del Logo - Semántica con <div> decorativo */}
            <div className="flex items-center gap-3 px-2 mb-10 py-2">
                <div>
                    <h2 className="text-white font-bold text-lg leading-none">
                        Nexus <span className="text-blue-600">CRM</span>
                    </h2>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.1em]">
                        Growth Mode
                    </span>
                </div>
            </div>

            {/* Navegación Principal - Semántica con <nav> y <ul> */}
            <nav className="flex-1">
                <ul className="space-y-2">
                    {primaryLinks.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                end={link.path === "/dashboard"}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                        : "hover:bg-slate-800/50 hover:text-slate-200"
                                    }`
                                }
                            >
                                <span className="group-hover:scale-110 transition-transform duration-200">
                                    {link.icon}
                                </span>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Botón de Acción Principal */}
                {/*<button className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                    <Plus size={20} /> New Entry
                </button> */}
            </nav>

            {/* Footer del Menú - Logout con <section> o <div> */}
            <div className="border-t border-slate-800/60 pt-4 pb-2">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all group"
                >
                    <LogOut
                        size={22}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};
