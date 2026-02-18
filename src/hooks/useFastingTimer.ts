"use client";

import { useEffect, useState } from "react";

export function useFastingTimer(lastMealTime: Date | null) {
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"fasting" | "eating" | "pre-workout">("fasting");

    useEffect(() => {
        if (!lastMealTime) return;

        const interval = setInterval(() => {
            const now = new Date();
            const startTime = new Date(lastMealTime);
            const fastingDuration = 23 * 60 * 60 * 1000; // 23 hours in ms
            const endTime = new Date(startTime.getTime() + fastingDuration);

            const diff = endTime.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft("00:00:00");
                setProgress(100);
                setPhase("eating");
                // Check for specific time triggers (e.g. 6 PM) could happen here or in parent
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setTimeLeft(
                    `${hours.toString().padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
                );

                const elapsed = now.getTime() - startTime.getTime();
                const total = fastingDuration;
                setProgress((elapsed / total) * 100);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lastMealTime]);

    return { timeLeft, progress, phase };
}
