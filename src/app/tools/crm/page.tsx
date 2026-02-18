"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Calculator } from "lucide-react";

export default function OneRMCalculator() {
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const w = parseFloat(weight);
        const r = parseFloat(reps);
        if (w && r) {
            // Epley Formula
            const oneRM = w * (1 + r / 30);
            setResult(Math.round(oneRM));
        }
    };

    return (
        <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
            <Card className="w-full max-w-md bg-neutral-900/50 border-neutral-800">
                <CardHeader className="text-right">
                    <CardTitle className="text-primary flex items-center justify-end gap-2 text-2xl">
                        حاسبة أقصى وزن (1RM) <Calculator className="w-6 h-6" />
                    </CardTitle>
                    <CardDescription>
                        احسب قوتك القصوى بناءً على أدائك الحالي.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-right">
                            <label className="text-sm font-medium text-neutral-400">الوزن (كجم)</label>
                            <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="text-center h-12 bg-black/50" />
                        </div>
                        <div className="space-y-2 text-right">
                            <label className="text-sm font-medium text-neutral-400">التكرارات</label>
                            <Input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="text-center h-12 bg-black/50" />
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-12 text-lg font-bold">
                        احسب
                    </Button>

                    {result !== null && (
                        <div className="text-center space-y-2 pt-4 border-t border-neutral-800">
                            <p className="text-neutral-400">وزنك الأقصى المتوقع</p>
                            <p className="text-5xl font-bold text-primary">{result} <span className="text-lg text-neutral-500">كجم</span></p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
