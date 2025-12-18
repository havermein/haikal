import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/game/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/game/ProgressBar";
import { useScore } from "@/hooks/useScore";
import { CheckCircle, XCircle, ArrowRight, AlertCircle } from "lucide-react";
import quizData from "@/data/quiz.json";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const { updateQuizScore } = useScore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = quizData.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const scorePerQuestion = 100 / totalQuestions;

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);

    if (index === currentQuestion.answer) {
      setScore(prev => prev + scorePerQuestion);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setIsFinished(true);
    const finalScore = Math.round(score + (selectedOption === currentQuestion.answer ? scorePerQuestion : 0)); 
    // Wait, the score update above happens on click, but if we are on the last question, 
    // the state update might be batched. 
    // Actually, I updated score immediately in handleOptionSelect.
    // So 'score' variable here might be one step behind if accessed immediately? 
    // No, handleNext is called by user interaction AFTER handleOptionSelect. So state is stable.
    
    // Correction: React state updates are async. But handleNext is a separate event.
    // However, for the very last question, we just finished it.
    
    // Let's rely on the state 'score' which is updated when user clicks an option.
    updateQuizScore(Math.round(score));
    setTimeout(() => {
      setLocation("/result");
    }, 1500);
  };

  if (isFinished) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold">Kuis Selesai!</h2>
          <p className="text-muted-foreground">Menyimpan skor kamu...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">{quizData.title}</h1>
            <span className="text-sm font-medium text-muted-foreground">
              Soal {currentQuestionIndex + 1} dari {totalQuestions}
            </span>
          </div>
          <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle = "justify-start text-left h-auto py-4 px-6 text-base whitespace-normal hover:bg-secondary/80";
                
                if (showFeedback) {
                  if (index === currentQuestion.answer) {
                    buttonStyle = "justify-start text-left h-auto py-4 px-6 text-base whitespace-normal bg-success/20 text-success-foreground border-success hover:bg-success/30";
                  } else if (index === selectedOption) {
                    buttonStyle = "justify-start text-left h-auto py-4 px-6 text-base whitespace-normal bg-destructive/20 text-destructive-foreground border-destructive hover:bg-destructive/30";
                  } else {
                     buttonStyle += " opacity-50";
                  }
                } else if (selectedOption === index) {
                   buttonStyle = "justify-start text-left h-auto py-4 px-6 text-base whitespace-normal border-primary bg-primary/10 text-primary";
                }

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={buttonStyle}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showFeedback}
                  >
                    <span className="mr-3 font-bold opacity-70">{String.fromCharCode(65 + index)}.</span>
                    {option}
                    {showFeedback && index === currentQuestion.answer && (
                      <CheckCircle className="ml-auto w-5 h-5 text-success" />
                    )}
                    {showFeedback && index === selectedOption && index !== currentQuestion.answer && (
                      <XCircle className="ml-auto w-5 h-5 text-destructive" />
                    )}
                  </Button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="mt-6 p-4 bg-muted rounded-lg border animate-in fade-in slide-in-from-top-2">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {selectedOption === currentQuestion.answer ? "Benar!" : "Jawaban yang benar:"}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end pt-2">
            <Button 
              size="lg" 
              onClick={handleNext} 
              disabled={!showFeedback}
              className="px-8"
            >
              {currentQuestionIndex === totalQuestions - 1 ? "Selesai" : "Lanjut"} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
