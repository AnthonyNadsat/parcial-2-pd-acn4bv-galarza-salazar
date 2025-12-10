import db from "../database.js";

    // GET ALL
    export const getBugs = (req, res) => {
        try {
            const rows = db.prepare("SELECT * FROM bugs ORDER BY id DESC").all();
            res.json({
                success: true,
                data: rows
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener los bugs",
                error: error.message
            });
        }
    };

    // POST (CREATE)
    export const createBug = (req, res) => {
        try {
            const { nombreJuego, plataforma, tipo, gravedad, descripcion } = req.body;

            const fecha = new Date().toLocaleString("es-AR");

            const query = db.prepare(`
                INSERT INTO bugs (nombreJuego, plataforma, tipo, gravedad, descripcion, fecha)
                VALUES (?, ?, ?, ?, ?, ?)
            `);

            const result = query.run(
                nombreJuego,
                plataforma,
                tipo,
                gravedad,
                descripcion,
                fecha
            );

            const newBug = {
                id: result.lastInsertRowid,
                nombreJuego,
                plataforma,
                tipo,
                gravedad,
                descripcion,
                fecha
            };

            res.status(201).json({
                success: true,
                message: "Bug creado exitosamente",
                data: newBug
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al crear el bug",
                error: error.message
            });
        }
    };

    // PUT (UPDATE)
            export const updateBug = (req, res) => {
                try {
                    const { id } = req.params;
                    const { nombreJuego, plataforma, tipo, gravedad, descripcion } = req.body;

                    const existing = db.prepare("SELECT * FROM bugs WHERE id = ?").get(id);

                    if (!existing) {
                        return res.status(404).json({
                            success: false,
                            message: "Bug no encontrado"
                        });
                    }

            db.prepare(`
                UPDATE bugs
                SET nombreJuego=?, plataforma=?, tipo=?, gravedad=?, descripcion=?
                WHERE id=?
            `).run(nombreJuego, plataforma, tipo, gravedad, descripcion, id);

            const updated = db.prepare("SELECT * FROM bugs WHERE id = ?").get(id);

            res.json({
                success: true,
                message: "Bug actualizado exitosamente",
                data: updated
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al actualizar el bug",
                error: error.message
            });
        }
    };

    // DELETE
    export const deleteBug = (req, res) => {
        try {
            const { id } = req.params;

            const existing = db.prepare("SELECT * FROM bugs WHERE id = ?").get(id);

            if (!existing) {
                return res.status(404).json({
                    success: false,
                    message: "Bug no encontrado"
                });
            }

            db.prepare("DELETE FROM bugs WHERE id = ?").run(id);

            res.json({
                success: true,
                message: "Bug eliminado correctamente"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al eliminar el bug",
                error: error.message
            });
        }
    };