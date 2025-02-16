"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            const data = await res.json();
            setError(data.message);
        }
    };

    return (
        <div className="min-h-screen w-full h-full pt-[10vh] flex justify-center items-center bg-neutral-100">
            <form onSubmit={handleLogin} className="p-8 rounded-lg max-w-sm flex flex-col drop-shadow bg-white space-y-4 w-full">
                <div>
                    <h1 className="text-3xl font-medium text-center">Admin Login</h1>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="flex flex-col">
                    <label className="text-sm poppins" htmlFor="username">Username</label>
                    <input
                        className="py-2 px-4 focus-visible:outline-neutral-400 rounded-md border"
                        type="text"
                        id="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm poppins" htmlFor="password">Password</label>
                    <input
                        className="py-2 px-4 focus-visible:outline-neutral-400 rounded-md border"
                        type="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="btn-primary w-full">Log in</button>
                </div>
            </form>
        </div>
    );
}
