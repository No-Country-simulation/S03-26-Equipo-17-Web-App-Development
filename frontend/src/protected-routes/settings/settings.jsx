import { MoreVertical, MessageCircle, Mail, User, Globe } from "lucide-react";

export const Settings = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            {/* Encabezado Semántico */}
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-balance">
                    Configuración del Espacio de Trabajo
                </h1>
                <p className="text-slate-500 mt-2 text-lg">
                    Administra tu perfil de equipo y conecta tus canales de comunicación
                    para automatizar tus flujos.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna Izquierda: Perfil Personal */}
                <section className="lg:col-span-2 space-y-8">
                    <article className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <User size={20} className="text-blue-600" /> Información del
                                Perfil
                            </h2>
                        </div>

                        {/* Avatar Section */}
                        <div className="flex items-center gap-6 mb-10 p-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 border-white shadow-sm flex items-center justify-center text-2xl font-bold text-blue-600">
                                LA
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-slate-800 text-sm">
                                    Foto del Espacio de Trabajo
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Visible para todos los miembros del equipo.
                                </p>
                                <div className="flex gap-4 mt-2">
                                    <button className="text-blue-600 text-xs font-bold hover:underline">
                                        Cambiar foto
                                    </button>
                                    <button className="text-red-500 text-xs font-bold hover:underline">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Formulario de Cambios */}
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="firstName"
                                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Juan"
                                    id="firstName"
                                    name="firstName"
                                    autoComplete="off"
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="lastName"
                                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                                >
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Perez"
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="off"
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                                >
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    defaultValue="ejemplo@nexus-hq.com"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label
                                    htmlFor="timeZone"
                                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1"
                                >
                                    Zona Horaria <Globe size={10} />
                                </label>
                                <select
                                    id="timeZone"
                                    name="timeZone"
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none appearance-none font-medium text-slate-600"
                                >
                                    <option>
                                        Astros Standard Time (AST) - (Latino America)
                                    </option>
                                </select>
                            </div>
                            <div className="pt-4 md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </article>
                </section>

                {/* Columna Derecha: Canales de Automatización */}
                <aside className="space-y-8">
                    <section className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-slate-800 text-lg">
                                Canales Conectados
                            </h2>
                            <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-md uppercase tracking-tighter">
                                Automatización
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Canal WhatsApp */}
                            <article className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50 group hover:border-green-200 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-50 text-green-500 rounded-xl group-hover:scale-110 transition-transform">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                                            WhatsApp Business
                                        </p>
                                        <p className="text-[10px] text-green-500 font-black flex items-center gap-1">
                                            ● CONECTADO
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-slate-600 transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </article>

                            {/* Canal Gmail/G-Suite */}
                            <article className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50 group hover:border-blue-200 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-500 rounded-xl group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                                            Correo G-Suite
                                        </p>
                                        <p className="text-[10px] text-blue-500 font-black flex items-center gap-1">
                                            ● CONECTADO
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-slate-600 transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </article>
                        </div>

                        <p className="mt-6 text-[11px] text-slate-400 text-center leading-relaxed">
                            Toda la comunicación entrante y saliente está siendo procesada
                            por el motor de inteligencia de Nexus CRM.
                        </p>
                    </section>
                </aside>
            </div>
        </div>
    );
};
