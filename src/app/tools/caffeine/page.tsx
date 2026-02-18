"use client";

import { useState } from "react";
import { askGemini } from "@/actions/aiAdvisor";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Coffee, Clock } from "lucide-react";

export default function CaffeinePage() {
    const [wakeUp, setWakeUp] = useState("");
    const [sleepTime, setSleepTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleAsk = async () => {
        if (!wakeUp) return;
        setLoading(true);
        const prompt = `
    أنا أستيقظ الساعة ${wakeUp} وأنام الساعة ${sleepTime}.
    
    صمم لي جدولاً لتناول الكافيين (القهوة/الشاي) بحيث:
    1. أحصل على أقصى نشاط في الصباح.
    2. لا يؤثر على جودة نومي ليلاً.
    3. حدد "وقت التوقف" النهائي.
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
                        ضابط الكافيين <Coffee className="w-6 h-6" />
                    </CardTitle>
                    <CardDescription>
                        استمتع بقهوتك دون تدمير نومك.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">ساعة الاستيقاظ</label>
                        <Input type="time" value={wakeUp} onChange={(e) => setWakeUp(e.target.value)} className="text-center h-12 bg-neutral-950 border-neutral-800" />
                    </div>
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">ساعة النوم المطلوبة</label>
                        <Input type="time" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} className="text-center h-12 bg-neutral-950 border-neutral-800" />
                    </div>

                    <Button onClick={handleAsk} isLoading={loading} disabled={!wakeUp} className="w-full h-12 text-lg font-bold">
                        <Clock className="w-4 h-4 ml-2" /> ضبط الجدول
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
