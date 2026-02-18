export interface UserProfile {
    uid: string;
    email: string;
    height?: number;
    currentWeight?: number;
    goalWeight?: number;
    age?: number;
    onboardingCompleted: boolean;
}

export interface ExerciseSet {
    id: string; // unique within session
    weight: number;
    reps: number;
    rpe?: number; // Rate of Perceived Exertion (1-10)
    completed: boolean;
}

export interface ExerciseLog {
    exerciseId: string;
    name: string;
    sets: ExerciseSet[];
    notes?: string;
    imageUrl?: string; // Generated AI image URL
}

export interface WorkoutSession {
    id: string;
    userId: string;
    date: Date;
    type: "Push" | "Pull" | "Legs" | "Upper" | "Lower" | "FullBody";
    exercises: ExerciseLog[];
    durationMinutes?: number;
    notes?: string;
}

export type WorkoutType = WorkoutSession["type"];
