"use client";

import { useEffect, useState } from "react";
import { getIssues, updateIssue, deleteIssue } from "@/lib/api";
import { Trash2, UserPlus, CheckCircle, AlertCircle } from "lucide-react";

interface Issue {
    id: number;
    title: string;
    description: string;
    location: string;
    status: string;
    assigned_to: string | null;
    priority: string;
    created_at: string;
}

export default function IssueManagement() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ status: '', priority: '' });

    const loadIssues = async () => {
        setLoading(true);
        const result = await getIssues(filter);
        if (result.success) {
            setIssues(result.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadIssues();
    }, [filter]);

    const handleAssign = async (id: number) => {
        const assignee = prompt("Enter assignee name:");
        if (assignee) {
            await updateIssue(id, { assigned_to: assignee, status: 'In Progress' });
            loadIssues();
        }
    };

    const handleResolve = async (id: number) => {
        await updateIssue(id, { status: 'Resolved' });
        loadIssues();
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this issue?")) {
            await deleteIssue(id);
            loadIssues();
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'border-red-500/50 text-red-400 bg-red-500/10';
            case 'Medium': return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10';
            case 'Low': return 'border-green-500/50 text-green-400 bg-green-500/10';
            default: return 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'border-red-500/50 text-red-400 bg-red-500/10';
            case 'In Progress': return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10';
            case 'Resolved': return 'border-green-500/50 text-green-400 bg-green-500/10';
            default: return 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10';
        }
    };

    return (
        <div className="border border-cyan-500/30 bg-transparent">
            {/* Header */}
            <div className="border-b border-cyan-500/30 p-6">
                <h3 className="text-white uppercase tracking-widest font-bold flex items-center gap-3 mb-4">
                    <span className="w-1 h-6 bg-cyan-500"></span>
                    FIELD INCIDENT MANAGEMENT MODULE
                </h3>

                {/* Filters */}
                <div className="flex gap-4">
                    <select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        className="bg-[#0F161E] border border-cyan-500/30 text-cyan-400 px-4 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-cyan-500"
                    >
                        <option value="">ALL STATUS</option>
                        <option value="Open">OPEN</option>
                        <option value="In Progress">IN PROGRESS</option>
                        <option value="Resolved">RESOLVED</option>
                    </select>

                    <select
                        value={filter.priority}
                        onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                        className="bg-[#0F161E] border border-cyan-500/30 text-cyan-400 px-4 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-cyan-500"
                    >
                        <option value="">ALL PRIORITY</option>
                        <option value="Critical">CRITICAL</option>
                        <option value="Medium">MEDIUM</option>
                        <option value="Low">LOW</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-cyan-500/30">
                        <tr className="text-left">
                            <th className="p-4 text-xs uppercase tracking-widest text-cyan-500/70">Issue</th>
                            <th className="p-4 text-xs uppercase tracking-widest text-cyan-500/70">Location</th>
                            <th className="p-4 text-xs uppercase tracking-widest text-cyan-500/70">Priority</th>
                            <th className="p-4 text-xs uppercase tracking-widest text-cyan-500/70">Status</th>
                            <th className="p-4 text-xs uppercase tracking-widest text-cyan-500/70">Assigned To</th>
                            <th className="p-4 text-xs uppercase tracking-widest text-cyan-500/70">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-cyan-400/50 text-xs uppercase tracking-wider">
                                    Loading...
                                </td>
                            </tr>
                        ) : issues.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-cyan-400/50 text-xs uppercase tracking-wider">
                                    No issues found
                                </td>
                            </tr>
                        ) : (
                            issues.map((issue) => (
                                <tr key={issue.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors">
                                    <td className="p-4">
                                        <div className="text-sm text-white font-semibold">{issue.title}</div>
                                        <div className="text-xs text-cyan-400/70 mt-1">{issue.description}</div>
                                    </td>
                                    <td className="p-4 text-sm text-cyan-400">{issue.location}</td>
                                    <td className="p-4">
                                        <span className={`text-xs px-2 py-1 rounded-sm border uppercase tracking-widest ${getPriorityColor(issue.priority)}`}>
                                            {issue.priority}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-xs px-2 py-1 rounded-sm border uppercase tracking-widest ${getStatusColor(issue.status)}`}>
                                            {issue.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-cyan-400">
                                        {issue.assigned_to || <span className="text-cyan-400/50">Unassigned</span>}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {issue.status !== 'Resolved' && (
                                                <>
                                                    <button
                                                        onClick={() => handleAssign(issue.id)}
                                                        className="p-2 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                                                        title="Assign"
                                                    >
                                                        <UserPlus className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleResolve(issue.id)}
                                                        className="p-2 border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-colors"
                                                        title="Resolve"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleDelete(issue.id)}
                                                className="p-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
