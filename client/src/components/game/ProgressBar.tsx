import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  colorClass?: string;
}

export function ProgressBar({ current, total, label, colorClass = "bg-primary" }: ProgressBarProps) {
  const progress = Math.min(100, (current / total) * 100);
  
  return (
    <div className="space-y-2 w-full">
      {label && (
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>{label}</span>
          <span>{current} / {total}</span>
        </div>
      )}
      <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ease-out rounded-full ${colorClass}`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
