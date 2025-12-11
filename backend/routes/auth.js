import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validateBug.js';

const router = express.Router();

// Validacion para registro
const registerValidation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 20 })
        .withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Debe ser un email válido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 4 })
        .withMessage('La contraseña debe tener al menos 4 caracteres'),

    body('role')
        .optional()
        .isIn(['admin', 'tester'])
        .withMessage('El rol debe ser "admin" o "tester"')
];

// Validacion para login
const loginValidation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
];


router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', loginValidation, handleValidationErrors, login);


router.get('/profile', verifyToken, getProfile);

export default router;