import { useState } from "react";
import BugForm from "../components/BugForm";
import { createBug } from "../services/api";
import "./Home.css";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleCreate = async (bugData) => {
        try {
            setLoading(true);
            setErrorMsg("");
            setSuccessMsg("");

            await createBug(bugData);

            setSuccessMsg("Bug reportado correctamente");

        } catch (err) {
            setErrorMsg(err.message || "Error al reportar el bug");
        } finally {
            setLoading(false);

            setTimeout(() => {
                setSuccessMsg("");
                setErrorMsg("");
            }, 3000);
        }
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Reportar nuevo bug</h1>

            {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}

            <BugForm
                loading={loading}
                onBugCreated={handleCreate}
                bugToEdit={null}
                onBugUpdated={() => {}}
            />
        </div>
    );
}