export default function BugCard({ bug, onDelete, onEdit }) {
    return (
        <div className="bug-card">
            <div className={`badge badge-${bug.gravedad.toLowerCase()}`}>
                PRIORIDAD {bug.gravedad.toUpperCase()}
            </div>

            <div className="bug-title">
                {bug.nombreJuego} • {bug.plataforma} • {bug.tipo}
            </div>

            <div className="bug-description">{bug.descripcion}</div>
            <div className="bug-date">{bug.fecha}</div>

            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button onClick={() => onDelete(bug.id)} className="btn-delete">
                    Eliminar
                </button>

                <button onClick={() => onEdit(bug)} className="btn-edit">
                    Editar
                </button>
            </div>
        </div>
    );
}
