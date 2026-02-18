import { WorkoutType } from "@/types";

export const WORKOUT_TEMPLATES: Record<WorkoutType, { name: string; defaultExercises: string[] }> = {
    Push: {
        name: "Push Day (Chest/Shoulders/Triceps)",
        defaultExercises: ["Incline Bench Press", "Overhead Press", "Lateral Raises", "Tricep Pushdowns"],
    },
    Pull: {
        name: "Pull Day (Back/Biceps)",
        defaultExercises: ["Pull Ups", "Barbell Rows", "Face Pulls", "Hammer Curls"],
    },
    Legs: {
        name: "Leg Day (Quads/Hams)",
        defaultExercises: ["Squats", "Romanian Deadlifts", "Leg Press", "Calf Raises"],
    },
    Upper: {
        name: "Upper Body Hypertrophy",
        defaultExercises: ["Bench Press", "Pull Downs", "Dumbbell Shoulder Press", "Bicep Curls"],
    },
    Lower: {
        name: "Lower Body Power",
        defaultExercises: ["Deadlift", "Hack Squat", "Leg Extensions", "Hanging Leg Raise"],
    },
    FullBody: {
        name: "Full Body Reconstruction",
        defaultExercises: ["Squat", "Bench", "Row", "Overhead Press"],
    },
};
