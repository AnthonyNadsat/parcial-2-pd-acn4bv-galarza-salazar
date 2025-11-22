import { useState, useEffect } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import { fetchBugs, createBug, deleteBug, updateBug } from './services/api';

export default function App() {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [bugToEdit, setBugToEdit] = useState(null);

    const cargarBugs = async () => {
        try {
            setLoadingList(true);
            const data = await fetchBugs();
            setBugs(data);
        } catch (err) {
            setErrorMsg('Error al cargar los bugs');
        } finally {
            setLoadingList(false);
        }
    };

    useEffect(() => {
        cargarBugs();
    }, []);

    const clearMessages = () => {
        setErrorMsg('');
        setSuccessMsg('');
    };

    // Crear bug
    const handleCreateBug = async (bugData) => {
        clearMessages();
        try {
            setLoading(true);
            const result = await createBug(bugData);
            setBugs(prev => [...prev, result.data]);
            setSuccessMsg('Bug creado correctamente');
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
            setTimeout(() => setSuccessMsg(''), 2000);
        }
    };

    // Editar bug
    const handleEditBug = (bug) => {
        clearMessages();
        setBugToEdit(bug);
    };

    // Actualizar bug
    const handleUpdateBug = async (updatedBug) => {
        clearMessages();
        try {
            const result = await updateBug(updatedBug.id, updatedBug);
            setBugs(prev =>
                prev.map(bug =>
                    bug.id === updatedBug.id ? result.data : bug
                )
            );
            setBugToEdit(null);
            setSuccessMsg('Bug actualizado correctamente');
        } catch (err) {
            setErrorMsg('Error al actualizar bug');
        }
    };

    // ✅ Eliminar bug
    const handleDeleteBug = async (id) => {
        clearMessages();
        try {
            await deleteBug(id);
            setBugs(prev => prev.filter(bug => bug.id !== id));
            setSuccessMsg('Bug eliminado correctamente');
            setTimeout(() => setSuccessMsg(''), 2000);
        } catch (err) {
            setErrorMsg('Error al eliminar el bug');
        }
    };

    return (
        <div className="app-container">
            <h1>BugLog</h1>

            {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}

            <BugForm
                onBugCreated={handleCreateBug}
                onBugUpdated={handleUpdateBug}
                bugToEdit={bugToEdit}
                loading={loading}
                onClearErrors={clearMessages}
            />

            <hr />

            <h2>Lista de bugs</h2>

            {loadingList ? (
                <p>Cargando...</p>
            ) : (
                <BugList
                    bugs={bugs}
                    onDelete={handleDeleteBug}
                    onEdit={handleEditBug}
                />
            )}
        </div>
    );
}
