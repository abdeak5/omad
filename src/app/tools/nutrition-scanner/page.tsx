"use client";

import { useState } from "react";
import { scanFood } from "@/actions/scanFood";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Camera, Flame, Loader2, Utensils } from "lucide-react";
import { CircularProgress } from "@/components/ui/CircularProgress";

export default function NutritionScannerPage() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = (reader.result as string).split(",")[1];
                setImage(base64);
                setData(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const { result, error } = await scanFood(image);
            if (error) alert(error);
            else setData(result);
        } catch {
            alert("Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white p-6 pb-24 space-y-6">
            <header className="text-right">
                <h1 className="text-3xl font-bold text-primary flex items-center justify-end gap-2">
                    ماسح التغذية الذكي <Camera className="w-8 h-8" />
                </h1>
                <p className="text-neutral-400">صور وجبتك، وسنقوم بحساب كل شيء.</p>
            </header>

            {/* Camera/Upload Area */}
            <Card className="bg-neutral-900/50 border-neutral-800 border-2 border-dashed relative overflow-hidden group">
                <CardContent className="p-0 aspect-square flex flex-col items-center justify-center relative">
                    {image ? (
                        <img src={`data:image/jpeg;base64,${image}`} className="w-full h-full object-cover opacity-50" />
                    ) : (
                        <div className="flex flex-col items-center text-neutral-500">
                            <Utensils className="w-12 h-12 mb-2" />
                            <p>اضغط للالتقاط أو الرفع</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={handleCapture}
                    />
                </CardContent>
            </Card>

            {/* Analyze Button */}
            <Button
                onClick={handleAnalyze}
                disabled={!image || loading}
                className="w-full h-14 text-lg font-bold"
                isLoading={loading}
            >
                {loading ? "جاري تحليل المكونات..." : "تحليل الوجبة"}
            </Button>

            {/* Results */}
            {data && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <Card className="bg-neutral-900/80 border-primary/30">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center text-primary">{data.food_name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Calories */}
                            <div className="flex flex-col items-center">
                                <Flame className="w-8 h-8 text-orange-500 mb-1 animate-pulse" />
                                <span className="text-5xl font-bold text-white">{data.calories}</span>
                                <span className="text-sm text-neutral-400">سعرة حرارية</span>
                            </div>

                            {/* Macros */}
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="p-3 rounded-lg bg-neutral-950/50">
                                    <div className="text-xs text-neutral-400">بروتين</div>
                                    <div className="text-xl font-bold text-blue-400">{data.macros.p}g</div>
                                </div>
                                <div className="p-3 rounded-lg bg-neutral-950/50">
                                    <div className="text-xs text-neutral-400">كارب</div>
                                    <div className="text-xl font-bold text-yellow-400">{data.macros.c}g</div>
                                </div>
                                <div className="p-3 rounded-lg bg-neutral-950/50">
                                    <div className="text-xs text-neutral-400">دهون</div>
                                    <div className="text-xl font-bold text-red-400">{data.macros.f}g</div>
                                </div>
                            </div>

                            {/* AI Analysis */}
                            <div className="text-right text-sm text-neutral-300 leading-relaxed border-t border-neutral-800 pt-4">
                                {data.analysis}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </main>
    );
}
