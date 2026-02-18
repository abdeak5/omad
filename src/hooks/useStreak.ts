"use client";

import { useState, useEffect } from "react";

export function useStreak() {
    const [streak, setStreak] = useState(0);
    const [lastLog, setLastLog] = useState<string | null>(null);

    useEffect(() => {
        const savedStreak = parseInt(localStorage.getItem("streak") || "0");
        const savedLastLog = localStorage.getItem("lastLogDate");

        if (savedLastLog) {
            const lastDate = new Date(savedLastLog);
            const today = new Date();

            // Reset hours to compare dates only
            lastDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            const diffTime = Math.abs(today.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Streak continues
                setStreak(savedStreak);
            } else if (diffDays > 1) {
                // Streak broken
                setStreak(0);
                localStorage.setItem("streak", "0");
            } else {
                // Same day
                setStreak(savedStreak);
            }
        }

        setLastLog(savedLastLog);
    }, []);

    const incrementStreak = () => {
        const today = new Date();
        const todayStr = today.toISOString();

        // Check if already logged today to prevent double counting
        if (lastLog) {
            const lastDate = new Date(lastLog);
            if (lastDate.toDateString() === today.toDateString()) return;
        }

        const newStreak = streak + 1;
        setStreak(newStreak);
        setLastLog(todayStr);

        localStorage.setItem("streak", newStreak.toString());
        localStorage.setItem("lastLogDate", todayStr);
    };

    return { streak, incrementStreak };
}
