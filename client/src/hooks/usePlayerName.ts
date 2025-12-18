import { useState, useEffect } from 'react';

const STORAGE_KEY = 'siapkerja_player_name';

export function usePlayerName() {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setName(saved);
    }
  }, []);

  const saveName = (playerName: string) => {
    setName(playerName);
    localStorage.setItem(STORAGE_KEY, playerName);
  };

  const clearName = () => {
    setName('');
    localStorage.removeItem(STORAGE_KEY);
  };

  return { name, saveName, clearName };
}
