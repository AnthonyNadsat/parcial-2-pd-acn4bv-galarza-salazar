import { body, validationResult } from 'express-validator';

// Reglas de validacion

export const bugValidationRules = [
    body('nombreJuego')
        .trim()
        .notEmpty()
        .withMessage('El nombre del juego es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre del juego debe tener entre 2 y 100 caracteres'),

    body('plataforma')
        .trim()
        .notEmpty()
        .withMessage('La plataforma es obligatoria')
        .isIn(['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox Series S', 'Nintendo Switch', 'Nintendo Switch 2', 'Android', 'iOS'])
        .withMessage('Plataforma no válida'),

    body('tipo')
        .trim()
        .notEmpty()
        .withMessage('El tipo de bug es obligatorio')
        .isIn(['Gráfico', 'Audio', 'Gameplay'])
        .withMessage('Tipo de bug no válido'),

    body('gravedad')
        .trim()
        .notEmpty()
        .withMessage('La gravedad es obligatoria')
        .isIn(['Baja', 'Media', 'Alta'])
        .withMessage('Gravedad no válida'),

    body('descripcion')
        .trim()
        .notEmpty()
        .withMessage('La descripción es obligatoria')
        .isLength({ min: 10, max: 500 })
        .withMessage('La descripción debe tener entre 10 y 500 caracteres')
];

// Middleware para manejar errores de validacion

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }

    next();
};