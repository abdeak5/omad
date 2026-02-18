"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export default function OnboardingPage() {
    const [height, setHeight] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [goalWeight, setGoalWeight] = useState("");
    const [age, setAge] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth.currentUser) return;

        setLoading(true);

        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                height: parseFloat(height),
                currentWeight: parseFloat(currentWeight),
                goalWeight: parseFloat(goalWeight),
                age: parseInt(age),
                onboardingCompleted: true,
                updatedAt: new Date(),
            });
            router.push("/");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-neutral-800 bg-neutral-900/50">
            <CardHeader>
                <CardTitle className="text-primary text-center text-3xl font-bold">
                    PROFILE SETUP
                </CardTitle>
                <CardDescription className="text-center">
                    Calibrate the system for your biology.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="number"
                        placeholder="Height (cm)"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        required
                        className="bg-neutral-950 border-neutral-800 text-white"
                    />
                    <Input
                        type="number"
                        placeholder="Current Weight (kg)"
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(e.target.value)}
                        required
                        className="bg-neutral-950 border-neutral-800 text-white"
                    />
                    <Input
                        type="number"
                        placeholder="Goal Weight (kg)"
                        value={goalWeight}
                        onChange={(e) => setGoalWeight(e.target.value)}
                        required
                        className="bg-neutral-950 border-neutral-800 text-white"
                    />
                    <Input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className="bg-neutral-950 border-neutral-800 text-white"
                    />
                    <Button type="submit" className="w-full font-bold" isLoading={loading}>
                        COMPLETE CALIBRATION
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
