"use client";

import { useEffect, useState } from "react";

export function useFastingTimer() {
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"fasting" | "eating" | "pre-workout">("fasting");
    const [lastMealTime, setLastMealTime] = useState<Date | null>(null);

    useEffect(() => {
        // Load start time
        const saved = localStorage.getItem("lastMealTime");
        if (saved) {
            setLastMealTime(new Date(saved));
        } else {
            // Default to 6 PM yesterday if not set
            const yesterday = new Date();
            yesterday.setHours(18, 0, 0, 0);
            yesterday.setDate(yesterday.getDate() - 1);
            setLastMealTime(yesterday);
        }
    }, []);

    useEffect(() => {
        if (!lastMealTime) return;

        const interval = setInterval(() => {
            const now = new Date();
            const startTime = new Date(lastMealTime);
            const fastingDuration = 23 * 60 * 60 * 1000; // 23 hours
            const endTime = new Date(startTime.getTime() + fastingDuration);

            const diff = endTime.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft("00:00:00");
                setProgress(100);
                setPhase("eating");
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
                setProgress((elapsed / 23 / 60 / 60 / 1000) * 100);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lastMealTime]);

    // Function to reset timer (e.g. after eating)
    const startFast = () => {
        const now = new Date();
        localStorage.setItem("lastMealTime", now.toISOString());
        setLastMealTime(now);
        setPhase("fasting");
    };

    return { timeLeft, progress, phase, startFast };
}
