"use client";

import { useState } from "react";

export default function CreateCourseModal({ onClose, refreshCourses }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/manage/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price }),
        });

        if (res.ok) {
            setName("");
            setDescription("");
            setPrice("");
            refreshCourses();
            onClose();
        } else {
            const data = await res.json();
            setError(data.message || "Failed to create course.");
        }

        setLoading(false);
    }

    return (
        <div className="max-w-sm p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Create New Course</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block">Course Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Course Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block">Description</label>
                    <textarea
                        id="description"
                        placeholder="Course Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block">Price</label>
                    <input
                        type="number"
                        id="price"
                        placeholder="Course Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <button className="btn-primary w-full" type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Course"}
                    </button>
                </div>
            </form>
            <button className="mt-4 text-gray-600 underline" onClick={onClose}>Cancel</button>
        </div>
    );
}
