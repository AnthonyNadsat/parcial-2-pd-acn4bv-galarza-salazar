import { useState, useEffect } from 'react';

export default function BugForm({ onBugCreated, onBugUpdated, bugToEdit, loading }) {
    const [nombreJuego, setNombreJuego] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [tipo, setTipo] = useState('');
    const [gravedad, setGravedad] = useState('Baja');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        if (bugToEdit) {
            setNombreJuego(bugToEdit.nombreJuego);
            setPlataforma(bugToEdit.plataforma);
            setTipo(bugToEdit.tipo);
            setGravedad(bugToEdit.gravedad);
            setDescripcion(bugToEdit.descripcion);
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const bugData = {
            nombreJuego,
            plataforma,
            tipo,
            gravedad,
            descripcion,
        };

        // Editar
        if (bugToEdit) {
            onBugUpdated({ ...bugData, id: bugToEdit.id });
        }
        // Crear
        else {
            onBugCreated(bugData);
        }

        limpiarFormulario();
    };

    return (
        <form className="bug-form" onSubmit={handleSubmit}>

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

            <button type="submit" disabled={loading}>
                {bugToEdit ? 'Guardar cambios' : 'Reportar bug'}
            </button>
        </form>
    );
}