"use client";

import { useState } from "react";

export default function CreateAdminModal({ onClose, refreshAdmins }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError("");

        const response = await fetch("/api/manage/admins", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
                origin: "root", 
            }),
        });

        if (response.ok) {
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            refreshAdmins();
            onClose(); 
        } else {
            const data = await response.json();
            setError(data.message || "Failed to create admin.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-sm p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Create New Admin</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <button className="btn-primary w-full" type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Admin"}
                    </button>
                </div>
                <div>
                    <small className="text-gray-500">Adding this user will include your account as the origin.</small>
                </div>
            </form>
            <button className="mt-4 text-gray-600 underline" onClick={onClose}>Cancel</button>
        </div>
    );
}
