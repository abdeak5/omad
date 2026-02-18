"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateWorkoutPlan } from "@/actions/generatePlan";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input"; // You might need to adjust this import based on your component structure
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Activity, Dumbbell, Target, Ruler, Weight, User, ChevronRight, Loader2 } from "lucide-react";

export default function SetupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        age: "",
        weight: "",
        height: "",
        goal: "recomp", // cut, bulk, recomp
        level: "intermediate",
        days: "5",
        location: "gym",
        injuries: "",
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { plan, error } = await generateWorkoutPlan(formData);
            if (error) {
                alert(error);
                return;
            }
            localStorage.setItem("userPlan", JSON.stringify(plan));
            localStorage.setItem("userStats", JSON.stringify(formData));
            router.push("/"); // Go to dashboard
        } catch (e) {
            console.error(e);
            alert("حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[128px]" />

            <Card className="w-full max-w-lg bg-neutral-900/60 backdrop-blur-xl border-neutral-800 shadow-2xl z-10">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary mb-2">بناء البرنامج الذكي</CardTitle>
                    <CardDescription className="text-neutral-400 text-lg">
                        خطوة {step} من 3
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" /> البيانات الشخصية
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-neutral-400">العمر</label>
                                    <Input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="h-12 bg-black/50 border-neutral-700 text-right" placeholder="سنة" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-neutral-400">الوزن الحالي</label>
                                    <Input type="number" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className="h-12 bg-black/50 border-neutral-700 text-right" placeholder="كجم" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-neutral-400">الطول</label>
                                    <Input type="number" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} className="h-12 bg-black/50 border-neutral-700 text-right" placeholder="سم" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary" /> الأهداف
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => setFormData({ ...formData, goal: "cut" })}
                                    className={`w-full p-4 rounded-xl border text-right transition-all ${formData.goal === "cut" ? "bg-primary/20 border-primary text-primary" : "bg-black/50 border-neutral-700 hover:bg-neutral-800"}`}
                                >
                                    <span className="font-bold block">تنشيف (Cut)</span>
                                    <span className="text-xs text-neutral-400">خسارة دهون مع الحفاظ على العضلات.</span>
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, goal: "bulk" })}
                                    className={`w-full p-4 rounded-xl border text-right transition-all ${formData.goal === "bulk" ? "bg-primary/20 border-primary text-primary" : "bg-black/50 border-neutral-700 hover:bg-neutral-800"}`}
                                >
                                    <span className="font-bold block">تضخيم (Bulk)</span>
                                    <span className="text-xs text-neutral-400">زيادة الكتلة العضلية والوزن.</span>
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, goal: "recomp" })}
                                    className={`w-full p-4 rounded-xl border text-right transition-all ${formData.goal === "recomp" ? "bg-primary/20 border-primary text-primary" : "bg-black/50 border-neutral-700 hover:bg-neutral-800"}`}
                                >
                                    <span className="font-bold block">إعادة تشكيل (Recomp)</span>
                                    <span className="text-xs text-neutral-400">خسارة الدهون وبناء العضلات معاً.</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Dumbbell className="w-5 h-5 text-primary" /> تفاصيل التدريب
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-neutral-400">مستوى الخبرة</label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        className="w-full h-12 bg-black/50 border border-neutral-700 rounded-md px-3 text-right text-white focus:outline-none focus:border-primary"
                                    >
                                        <option value="beginner">مبتدئ (أقل من سنة)</option>
                                        <option value="intermediate">متوسط (1-3 سنوات)</option>
                                        <option value="advanced">متقدم (+3 سنوات)</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-neutral-400">أيام التمرين في الأسبوع</label>
                                    <select
                                        value={formData.days}
                                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                        className="w-full h-12 bg-black/50 border border-neutral-700 rounded-md px-3 text-right text-white focus:outline-none focus:border-primary"
                                    >
                                        <option value="3">3 أيام</option>
                                        <option value="4">4 أيام</option>
                                        <option value="5">5 أيام (موصى به)</option>
                                        <option value="6">6 أيام</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-neutral-400">إصابات (إن وجد)</label>
                                    <Input type="text" value={formData.injuries} onChange={(e) => setFormData({ ...formData, injuries: e.target.value })} className="h-12 bg-black/50 border-neutral-700 text-right" placeholder="مثال: ألم أسفل الظهر..." />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        {step > 1 && (
                            <Button variant="outline" onClick={handleBack} className="flex-1 h-12 bg-transparent border-neutral-700 hover:bg-neutral-800">
                                رجوع
                            </Button>
                        )}

                        {step < 3 ? (
                            <Button onClick={handleNext} className="flex-1 h-12 text-lg font-bold bg-white text-black hover:bg-neutral-200">
                                التالي <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} isLoading={loading} className="flex-1 h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-black">
                                {loading ? "جاري التحليل..." : "إنشاء البرنامج"} <Activity className="w-5 h-5 mr-2" />
                            </Button>
                        )}

                    </div>

                </CardContent>
            </Card>
        </main>
    );
}
