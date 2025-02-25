"use client"

export default function DeleteBatchModal({ batch, onClose, refreshBatches }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/manage/batches/${batch.id}`, { method: "DELETE" });
            if (res.ok) {
                await refreshBatches();
                onClose();
            }
        } catch (error) {
            console.error("Error deleting batch:", error);
        }
        setLoading(false);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Delete Batch</h2>
                <p>Are you sure you want to delete {batch.name}?</p>
                <div className="modal-actions">
                    <button onClick={handleDelete} disabled={loading}>Delete</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
