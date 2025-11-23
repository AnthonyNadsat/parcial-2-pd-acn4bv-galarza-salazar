import { useState, useEffect } from 'react';

export default function BugForm({ onBugCreated, onBugUpdated, bugToEdit, loading }) {

    const [nombreJuego, setNombreJuego] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [tipo, setTipo] = useState('');
    const [gravedad, setGravedad] = useState('Baja');
    const [descripcion, setDescripcion] = useState('');

    const [errors, setErrors] = useState([]); // <-- NUEVO

    useEffect(() => {
        if (bugToEdit) {
            setNombreJuego(bugToEdit.nombreJuego);
            setPlataforma(bugToEdit.plataforma);
            setTipo(bugToEdit.tipo);
            setGravedad(bugToEdit.gravedad);
            setDescripcion(bugToEdit.descripcion);
            setErrors([]); // limpiamos errores si está editando
        } else {
            limpiarFormulario();
        }
    }, [bugToEdit]);

    const limpiarFormulario = () => {
        setNombreJuego('');
        setPlataforma('');
        setTipo('');
        setGravedad('Baja');
        setDescripcion('');
        setErrors([]);
    };

    // -------------------------
    // VALIDACIONES (NUEVO)
    // -------------------------
    const validarFormulario = () => {
        const newErrors = [];

        if (!nombreJuego.trim()) {
            newErrors.push("El nombre del juego es obligatorio.");
        } else if (nombreJuego.trim().length < 2) {
            newErrors.push("El nombre del juego debe tener al menos 2 caracteres.");
        }

        if (!plataforma) {
            newErrors.push("Debe seleccionar una plataforma.");
        }

        if (!tipo) {
            newErrors.push("Debe seleccionar un tipo de bug.");
        }

        if (!descripcion.trim()) {
            newErrors.push("La descripción es obligatoria.");
        } else if (descripcion.trim().length < 5) {
            newErrors.push("La descripción debe tener mínimo 5 caracteres.");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDACIÓN
        if (!validarFormulario()) return;

        const bugData = { nombreJuego, plataforma, tipo, gravedad, descripcion };

        if (bugToEdit) {
            onBugUpdated({ ...bugData, id: bugToEdit.id });
        } else {
            onBugCreated(bugData);
        }

        limpiarFormulario();
    };

    return (
        <form className="bug-form" id="bugForm" onSubmit={handleSubmit}>

            {/* Mostrar errores (NUEVO) */}
            {errors.length > 0 && (
                <div className="error-box">
                    {errors.map((err, index) => (
                        <p key={index} className="error-text">{err}</p>
                    ))}
                </div>
            )}

            <input
                type="text"
                placeholder="Juego"
                value={nombreJuego}
                onChange={(e) => setNombreJuego(e.target.value)}
            />

            <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="PC">PC</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="Xbox Series">Xbox Series</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
            </select>

            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Seleccionar...</option>
                <option value="Gráfico">Gráfico</option>
                <option value="Audio">Audio</option>
                <option value="Gameplay">Gameplay</option>
            </select>

            <select value={gravedad} onChange={(e) => setGravedad(e.target.value)}>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
            </select>

            <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />

        </form>
    );
}
