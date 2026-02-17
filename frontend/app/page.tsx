import Link from "next/link"
import { TreePine, AlertTriangle, BarChart3, ArrowRight, Leaf, Droplets, Globe, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2.5 transition-transform hover:scale-105">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">ROOTSENSE</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            {["Dashboard", "Trees", "Issues", "Impact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground/80 transition-colors hover:text-primary"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Sign In
            </Link>
            <Button className="rounded-full bg-primary px-6 shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f3fbf5_0%,#e8f7ec_40%,#ffffff_100%)] pb-20 pt-24 lg:pb-32 lg:pt-32">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[100px]" />
            <div className="absolute -right-20 top-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
            <Leaf className="absolute left-[10%] top-[20%] h-12 w-12 rotate-[-15deg] text-secondary/20 blur-[1px]" />
            <Leaf className="absolute right-[15%] top-[10%] h-8 w-8 rotate-[15deg] text-primary/20 blur-[2px]" />
            <Leaf className="absolute bottom-[20%] left-[20%] h-16 w-16 rotate-[-45deg] text-accent/10 blur-[3px]" />
          </div>

          <div className="container relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Smart Campus Ecosystem
                </div>
                <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl xl:text-6xl">
                  Building a <span className="text-secondary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Living Digital Ecosystem</span> for Sustainable Campuses
                </h1>
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground/90 lg:text-xl">
                  RootSense transforms passive green spaces into intelligent assets. Monitor tree health, report civic issues, and track your environmental impact score in real-time.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <Button size="lg" className="h-12 rounded-full bg-gradient-to-r from-primary to-secondary px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40" asChild>
                    <Link href="/dashboard">
                      Explore Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 rounded-full border-primary/20 bg-white/50 px-8 text-base font-medium text-primary hover:bg-white hover:text-primary/80 backdrop-blur-sm" asChild>
                    <Link href="/trees">View Live Map</Link>
                  </Button>
                </div>

                <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    <span>Real-time AI Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    <span>Geo-tagged Tracking</span>
                  </div>
                </div>
              </div>

              {/* Hero Illustration */}
              <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
                <div className="relative aspect-square w-full rounded-full bg-gradient-to-tr from-white/80 to-transparent p-8 backdrop-blur-sm lg:aspect-auto lg:h-[600px]">
                  {/* Placeholder for GenAI Image or fallback */}
                  <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 bg-white/30 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02]">
                    <Image
                      src="/eco_campus_hero.png"
                      alt="Smart Eco Campus Illustration"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Floating Element 1 */}
                    <div className="absolute -left-4 top-20 rounded-xl bg-white p-3 shadow-xl animate-bounce-slow">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-100 p-2">
                          <TreePine className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500">Tree Health</p>
                          <p className="text-sm font-bold text-foreground">98.5% <span className="text-green-500">↑</span></p>
                        </div>
                      </div>
                    </div>
                    {/* Floating Element 2 */}
                    <div className="absolute -right-4 bottom-32 rounded-xl bg-white p-3 shadow-xl animate-bounce-slow delay-700">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                          <Droplets className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500">Water Saved</p>
                          <p className="text-sm font-bold text-foreground">12.4k L</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative z-10 -mt-16 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 rounded-3xl border border-primary/10 bg-white p-8 shadow-xl shadow-primary/5 md:grid-cols-3 md:gap-8 lg:p-12">
              <div className="flex flex-col items-center justify-center border-b border-dashed border-primary/10 pb-6 md:border-b-0 md:border-r md:pb-0">
                <div className="mb-2 text-4xl font-extrabold text-primary">1,247</div>
                <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Trees Monitored</div>
              </div>
              <div className="flex flex-col items-center justify-center border-b border-dashed border-primary/10 pb-6 md:border-b-0 md:border-r md:pb-0">
                <div className="mb-2 text-4xl font-extrabold text-primary">843</div>
                <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Issues Resolved</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2 flex items-center gap-2 text-4xl font-extrabold text-secondary">
                  <span className="text-primary">A+</span>
                  <span className="text-lg font-medium text-muted-foreground/80">(92/100)</span>
                </div>
                <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Eco Impact Score</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Engineered for <span className="text-primary">Sustainability</span></h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Advanced tools to visualize, track, and improve your campus ecosystem.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: TreePine,
                  title: "Tree Survival Audit",
                  desc: "Automated survival rate tracking with geolocation and photographic evidence logs.",
                  color: "text-primary",
                  bg: "bg-primary/10"
                },
                {
                  icon: AlertTriangle,
                  title: "Rapid Issue Resolution",
                  desc: "Crowdsourced reporting for broken sprinklers, waste accumulation, and structural damage.",
                  color: "text-red-600",
                  bg: "bg-red-50"
                },
                {
                  icon: BarChart3,
                  title: "Impact Analytics",
                  desc: "Quantifiable metrics for carbon sequestration, water usage, and biodiversity index.",
                  color: "text-blue-600",
                  bg: "bg-blue-50"
                }
              ].map((feature, i) => (
                <Card key={i} className="group relative overflow-hidden border-border/50 bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <CardHeader>
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} transition-colors group-hover:bg-primary group-hover:text-white`}>
                      <feature.icon className={`h-7 w-7 ${feature.color} group-hover:text-white`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-primary px-6 py-24 lg:px-8">
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          <div className="relative mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to transform your campus?</h2>
            <p className="mb-10 text-xl text-primary-foreground/90">
              Join 50+ campuses using RootSense to make measurable environmental change.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-14 rounded-full bg-white px-8 text-base font-bold text-primary hover:bg-white/90" asChild>
                <Link href="/dashboard">Launch Dashboard</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 rounded-full border-white/30 bg-primary/20 px-8 text-base font-semibold text-white hover:bg-white/20" asChild>
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-white px-6 py-12 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground">ROOTSENSE</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 RootSense. Built for the Future.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
