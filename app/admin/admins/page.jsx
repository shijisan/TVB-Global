"use client";

import AdminSidebar from "@/app/components/Admin/Sidebar";
import AdminCard from "@/app/components/Card";
import AdminsSearch from "@/app/components/Search";
import CreateAdminModal from "@/app/components/Admin/CreateAdminModal";
import EditAdminModal from "@/app/components/Admin/EditAdminModal";
import DeleteAdminModal from "@/app/components/Admin/DeleteAdminModal";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AdminAdmins() {
    const [admins, setAdmins] = useState([]);
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    useEffect(() => {
        fetchAdmins();
    }, []);

    async function fetchAdmins() {
        const res = await fetch("/api/manage/admins");
        if (res.ok) {
            const data = await res.json();
            setAdmins(data);
            setFilteredAdmins(data);
        }
    }

    const handleSearch = (query) => {
        const filtered = admins.filter((admin) =>
            admin.username.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredAdmins(filtered);
    };

    return (
        <main className="w-full h-full bg-neutral-100 pattern">
            <div className="flex flex-row max-w-6xl mx-auto pt-[10vh] min-h-screen gap-4 justify-center items-center">
                <AdminSidebar />
                <AdminCard title="Manage Admins">
                    <div className="flex flex-col gap-4">
                        {/* Search and Create Admin Button */}
                        <div className="flex justify-evenly gap-4">
                            <AdminsSearch onSearch={handleSearch} />
                            <button className="btn-primary flex items-center" onClick={() => setShowCreateModal(true)}>
                                <FaPlus className="me-2" />
                                Create Admin
                            </button>
                        </div>

                        <h2 className="text-lg font-bold mt-4 mb-2">Existing Admins</h2>
                        {filteredAdmins.length > 0 ? (
                            <ul className="list-disc px-6 space-y-4 overflow-y-auto">
                                {filteredAdmins.map((admin) => (
                                    <li key={admin.id} className="flex justify-between items-center p-2 bg-neutral-100 drop-shadow rounded mb-2">
                                        <div className="w-1/3 font-medium">{admin.username}</div>
                                        <div className="w-1/3 text-center">{admin.origin}</div>
                                        <div className="flex gap-2 w-1/3 justify-end">
                                            <button className="btn-dead" onClick={() => { 
                                                setSelectedAdmin(admin); 
                                                setShowEditModal(true); 
                                            }}>Edit</button>
                                            <button className="btn-destructive" onClick={() => { 
                                                setSelectedAdmin(admin); 
                                                setShowDeleteModal(true); 
                                            }}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No admins available.</p>
                        )}
                    </div>
                </AdminCard>
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <CreateAdminModal onClose={() => setShowCreateModal(false)} refreshAdmins={fetchAdmins} />
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedAdmin && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <EditAdminModal 
                        admin={selectedAdmin} 
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedAdmin(null);
                        }} 
                        refreshAdmins={fetchAdmins} 
                    />
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedAdmin && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <DeleteAdminModal 
                        admin={selectedAdmin} 
                        onClose={() => {
                            setShowDeleteModal(false);
                            setSelectedAdmin(null);
                        }} 
                        refreshAdmins={fetchAdmins} 
                    />
                </div>
            )}
        </main>
    );
}
