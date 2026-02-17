"use client";
import React, { useState } from "react";

import {
    Users,
    Shield,
    CheckCircle,
    AlertCircle,
    Settings,
    Activity,
    ArrowUpRight,
    MoreHorizontal,
    Search,
    Filter,
    Download,
    Trash2,
    Check,
    X,
    Megaphone,
    History,
    FileText,
    Key,
    UserMinus,
    UserPlus,
    TrendingUp,
    TrendingDown,
    Server,
    Globe
} from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, Cell, PieChart, Pie } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

// Mock data for admin dashboard
// Mock data for analytics
const registrationData = [
    { month: "Sep", users: 120 },
    { month: "Oct", users: 340 },
    { month: "Nov", users: 560 },
    { month: "Dec", users: 890 },
    { month: "Jan", users: 1100 },
    { month: "Feb", users: 1247 },
]

const issueTrends = [
    { category: "Water", resolved: 45, open: 12 },
    { category: "Trees", resolved: 32, open: 8 },
    { category: "Waste", resolved: 28, open: 5 },
    { category: "Energy", resolved: 15, open: 4 },
    { category: "Other", resolved: 10, open: 2 },
]

const apiUsage = [
    { name: "Gemini AI", value: 72, color: "#10b981" },
    { name: "Supabase", value: 45, color: "#3b82f6" },
    { name: "Clerk Auth", value: 28, color: "#8b5cf6" },
]

const auditLogs = [
    { id: 1, action: "User Role Updated", target: "Sara Khan", admin: "SuperAdmin", time: "10 mins ago" },
    { id: 2, action: "Tree Approved", target: "Banyan #422", admin: "Rohan Gupta", time: "45 mins ago" },
    { id: 3, action: "System Config Changed", target: "AI Model: Gemini 1.5", admin: "SuperAdmin", time: "2 hours ago" },
    { id: 4, action: "Broadcast Sent", target: "Campus Cleanup Event", admin: "Moderator_A", time: "5 hours ago" },
]

const chartConfig = {
    users: { label: "New Users", color: "var(--chart-1)" },
    resolved: { label: "Resolved", color: "var(--primary)" },
    open: { label: "Open Issues", color: "var(--destructive)" },
}

const recentUsers = [
    { id: 1, name: "Arjun Mehta", email: "arjun.m@university.edu", role: "User", status: "Active", joined: "2 hours ago" },
    { id: 2, name: "Sara Khan", email: "s.khan@university.edu", role: "Moderator", status: "Active", joined: "5 hours ago" },
    { id: 3, name: "Vikram Singh", email: "v.singh@university.edu", role: "User", status: "Inactive", joined: "1 day ago" },
    { id: 4, name: "Ananya Iyer", email: "a.iyer@university.edu", role: "User", status: "Active", joined: "2 days ago" },
    { id: 5, name: "Rohan Gupta", email: "r.gupta@university.edu", role: "Admin", status: "Active", joined: "1 week ago" },
]

export default function AdminDashboardPage() {
    // State management for interactions
    const [trees, setTrees] = useState([
        { id: 1, submittedBy: "Priya Sharma", location: "Block A", species: "Banyan", time: "1 hour ago", status: "Pending" },
        { id: 2, submittedBy: "Rahul Verma", location: "Sports Complex", species: "Gulmohar", time: "3 hours ago", status: "Pending" },
        { id: 3, submittedBy: "Sneha Patel", location: "Library Lawn", species: "Neem", time: "5 hours ago", status: "Pending" },
    ])

    const [broadcastMessage, setBroadcastMessage] = useState("")
    const [isSending, setIsSending] = useState(false)

    const handleApproveTree = (id: number) => {
        setTrees(trees.filter(t => t.id !== id))
        // In real app, this would call an API
    }

    const handleRejectTree = (id: number) => {
        setTrees(trees.filter(t => t.id !== id))
    }

    const handleSendBroadcast = () => {
        if (!broadcastMessage) return
        setIsSending(true)
        setTimeout(() => {
            setIsSending(false)
            setBroadcastMessage("")
            alert("Broadcast announcement sent to all users!")
        }, 1500)
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Admin Control Panel</h1>
                    <p className="mt-1 text-muted-foreground">Manage campus-wide sustainability system settings and users</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export Data
                    </Button>
                    <Button className="gap-2">
                        <Settings className="h-4 w-4" />
                        System Settings
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                        <Users className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">1,247</div>
                        <p className="mt-1 flex items-center gap-1 text-xs text-primary">
                            <TrendingUp className="h-3 w-3" />
                            +89 since last week
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
                        <Activity className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">99.9%</div>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground text-green-500">
                            Operational
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Moderation</CardTitle>
                        <CheckCircle className="h-5 w-5 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{trees.length}</div>
                        <p className="mt-1 text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Security Flags</CardTitle>
                        <AlertCircle className="h-5 w-5 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">0</div>
                        <p className="mt-1 text-xs text-muted-foreground text-primary">No new threats</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="moderation">Moderation</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="communications">Broadcast</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Users Tab */}
                <TabsContent value="users" className="mt-6">
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <CardTitle className="text-foreground">User Management</CardTitle>
                                    <CardDescription>Manage user roles and permissions</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="search"
                                            placeholder="Search users..."
                                            className="h-9 w-[150px] rounded-md border border-input bg-background px-9 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-[250px]"
                                        />
                                    </div>
                                    <Button variant="outline" size="icon">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">{user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={user.role === "Admin" ? "default" : user.role === "Moderator" ? "secondary" : "outline"}>
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-2 w-2 rounded-full ${user.status === "Active" ? "bg-primary" : "bg-muted-foreground"}`} />
                                                    <span className="text-sm">{user.status}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">{user.joined}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem className="gap-2">
                                                            <UserPlus className="h-4 w-4" /> Edit Permissions
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="gap-2">
                                                            <Key className="h-4 w-4" /> Reset Password
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="gap-2 text-destructive">
                                                            <UserMinus className="h-4 w-4" /> Disable Account
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Moderation Tab */}
                <TabsContent value="moderation" className="mt-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Tree Approvals</CardTitle>
                                <CardDescription>Review new tree submissions from users</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {trees.length > 0 ? (
                                        trees.map((tree) => (
                                            <div key={tree.id} className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-secondary/30 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-foreground">{tree.species}</span>
                                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <Globe className="h-3 w-3" /> {tree.location}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground mt-1">Submitted by {tree.submittedBy} • {tree.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => handleRejectTree(tree.id)}>
                                                        <X className="h-4 w-4" /> Reject
                                                    </Button>
                                                    <Button size="sm" className="h-8 gap-1" onClick={() => handleApproveTree(tree.id)}>
                                                        <Check className="h-4 w-4" /> Approve
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 text-center bg-secondary/10 rounded-lg border border-dashed">
                                            <CheckCircle className="h-8 w-8 text-primary mb-2" />
                                            <p className="text-sm font-medium">No pending trees</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Flagged Issues</CardTitle>
                                <CardDescription>Review items reported by the community</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-medium text-foreground">All Clear!</h3>
                                <p className="text-sm text-muted-foreground mt-1">No flagged items require attention at this time.</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="mt-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">User Registration Trend</CardTitle>
                                <CardDescription>Growth over the last 6 months</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={registrationData}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                                            <XAxis dataKey="month" className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                                            <YAxis className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Area type="monotone" dataKey="users" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Issue Resolution Status</CardTitle>
                                <CardDescription>Distribution across categories</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={issueTrends} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                                            <XAxis type="number" className="text-xs" hide />
                                            <YAxis dataKey="category" type="category" className="text-xs" width={60} tick={{ fill: 'var(--muted-foreground)' }} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="resolved" stackId="a" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                                            <Bar dataKey="open" stackId="a" fill="var(--destructive)" radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-foreground">Third-Party API Health</CardTitle>
                                <CardDescription>Usage quotas and connectivity status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 sm:grid-cols-3">
                                    {apiUsage.map((api) => (
                                        <div key={api.name} className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{api.name}</span>
                                                <span className="text-muted-foreground">{api.value}% used</span>
                                            </div>
                                            <Progress value={api.value} className="h-2" />
                                            <div className="flex items-center gap-2 text-xs text-primary">
                                                <Server className="h-3 w-3" /> Operational
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Communications Tab */}
                <TabsContent value="communications" className="mt-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <Card className="border-border bg-card lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-foreground">Broadcast Center</CardTitle>
                                <CardDescription>Send notifications to all registered campus users</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="announcement">Announcement Message</Label>
                                    <Textarea
                                        id="announcement"
                                        placeholder="Type your campus-wide announcement here..."
                                        className="min-h-[150px] resize-none"
                                        value={broadcastMessage}
                                        onChange={(e) => setBroadcastMessage(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">
                                        * This message will appear on all users' dashboards immediately.
                                    </p>
                                    <Button className="gap-2" onClick={handleSendBroadcast} disabled={isSending || !broadcastMessage}>
                                        <Megaphone className="h-4 w-4" />
                                        {isSending ? "Sending..." : "Send Broadcast"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Recent Sent</CardTitle>
                                <CardDescription>History of broadcasts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1 pb-3 border-b border-border">
                                        <p className="text-sm font-medium">Campus Cleanup Sunday</p>
                                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                            <span>Target: All Students</span>
                                            <span>2 days ago</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 pb-3 border-b border-border">
                                        <p className="text-sm font-medium">New AI Analysis Feature Live</p>
                                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                            <span>Target: Everyone</span>
                                            <span>1 week ago</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="w-full text-xs text-primary">
                                        <History className="h-3 w-3 mr-2" /> View Full History
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="mt-6">
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-foreground">System Settings</CardTitle>
                            <CardDescription>Configure platform behaviors and integrations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">AI Configuration</h3>
                                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                                    <div className="flex flex-col">
                                        <span className="font-medium">Auto-moderation</span>
                                        <span className="text-xs text-muted-foreground">Use AI to automatically flag inappropriate content</span>
                                    </div>
                                    <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                                    <div className="flex flex-col">
                                        <span className="font-medium">Gemini Model</span>
                                        <span className="text-xs text-muted-foreground">Select AI model for tree health analysis</span>
                                    </div>
                                    <Badge variant="secondary">Gemini 1.5 Pro</Badge>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">System Audit Log</h3>
                                <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
                                    {auditLogs.map((log) => (
                                        <div key={log.id} className="flex items-center justify-between p-3 bg-secondary/10 hover:bg-secondary/20 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded bg-background border flex items-center justify-center">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{log.action}: <span className="text-primary">{log.target}</span></span>
                                                    <span className="text-xs text-muted-foreground">By {log.admin}</span>
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground bg-background px-2 py-0.5 rounded border">{log.time}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" className="w-full text-xs">
                                    <Download className="h-3 w-3 mr-2" /> Export Audit History
                                </Button>
                            </div>

                            <div className="pt-4 border-t border-border flex justify-end gap-3">
                                <Button variant="outline">Reset Defaults</Button>
                                <Button>Save Configuration</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
