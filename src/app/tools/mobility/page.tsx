"use client";

import { useState } from "react";
import { askGemini } from "@/actions/aiAdvisor";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Activity, Sparkles } from "lucide-react";

export default function MobilityPage() {
    const [pain, setPain] = useState("");
    const [focus, setFocus] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleAsk = async () => {
        if (!focus) return;
        setLoading(true);
        const prompt = `
    صمم روتين إحماء وإطالات (Mobility Routine) قبل التمرين.
    التركيز: ${focus}
    مناطق الألم/الشد (إن وجد): ${pain || "لا يوجد"}
    
    المطلوب: قائمة تمارين سهلة الفهم مع عدد التكرارات.
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
                        مدرب المرونة والإطالات <Activity className="w-6 h-6" />
                    </CardTitle>
                    <CardDescription>
                        تخلص من الآلام وحسن حركة المفاصل بروتين مخصص.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">عضلة التركيز للتمارين اليوم؟</label>
                        <Input
                            placeholder="مثال: أكتاف، أرجل، ظهر..."
                            value={focus}
                            onChange={(e) => setFocus(e.target.value)}
                            className="h-12 bg-neutral-950 border-neutral-800 text-right"
                        />
                    </div>
                    <div className="space-y-2 text-right">
                        <label className="text-neutral-400">هل تشعر بألم أو شد معين؟</label>
                        <Input
                            placeholder="مثال: أسفل الظهر، الركبة اليمنى..."
                            value={pain}
                            onChange={(e) => setPain(e.target.value)}
                            className="h-12 bg-neutral-950 border-neutral-800 text-right"
                        />
                    </div>

                    <Button onClick={handleAsk} isLoading={loading} disabled={!focus} className="w-full h-12 text-lg font-bold">
                        <Sparkles className="w-4 h-4 ml-2" /> توليد الروتين
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
