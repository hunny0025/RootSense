import Link from "next/link";
import { Home, Shield, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive">
                        <AlertTriangle className="w-10 h-10" />
                    </div>
                    <h1 className="text-6xl font-bold text-foreground">404</h1>
                    <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <Link
                        href="/admin/login"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card text-foreground rounded-lg hover:bg-accent transition-colors font-medium"
                    >
                        <Shield className="w-4 h-4" />
                        Admin Login
                    </Link>
                </div>

                <div className="pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        Looking for authentication? We now use a custom admin system.
                    </p>
                </div>
            </div>
        </div>
    );
}
