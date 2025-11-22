import { useEffect, useState } from "react";
import { fetchBugs } from "../services/api";

export default function Reportes() {

    const [bugs, setBugs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("TODOS");

    useEffect(() => {
        cargarBugs();
    }, []);

    async function cargarBugs() {
        try {
            const data = await fetchBugs();
            setBugs(data);
            setFiltered(data);
        } catch (err) {
            console.error("Error al cargar:", err);
        } finally {
            setLoading(false);
        }
    }

    function filtrar(tipo) {
        setActiveFilter(tipo);

        if (tipo === "TODOS") {
            setFiltered(bugs);
            return;
        }

        const f = bugs.filter(b => b.gravedad.toUpperCase() === tipo);
        setFiltered(f);
    }

    return (
        <div className="reportes-container">

            <h1 className="reportes-title">Historial de bugs</h1>

            <div className="filtros-container">
                <button
                    className={`filtro-btn ${activeFilter === "TODOS" ? "active" : ""}`}
                    onClick={() => filtrar("TODOS")}
                >
                    TODOS
                </button>
                <button
                    className={`filtro-btn ${activeFilter === "BAJA" ? "active" : ""}`}
                    onClick={() => filtrar("BAJA")}
                >
                    BAJA
                </button>
                <button
                    className={`filtro-btn ${activeFilter === "MEDIA" ? "active" : ""}`}
                    onClick={() => filtrar("MEDIA")}
                >
                    MEDIA
                </button>
                <button
                    className={`filtro-btn ${activeFilter === "ALTA" ? "active" : ""}`}
                    onClick={() => filtrar("ALTA")}
                >
                    ALTA
                </button>
            </div>

            {loading ? (
                <p className="loading-text">Cargando...</p>
            ) : (
                <div className="cards-container">
                    {filtered.length === 0 ? (
                        <p>No hay bugs cargados.</p>
                    ) : (
                        filtered.map(bug => (
                            <div key={bug.id} className="bug-card-report">

                                <div className={`badge-report badge-${bug.gravedad.toLowerCase()}`}>
                                    PRIORIDAD {bug.gravedad.toUpperCase()}
                                </div>

                                <div className="bug-report-title">
                                    {bug.nombreJuego} • {bug.plataforma} • {bug.tipo}
                                </div>

                                <div className="bug-report-desc">
                                    {bug.descripcion}
                                </div>

                                <div className="bug-report-date">
                                    {bug.fecha}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}