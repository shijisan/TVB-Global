"use client";

import { useState } from "react";

export default function EditAdminModal({ admin, onClose, refreshAdmins }) {
    const [username, setUsername] = useState(admin.username);
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/manage/admins/${admin.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            refreshAdmins();
            onClose();
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-4">Edit Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="password">New Password (optional)</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex justify-between">
                    <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    );
}
