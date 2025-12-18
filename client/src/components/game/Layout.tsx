import { Link, useLocation } from "wouter";
import { Briefcase, GraduationCap, Home, Trophy } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/game", label: "Mulai Main", icon: Briefcase },
    { href: "/result", label: "Progress", icon: Trophy },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="hidden sm:inline-block tracking-tight text-foreground">Siap<span className="text-primary">Kerja</span></span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline-block">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      <footer className="border-t bg-muted/30 py-6 md:py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-medium mb-2">Game Edukasi Ketenagakerjaan</p>
          <p>© 2025 SiapKerja Project. Dibuat untuk Pelajar Indonesia 🇮🇩</p>
        </div>
      </footer>
    </div>
  );
}
