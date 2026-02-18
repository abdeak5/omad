"use client";

import { useState } from "react";
import { askGemini } from "@/actions/aiAdvisor";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Heart, Activity } from "lucide-react";

export default function ZonesPage() {
    const [age, setAge] = useState("");
    const [rhr, setRhr] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleAsk = async () => {
        if (!age) return;
        setLoading(true);
        const prompt = `
    حساب نطاقات نبضات القلب (Heart Rate Zones) - Karvonen Formula.
    - العمر: ${age}
    - نبض الراحة (RHR): ${rhr}
    
    احسب لي النطاقات التالية بدقة (الأرقام فقط مع الشرح):
    - Zone 2 (حرق الدهون / بناء القاعدة الهوائية - 60-70%)
    - Zone 4 (العتبة اللاهوائية - 80-90%)
    - Zone 5 (الجهد الأقصى - 90-100%)
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
                        نطاقات الكارديو <Heart className="w-6 h-6" />
                    </CardTitle>
                    <CardDescription>
                        تدرب بذكاء، ليس بقوة فقط. اعرف نطاقات نبضك.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">العمر</label>
                        <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="text-center h-12 bg-neutral-950 border-neutral-800" />
                    </div>
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">نبض القلب أثناء الراحة (اختياري)</label>
                        <Input placeholder="مثال: 60" value={rhr} onChange={(e) => setRhr(e.target.value)} className="text-center h-12 bg-neutral-950 border-neutral-800" />
                    </div>

                    <Button onClick={handleAsk} isLoading={loading} disabled={!age} className="w-full h-12 text-lg font-bold">
                        <Activity className="w-4 h-4 ml-2" /> حساب النطاقات
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
