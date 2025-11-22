import { useState, useEffect } from "react";
import "./EditModal.css";

export default function EditModal({ bug, onSave, onClose }) {
    const [form, setForm] = useState({
        nombreJuego: "",
        plataforma: "",
        tipo: "",
        gravedad: "",
        descripcion: ""
    });

    useEffect(() => {
        if (bug) {
            setForm({
                nombreJuego: bug.nombreJuego,
                plataforma: bug.plataforma,
                tipo: bug.tipo,
                gravedad: bug.gravedad,
                descripcion: bug.descripcion
            });
        }
    }, [bug]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave({ ...bug, ...form }); // combina original + cambios
    }

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Editar bug</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="nombreJuego"
                        value={form.nombreJuego}
                        onChange={handleChange}
                        placeholder="Juego"
                    />

                    <select name="plataforma" value={form.plataforma} onChange={handleChange}>
                        <option value="">Seleccionar...</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Xbox Series">Xbox Series</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                    </select>

                    <select name="tipo" value={form.tipo} onChange={handleChange}>
                        <option value="">Seleccionar...</option>
                        <option value="Gráfico">Gráfico</option>
                        <option value="Audio">Audio</option>
                        <option value="Gameplay">Gameplay</option>
                    </select>

                    <select name="gravedad" value={form.gravedad} onChange={handleChange}>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>

                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción"
                    />

                    <div className="modal-actions">
                        <button type="submit" className="btn-save">Guardar</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}