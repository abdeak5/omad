import { db } from "@/lib/firebase";
import { WorkoutSession, ExerciseLog } from "@/types";
import { collection, addDoc, doc, setDoc, query, where, orderBy, limit, getDocs } from "firebase/firestore";

export async function saveWorkout(userId: string, session: WorkoutSession) {
    try {
        // 1. Save the session to history
        const workoutRef = await addDoc(collection(db, "users", userId, "workouts"), session);

        // 2. Update stats for each exercise
        for (const exercise of session.exercises) {
            // Find best set (highest weight * reps or just highest weight)
            // For now, just save the last set or the max weight set
            const bestSet = exercise.sets.reduce((prev, current) => {
                return (current.weight || 0) > (prev.weight || 0) ? current : prev;
            }, exercise.sets[0]);

            if (bestSet && bestSet.completed) {
                const statsRef = doc(db, "users", userId, "exercise_stats", exercise.name);
                await setDoc(statsRef, {
                    lastWeight: bestSet.weight,
                    lastReps: bestSet.reps,
                    lastDate: session.date,
                    // We could also track specific 1RM etc.
                }, { merge: true });
            }
        }

        return workoutRef.id;
    } catch (error) {
        console.error("Error saving workout:", error);
        throw error;
    }
}

export async function getLastExerciseStats(userId: string, exerciseNames: string[]) {
    const stats: Record<string, { weight: number; reps: number; date: any }> = {};

    // This is not efficient for many exercises, but fine for 5-6 per workout.
    // Ideally use a single document for all stats map, or batch get.
    // Firestore doesn't support "where id in [...]" for document IDs easily with getAll?
    // Actually, getDocs(query(collection... where name in ...)) works for up to 10.

    // Let's just fetch individual docs for simplicity first, or fetch all stats if collection is small?
    // Exercise list might be huge.
    // Let's use Promise.all.

    await Promise.all(exerciseNames.map(async (name) => {
        // We can't query by ID in `where`, we get by doc ID
        // But we stored it as doc ID `exercise.name`.
        // Actually doc ID paths can be constructed.
        // But we need to handle special chars in names? "Incline Bench Press" is fine.

        try {
            // ... fetching logic
            // For now, let's leave this implementation for later optimization
        } catch (e) {
            // ignore
        }
    }));

    return stats;
}
