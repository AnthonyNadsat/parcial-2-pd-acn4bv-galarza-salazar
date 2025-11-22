const API_URL = 'http://localhost:3000/api/bugs';

export async function fetchBugs() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener bugs');
    return res.json();
}

export async function createBug(bugData) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData),
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const msg = errorBody.message || 'Error al crear bug';
        throw new Error(msg);
    }

    return res.json();
}

export async function deleteBug(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!res.ok) throw new Error('Error al eliminar bug');
    return res.json();
}

export async function updateBug(id, bugData) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData),
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const msg = errorBody.message || 'Error al actualizar bug';
        throw new Error(msg);
    }

    return res.json();
}
