import { Link } from "wouter";
import { Layout } from "@/components/game/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { BookOpen, Briefcase, PlayCircle, Trophy } from "lucide-react";
import { useScore } from "@/hooks/useScore";
import { cn } from "@/lib/utils";

export default function GameHub() {
  const { score } = useScore();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-heading font-bold">Pilih Mode Permainan</h1>
          <p className="text-muted-foreground">Pilih tantanganmu dan kumpulkan poin sebanyak-banyaknya!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Quiz Card */}
          <Card className="hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <BookOpen className="w-32 h-32 text-primary" />
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Kuis Ketenagakerjaan</CardTitle>
              <CardDescription>
                Uji pengetahuanmu tentang hak pekerja, aturan melamar, dan persiapan karir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  {score.quizCompleted ? (
                    <span className="text-success font-medium flex items-center gap-1">
                      <Trophy className="w-4 h-4" /> Selesai ({score.quiz} Poin)
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Belum dimainkan</span>
                  )}
                </div>
                <Link 
                  href="/game/quiz" 
                  className={cn(buttonVariants({ variant: "default" }), "w-full h-12 text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors")}
                >
                  <a className="flex items-center justify-center w-full">
                    <PlayCircle className="mr-2 w-5 h-5" />
                    {score.quizCompleted ? "Main Lagi" : "Mulai Kuis"}
                  </a>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Card */}
          <Card className="hover:border-success/50 transition-all hover:shadow-lg group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Briefcase className="w-32 h-32 text-success" />
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 text-success">
                <Briefcase className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">Simulasi Dunia Kerja</CardTitle>
              <CardDescription>
                Hadapi skenario nyata dalam melamar kerja dan kehidupan kantor. Tentukan pilihanmu!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  {score.simulationCompleted ? (
                    <span className="text-success font-medium flex items-center gap-1">
                      <Trophy className="w-4 h-4" /> Selesai ({score.simulation} Poin)
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Belum dimainkan</span>
                  )}
                </div>
                <Link 
                  href="/game/simulation"
                  className={cn(
                    buttonVariants({ variant: score.simulationCompleted ? "outline" : "default" }), 
                    "w-full h-12 text-lg transition-colors",
                    !score.simulationCompleted && 'bg-success hover:bg-success/90 text-white border-success'
                  )}
                >
                  <a className="flex items-center justify-center w-full">
                    <PlayCircle className="mr-2 w-5 h-5" />
                    {score.simulationCompleted ? "Main Lagi" : "Mulai Simulasi"}
                  </a>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
