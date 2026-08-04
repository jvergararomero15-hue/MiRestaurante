import { useEffect, useRef, useState } from 'react';
import api from '../services/api';

const MENSAJES_INICIALES = [
    {
        origen: 'bot',
        texto: '¡Hola! Soy el asistente virtual de Delicias Restaurante. 🍽️ ' +
               'Puedo ayudarte con el menú, precios, horarios, reservas y más. ¿Qué deseas saber?'
    }
];

function Chatbot() {

    const [abierto, setAbierto] = useState(false);
    const [mensajes, setMensajes] = useState(MENSAJES_INICIALES);
    const [entrada, setEntrada] = useState('');
    const [escribiendo, setEscribiendo] = useState(false);

    const listaRef = useRef(null);

    useEffect(() => {
        if (listaRef.current) {
            listaRef.current.scrollTop = listaRef.current.scrollHeight;
        }
    }, [mensajes, escribiendo]);

    async function enviarMensaje(evento) {
        evento.preventDefault();

        const texto = entrada.trim();
        if (!texto || escribiendo) return;

        setMensajes((prev) => [...prev, { origen: 'usuario', texto }]);
        setEntrada('');
        setEscribiendo(true);

        try {
            const respuesta = await api.post('/chat', { mensaje: texto });
            const textoBot = respuesta.data?.respuesta || 'No pude responder. Intenta de nuevo.';
            setMensajes((prev) => [...prev, { origen: 'bot', texto: textoBot }]);
        } catch (error) {
            setMensajes((prev) => [
                ...prev,
                { origen: 'bot', texto: 'No pude conectarme con el asistente. Intenta más tarde.' }
            ]);
        } finally {
            setEscribiendo(false);
        }
    }

    return (
        <>
            {/* Botón flotante */}
            <button
                className="chatbot-flotante"
                onClick={() => setAbierto(!abierto)}
                aria-label="Abrir chat"
            >
                {abierto ? '✕' : '💬'}
            </button>

            {/* Ventana del chat */}
            {abierto && (
                <div className="chatbot-ventana">
                    <div className="chatbot-cabecera">
                        <span>🤖 Asistente Delicias</span>
                        <button onClick={() => setAbierto(false)} aria-label="Cerrar chat">✕</button>
                    </div>

                    <div className="chatbot-mensajes" ref={listaRef}>
                        {mensajes.map((mensaje, indice) => (
                            <div
                                key={indice}
                                className={`chatbot-burbuja chatbot-${mensaje.origen}`}
                            >
                                {mensaje.texto}
                            </div>
                        ))}
                        {escribiendo && (
                            <div className="chatbot-burbuja chatbot-bot">
                                <span className="chatbot-puntos">● ● ●</span>
                            </div>
                        )}
                    </div>

                    <form className="chatbot-entrada" onSubmit={enviarMensaje}>
                        <input
                            type="text"
                            value={entrada}
                            onChange={(e) => setEntrada(e.target.value)}
                            placeholder="Escribe tu pregunta..."
                            disabled={escribiendo}
                        />
                        <button type="submit" disabled={escribiendo || !entrada.trim()}>
                            Enviar
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default Chatbot;
