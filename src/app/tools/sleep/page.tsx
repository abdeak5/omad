"use client";

import { useState } from "react";
import { askGemini } from "@/actions/aiAdvisor";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Moon, Star } from "lucide-react";

export default function SleepPage() {
    const [hours, setHours] = useState("");
    const [quality, setQuality] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleAsk = async () => {
        if (!hours) return;
        setLoading(true);
        const prompt = `
    تحليل النوم:
    - عدد الساعات: ${hours}
    - جودة النوم (وصف المستخدم): ${quality || "عادي"}
    
    قيّم هذا النوم من 10، واعط نصائح محددة لتحسين الجودة الليلة القادمة (مثل توقيت الكافيين، الظلام، المكملات).
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
                        محلل النوم <Moon className="w-6 h-6" />
                    </CardTitle>
                    <CardDescription>
                        النوم هو أساس الاستشفاء. دعنا نحلل جودته.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">كم ساعة نمت؟</label>
                        <Input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="text-center h-12 bg-neutral-950 border-neutral-800" />
                    </div>
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">كيف تصف جودة نومك؟</label>
                        <Input placeholder="مثال: متقطع، عميق، استيقاظ بصعوبة..." value={quality} onChange={(e) => setQuality(e.target.value)} className="text-right h-12 bg-neutral-950 border-neutral-800" />
                    </div>

                    <Button onClick={handleAsk} isLoading={loading} disabled={!hours} className="w-full h-12 text-lg font-bold">
                        <Star className="w-4 h-4 ml-2" /> تحليل جودة النوم
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
