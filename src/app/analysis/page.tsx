"use client";

import { useState } from "react";
import { analyzePhysique } from "@/actions/analyze";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Upload, Wand2 } from "lucide-react";

export default function AnalysisPage() {
    const [img1, setImg1] = useState<string | null>(null);
    const [img2, setImg2] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImg: (s: string) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(",")[1];
                setImg(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!img1 || !img2) return;
        setLoading(true);
        setReport(null);

        try {
            const result = await analyzePhysique(img1, img2);
            if (result.error) {
                alert(result.error);
            } else {
                setReport(result.report || "لم يتم استلام تقرير.");
            }
        } catch (e) {
            console.error(e);
            alert("فشل التحليل");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white p-6 pb-24">
            <Card className="bg-neutral-900/50 border-neutral-800 mb-6">
                <CardHeader className="text-right">
                    <CardTitle className="text-primary flex items-center justify-end gap-2 text-2xl">
                        محلل التطور بالذكاء الاصطناعي <Wand2 className="w-6 h-6" />
                    </CardTitle>
                    <CardDescription>
                        ارفع صور "قبل" و "بعد" للحصول على تحليل دقيق للعضلات ونسبة الدهون.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-right">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">قبل (البداية)</label>
                            <div className="relative aspect-[3/4] bg-neutral-950 rounded-lg border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center overflow-hidden">
                                {img1 ? (
                                    <img src={`data:image/jpeg;base64,${img1}`} alt="Before" className="object-cover w-full h-full opacity-50" />
                                ) : (
                                    <Upload className="w-8 h-8 text-neutral-600 mb-2" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => handleFileChange(e, setImg1)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">الآن (الحالي)</label>
                            <div className="relative aspect-[3/4] bg-neutral-950 rounded-lg border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center overflow-hidden">
                                {img2 ? (
                                    <img src={`data:image/jpeg;base64,${img2}`} alt="Current" className="object-cover w-full h-full opacity-50" />
                                ) : (
                                    <Upload className="w-8 h-8 text-neutral-600 mb-2" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => handleFileChange(e, setImg2)}
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full h-12 text-lg font-bold"
                        disabled={!img1 || !img2 || loading}
                        onClick={handleAnalyze}
                        isLoading={loading}
                    >
                        بدء التحليل
                    </Button>
                </CardContent>
            </Card>

            {report && (
                <Card className="bg-neutral-900/50 border-neutral-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CardHeader>
                        <CardTitle className="text-xl text-right">تقرير التحليل</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-invert prose-sm max-w-none text-right" dir="rtl">
                        <div className="whitespace-pre-wrap">{report}</div>
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
