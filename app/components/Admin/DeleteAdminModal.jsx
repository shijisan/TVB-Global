"use client";

export default function DeleteAdminModal({ admin, onClose, refreshAdmins }) {
    const handleDelete = async () => {
        const res = await fetch(`/api/manage/admins/${admin.id}`, { method: "DELETE" });

        if (res.ok) {
            refreshAdmins();
            onClose();
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-red-600">Delete Admin</h2>
            <p>Are you sure you want to delete <strong>{admin.username}</strong>?</p>
            <div className="flex justify-between mt-4">
                <button onClick={onClose} className="btn-secondary">Cancel</button>
                <button onClick={handleDelete} className="btn-danger">Delete</button>
            </div>
        </div>
    );
}
