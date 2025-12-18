import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/game/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/game/ProgressBar";
import { useScore } from "@/hooks/useScore";
import { ArrowRight, MessageSquare, Briefcase } from "lucide-react";
import simulationData from "@/data/simulation.json";

export default function Simulation() {
  const [, setLocation] = useLocation();
  const { updateSimulationScore } = useScore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const scenarios = simulationData.scenarios;
  const currentScenario = scenarios[currentIndex];
  const totalScenarios = scenarios.length;

  const handleChoiceSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedChoiceIndex(index);
    setShowFeedback(true);
    
    const choiceScore = currentScenario.choices[index].score;
    // Calculate partial score based on total scenarios
    // If we have 3 scenarios, each max is 100 in JSON?
    // Let's assume JSON score is raw points (0-100). We average them at the end or sum them?
    // The requirement says "Score system". Let's sum and normalize to 100.
    // Or just sum raw points.
    // Let's normalize: (Total Earned / Total Max Possible) * 100.
    // Assuming max score per scenario is 100.
    
    setScore(prev => prev + choiceScore);
  };

  const handleNext = () => {
    if (currentIndex < totalScenarios - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoiceIndex(null);
      setShowFeedback(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setIsFinished(true);
    // Normalize score to 0-100 scale
    const maxPossibleScore = totalScenarios * 100;
    const finalNormalizedScore = Math.round((score / maxPossibleScore) * 100);
    
    updateSimulationScore(finalNormalizedScore);
    setTimeout(() => {
      setLocation("/result");
    }, 1500);
  };

  if (isFinished) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center text-success animate-bounce">
            <Briefcase className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold">Simulasi Selesai!</h2>
          <p className="text-muted-foreground">Menghitung performa kerjamu...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-success">{simulationData.title}</h1>
            <span className="text-sm font-medium text-muted-foreground">
              Skenario {currentIndex + 1} dari {totalScenarios}
            </span>
          </div>
          <ProgressBar 
            current={currentIndex + 1} 
            total={totalScenarios} 
            colorClass="bg-success"
          />
        </div>

        <Card className="border-2 shadow-lg overflow-hidden">
          <div className="bg-success/10 p-6 border-b border-success/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Briefcase className="w-6 h-6 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">{currentScenario.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {currentScenario.description}
                </p>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Apa yang akan kamu lakukan?
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              {currentScenario.choices.map((choice, index) => {
                const isSelected = selectedChoiceIndex === index;
                let cardClass = "cursor-pointer transition-all hover:border-success/50 hover:shadow-md h-full";
                
                if (showFeedback) {
                  if (isSelected) {
                     cardClass = "border-2 border-primary bg-primary/5 shadow-md h-full";
                  } else {
                     cardClass = "opacity-50 border-transparent h-full bg-muted/50";
                  }
                } else {
                   cardClass = "border hover:border-success/50 hover:bg-success/5 h-full bg-card";
                }

                return (
                  <Card 
                    key={index}
                    className={cardClass}
                    onClick={() => handleChoiceSelect(index)}
                  >
                    <CardContent className="p-6 flex flex-col h-full justify-between gap-4">
                      <p className="font-medium text-lg leading-snug">{choice.text}</p>
                      {showFeedback && isSelected && (
                        <div className={`mt-2 text-sm font-semibold ${choice.score > 0 ? 'text-success' : 'text-destructive'}`}>
                          {choice.score > 0 ? '+ Poin Positif' : 'Kurang Tepat'}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {showFeedback && selectedChoiceIndex !== null && (
              <div className="mt-8 p-6 bg-muted rounded-xl border animate-in fade-in slide-in-from-bottom-2">
                <div className="flex gap-4">
                  <MessageSquare className="w-6 h-6 text-primary shrink-0" />
                  <div className="space-y-2">
                    <p className="font-bold text-foreground">Feedback Mentor:</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentScenario.choices[selectedChoiceIndex].feedback}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="bg-muted/30 p-4 justify-end border-t">
            <Button 
              size="lg" 
              onClick={handleNext} 
              disabled={!showFeedback}
              className={showFeedback ? "animate-pulse hover:animate-none" : ""}
            >
              {currentIndex === totalScenarios - 1 ? "Lihat Hasil" : "Skenario Berikutnya"} 
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
