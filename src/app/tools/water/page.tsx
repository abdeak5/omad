"use client";

import { useState } from "react";
import { askGemini } from "@/actions/aiAdvisor";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Droplets, CloudSun } from "lucide-react";

export default function WaterPage() {
    const [weight, setWeight] = useState("");
    const [activity, setActivity] = useState("");
    const [weather, setWeather] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleAsk = async () => {
        if (!weight) return;
        setLoading(true);
        const prompt = `
    احسب احتياج الماء اليومي بدقة (باللتر).
    الوزن: ${weight} كجم
    مستوى النشاط: ${activity || "متوسط"}
    الطقس: ${weather || "معتدل"}
    
    معادلة مقترحة: (الوزن * 35) + (500مل لكل ساعة نشاط) + (زيادة للحرارة).
    اعطني الرقم النهائي فقط مع نصيحة قصيرة.
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
                        حاسبة الماء الذكية <Droplets className="w-6 h-6" />
                    </CardTitle>
                    <CardDescription>
                        حساب دقيق لاحتياجك من الماء بناءً على عوامل متعددة.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">الوزن (كجم)</label>
                        <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="text-center h-12 bg-neutral-950 border-neutral-800" />
                    </div>
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">ساعات النشاط اليومي</label>
                        <Input placeholder="مثال: ساعة تمرين + عمل حركي" value={activity} onChange={(e) => setActivity(e.target.value)} className="text-right h-12 bg-neutral-950 border-neutral-800" />
                    </div>
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">حالة الطقس</label>
                        <Input placeholder="مثال: حار جداً، معتدل..." value={weather} onChange={(e) => setWeather(e.target.value)} className="text-right h-12 bg-neutral-950 border-neutral-800" />
                    </div>

                    <Button onClick={handleAsk} isLoading={loading} disabled={!weight} className="w-full h-12 text-lg font-bold">
                        <CloudSun className="w-4 h-4 ml-2" /> احسب الاحتياج
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="bg-neutral-900/50 border-neutral-800 animate-in fade-in slide-in-from-bottom-4">
                    <CardContent className="p-6 text-center">
                        <div className="whitespace-pre-wrap text-lg leading-relaxed">{result}</div>
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
