"use client";

import Link from "next/link";
import { Shield, Users, TreePine, Leaf, ArrowRight } from "lucide-react";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-[#0A0F14] text-cyan-400 font-mono flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(10,15,20,0.9),rgba(10,15,20,0.9)),url('/grid.png')] bg-center opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

            <div className="z-10 w-full max-w-4xl p-8 md:p-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                            <Leaf className="w-7 h-7 text-cyan-400" />
                        </div>
                        <h1 className="text-5xl font-bold tracking-wider text-white">ROOTSENSE</h1>
                    </div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-500/70 mb-6">Campus Sustainability Intelligence Platform</p>

                    {/* Project Description */}
                    <div className="max-w-2xl mx-auto mb-8 p-6 border border-cyan-500/20 bg-[#0F161E]/50 backdrop-blur-sm">
                        <p className="text-sm text-cyan-100/80 leading-relaxed">
                            A comprehensive platform designed for college campuses to <span className="text-cyan-400 font-semibold">track tree survival</span>,
                            <span className="text-cyan-400 font-semibold"> report civic issues</span>, and
                            <span className="text-cyan-400 font-semibold"> measure environmental impact</span> using AI-powered insights.
                        </p>
                    </div>
                </div>

                {/* Access Options */}
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* User Access */}
                    <Link href="/dashboard">
                        <div className="group relative p-8 border border-cyan-500/30 bg-[#0F161E]/80 backdrop-blur-sm hover:border-cyan-500/80 transition-all duration-300 cursor-pointer h-full">
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/50 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                    <Users className="w-8 h-8 text-green-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">User Dashboard</h2>
                                <p className="text-xs text-cyan-500/70 uppercase tracking-widest">Public Access</p>
                                <p className="text-sm text-cyan-100/70">
                                    View campus sustainability metrics, tree health data, and environmental impact reports
                                </p>
                                <div className="flex items-center gap-2 text-green-400 font-semibold group-hover:gap-4 transition-all">
                                    <span>Enter Dashboard</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Admin Access */}
                    <Link href="/admin/dashboard">
                        <div className="group relative p-8 border border-cyan-500/30 bg-[#0F161E]/80 backdrop-blur-sm hover:border-cyan-500/80 transition-all duration-300 cursor-pointer h-full">
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                    <Shield className="w-8 h-8 text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Admin Control</h2>
                                <p className="text-xs text-cyan-500/70 uppercase tracking-widest">Public Access</p>
                                <p className="text-sm text-cyan-100/70">
                                    Full system control, user management, and administrative operations
                                </p>
                                <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-4 transition-all">
                                    <span>Enter Control Panel</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-12 flex justify-center text-[10px] text-cyan-500/40 uppercase tracking-wider">
                    <span>System v2.4 | Powered by AI-Driven Analytics</span>
                </div>
            </div>
        </div>
    );
}
