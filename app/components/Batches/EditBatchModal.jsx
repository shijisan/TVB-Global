import { useState } from "react";

export default function EditBatchModal({ batch, onClose, refreshBatches }) {
    const [name, setName] = useState(batch.name);
    const [teacher, setTeacher] = useState(batch.teacher);
    const [maxStudents, setMaxStudents] = useState(batch.maxStudents);
    const [loading, setLoading] = useState(false);

    const handleEdit = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/manage/batches/${batch.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, teacher, maxStudents })
            });
            if (res.ok) {
                await refreshBatches();
                onClose();
            }
        } catch (error) {
            console.error("Error updating batch:", error);
        }
        setLoading(false);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Batch</h2>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Batch Name" />
                <input value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="Teacher" />
                <input type="number" value={maxStudents} onChange={(e) => setMaxStudents(e.target.value)} placeholder="Max Students" />
                <div className="modal-actions">
                    <button onClick={handleEdit} disabled={loading}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}