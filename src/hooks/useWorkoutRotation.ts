"use client";

import { useState, useEffect } from "react";
import { WorkoutType } from "@/types";

const ROTATION_ORDER: WorkoutType[] = ["Push", "Pull", "Legs", "Upper", "Lower"];

export function useWorkoutRotation() {
    const [nextWorkout, setNextWorkout] = useState<WorkoutType>("Push");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Fetch last workout from Firestore
        // For now, mock or read from localStorage
        const lastWorkoutType = localStorage.getItem("lastWorkoutType") as WorkoutType;

        if (lastWorkoutType) {
            const index = ROTATION_ORDER.indexOf(lastWorkoutType);
            const nextIndex = (index + 1) % ROTATION_ORDER.length;
            setNextWorkout(ROTATION_ORDER[nextIndex]);
        }

        setLoading(false);
    }, []);

    const completeWorkout = (type: WorkoutType) => {
        localStorage.setItem("lastWorkoutType", type);
        // Logic to update state immediately
        const index = ROTATION_ORDER.indexOf(type);
        const nextIndex = (index + 1) % ROTATION_ORDER.length;
        setNextWorkout(ROTATION_ORDER[nextIndex]);
    };

    return { nextWorkout, loading, completeWorkout };
}
