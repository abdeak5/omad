"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { WORKOUT_TEMPLATES } from "@/lib/workout_data";
import { WorkoutType, ExerciseLog, ExerciseSet } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Plus, Save, ChevronLeft } from "lucide-react";

export default function WorkoutSessionPage() {
    const params = useParams();
    const router = useRouter();
    const type = params.type as WorkoutType;
    const template = WORKOUT_TEMPLATES[type];

    // State for the session
    const [exercises, setExercises] = useState<ExerciseLog[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (template) {
            // Initialize with default exercises
            const initialLogs: ExerciseLog[] = template.defaultExercises.map((name, index) => ({
                exerciseId: `ex-${index}`, // temporary ID
                name,
                sets: [
                    { id: "set-1", weight: 0, reps: 0, completed: false }
                ]
            }));
            setExercises(initialLogs);
        }
    }, [template]);

    if (!template) return <div className="p-8 text-center">Invalid Workout Type</div>;

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
        setTimeout(() => {
            setLoading(false);
            router.push("/");
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-black text-white pb-24">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-neutral-900 p-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-lg font-bold">{template.name}</h1>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            <div className="p-4 space-y-6 max-w-md mx-auto">
                {exercises.map((exercise, exIndex) => (
                    <Card key={exercise.exerciseId} className="bg-neutral-900/50 border-neutral-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-primary">{exercise.name}</CardTitle>
                            <p className="text-xs text-neutral-500">Last: 60kg x 8 reps (TODO)</p>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-10 gap-2 mb-2 text-xs text-neutral-400 text-center font-bold">
                                <div className="col-span-2">SET</div>
                                <div className="col-span-3">KG</div>
                                <div className="col-span-3">REPS</div>
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
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <Input
                                            type="number"
                                            className="h-8 text-center bg-neutral-950 border-neutral-800"
                                            value={set.reps || ""}
                                            onChange={(e) => updateSet(exIndex, setIndex, "reps", parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-span-2 flex justify-center">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-primary rounded bg-neutral-800 border-neutral-700"
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
                                <Plus className="w-4 h-4 mr-2" /> Add Set
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Floating Save Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent">
                <Button
                    className="w-full h-14 text-lg font-bold shadow-2xl shadow-primary/20"
                    onClick={handleSave}
                    isLoading={loading}
                >
                    <Save className="w-5 h-5 mr-2" /> COMPLETE SESSION
                </Button>
            </div>
        </main>
    );
}
