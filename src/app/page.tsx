"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Droplets, Dumbbell, Flame, Moon, Settings } from "lucide-react";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Fasting Logic Check
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            // Target is 6:00 PM today. If now > 6 PM, target is tomorrow 6 PM.
            // Actually, if now is 4 PM, we are fasting until 6 PM today.
            // If now is 7 PM, we broke fast, and next fast ends tomorrow 6 PM?
            // Spec: "6:00 PM: Break Fast". So Fasting ends at 18:00.

            let target = new Date();
            target.setHours(18, 0, 0, 0);

            if (now.getHours() >= 18) {
                // Eating window or post-fast. Target is tomorrow.
                target.setDate(target.getDate() + 1);
            }

            // Start of fast was yesterday 19:00? Or just countdown to 18:00?
            // "23 hour fast".
            // Let's assume fast ends at 18:00.
            // If now < 18:00, we are fasting.
            const diff = target.getTime() - now.getTime();
            const totalDuration = 23 * 60 * 60 * 1000; // 23h

            // Calculate progress based on a 23h window ending at target
            // Start time = target - 23h
            const startTime = new Date(target.getTime() - totalDuration);

            // If we are in the 1 hour eating window (18:00 - 19:00)?
            // Spec doesn't clarify eating window duration strictly, implied OMAD ~1h.
            // If now is 18:30, diff to next 18:00 is ~23.5h.
            // But we are EATING.

            const isEatingWindow = now.getHours() === 18; // 6 PM to 7 PM

            if (isEatingWindow) {
                setTimeLeft("FEAST");
                setProgress(100);
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
                const p = (elapsed / totalDuration) * 100;
                setProgress(Math.min(p, 100)); // Cap at 100
            }

        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (loading || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white pb-20">
            {/* Header */}
            <header className="flex justify-between items-center p-6 border-b border-neutral-900">
                <div className="flex items-center gap-2">
                    <Flame className="w-6 h-6 text-primary" />
                    <h1 className="text-xl font-bold tracking-tighter">IRON MONK</h1>
                </div>
                <Settings className="w-6 h-6 text-neutral-400" />
            </header>

            <div className="p-6 space-y-8 max-w-md mx-auto">
                {/* Chrono Timer */}
                <div className="flex flex-col items-center justify-center py-8">
                    <CircularProgress progress={progress} size={300} strokeWidth={15}>
                        <div className="flex flex-col items-center">
                            <span className="text-neutral-400 text-sm uppercase tracking-widest mb-2">
                                Fasting Timer
                            </span>
                            <span className="text-5xl font-bold font-mono tracking-tighter text-white">
                                {timeLeft}
                            </span>
                            <span className="text-primary text-xs mt-2 uppercase font-semibold">
                                Window closes at 18:00
                            </span>
                        </div>
                    </CircularProgress>
                </div>

                {/* Action Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900 transition-colors cursor-pointer">
                        <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                            <Droplets className="w-8 h-8 text-blue-500" />
                            <div className="text-center">
                                <span className="block font-bold">Hydrate</span>
                                <span className="text-xs text-neutral-400">Log Water + Salt</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900 transition-colors cursor-pointer">
                        <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                            <Dumbbell className="w-8 h-8 text-primary" />
                            <div className="text-center">
                                <span className="block font-bold">Workout</span>
                                <span className="text-xs text-neutral-400">Push Day</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress Teaser */}
                <Card className="bg-neutral-900/50 border-neutral-800">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Moon className="w-4 h-4 text-purple-400" />
                            Sleep & Recovery
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[75%]"></div>
                        </div>
                        <p className="text-xs text-neutral-400 mt-2 text-right">7h 30m / 8h Goal</p>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Nav Placeholder */}
            <nav className="fixed bottom-0 left-0 right-0 h-16 bg-neutral-950 border-t border-neutral-900 flex items-center justify-around z-50">
                {/* ... Icons ... */}
            </nav>
        </main>
    );
}
