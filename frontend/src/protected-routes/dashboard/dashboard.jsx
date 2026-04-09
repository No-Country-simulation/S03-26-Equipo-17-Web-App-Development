import React, { useState } from "react";
import {
    Users,
    MessageSquare,
    Zap,
    Download,
    ChevronDown,
    MoreHorizontal,
    Filter,
    Calendar,
} from "lucide-react";

export const Dashboard = () => {

    const [showExport, setShowExport] = useState(false);
    const [showFiltro, setShowFiltro] = useState(false);
    const [filtroTiempo, setFiltroTiempo] = useState("Últimos 30 días");

    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            {/* Encabezado Principal */}
            <header className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Vista General</h1>
                    <p className="text-slate-500 text-sm">
                        Métricas de rendimiento en tiempo real para tu embudo de
                        crecimiento.
                    </p>
                </div>

                <div className="flex gap-3">
                    <div className="relative inline-block text-left">
                        {/* Botón con Toggle Manual */}
                        <button
                            onClick={() => setShowFiltro(!showFiltro)}
                            className="
      flex items-center justify-between 
      w-52 h-10 px-4 
      bg-white border border-slate-200 rounded-lg 
      text-sm font-medium text-slate-600 
      hover:border-slate-300 transition-all
    "
                        >
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-slate-400" />
                                <span>{filtroTiempo}</span>
                            </div>
                            <ChevronDown
                                size={14}
                                className={`text-slate-400 transition-transform ${showFiltro ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* Menú condicional (Funciona en Taps de móvil y Clics de PC) */}
                        {showFiltro && (
                            <>
                                {/* CAPA INVISIBLE: Esto permite que si el usuario toca fuera del menú en el móvil, este se cierre solo */}
                                <div
                                    className="fixed inset-0 z-30"
                                    onClick={() => setShowFiltro(false)}
                                />

                                <div className="absolute left-0 top-full mt-1 w-52 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden py-1 z-40 animate-in fade-in slide-in-from-top-1">
                                    {[
                                        "Hoy",
                                        "Últimos 7 días",
                                        "Últimos 30 días",
                                        "Este año",
                                    ].map((opcion) => (
                                        <button
                                            key={opcion}
                                            onClick={() => {
                                                setFiltroTiempo(opcion);
                                                setShowFiltro(false); // Se cierra al elegir
                                            }}
                                            className={`
              w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors
              ${filtroTiempo === opcion ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}
            `}
                                        >
                                            {opcion}
                                            {filtroTiempo === opcion && (
                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Botón de Exportar con menú para elegir el formato a exportar */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setShowExport(true)}
                        onMouseLeave={() => setShowExport(false)}
                    >
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                            <Download size={16} /> Exportar Datos
                        </button>
                        {/* Opciones de exportación al hacer hover o click */}
                        {showExport && (
                            <div className="absolute right-0 pt-2 w-44 z-20">
                                <div className="bg-white border border-slate-100 shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                                    <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase bg-slate-50">
                                        Formato de archivo
                                    </div>
                                    <button
                                        onClick={() => alert("Exportando Excel...")}
                                        className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 flex items-center gap-2 transition-colors"
                                    >
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                                        Excel (.csv)
                                    </button>
                                    <button
                                        onClick={() => alert("Exportando PDF...")}
                                        className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 flex items-center gap-2 transition-colors"
                                    >
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>{" "}
                                        Documento PDF
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* 1. Fila de Tarjetas de Métricas (Stats) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    {
                        label: "NUEVOS CLIENTES",
                        value: "1,284",
                        grow: "+12.4%",
                        icon: <Users className="text-blue-600" />,
                        bg: "bg-blue-50",
                    },
                    {
                        label: "MENSAJES",
                        value: "8,592",
                        grow: "+8.2%",
                        icon: <MessageSquare className="text-orange-600" />,
                        bg: "bg-orange-50",
                    },
                    {
                        label: "TASA DE RESPUESTA",
                        value: "1.4m",
                        grow: "94.2%",
                        icon: <Zap className="text-indigo-600" />,
                        bg: "bg-indigo-50",
                        sub: "promedio",
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${stat.bg} p-3 rounded-xl`}>{stat.icon}</div>
                            <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg">
                                {stat.grow}
                            </span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {stat.label}
                        </p>
                        <h3 className="text-2xl font-bold mt-1">
                            {stat.value}{" "}
                            <span className="text-sm font-normal text-slate-400">
                                {stat.sub}
                            </span>
                        </h3>
                    </div>
                ))}
            </div>

            {/* 2. Sección de Gráficas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Gráfica de Crecimiento (Revenue) */}
                <section className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold">Crecimiento de Ingresos</h3>
                        <div className="flex gap-4 text-xs font-medium text-slate-400">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>{" "}
                                Pipeline
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-200 rounded-full"></span>{" "}
                                Convertido
                            </span>
                        </div>
                    </div>
                    {/* Placeholder de Gráfica de Barras */}
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                        {[40, 60, 45, 70, 85, 65, 95, 80, 85, 70].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 flex flex-col items-center gap-2"
                            >
                                <div
                                    style={{ height: `${h}%` }}
                                    className="w-full bg-blue-600 rounded-t-sm opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                                ></div>
                                <span className="text-[10px] text-slate-400 font-medium">
                                    ENE
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Canales Principales (Donut Chart) */}
                <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold mb-6">Canales Principales</h3>
                    <div className="relative h-48 flex items-center justify-center mb-6">
                        {/* Círculo de progreso visual con SVG */}
                        <svg className="w-40 h-40 transform -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-slate-100"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray="440"
                                strokeDashoffset="120"
                                className="text-blue-600"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold">72%</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">
                                Directo
                            </span>
                        </div>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 text-slate-500">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>{" "}
                                Marketing Directo
                            </span>
                            <span className="font-bold">72%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 text-slate-500">
                                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>{" "}
                                Anuncios Sociales
                            </span>
                            <span className="font-bold">18%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2 text-slate-500">
                                <span className="w-2 h-2 bg-slate-300 rounded-full"></span>{" "}
                                Referidos
                            </span>
                            <span className="font-bold">10%</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* 3. Fila Inferior: Actividad y Oportunidades */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Actividad Reciente */}
                <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold">Actividad Reciente</h3>
                        <button className="text-xs font-bold text-blue-600">
                            Ver todo
                        </button>
                    </div>
                    <div className="space-y-6">
                        {[
                            {
                                user: "Sarah Jenkins",
                                action: "convirtió un nuevo lead",
                                time: "Hace 2 minutos",
                                val: "$12,400",
                                img: "/Equipo/Ana Castro.JPG",
                            },
                            {
                                user: "David Chen",
                                action: "envió mensaje a Alpha Corp",
                                time: "Hace 45 minutos",
                                val: "Respuesta pendiente",
                                img: "/Equipo/Ana Castro.JPG",
                            },
                        ].map((act, i) => (
                            <div key={i} className="flex gap-3">
                                <img
                                    src={act.img}
                                    className="w-8 h-8 rounded-full object-cover"
                                    alt=""
                                />
                                <div className="text-sm">
                                    <p className="text-slate-900">
                                        <span className="font-bold">{act.user}</span> {act.action}
                                    </p>
                                    <p className="text-xs text-slate-400 font-medium">
                                        {act.time} • {act.val}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mejores Oportunidades (Tabla) */}
                <section className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold">Mejores Oportunidades</h3>
                        <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                                <Filter size={18} />
                            </button>
                            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-50">
                                    <th className="pb-4">Empresa</th>
                                    <th className="pb-4">Contacto</th>
                                    <th className="pb-4">Valor</th>
                                    <th className="pb-4">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    {
                                        co: "Acme Corp",
                                        name: "Johnathan Miller",
                                        val: "$45,000",
                                        status: "Negociación",
                                        color: "bg-slate-100 text-slate-600",
                                    },
                                    {
                                        co: "Global Tech",
                                        name: "Elena Rodriguez",
                                        val: "$22,500",
                                        status: "Nuevo Lead",
                                        color: "bg-blue-100 text-blue-600",
                                    },
                                    {
                                        co: "Zenith Labs",
                                        name: "Marcus Wright",
                                        val: "$98,000",
                                        status: "Descubrimiento",
                                        color: "bg-indigo-100 text-indigo-600",
                                    },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 font-bold">{row.co}</td>
                                        <td className="py-4 text-slate-500">{row.name}</td>
                                        <td className="py-4 font-bold">{row.val}</td>
                                        <td className="py-4">
                                            <span
                                                className={`px-2 py-1 rounded-md text-[10px] font-bold ${row.color}`}
                                            >
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};;
