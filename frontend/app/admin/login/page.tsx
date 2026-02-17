"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to admin dashboard since authentication is removed
        router.push("/admin/dashboard");
    }, [router]);

    return (
        <div className="min-h-screen bg-[#0A0F14] text-cyan-400 font-mono flex items-center justify-center">
            <div className="animate-pulse tracking-widest uppercase">
                Redirecting to Admin Dashboard...
            </div>
        </div>
    );
}
