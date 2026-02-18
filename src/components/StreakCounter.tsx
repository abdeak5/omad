"use client";

import { useStreak } from "@/hooks/useStreak";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function StreakCounter() {
    const { streak } = useStreak();

    return (
        <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-500",
            streak > 0
                ? "bg-orange-500/10 border-orange-500/50 text-orange-500"
                : "bg-neutral-900 border-neutral-800 text-neutral-500"
        )}>
            <Flame className={cn("w-4 h-4", streak > 0 && "fill-orange-500 animate-pulse")} />
            <span className="font-bold font-mono">{streak}</span>
            <span className="text-xs">
                {streak === 1 ? "يوم" : "أيام"}
            </span>
        </div>
    );
}
