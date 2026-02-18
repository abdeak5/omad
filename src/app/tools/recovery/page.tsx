"use client";

import { useState } from "react";
import { askGemini } from "@/actions/aiAdvisor";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input"; // Assuming Slider might not be available, using Input/Select for simplicity or standard UI
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Battery, Zap } from "lucide-react";

export default function RecoveryPage() {
    const [soreness, setSoreness] = useState("5");
    const [energy, setEnergy] = useState("5");
    const [stress, setStress] = useState("5");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleAsk = async () => {
        setLoading(true);
        const prompt = `
    حساب درجة الاستشفاء (Recovery Score) من 100%.
    - ألم العضلات (1-10): ${soreness}
    - طاقة اليوم (1-10): ${energy}
    - الإجهاد النفسي (1-10): ${stress}
    
    1. احسب النسبة المئوية للجاهزية.
    2. هل يجب أن يتمرن اليوم بجدية أم يخفف الأحمال (Deload)؟
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
                        مقياس الاستشفاء <Battery className="w-6 h-6" />
                    </CardTitle>
                    <CardDescription>
                        هل أنت جاهز لتكسير الأوزان اليوم؟
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">ألم العضلات (1 = لا يوجد، 10 = شديد)</label>
                        <input type="range" min="1" max="10" value={soreness} onChange={(e) => setSoreness(e.target.value)} className="w-full accent-primary" />
                        <div className="text-center font-bold text-xl">{soreness}</div>
                    </div>

                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">مستوى الطاقة (1 = منهار، 10 = نشيط جداً)</label>
                        <input type="range" min="1" max="10" value={energy} onChange={(e) => setEnergy(e.target.value)} className="w-full accent-primary" />
                        <div className="text-center font-bold text-xl">{energy}</div>
                    </div>

                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">الإجهاد والتوتر (1 = مسترخي، 10 = مضغوط)</label>
                        <input type="range" min="1" max="10" value={stress} onChange={(e) => setStress(e.target.value)} className="w-full accent-primary" />
                        <div className="text-center font-bold text-xl">{stress}</div>
                    </div>

                    <Button onClick={handleAsk} isLoading={loading} className="w-full h-12 text-lg font-bold">
                        <Zap className="w-4 h-4 ml-2" /> فحص الجاهزية
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
