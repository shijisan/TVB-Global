"use client";

import AdminSidebar from "@/app/components/Admin/Sidebar";
import AdminCard from "@/app/components/Admin/AdminCard";
import AdminsSearch from "@/app/components/Admin/AdminsSearch";
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
        <main className="w-full h-full pattern bg-neutral-100">
            <div className="max-w-6xl w-full mx-auto gap-4 min-h-screen pt-[10vh] flex justify-center items-center">
                <AdminSidebar />
                <AdminCard title="Admins">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-evenly gap-4">
                            <AdminsSearch onSearch={handleSearch} />
                            <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
                                <FaPlus className="me-2" />
                                Create Admin
                            </button>
                        </div>
                        <ul className="p-4">
                            {filteredAdmins.length > 0 ? (
                                filteredAdmins.map((admin) => (
                                    <li className="flex justify-between w-full items-center py-2 border-b" key={admin.id}>
                                        <div className="w-1/3">{admin.username}</div>
                                        <div className="w-1/3 text-center">{admin.origin}</div>
                                        <div className="gap-4 flex w-1/3 justify-end">
                                            <button className="btn-secondary" onClick={() => {
                                                setSelectedAdmin(admin);
                                                setShowEditModal(true);
                                            }}>Edit</button>
                                            <button className="btn-danger" onClick={() => {
                                                setSelectedAdmin(admin);
                                                setShowDeleteModal(true);
                                            }}>Delete</button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-center py-4">No admins found</li>
                            )}
                        </ul>
                    </div>
                </AdminCard>
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <CreateAdminModal onClose={() => setShowCreateModal(false)} refreshAdmins={fetchAdmins} />
                </div>
            )}

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
