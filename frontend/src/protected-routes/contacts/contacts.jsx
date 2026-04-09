import React from 'react';
import {
    Filter,
    Plus,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Search
} from 'lucide-react';

export const Contacts = () => {

    //DATOS FICTICIOS QUE LUEGO SE CAMBIARAN
    const contactos = [
        { id: 1, nombre: "Jerome Bell", empresa: "Google Cloud", email: "jerome.b@google.com", estado: "Calificado", score: 92, iniciales: "JS", color: "bg-orange-100 text-orange-600" },
        { id: 2, nombre: "Arlene McCoy", empresa: "Adobe Systems", email: "arlene@adobe.com", estado: "Nutriendo", score: 74, iniciales: "AM", color: "bg-slate-800 text-white" },
        { id: 3, nombre: "Theresa Webb", empresa: "Stripe", email: "t.webb@stripe.io", estado: "Contacto Inicial", score: 48, iniciales: "TW", color: "bg-blue-100 text-blue-600" },
        { id: 4, nombre: "Cody Fisher", empresa: "HubSpot", email: "c.fisher@hubspot.com", estado: "Negociación", score: 89, iniciales: "CF", color: "bg-slate-200 text-slate-600" },
    ];

    // Función para definir el color del badge según el estado
    const getEstadoEstilo = (estado) => {
        switch (estado) {
            case 'Calificado': return 'bg-green-100 text-green-700';
            case 'Nutriendo': return 'bg-amber-100 text-amber-700';
            case 'Contacto Inicial': return 'bg-slate-100 text-slate-600';
            case 'Negociación': return 'bg-blue-100 text-blue-700';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <section className="p-6 space-y-6">
            {/* Encabezado de Sección */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Contactos & Leads
                    </h2>
                    <p className="text-sm text-slate-500">
                        Gestionando 1,284 prospectos activos en tu pipeline.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                        <Filter size={16} />
                        Filtrar
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                        <Plus size={16} />
                        Nuevo Contacto
                    </button>
                </div>
            </header>

            {/* Tabla de Contactos */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    Nombre y Empresa
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    Correo Electrónico
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    Puntuación (Lead Score)
                                </th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {contactos.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-slate-50/50 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${item.color}`}
                                            >
                                                {item.iniciales}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800">
                                                    {item.nombre}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {item.empresa}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${getEstadoEstilo(item.estado)}`}
                                        >
                                            {item.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full max-w-[100px] overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-600 rounded-full"
                                                    style={{ width: `${item.score}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-bold text-blue-600">
                                                {item.score}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer de Tabla / Paginación */}
                <footer className="px-6 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-50">
                    <p className="text-xs text-slate-400 font-medium">
                        Mostrando <span className="text-slate-600">4</span> de{" "}
                        <span className="text-slate-600">1,284</span> resultados
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                            disabled
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-slate-600">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </footer>
            </div>
        </section>
    );
};
