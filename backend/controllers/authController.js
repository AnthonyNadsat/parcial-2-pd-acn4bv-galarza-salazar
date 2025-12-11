import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt.js';

// Registro de nuevos usuarios
export const register = async (req, res) => {
    try {
        const { username, email, password, role = 'tester' } = req.body;

        // Verificamos que el rol sea valido
        if (role && !['admin', 'tester'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Rol no válido. Debe ser "admin" o "tester"'
            });
        }

        // Verificamos si el usuario ya existe
        const existingUser = User.findByUsername(username);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'El nombre de usuario ya está en uso'
            });
        }

        // Verificamos si el email ya existe
        const existingEmail = User.findByEmail(email);
        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: 'El email ya está registrado'
            });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const newUser = User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        // Generar token JWT
        const token = jwt.sign(
            {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                },
                token
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// Login de usuarios
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validar campos obligatorios
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Usuario y contraseña son obligatorios'
            });
        }

        // Buscar usuario
        const user = User.findByUsername(username);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.json({
            success: true,
            message: 'Login exitoso',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

// Obtener perfil del usuario autenticado
export const getProfile = (req, res) => {
    try {

        const user = User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            success: true,
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil',
            error: error.message
        });
    }
};