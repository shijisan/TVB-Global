import { useState } from "react";

export default function CreateBatchModal({ courseId, onClose, refreshBatches }) {
    const [name, setName] = useState("");
    const [teacher, setTeacher] = useState("");
    const [maxStudents, setMaxStudents] = useState("");
    const [startDate, setStartDate] = useState("");
    const [durationDays, setDurationDays] = useState(""); // ✅ Added durationDays
    const [durationHours, setDurationHours] = useState(""); // ✅ Added durationHours
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/manage/courses/${courseId}/batches`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    batchName: name, 
                    batchTeacher: teacher, 
                    batchMaxStudents: maxStudents, 
                    batchStartDate: startDate,
                    batchDurationDays: durationDays, // ✅ Included durationDays
                    batchDurationHours: durationHours  // ✅ Included durationHours
                })
            });
            
            if (!res.ok) throw new Error("Failed to create batch");

            refreshBatches();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-content p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Create Batch</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input type="text" placeholder="Batch Name" value={name} onChange={(e) => setName(e.target.value)} className="input" required />
                    <input type="text" placeholder="Teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} className="input" required />
                    <input type="number" placeholder="Max Students" value={maxStudents} onChange={(e) => setMaxStudents(e.target.value)} className="input" required />
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" required />
                    <input type="number" placeholder="Duration (Days)" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} className="input" required /> {/* ✅ Added */}
                    <input type="number" placeholder="Duration (Hours)" value={durationHours} onChange={(e) => setDurationHours(e.target.value)} className="input" required /> {/* ✅ Added */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Creating..." : "Create"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
