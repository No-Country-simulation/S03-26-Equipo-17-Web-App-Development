import {
    Send,
    Paperclip,
    Smile,
    Phone,
    Video,
    MoreVertical,
    AtSign,
} from "lucide-react";
import React from "react";

export const Chats = () => {
    const fileInputRef = React.useRef(null);

    const handleAttachmentClick = () => {
        fileInputRef.current.click();
    };

    const [showEmojis, setShowEmojis] = React.useState(false);

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            {/* 1. Columna Izquierda: Bandeja de Entrada */}
            <aside className="w-80 border-r border-slate-200 bg-white flex flex-col">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Bandeja de entrada</h2>
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                        24 NUEVOS
                    </span>
                </div>

                <div className="overflow-y-auto flex-1">
                    {/* Item de Chat (Mock) */}
                    <div className="p-4 flex gap-3 border-l-4 border-blue-600 bg-blue-50 cursor-pointer">
                        <img
                            src="/Equipo/Ana Castro.JPG"
                            className="w-12 h-12 rounded-xl object-cover"
                            alt="Ana"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                                <p className="font-semibold truncate">Ana Castro</p>
                                <span className="text-xs text-slate-400">12:45 PM</span>
                            </div>
                            <p className="text-sm text-slate-500 truncate">
                                ¿Podemos programar la demo para...
                            </p>
                            <div className="flex gap-2 mt-1">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-600">
                                    CLIENTE
                                </span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-600">
                                    ALTO INTERÉS
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* ... otros contactos simulados ... */}
                </div>
            </aside>
            {/* 2. Columna central: Ventana de Conversación */}
            <main className="flex-1 flex flex-col bg-white">
                {/* Encabezado del Chat */}
                <header className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img
                            src="/Equipo/Ana Castro.JPG"
                            className="w-10 h-10 rounded-full object-cover"
                            alt="Ana"
                        />
                        <div>
                            <p className="font-bold">Ana Castro</p>
                            <p className="text-xs text-green-500 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>{" "}
                                En línea ahora
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-slate-400">
                        <Video
                            size={20}
                            className="cursor-pointer hover:text-slate-600"
                        />
                        <Phone
                            size={20}
                            className="cursor-pointer hover:text-slate-600"
                        />
                        <MoreVertical
                            size={20}
                            className="cursor-pointer hover:text-slate-600"
                        />
                    </div>
                </header>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                    {/* Mensaje Recibido */}
                    <div className="flex gap-3 max-w-[80%]">
                        <img
                            src="/Equipo/Ana Castro.JPG"
                            className="w-8 h-8 rounded-full self-end"
                            alt=""
                        />
                        <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-none text-sm leading-relaxed">
                            ¡Hola! He revisado los niveles de precios que me enviaste...
                        </div>
                    </div>

                    {/* Mensaje Enviado */}
                    <div className="flex flex-col items-end gap-1">
                        <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none text-sm max-w-[80%] leading-relaxed shadow-md">
                            ¡Me alegra escuchar eso! Definitivamente podemos tener una
                            llamada rápida...
                        </div>
                        <span className="text-[10px] text-slate-400 uppercase">
                            12:44 PM • Leído
                        </span>
                    </div>
                </div>

                {/* Input de Mensaje */}
                <footer className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-blue-400 transition-colors">
                        <button
                            onClick={handleAttachmentClick}
                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            <Paperclip size={20} />
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden" // Escondido de la vista
                            onChange={(e) =>
                                console.log("Archivo seleccionado:", e.target.files[0])
                            }
                        />
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            className="bg-transparent flex-1 text-sm outline-none"
                            autoComplete="off"
                            name="mensaje-chat"
                        />
                        <div className="relative">
                            <button
                                onClick={() => setShowEmojis(!showEmojis)}
                                className="p-2 text-slate-400 hover:text-blue-600"
                            >
                                <Smile size={20} />
                            </button>

                            {showEmojis && (
                                <div className="absolute w-56 bottom-14 right-0 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 z-50">
                                    <div className="grid grid-cols-4 gap-3">
                                        {["😊", "🚀", "🔥", "👍", "🙌", "💡", "✅", "✨"].map(
                                            (emoji) => (
                                                <button
                                                    type="button"
                                                    key={emoji}
                                                    className="cursor-pointer hover:scale-125 transition-transform text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 leading-none"
                                                    onClick={() => {
                                                        console.log("Seleccionaste:", emoji);
                                                        setShowEmojis(false);
                                                    }}
                                                >
                                                    {emoji}
                                                </button>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200">
                            <Send size={18} />
                        </button>
                    </div>
                </footer>
            </main>

            {/* 3. Columna Derecha: Perfil / Detalles del Contacto */}
            <aside className="w-80 border-l border-slate-200 bg-white p-6 overflow-y-auto hidden lg:block">
                <div className="flex flex-col items-center text-center">
                    <img
                        src="/Equipo/Ana Castro.JPG"
                        className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white"
                        alt="Ana"
                    />
                    <h3 className="mt-4 text-xl font-bold">Ana Castro</h3>
                    <p className="text-slate-400 text-sm">
                        Directora de Crecimiento @ TechFlow
                    </p>

                    <div className="flex gap-2 mt-4">
                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-50 text-blue-600 border border-blue-100">
                            ALTO INTERÉS
                        </span>
                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600">
                            SOFTWARE
                        </span>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <section>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Información de contacto
                        </p>
                        <div className="mt-3 space-y-3 text-sm text-slate-600">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 bg-slate-50 flex items-center justify-center rounded-lg text-slate-400">
                                    <AtSign size={16} />
                                </span>
                                ana.castro@techflow.io
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 bg-slate-50 flex items-center justify-center rounded-lg text-slate-400">
                                    <Phone size={16} />
                                </span>
                                +1 (555) 234-8901
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Actividad reciente
                            </p>
                            <button className="text-[10px] font-bold text-blue-600 hover:underline">
                                Ver todo
                            </button>
                        </div>
                        {/* Aquí se puede mapear actividades */}
                        <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-500">
                            No hay actividades recientes para mostrar.
                        </div>
                    </section>

                    <div className="pt-4 space-y-2">
                        <button className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors">
                            Añadir nota interna
                        </button>
                        <button className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-colors">
                            Mover a "Calificado"
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
};;
