"use client";

import { useState, useEffect } from "react";

export default function EditCourseModal({ course, onClose, refreshCourses }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (course) {
            setName(course.name);
            setDescription(course.description);
            setPrice(course.price);
        }
    }, [course]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch(`/api/manage/courses/${course.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price }),
        });

        if (res.ok) {
            refreshCourses();
            onClose();
        } else {
            const data = await res.json();
            setError(data.message || "Failed to update course.");
        }

        setLoading(false);
    }

    return (
        <div className="max-w-sm p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Edit Course</h1>
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
                        {loading ? "Updating..." : "Update Course"}
                    </button>
                </div>
            </form>
            <button className="mt-4 text-gray-600 underline" onClick={onClose}>Cancel</button>
        </div>
    );
}
