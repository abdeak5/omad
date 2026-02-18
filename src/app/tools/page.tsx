"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import {
    Camera, Pill, Activity, ShoppingCart, ChefHat,
    Droplets, Moon, Battery, Coffee, Calculator,
    Scale, Heart, Brain, ChevronLeft
} from "lucide-react";

export default function ToolsDashboard() {
    const tools = [
        {
            category: "AI Core", items: [
                { href: "/tools/nutrition-scanner", label: "ماسح التغذية (Food Lens)", icon: Camera, desc: "تحليل صور الطعام" },
                { href: "/tools/supplements", label: "مستشار المكملات", icon: Pill, desc: "تصميم كورس مكملات" },
                { href: "/tools/mobility", label: "مدرب المرونة", icon: Activity, desc: "روتين إطالات مخصص" },
                // { href: "/tools/grocery", label: "مساعد التسوق", icon: ShoppingCart, desc: "قائمة تسوق ذكية" },
                // { href: "/tools/chef", label: "الشيف الذكي", icon: ChefHat, desc: "اقتراح وصفات" },
            ]
        },
        {
            category: "الحاسبات والقياسات", items: [
                { href: "/tools/crm", label: "حاسبة 1RM", icon: Calculator, desc: "أقصى وزن" },
                { href: "/tools/measurements", label: "قياسات الجسم", icon: Scale, desc: "تتبع التقدم" },
                { href: "/tools/water", label: "حاسبة الماء", icon: Droplets, desc: "الاحتياج اليومي" },
                { href: "/tools/sleep", label: "محلل النوم", icon: Moon, desc: "تحسين جودة النوم" },
                { href: "/tools/recovery", label: "مقياس الاستشفاء", icon: Battery, desc: "جاهزية التمرين" },
                { href: "/tools/caffeine", label: "ضابط الكافيين", icon: Coffee, desc: "التوقيت المثالي" },
                { href: "/tools/zones", label: "نطاقات الكارديو", icon: Heart, desc: "Zone 2, Zone 5" },
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-black text-white p-6 pb-24 space-y-8">
            <header className="text-right">
                <h1 className="text-3xl font-bold text-primary flex items-center justify-end gap-2">
                    ترسانة الأدوات <Brain className="w-8 h-8" />
                </h1>
                <p className="text-neutral-400">مجموعة أدوات شاملة مدعومة بالذكاء الاصطناعي</p>
            </header>

            {tools.map((section) => (
                <div key={section.category} className="space-y-4">
                    <h2 className="text-xl font-bold text-white text-right border-b border-neutral-800 pb-2">
                        {section.category}
                    </h2>
                    <div className="grid gap-4">
                        {section.items.map((tool) => (
                            <Link key={tool.href} href={tool.href}>
                                <Card className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900 transition-colors group">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <ChevronLeft className="w-5 h-5 text-neutral-600 group-hover:text-primary transition-colors" />
                                        <div className="flex items-center gap-4 text-right">
                                            <div>
                                                <h3 className="font-bold text-white group-hover:text-primary transition-colors">{tool.label}</h3>
                                                <p className="text-xs text-neutral-400">{tool.desc}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                                                <tool.icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}
