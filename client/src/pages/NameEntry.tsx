import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlayerName } from "@/hooks/usePlayerName";
import { ArrowRight, User } from "lucide-react";

export default function NameEntry() {
  const [, setLocation] = useLocation();
  const { saveName } = usePlayerName();
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = inputName.trim();

    if (!trimmedName) {
      setError("Masukkan nama kamu terlebih dahulu");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Nama harus minimal 2 karakter");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Nama terlalu panjang (maksimal 50 karakter)");
      return;
    }

    setIsLoading(true);
    saveName(trimmedName);

    setTimeout(() => {
      setLocation("/home");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10 flex flex-col items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-success/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary">
              <User className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground">
            Siapa Nama Kamu?
          </h1>
          <p className="text-muted-foreground">
            Perkenalkan dirimu sebelum memulai petualangan!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Nama Lengkap
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Masukkan nama kamu..."
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                setError("");
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e as any);
                }
              }}
              className="h-12 text-base px-4 rounded-lg border-2"
              disabled={isLoading}
              autoFocus
              data-testid="input-player-name"
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive animate-in fade-in shake">
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full h-12 text-lg rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all group disabled:opacity-50"
            disabled={isLoading}
            data-testid="button-start-game"
          >
            {isLoading ? "Memproses..." : "Lanjutkan"}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Nama kamu akan disimpan untuk sesi ini ✨
        </p>
      </div>
    </div>
  );
}
