"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ExerciseLog, ExerciseSet } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Plus, Save, ChevronLeft } from "lucide-react";

export default function WorkoutSessionPage() {
    const params = useParams();
    const router = useRouter();
    const type = params.type as string; // Push, Pull, etc.

    // State for the session
    const [exercises, setExercises] = useState<ExerciseLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [dayName, setDayName] = useState("");

    useEffect(() => {
        // Load plan from localStorage
        const savedPlan = localStorage.getItem("userPlan");
        if (savedPlan) {
            const plan = JSON.parse(savedPlan);
            // Search for matching day
            // e.g., type is "Push", day_name might be "يوم الدفع (Push)"
            console.log("Searching for:", type);
            const today = plan.schedule.find((day: any) =>
                day.day_name.toLowerCase().includes(type.toLowerCase()) ||
                (type === "Push" && day.day_number === 1) ||
                (type === "Pull" && day.day_number === 2) ||
                (type === "Legs" && day.day_number === 3) ||
                (type === "Upper" && day.day_number === 4) ||
                (type === "Lower" && day.day_number === 5)
            );

            if (today) {
                setDayName(today.day_name);
                const initialLogs: ExerciseLog[] = today.exercises.map((ex: any, index: number) => ({
                    exerciseId: `ex-${index}`,
                    name: ex.name,
                    sets: Array(ex.sets).fill(0).map((_, i) => ({
                        id: `set-${index}-${i}`,
                        weight: 0,
                        reps: 0,
                        completed: false
                    }))
                }));
                setExercises(initialLogs);
            }
        }
    }, [type]);

    const addSet = (exerciseIndex: number) => {
        const newExercises = [...exercises];
        newExercises[exerciseIndex].sets.push({
            id: `set-${Date.now()}`,
            weight: 0,
            reps: 0,
            completed: false
        });
        setExercises(newExercises);
    };

    const updateSet = (exerciseIndex: number, setIndex: number, field: keyof ExerciseSet, value: any) => {
        const newExercises = [...exercises];
        newExercises[exerciseIndex].sets[setIndex] = {
            ...newExercises[exerciseIndex].sets[setIndex],
            [field]: value
        };
        setExercises(newExercises);
    };

    const handleSave = async () => {
        setLoading(true);
        // TODO: Save to Firestore
        console.log("Saving workout:", { type, exercises });
        // Update next workout rotation
        const currentRotation = localStorage.getItem("lastWorkoutType");
        // Simple rotation logic update
        if (type === "Push") localStorage.setItem("lastWorkoutType", "Push");
        else if (type === "Pull") localStorage.setItem("lastWorkoutType", "Pull");
        else if (type === "Legs") localStorage.setItem("lastWorkoutType", "Legs");
        // This logic needs to match useWorkoutRotation.ts expecting the *last* completed type
        // For now let's leave it to the hook to figure out the *next* based on this *last*
        localStorage.setItem("lastWorkoutType", type);

        setTimeout(() => {
            setLoading(false);
            router.push("/");
        }, 1000);
    };

    if (exercises.length === 0) return <div className="min-h-screen bg-black text-white p-8 text-center flex items-center justify-center">جاري تحميل الخطة...</div>;

    return (
        <main className="min-h-screen bg-black text-white pb-24">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-neutral-900 p-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-6 h-6 rotate-180" /> {/* Rotated for RTL */}
                </Button>
                <h1 className="text-lg font-bold">{dayName}</h1>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            <div className="p-4 space-y-6 max-w-md mx-auto">
                {exercises.map((exercise, exIndex) => (
                    <Card key={exercise.exerciseId} className="bg-neutral-900/50 border-neutral-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-primary text-right">{exercise.name}</CardTitle>
                            {/* Optional: Add Last Session Data here */}
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-10 gap-2 mb-2 text-xs text-neutral-400 text-center font-bold">
                                <div className="col-span-2">مجم</div>
                                <div className="col-span-3">وزن</div>
                                <div className="col-span-3">عدات</div>
                                <div className="col-span-2">✓</div>
                            </div>

                            {exercise.sets.map((set, setIndex) => (
                                <div key={set.id} className="grid grid-cols-10 gap-2 items-center">
                                    <div className="col-span-2 text-center text-neutral-500 font-mono">
                                        {setIndex + 1}
                                    </div>
                                    <div className="col-span-3">
                                        <Input
                                            type="number"
                                            className="h-8 text-center bg-neutral-950 border-neutral-800"
                                            value={set.weight || ""}
                                            onChange={(e) => updateSet(exIndex, setIndex, "weight", parseFloat(e.target.value))}
                                            placeholder="-"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <Input
                                            type="number"
                                            className="h-8 text-center bg-neutral-950 border-neutral-800"
                                            value={set.reps || ""}
                                            onChange={(e) => updateSet(exIndex, setIndex, "reps", parseFloat(e.target.value))}
                                            placeholder="-"
                                        />
                                    </div>
                                    <div className="col-span-2 flex justify-center">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-primary rounded bg-neutral-800 border-neutral-700 cursor-pointer"
                                            checked={set.completed}
                                            onChange={(e) => updateSet(exIndex, setIndex, "completed", e.target.checked)}
                                        />
                                    </div>
                                </div>
                            ))}

                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full mt-2 text-neutral-400 hover:text-white"
                                onClick={() => addSet(exIndex)}
                            >
                                <Plus className="w-4 h-4 ml-2" /> إضافة مجموعة
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Floating Save Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-20">
                <Button
                    className="w-full h-14 text-lg font-bold shadow-2xl shadow-primary/20 mb-16"
                    onClick={handleSave}
                    isLoading={loading}
                >
                    <Save className="w-5 h-5 ml-2" /> إنهاء التمرين
                </Button>
            </div>
        </main>
    );
}
