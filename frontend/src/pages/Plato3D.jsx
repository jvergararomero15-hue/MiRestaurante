import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '@google/model-viewer';

function Plato3D() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const nombre = searchParams.get("nombre") || "Plato";
    const modelo = searchParams.get("modelo") || "";

    const modeloMesa = modelo.replace(/\.glb$/i, "_mesa.glb");

    const [vista, setVista] = useState('mesa');
    const [mostrarNota, setMostrarNota] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setMostrarNota(false), 7000);
        return () => clearTimeout(timer);
    }, []);

    const esAR = (() => {
        try {
            const mv = document.createElement('model-viewer');
            return typeof mv.activateAR === 'function' && mv.canActivateAR;
        } catch (error) {
            return false;
        }
    })();

    return (
        <div className="plato3d-contenedor">

            <button className="plato3d-volver" onClick={() => navigate(-1)}>
                ⬅ Volver
            </button>

            <div className="plato3d-info">
                <h2>{nombre}</h2>
                <p>👆 Arrastrá para rotar y ver el plato desde todos los ángulos</p>
            </div>

            <model-viewer
                className="plato3d-visor"
                src={vista === 'mesa' ? modeloMesa : modelo}
                alt={`Plato 3D de ${nombre}`}
                camera-controls
                auto-rotate
                rotate-per-second="30deg"
                auto-rotate-delay="0"
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="auto"
                ios-src=""
                camera-orbit="0deg 75deg 105%"
                style={{ width: "100%", height: "100%" }}
            >
                <button
                    slot="ar-button"
                    className="plato3d-ar-boton"
                >
                    📱 Ver en tu mesa (AR)
                </button>
            </model-viewer>

            {/* Selector de vista */}
            <div className="plato3d-vistas">
                <button
                    className={`plato3d-vista-btn ${vista === 'mesa' ? 'activo' : ''}`}
                    onClick={() => setVista('mesa')}
                >
                    🪑 En la mesa
                </button>
                <button
                    className={`plato3d-vista-btn ${vista === 'plato' ? 'activo' : ''}`}
                    onClick={() => setVista('plato')}
                >
                    🥘 Solo el plato
                </button>
            </div>

            {mostrarNota && (
                <div className="plato3d-nota" onClick={() => setMostrarNota(false)}>
                    {esAR ? (
                        <>📱 Tocá <b>"Ver en tu mesa"</b> para poner el plato con la cámara (AR).</>
                    ) : (
                        <>💡 Tu celular no soporta la cámara AR. Usá <b>"🪑 En la mesa"</b>:
                        el plato aparece sobre una mesa virtual y lo rotás arrastrando.</>
                    )}
                    <span className="plato3d-nota-cerrar">✕</span>
                </div>
            )}
        </div>
    );
}

export default Plato3D;
