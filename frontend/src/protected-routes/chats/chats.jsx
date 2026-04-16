import {
    Send,
    Paperclip,
    Smile,
    Phone,
    Video,
    MoreVertical,
    AtSign,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export const Chats = () => {
    const fileInputRef = React.useRef(null);
    const [showEmojis, setShowEmojis] = React.useState(false);

    // Declaración correcta de estados
    const [activeLeadId, setActiveLeadId] = useState(1);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const fetchHistory = async (leadId) => {
        try {
            // 1. OBTENER EL TOKEN DEL LOCALSTORAGE
            const token = localStorage.getItem("accessToken"); 
            // 2. ENVIAR EL TOKEN EN LOS HEADERS
            const response = await fetch(`${import.meta.env.VITE_API_URL}/leads/${leadId}/history`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if (!response.ok) throw new Error("Fallo al obtener historial (Error " + response.status + ")");
            
            const data = await response.json();
            setMessages(data.content || data);
            console.log(`📡 Historial actualizado del lead ${leadId}`, data);
        } catch (error) {
            console.error("🔴 Error al obtener el historial:", error);
        }
    };

    useEffect(() => {
        if (!activeLeadId) return;

        fetchHistory(activeLeadId);

        const wsUrl = import.meta.env.VITE_WS_URL || "http://localhost:8080/ws";
        const socket = new SockJS(wsUrl);
        const stompClient = Stomp.over(socket);

        stompClient.debug = () => { };

        stompClient.connect({}, (frame) => {
            console.log("🟢 Conectado al WebSocket");

            stompClient.subscribe(`/topic/lead/${activeLeadId}`, (message) => {
                if (message.body === "UPDATE_HISTORY") {
                    console.log("⚡ ¡Mensaje nuevo! Recargando chat...");
                    fetchHistory(activeLeadId);
                }
            });
        }, (error) => {
            console.error("🔴 Error en WebSocket:", error);
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [activeLeadId]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        try {
            // 1. OBTENER EL TOKEN DEL LOCALSTORAGE
            const token = localStorage.getItem("accessToken"); // <-- Verifica que este sea el nombre correcto

            // 2. ENVIAR EL TOKEN EN LOS HEADERS
            const response = await fetch(`${import.meta.env.VITE_API_URL}/whatsapp/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    leadId: activeLeadId,
                    message: inputValue
                })
            });

            if (!response.ok) throw new Error("Fallo al enviar el mensaje (Error " + response.status + ")");

            setInputValue("");
            setShowEmojis(false);
        } catch (error) {
            console.error("🔴 Error al enviar el mensaje:", error);
        }
    };

    const handleAttachmentClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            {/* Columna Izquierda */}
            <aside className="w-80 border-r border-slate-200 bg-white flex flex-col">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Bandeja de entrada</h2>
                </div>
                <div className="overflow-y-auto flex-1">
                    <div className="p-4 flex gap-3 border-l-4 border-blue-600 bg-blue-50 cursor-pointer">
                        <img src="/Equipo/Ana Castro.JPG" className="w-12 h-12 rounded-xl object-cover" alt="Ana" />
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">Ana Castro</p>
                            <p className="text-sm text-slate-500 truncate">Lead de prueba...</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Columna central: Ventana de Conversación */}
            <main className="flex-1 flex flex-col bg-white">
                <header className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src="/Equipo/Ana Castro.JPG" className="w-10 h-10 rounded-full object-cover" alt="Ana" />
                        <div>
                            <p className="font-bold">Ana Castro</p>
                            <p className="text-xs text-green-500 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> En línea ahora
                            </p>
                        </div>
                    </div>
                </header>

                {/* Mensajes dinámicos */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                    {messages.length === 0 ? (
                        <div className="text-center text-slate-400 mt-10">No hay mensajes en el historial.</div>
                    ) : (
                        messages.map((msg, index) => {
                            // Evaluamos el tipo exacto según tu enum en Java
                            const isIncoming = msg.type === "WHATSAPP_INCOMING";

                            return (
                                <div
                                    key={index}
                                    className={`flex gap-3 max-w-[80%] ${isIncoming ? "self-start" : "ml-auto flex-col items-end gap-1"}`}
                                >
                                    {isIncoming && (
                                        <img src="/Equipo/Ana Castro.JPG" className="w-8 h-8 rounded-full self-end" alt="Cliente" />
                                    )}

                                    <div
                                        className={`p-4 text-sm leading-relaxed shadow-md ${
                                            isIncoming
                                                ? "bg-slate-100 rounded-2xl rounded-bl-none text-slate-900"
                                                : "bg-blue-600 text-white rounded-2xl rounded-br-none"
                                        }`}
                                    >
                                        {/* Usamos exactamente el nombre del campo en tu clase Java */}
                                        {msg.content}
                                    </div>

                                    {/* Agregamos la hora real del mensaje usando msg.createdAt */}
                                    <span className="text-[10px] text-slate-400 uppercase">
                                        {msg.createdAt 
                                            ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                                            : ''} 
                                        {isIncoming ? " • Recibido" : " • Enviado"}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Input de Mensaje */}
                <footer className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-blue-400 transition-colors">
                        <button onClick={handleAttachmentClick} className="p-2 text-slate-400 hover:text-blue-600">
                            <Paperclip size={20} />
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" />
                        
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            className="bg-transparent flex-1 text-sm outline-none"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />

                        <button onClick={handleSendMessage} className="bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200">
                            <Send size={18} />
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
};