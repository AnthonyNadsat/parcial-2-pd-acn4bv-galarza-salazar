import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import RequireAdmin from "./components/RequireAdmin";

import Home from "./pages/Home";
import Reportes from "./pages/Reportes";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import { deleteBug, updateBug, fetchBugs } from "./services/api";
import { useEffect, useState } from "react";

export default function App() {

    const [bugs, setBugs] = useState([]);
    const [bugToEdit, setBugToEdit] = useState(null);

    useEffect(() => {
        cargar();
    }, []);

    async function cargar() {
        try {
            const data = await fetchBugs();
            setBugs(data);
        } catch (e) {
            console.error("Error cargando bugs", e);
        }
    }

    const handleDeleteBug = async (id) => {
        try {
            await deleteBug(id);
            await cargar();
        } catch (err) {
            console.error("Error al eliminar bug:", err);
        }
    };

    const handleStartEdit = (bug) => {
        setBugToEdit(bug);
    };

    const handleSaveEdit = async (updatedBug) => {
        try {
            await updateBug(updatedBug.id, updatedBug);
            await cargar();
            setBugToEdit(null);
        } catch (err) {
            console.error("Error al actualizar bug:", err);
        }
    };

    return (
        <AuthProvider>
            <BrowserRouter>

                <Header />

                <div className="app-layout">
                    <Routes>
                        <Route path="/" element={
                            <Home
                                bugToEdit={bugToEdit}
                                onSaveEdit={handleSaveEdit}
                                onCancelEdit={() => setBugToEdit(null)}
                            />
                        } />

                        <Route path="/reportes" element={
                            <Reportes
                                bugs={bugs}
                                onDelete={handleDeleteBug}
                                onEdit={handleStartEdit}
                            />
                        } />

                        <Route path="/login" element={<Login />} />

                        <Route path="/admin" element={
                            <RequireAdmin>
                                <Admin
                                    bugs={bugs}
                                    onDelete={handleDeleteBug}
                                    onEdit={handleStartEdit}
                                />
                            </RequireAdmin>
                        } />
                    </Routes>
                </div>

            </BrowserRouter>
        </AuthProvider>
    );
}