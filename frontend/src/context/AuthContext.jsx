import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        // Usuarios hardcodeados momentaneamente
        const usuarios = [
            { username: "admin", password: "1234", role: "admin" },
            { username: "tester", password: "1234", role: "tester" }
        ];

        const found = usuarios.find(
            u => u.username === username && u.password === password
        );

        if (!found) {
            return { ok: false, message: "Credenciales incorrectas" };
        }

        setUser(found);
        return { ok: true };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext;