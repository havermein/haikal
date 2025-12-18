import { useState, useEffect } from 'react';

const STORAGE_KEY = 'siapkerja_score';

export interface ScoreData {
  quiz: number;
  simulation: number;
  total: number;
  quizCompleted: boolean;
  simulationCompleted: boolean;
}

const INITIAL_STATE: ScoreData = {
  quiz: 0,
  simulation: 0,
  total: 0,
  quizCompleted: false,
  simulationCompleted: false,
};

export function useScore() {
  const [score, setScore] = useState<ScoreData>(INITIAL_STATE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setScore(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse score', e);
      }
    }
  }, []);

  const updateQuizScore = (points: number) => {
    setScore(prev => {
      const newState = {
        ...prev,
        quiz: points,
        quizCompleted: true,
        total: points + prev.simulation
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const updateSimulationScore = (points: number) => {
    setScore(prev => {
      const newState = {
        ...prev,
        simulation: points,
        simulationCompleted: true,
        total: prev.quiz + points
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const resetScore = () => {
    setScore(INITIAL_STATE);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STATE));
  };

  return { score, updateQuizScore, updateSimulationScore, resetScore };
}
