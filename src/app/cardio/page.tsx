"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Bike, Footprints, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CardioPage() {
    const [type, setType] = useState<"walk" | "bike">("walk");
    const [value, setValue] = useState(""); // Steps or Minutes
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setLoading(true);
        // TODO: Save to Firestore daily_log
        console.log("Saving cardio:", { type, value });
        setTimeout(() => {
            setLoading(false);
            router.push("/");
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center space-y-8 pb-24">
            <header className="w-full max-w-md text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-primary">وحدة الكارديو</h1>
                <p className="text-neutral-400 text-sm">تمارين منخفضة التأثير فقط. الجري ممنوع.</p>
            </header>

            <Card className="w-full max-w-md bg-neutral-900/50 border-neutral-800">
                <CardContent className="pt-6 space-y-6">
                    {/* Toggle */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setType("walk")}
                            className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-xl border transition-all",
                                type === "walk"
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-900"
                            )}
                        >
                            <Footprints className="w-8 h-8 mb-2" />
                            <span className="font-bold">مشي</span>
                        </button>
                        <button
                            onClick={() => setType("bike")}
                            className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-xl border transition-all",
                                type === "bike"
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-900"
                            )}
                        >
                            <Bike className="w-8 h-8 mb-2" />
                            <span className="font-bold">دراجة</span>
                        </button>
                    </div>

                    {/* Input */}
                    <div className="space-y-2 text-center">
                        <label className="text-sm font-medium text-neutral-400 block">
                            {type === "walk" ? "عدد الخطوات" : "المدة (دقيقة)"}
                        </label>
                        <div className="flex items-center justify-center">
                            <Input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={type === "walk" ? "مثال: 10000" : "مثال: 30"}
                                className="text-center text-3xl h-16 bg-transparent border-0 border-b-2 border-neutral-800 focus-visible:ring-0 focus-visible:border-primary rounded-none w-1/2"
                                autoFocus
                            />
                        </div>
                        {type === "walk" && parseInt(value) < 10000 && value !== "" && (
                            <p className="text-center text-xs text-yellow-500">الهدف اليومي: 15,000 خطوة</p>
                        )}
                    </div>

                    {/* Running Warning */}
                    <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-3 flex items-start gap-3 text-right">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 ml-2" />
                        <p className="text-xs text-red-400 leading-relaxed">
                            <strong>تحذير:</strong> الكارديو عالي التأثير (الجري/HIIT) معطل لحماية الاستشفاء العضلي وتوفير الطاقة لرفع الأوزان.
                        </p>
                    </div>

                    <Button
                        className="w-full text-lg font-bold h-12"
                        onClick={handleSave}
                        isLoading={loading}
                        disabled={!value}
                    >
                        تسجيل الجلسة
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
