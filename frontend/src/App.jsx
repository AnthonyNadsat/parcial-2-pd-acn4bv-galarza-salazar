import { useState, useEffect } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import { fetchBugs, createBug } from './services/api';

export default function App() {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

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

    const handleCreateBug = async (bugData) => {
        try {
            setLoading(true);
            setErrorMsg('');
            setSuccessMsg('');
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

    return (
        <div className="app-container">
            <h1>BugLog</h1>

            {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}

            <BugForm onBugCreated={handleCreateBug} loading={loading} />

            <hr />

            <h2>Lista de bugs</h2>

            {loadingList ? <p>Cargando...</p> : <BugList bugs={bugs} />}
        </div>
    );
}
