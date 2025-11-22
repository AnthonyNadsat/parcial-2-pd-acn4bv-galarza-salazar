import BugCard from './BugCard';

export default function BugList({ bugs, onDelete, onEdit }) {
    if (!bugs.length) {
        return <p>No hay bugs cargados todavía.</p>;
    }

    return (
        <div className="bug-list">
            {bugs.map(bug => (
                <BugCard
                    key={bug.id}
                    bug={bug}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}
