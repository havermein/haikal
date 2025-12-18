import { Link } from "wouter";
import { Layout } from "@/components/game/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScore } from "@/hooks/useScore";
import { Trophy, RefreshCw, Home, Star, BookOpen, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";

export default function Result() {
  const { score, resetScore } = useScore();
  const [grade, setGrade] = useState<{ label: string, color: string, message: string }>({ label: "-", color: "text-muted", message: "..." });

  useEffect(() => {
    // Calculate average score if both played, or just partial
    let totalComponents = 0;
    if (score.quizCompleted) totalComponents++;
    if (score.simulationCompleted) totalComponents++;

    const finalScore = totalComponents === 0 ? 0 : Math.round(score.total / (totalComponents > 0 ? 1 : 1)); 
    // Wait, my useScore logic for 'total' was additive: quiz + simulation.
    // Max quiz = 100, Max sim = 100. Total max = 200.
    
    const percentage = Math.round((score.total / 200) * 100);
    
    // Actually, let's just use the raw total (0-200) to determine grade, 
    // but display it nicely.
    
    if (percentage >= 90) {
      setGrade({ label: "A+", color: "text-success", message: "Luar Biasa! Kamu Siap Kerja!" });
    } else if (percentage >= 80) {
      setGrade({ label: "A", color: "text-primary", message: "Hebat! Pemahamanmu Sangat Baik." });
    } else if (percentage >= 70) {
      setGrade({ label: "B", color: "text-blue-400", message: "Bagus! Tingkatkan Sedikit Lagi." });
    } else if (percentage >= 50) {
      setGrade({ label: "C", color: "text-yellow-500", message: "Cukup Baik, Tapi Perlu Belajar Lagi." });
    } else {
      setGrade({ label: "D", color: "text-destructive", message: "Jangan Menyerah! Coba Pelajari Materi Lagi." });
    }
  }, [score]);

  const handleReset = () => {
    if (confirm("Apakah kamu yakin ingin mengulang dari awal? Semua skor akan dihapus.")) {
      resetScore();
      window.location.href = "/game";
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-heading font-bold">Hasil Evaluasi</h1>
          <p className="text-muted-foreground">Berikut adalah laporan kesiapan kerjamu</p>
        </div>

        <Card className="border-0 shadow-2xl bg-card overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-success"></div>
          
          <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-8">
            
            {/* Main Score Circle */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-8 border-muted flex items-center justify-center bg-background shadow-inner">
                <div className="space-y-1">
                  <span className={`text-6xl font-black ${grade.color} block`}>{grade.label}</span>
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Grade</span>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                Skor Total: {score.total} / 200
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <h2 className={`text-2xl font-bold ${grade.color}`}>{grade.message}</h2>
              <p className="text-muted-foreground">
                Terus asah kemampuanmu agar semakin percaya diri saat melamar kerja nanti!
              </p>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex flex-col items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Kuis</span>
                <span className="text-2xl font-bold text-foreground">
                  {score.quizCompleted ? score.quiz : "-"} <span className="text-xs text-muted-foreground">/100</span>
                </span>
              </div>
              <div className="bg-success/5 p-4 rounded-xl border border-success/10 flex flex-col items-center gap-2">
                <Briefcase className="w-6 h-6 text-success" />
                <span className="text-sm font-medium text-muted-foreground">Simulasi</span>
                <span className="text-2xl font-bold text-foreground">
                  {score.simulationCompleted ? score.simulation : "-"} <span className="text-xs text-muted-foreground">/100</span>
                </span>
              </div>
            </div>

          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/home" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full h-12">
              <Home className="mr-2 w-4 h-4" /> Kembali ke Beranda
            </Button>
          </Link>
          <Button 
            onClick={handleReset} 
            size="lg" 
            className="w-full sm:w-auto h-12 shadow-lg hover:shadow-primary/25"
          >
            <RefreshCw className="mr-2 w-4 h-4" /> Main Ulang
          </Button>
        </div>
      </div>
    </Layout>
  );
}
