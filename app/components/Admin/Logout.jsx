"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    }

    return (
        <button className="btn-dead" onClick={handleLogout}>
            Log out
        </button>
    );
}
