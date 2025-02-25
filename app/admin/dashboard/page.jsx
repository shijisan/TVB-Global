import AdminSidebar from "@/app/components/Admin/Sidebar";
import AdminCard from "@/app/components/Card";
import LogoutButton from "@/app/components/Admin/Logout";

export default function AdminDashboard() {
    return (
        <main className="w-full h-full pattern bg-neutral-100">
            <div className="max-w-6xl w-full mx-auto gap-4 min-h-screen pt-[10vh] flex justify-center items-center">
                <AdminSidebar />
                <AdminCard title="Dashboard">
                    <LogoutButton/>
                </AdminCard>
            </div>
        </main>
    );
}
