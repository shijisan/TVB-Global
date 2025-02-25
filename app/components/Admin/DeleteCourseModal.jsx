"use client";

import { useState } from "react";

export default function DeleteCourseModal({ course, onClose, refreshCourses }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/manage/courses/${course.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            refreshCourses();
            onClose();
        } else {
            const data = await res.json();
            setError(data.message || "Failed to delete course.");
        }

        setLoading(false);
    }

    return (
        <div className="max-w-sm p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4 text-red-600">Delete Course</h1>
            {error && <p className="text-red-500">{error}</p>}
            <p>Are you sure you want to delete <strong>{course.name}</strong>?</p>
            <div className="flex gap-2 mt-4">
                <button 
                    className="bg-red-600 text-white px-4 py-2 rounded w-full" 
                    onClick={handleDelete} 
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>
                <button 
                    className="text-gray-600 underline w-full" 
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
