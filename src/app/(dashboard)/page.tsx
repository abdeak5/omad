"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFastingTimer } from "@/hooks/useFastingTimer";
import { useWorkoutRotation } from "@/hooks/useWorkoutRotation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Timer, Utensils, Dumbbell, Droplets, Flame, ChevronLeft } from "lucide-react";
import { CircularProgress } from "@/components/ui/CircularProgress";

export default function Dashboard() {
    const { timeLeft, progress, phase } = useFastingTimer();
    const { nextWorkout } = useWorkoutRotation();
    const [plan, setPlan] = useState<any>(null);

    useEffect(() => {
        const savedPlan = localStorage.getItem("userPlan");
        if (savedPlan) {
            setPlan(JSON.parse(savedPlan));
        }
    }, []);

    if (!plan) {
        return (
            <main className="min-h-screen p-6 flex flex-col items-center justify-center space-y-6 text-center">
                <h1 className="text-3xl font-bold text-primary">أهلاً بك في Iron Monk</h1>
                <p className="text-neutral-400">للبدء، نحتاج إلى بناء خطتك المخصصة.</p>
                <Link href="/setup">
                    <Button className="w-full h-14 text-lg font-bold animate-pulse">
                        ابدأ الإعداد الآن <ChevronLeft className="w-5 h-5 mr-2" />
                    </Button>
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen pb-24 p-6 space-y-6">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
                    <p className="text-neutral-400 text-sm">اليوم: {new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-primary font-bold">
                    {plan.nutrition.macros.protein}g
                </div>
            </header>

            {/* Fasting Timer */}
            <Card className="bg-neutral-900/50 border-neutral-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-neutral-400 font-medium flex items-center gap-2">
                            <Timer className="w-4 h-4 text-primary" /> عداد الصيام
                        </h3>
                        <p className="text-3xl font-bold tracking-widest font-mono">{timeLeft}</p>
                        <p className="text-xs text-neutral-500">{phase === "fasting" ? "صيام (حتى 6:00 م)" : "فترة الأكل"}</p>
                    </div>
                    <div className="w-20 h-20">
                        <CircularProgress progress={progress} />
                    </div>
                </CardContent>
            </Card>

            {/* Nutrition Summary */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-neutral-900/50 border-neutral-800">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                        <Flame className="w-8 h-8 text-orange-500 mb-1" />
                        <span className="text-2xl font-bold">{plan.nutrition.calories}</span>
                        <span className="text-xs text-neutral-400">سعرة حرارية</span>
                    </CardContent>
                </Card>
                <Card className="bg-neutral-900/50 border-neutral-800">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                        <Droplets className="w-8 h-8 text-blue-500 mb-1" />
                        <span className="text-2xl font-bold">{plan.nutrition.water_target / 1000}L</span>
                        <span className="text-xs text-neutral-400">هدف الماء</span>
                    </CardContent>
                </Card>
            </div>

            {/* Next Workout */}
            <Link href={`/workout/${nextWorkout}`}>
                <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border-neutral-800 hover:border-primary/50 transition-all cursor-pointer group">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Dumbbell className="w-5 h-5" />
                                <span className="font-bold text-lg">جلسة اليوم: {nextWorkout}</span>
                            </div>
                            <p className="text-neutral-400 text-sm">
                                حان وقت رفع الأوزان الثقيلة. لا تنسى تسجيل الأوزان.
                            </p>
                        </div>
                        <ChevronLeft className="w-6 h-6 text-neutral-600 group-hover:text-primary transition-colors" />
                    </CardContent>
                </Card>
            </Link>

            {/* AI Advice */}
            <Card className="bg-blue-950/20 border-blue-900/30">
                <CardHeader>
                    <CardTitle className="text-sm text-blue-400">نصيحة المدرب الذكي</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                        "{plan.nutrition.advice}"
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
