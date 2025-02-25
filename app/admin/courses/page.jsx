"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import AdminSidebar from "@/app/components/Admin/Sidebar";
import AdminCard from "@/app/components/Card";
import CreateCourseModal from "@/app/components/Admin/CreateCourseModal";
import EditCourseModal from "@/app/components/Admin/EditCourseModal";
import DeleteCourseModal from "@/app/components/Admin/DeleteCourseModal";
import Search from "@/app/components/Search";

export default function Courses() {
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch courses from API
    async function fetchCourses() {
        const res = await fetch("/api/manage/courses");
        if (res.ok) {
            setCourses(await res.json());
        }
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    function handleSearch(query) {
        setSearchQuery(query.toLowerCase());
    }

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchQuery) || 
        course.description.toLowerCase().includes(searchQuery)
    );

    return (
        <main className="w-full h-full bg-neutral-100 pattern">
            <div className="flex flex-row max-w-6xl mx-auto pt-[10vh] min-h-screen gap-4 justify-center items-center">
                <AdminSidebar />
                <AdminCard title="Manage Courses">
                    {/* Search bar and create button */}
                    <div className="flex justify-evenly gap-4 mb-4">
                        <Search onSearch={handleSearch} />
                        <button className="btn-primary flex items-center" onClick={() => setShowCreateModal(true)}>
                            <FaPlus className="me-2" />
                            Create Course
                        </button>
                    </div>

                    <h2 className="text-lg font-bold mt-4 mb-2">Existing Courses</h2>
                    {filteredCourses.length > 0 ? (
                        <ul className="list-disc px-6 space-y-4 overflow-y-auto flex-grow">
                            {filteredCourses.map(course => (
                                <li key={course.id} className="flex justify-between items-center p-2 bg-neutral-100 drop-shadow rounded mb-2">
                                    <div>
                                        <strong>{course.name}</strong> - ₱{course.price}
                                        <p>{course.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="btn-link" onClick={() => {router.push(`/admin/courses/${course.id}/batches`)}}>Manage</button>
                                        <button className="btn-dead" onClick={() => { setSelectedCourse(course); setShowEditModal(true); }}>Edit</button>
                                        <button className="btn-destructive" onClick={() => { setSelectedCourse(course); setShowDeleteModal(true); }}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No courses available.</p>
                    )}
                </AdminCard>
            </div>
            
            {/* Floating Modal Overlays */}
            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <CreateCourseModal 
                        onClose={() => setShowCreateModal(false)} 
                        refreshCourses={fetchCourses} // Refresh after creating
                    />
                </div>
            )}

            {showEditModal && selectedCourse && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <EditCourseModal 
                        course={selectedCourse} 
                        onClose={() => setShowEditModal(false)} 
                        refreshCourses={fetchCourses} // Refresh after editing
                    />
                </div>
            )}

            {showDeleteModal && selectedCourse && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <DeleteCourseModal 
                        course={selectedCourse} 
                        onClose={() => setShowDeleteModal(false)} 
                        refreshCourses={fetchCourses} // Refresh after deleting
                    />
                </div>
            )}
        </main>
    );
}
