"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AdminSidebar from "@/app/components/Admin/Sidebar";
import Card from "@/app/components/Card";

export default function Batch() {
    const { courseId, batchId } = useParams();
    const [batch, setBatch] = useState(null);
    const [showBatchInfo, setShowBatchInfo] = useState(true);
    const [showStudents, setShowStudents] = useState(true);
    const [showApplications, setShowApplications] = useState(true);

    useEffect(() => {
        async function fetchBatch() {
            const res = await fetch(`/api/manage/courses/${courseId}/batches/${batchId}`);
            if (res.ok) {
                const data = await res.json();
                setBatch(data);
            }
        }

        if (batchId) {
            fetchBatch();
        }
    }, [batchId, courseId]);

    if (!batch) return <p className="text-center p-4">Loading...</p>;

    return (
        <main className="w-full h-full bg-neutral-100 pattern">
            <div className="flex flex-row max-w-6xl mx-auto pt-[10vh] justify-center items-center min-h-screen gap-4">
                <AdminSidebar />
                <Card title={`Batch: ${batch.name}`}>
                    
                    {/* Batch Info Section */}
                    <div>
                        <button onClick={() => setShowBatchInfo(!showBatchInfo)} className="font-bold text-lg">
                            Batch Info {showBatchInfo ? "▼" : "►"}
                        </button>
                        {showBatchInfo && (
                            <div className="mt-2">
                                <p><strong>Course Name:</strong> {batch.course.name}</p>
                                <p><strong>Teacher:</strong> {batch.teacher}</p>
                                <p><strong>Duration:</strong> {batch.durationDays} days total, {batch.durationHours} hours per day</p>
                                <p><strong>Start Date:</strong> {new Date(batch.startDate).toLocaleDateString()}</p>
                                <p><strong>Students:</strong> {batch.studentCount}/{batch.maxStudents}</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Enrolled Students Section */}
                    <div className="mt-4">
                        <button onClick={() => setShowStudents(!showStudents)} className="font-bold text-lg">
                            🎓 Students {showStudents ? "▼" : "►"}
                        </button>
                        {showStudents && (
                            <div className="mt-2">
                                {batch.students.length > 0 ? (
                                    <ul className="list-disc pl-6">
                                        {batch.students.map(({ student }) => (
                                            <li key={student.id}>{student.name} - {student.email}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No students enrolled yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Applications Section */}
                    <div className="mt-4">
                        <button onClick={() => setShowApplications(!showApplications)} className="font-bold text-lg">
                            📄 Applications {showApplications ? "▼" : "►"}
                        </button>
                        {showApplications && (
                            <div className="mt-2">
                                {batch.applications.length > 0 ? (
                                    <ul className="list-disc pl-6">
                                        {batch.applications.map((app) => (
                                            <li key={app.id}>{app.studentName} - {app.status}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No applications submitted.</p>
                                )}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </main>
    );
} 
