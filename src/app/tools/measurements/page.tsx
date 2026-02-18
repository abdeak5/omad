"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Ruler, Save } from "lucide-react";

export default function MeasurementsPage() {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        weight: "",
        neck: "",
        shoulders: "",
        chest: "",
        waist: "",
        hips: "",
        thighs: "",
        calves: "",
        biceps: ""
    });

    useEffect(() => {
        const saved = localStorage.getItem("bodyStats");
        if (saved) setStats(JSON.parse(saved));
    }, []);

    const handleSave = () => {
        setLoading(true);
        localStorage.setItem("bodyStats", JSON.stringify(stats));
        // TODO: Save to history in Firestore
        setTimeout(() => setLoading(false), 800);
    };

    const handleChange = (key: string, val: string) => {
        setStats({ ...stats, [key]: val });
    };

    return (
        <main className="min-h-screen bg-black text-white p-6 pb-24">
            <header className="text-center mb-6">
                <h1 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
                    <Ruler className="w-6 h-6" /> قياسات الجسم
                </h1>
            </header>

            <Card className="bg-neutral-900/50 border-neutral-800">
                <CardContent className="p-4 space-y-4">
                    {Object.keys(stats).map((key) => (
                        <div key={key} className="flex items-center justify-between border-b border-neutral-800 pb-2">
                            <Input
                                type="number"
                                value={(stats as any)[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                                placeholder="-"
                                className="w-24 text-center h-10 bg-transparent border-none focus-visible:ring-0 text-lg"
                            />
                            <label className="text-neutral-400 capitalize w-1/2 text-right">
                                {key === "weight" ? "الوزن" :
                                    key === "neck" ? "الرقبة" :
                                        key === "shoulders" ? "الأكتاف" :
                                            key === "chest" ? "الصدر" :
                                                key === "waist" ? "الخصر" :
                                                    key === "hips" ? "الأرداف" :
                                                        key === "thighs" ? "الفخذين" :
                                                            key === "calves" ? "السمانة" :
                                                                key === "biceps" ? "الذراع" : key}
                            </label>
                        </div>
                    ))}

                    <Button onClick={handleSave} isLoading={loading} className="w-full h-12 text-lg font-bold mt-4">
                        <Save className="w-5 h-5 ml-2" /> حفظ القياسات
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
