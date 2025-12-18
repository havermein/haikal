import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";

export default function Intro() {
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleStart = () => {
    setLocation("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10 flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-success/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className={`text-center space-y-8 relative z-10 max-w-2xl transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo & Title */}
        <div className="space-y-4 animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="flex justify-center gap-3">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 animate-bounce">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="w-16 h-16 bg-success text-success-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-success/30 animate-bounce delay-100">
              <Briefcase className="w-8 h-8" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight leading-tight">
            Siap<span className="text-primary">Kerja</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Game Edukasi Ketenagakerjaan
          </p>
          <p className="text-sm text-muted-foreground/80 pt-2">
            Dibuat oleh <span className="font-semibold text-foreground">Haikal Joanelman</span>
          </p>
        </div>

        {/* Description */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pelajari cara melamar kerja, pahami hak & kewajiban pekerja, dan kuasai etika profesional melalui game interaktif yang menyenangkan.
          </p>
          <p className="text-sm text-muted-foreground">
            Persiapkan dirimu untuk memasuki dunia kerja dengan percaya diri! 💪
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 py-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">5</div>
            <p className="text-xs text-muted-foreground">Soal Kuis</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-success">3</div>
            <p className="text-xs text-muted-foreground">Skenario</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">100%</div>
            <p className="text-xs text-muted-foreground">Gratis</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 animate-in fade-in zoom-in duration-1000 delay-700">
          <Button 
            size="lg"
            onClick={handleStart}
            className="h-14 px-10 text-lg rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all group"
          >
            Mulai Petualangan
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Klik untuk melanjutkan →
          </p>
        </div>
      </div>
    </div>
  );
}
