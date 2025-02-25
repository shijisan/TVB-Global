"use client";

import { useState } from "react";

export default function DeleteAdminModal({ admin, onClose, refreshAdmins }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/manage/admins/${admin.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            refreshAdmins();
            onClose();
        } else {
            const data = await res.json();
            setError(data.message || "Failed to delete admin.");
        }

        setLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-red-600">Delete Admin</h2>
            {error && <p className="text-red-500">{error}</p>}
            <p>Are you sure you want to delete <strong>{admin.username}</strong>?</p>
            <div className="flex justify-between mt-4">
                <button onClick={onClose} className="btn-secondary" disabled={loading}>
                    Cancel
                </button>
                <button 
                    onClick={handleDelete} 
                    className="btn-danger"
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}
