"use client";

import { useState } from "react";
import { askGemini } from "@/actions/aiAdvisor";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Pill, Sparkles } from "lucide-react";

export default function SupplementsPage() {
    const [goal, setGoal] = useState("");
    const [budget, setBudget] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleAsk = async () => {
        if (!goal) return;
        setLoading(true);
        const prompt = `
    اقترح كورس مكملات غذائية لشخص هدفه: ${goal}
    الميزانية التقريبية: ${budget || "متوسطة"}
    
    قم بتقسيم الإجابة إلى:
    1. مكملات أساسية (الضرورية)
    2. مكملات ثانوية (لتحسين الأداء)
    3. الجرعات وأوقات الاستخدام
    `;
        const { result } = await askGemini(prompt);
        setResult(result || "فشل الاتصال");
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-black text-white p-6 pb-24 space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-800">
                <CardHeader className="text-right">
                    <CardTitle className="text-primary flex items-center justify-end gap-2 text-2xl">
                        مستشار المكملات <Pill className="w-6 h-6" />
                    </CardTitle>
                    <CardDescription>
                        دع الذكاء الاصطناعي يصمم لك كورس مكملات مخصص لأهدافك وميزانيتك.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">ما هو هدفك الحالي؟</label>
                        <Input
                            placeholder="مثال: زيادة العضلات الصافية، حرق الدهون المستعصية..."
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="h-12 bg-neutral-950 border-neutral-800 text-right"
                        />
                    </div>
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">الميزانية (اختياري)</label>
                        <Input
                            placeholder="مثال: منخفضة، مفتوحة..."
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="h-12 bg-neutral-950 border-neutral-800 text-right"
                        />
                    </div>

                    <Button onClick={handleAsk} isLoading={loading} disabled={!goal} className="w-full h-12 text-lg font-bold">
                        <Sparkles className="w-4 h-4 ml-2" /> تصميم الكورس
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="bg-neutral-900/50 border-neutral-800 animate-in fade-in slide-in-from-bottom-4">
                    <CardContent className="p-6 prose prose-invert prose-sm max-w-none text-right" dir="rtl">
                        <div className="whitespace-pre-wrap">{result}</div>
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
