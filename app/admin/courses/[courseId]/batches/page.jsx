// Fixed API response handling, useEffect dependencies, and modal state management
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Card from "@/app/components/Card";
import AdminSidebar from "@/app/components/Admin/Sidebar";
import Search from "@/app/components/Search";
import CreateBatchModal from "@/app/components/Batches/CreateBatchModal";
import EditBatchModal from "@/app/components/Batches/EditBatchModal";
import DeleteBatchModal from "@/app/components/Batches/DeleteBatchModal";
import { FaPlus } from "react-icons/fa";

export default function Batches() {
    const { courseId } = useParams();
    const [batches, setBatches] = useState([]);
    const [filteredBatches, setFilteredBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [modalState, setModalState] = useState({ create: false, edit: false, delete: false });

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const res = await fetch(`/api/manage/courses/${courseId}/batches`);
                if (res.ok) {
                    const data = await res.json();
                    setBatches(data.batches || []); // Ensure correct API response handling
                    setFilteredBatches(data.batches || []);
                }
            } catch (error) {
                console.error("Error fetching batches:", error);
            }
        };
        fetchBatches();
    }, [courseId]);

    const handleSearch = (query) => {
        setFilteredBatches(
            batches.filter(batch =>
                batch.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const refreshBatches = async () => {
        try {
            const res = await fetch(`/api/manage/courses/${courseId}/batches`);
            if (res.ok) {
                const data = await res.json();
                setBatches(data.batches || []);
                setFilteredBatches(data.batches || []);
            }
        } catch (error) {
            console.error("Error refreshing batches:", error);
        }
    };

    return (
        <main className="w-full h-full bg-neutral-100 pattern relative">
            <div className="flex flex-row max-w-6xl mx-auto pt-[10vh] justify-center items-center min-h-screen gap-4">
                <AdminSidebar />
                <Card title="Batches">
                    <div className="flex justify-between gap-4 mb-4">
                        <Search onSearch={handleSearch} placeholder="Search batches..." />
                        <button className="btn-primary flex items-center gap-2" onClick={() => setModalState({ ...modalState, create: true })}>
                            <FaPlus /> Create Batch
                        </button>
                    </div>
                    <ul className="p-4 space-y-4 flex-grow">
                        {filteredBatches.length > 0 ? (
                            filteredBatches.map((batch) => (
                                <li key={batch.id} className="flex flex-row rounded-lg bg-neutral-100 p-4 drop-shadow border border-neutral-300">
                                    <div className="flex flex-col flex-grow">
                                        <div className="font-medium text-lg">{batch.name}</div>
                                        <div>Teacher: {batch.teacher}</div>
                                        <div>Capacity: {batch.studentCount}/{batch.maxStudents}</div>
                                        <div>Start Date: {new Date(batch.startDate).toLocaleDateString()}</div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <button className="btn-dead" onClick={() => setModalState({ ...modalState, edit: true }) || setSelectedBatch(batch)}>Edit</button>
                                        <button className="btn-destructive" onClick={() => setModalState({ ...modalState, delete: true }) || setSelectedBatch(batch)}>Delete</button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="text-center py-4">No batches found.</li>
                        )}
                    </ul>
                </Card>
            </div>

            {modalState.create && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <CreateBatchModal courseId={courseId} onClose={() => setModalState({ ...modalState, create: false })} refreshBatches={refreshBatches} />
                </div>
            )}
            {modalState.edit && selectedBatch && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <EditBatchModal batch={selectedBatch} onClose={() => setModalState({ ...modalState, edit: false })} refreshBatches={refreshBatches} />
                </div>
            )}
            {modalState.delete && selectedBatch && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <DeleteBatchModal batch={selectedBatch} onClose={() => setModalState({ ...modalState, delete: false })} refreshBatches={refreshBatches} />
                </div>
            )}
        </main>
    );
}
