"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSystemStatus, getIssueStats } from "@/lib/api";
import IssueManagement from "@/components/issues/IssueManagement";

export default function AdminDashboard() {
    const router = useRouter();
    const [status, setStatus] = useState<any>(null);
    const [issueStats, setIssueStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load system status and issue stats
        Promise.all([getSystemStatus(), getIssueStats()]).then(([sysData, issueData]) => {
            setStatus(sysData);
            if (issueData.success) {
                setIssueStats(issueData.data);
            }
            setLoading(false);
        });
    }, []);

    const handleLogout = () => {
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0F14] text-cyan-400 font-mono flex items-center justify-center">
                <div className="animate-pulse tracking-widest uppercase">Initializing Secure Environment...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0F14] text-cyan-400 p-4 md:p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-12 border-b border-cyan-500/30 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-widest uppercase mb-2">
                        <span className="text-white">ROOTSENSE </span>
                        <span className="text-cyan-400">CONTROL</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-green-400 tracking-wider uppercase">ADMIN_ACCESS_GRANTED</span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 border border-red-500/50 text-red-400 uppercase text-xs tracking-widest hover:bg-red-500/10 transition-colors"
                >
                    EXIT DASHBOARD
                </button>
            </header>

            {/* Grid - Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Total Monitored Trees */}
                <div className="bg-transparent border border-cyan-500/30 p-6 hover:border-cyan-500/60 transition-colors">
                    <h3 className="text-xs uppercase tracking-widest text-cyan-500/70 mb-3">Total Monitored Trees</h3>
                    <div className="text-4xl font-bold text-white mb-2">1,247</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                        <span>▲</span> <span>12% Increase</span>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-transparent border border-cyan-500/30 p-6 hover:border-cyan-500/60 transition-colors">
                    <h3 className="text-xs uppercase tracking-widest text-cyan-500/70 mb-3">System Health</h3>
                    <div className="text-4xl font-bold text-white mb-2">98.4%</div>
                    <div className="text-xs text-cyan-400/80">
                        All systems nominal
                    </div>
                </div>

                {/* Open Issues */}
                <div className="bg-transparent border border-cyan-500/30 p-6 hover:border-cyan-500/60 transition-colors">
                    <h3 className="text-xs uppercase tracking-widest text-cyan-500/70 mb-3">Open Issues</h3>
                    <div className="text-4xl font-bold text-yellow-400 mb-2">{issueStats?.open || 0}</div>
                    <div className="text-xs text-yellow-500/80">
                        Requires attention
                    </div>
                </div>

                {/* Total Issues */}
                <div className="bg-transparent border border-cyan-500/30 p-6 hover:border-cyan-500/60 transition-colors">
                    <h3 className="text-xs uppercase tracking-widest text-cyan-500/70 mb-3">Total Issues</h3>
                    <div className="text-4xl font-bold text-white mb-2">{issueStats?.total || 0}</div>
                    <div className="text-xs text-cyan-400/80">
                        {issueStats?.resolved || 0} resolved
                    </div>
                </div>
            </div>

            {/* Issue Management Section */}
            <div className="mb-12">
                <IssueManagement />
            </div>

            {/* System Diagnostics Panel */}
            <div className="border border-cyan-500/30 bg-transparent p-8">
                <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                    <span className="w-1 h-6 bg-cyan-500"></span>
                    SYSTEM DIAGNOSTICS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-cyan-500/10 pb-3">
                            <span className="text-sm text-cyan-400 uppercase tracking-wider">Backend API</span>
                            <span className={`text-xs px-3 py-1 rounded-sm border uppercase tracking-widest ${status?.status ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}>
                                {status?.status ? 'ONLINE' : 'OFFLINE'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-cyan-500/10 pb-3">
                            <span className="text-sm text-cyan-400 uppercase tracking-wider">Database Connection</span>
                            <span className={`text-xs px-3 py-1 rounded-sm border uppercase tracking-widest ${status?.database ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}>
                                {status?.database ? 'CONNECTED' : 'DISCONNECTED'}
                            </span>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-cyan-500/10 pb-3">
                            <span className="text-sm text-cyan-400 uppercase tracking-wider">Authentication</span>
                            <span className="text-xs px-3 py-1 rounded-sm border border-green-500/50 text-green-400 bg-green-500/10 uppercase tracking-widest">
                                SECURE
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-cyan-500/10 pb-3">
                            <span className="text-sm text-cyan-400 uppercase tracking-wider">AI Models</span>
                            <span className={`text-xs px-3 py-1 rounded-sm border uppercase tracking-widest ${status?.ai_engine ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}>
                                {status?.ai_engine ? 'OPERATIONAL' : 'OFFLINE'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
