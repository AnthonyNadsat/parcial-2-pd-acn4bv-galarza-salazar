import db from "../database.js";


export const getBugs = (req, res) => {
    try {

        const query = `
            SELECT 
                bugs.*,
                users.username as createdBy,
                users.role as creatorRole
            FROM bugs
            LEFT JOIN users ON bugs.userId = users.id
            ORDER BY bugs.id DESC
        `;

        const rows = db.prepare(query).all();

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

// GET BY ID
export const getBugById = (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                bugs.*,
                users.username as createdBy,
                users.email as creatorEmail,
                users.role as creatorRole
            FROM bugs
            LEFT JOIN users ON bugs.userId = users.id
            WHERE bugs.id = ?
        `;

        const bug = db.prepare(query).get(id);

        if (!bug) {
            return res.status(404).json({
                success: false,
                message: "Bug no encontrado"
            });
        }

        res.json({
            success: true,
            data: bug
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el bug",
            error: error.message
        });
    }
};

// POST (CREATE)
export const createBug = (req, res) => {
    try {
        const { nombreJuego, plataforma, tipo, gravedad, descripcion } = req.body;


        const userId = req.user.id;

        const fecha = new Date().toLocaleString("es-AR");

        const query = db.prepare(`
            INSERT INTO bugs (nombreJuego, plataforma, tipo, gravedad, descripcion, fecha, userId)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const result = query.run(
            nombreJuego,
            plataforma,
            tipo,
            gravedad,
            descripcion,
            fecha,
            userId  // ← AGREGADO
        );


        const newBugQuery = `
            SELECT 
                bugs.*,
                users.username as createdBy,
                users.role as creatorRole
            FROM bugs
            LEFT JOIN users ON bugs.userId = users.id
            WHERE bugs.id = ?
        `;

        const newBug = db.prepare(newBugQuery).get(result.lastInsertRowid);

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

        // Obtener el bug existente
        const existing = db.prepare("SELECT * FROM bugs WHERE id = ?").get(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Bug no encontrado"
            });
        }


        if (existing.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "No tenes permiso para editar este bug"
            });
        }

        db.prepare(`
            UPDATE bugs
            SET nombreJuego=?, plataforma=?, tipo=?, gravedad=?, descripcion=?
            WHERE id=?
        `).run(nombreJuego, plataforma, tipo, gravedad, descripcion, id);

        // Obtener bug actualizado con info del usuario
        const updatedQuery = `
            SELECT 
                bugs.*,
                users.username as createdBy,
                users.role as creatorRole
            FROM bugs
            LEFT JOIN users ON bugs.userId = users.id
            WHERE bugs.id = ?
        `;

        const updated = db.prepare(updatedQuery).get(id);

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


        if (existing.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para eliminar este bug"
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

// Obtener solo los bugs del usuario autenticado
export const getMyBugs = (req, res) => {
    try {
        const userId = req.user.id;

        const query = `
            SELECT 
                bugs.*,
                users.username as createdBy,
                users.role as creatorRole
            FROM bugs
            LEFT JOIN users ON bugs.userId = users.id
            WHERE bugs.userId = ?
            ORDER BY bugs.id DESC
        `;

        const rows = db.prepare(query).all(userId);

        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener tus bugs",
            error: error.message
        });
    }
};