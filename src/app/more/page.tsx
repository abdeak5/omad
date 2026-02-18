"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Wand2, Calculator, Ruler, Settings, ChevronLeft, User } from "lucide-react";

export default function MorePage() {
    const menuItems = [
        { href: "/tools", label: "أدوات 50+", icon: Calculator, desc: "الترسانة الشاملة" },
        { href: "/analysis", label: "محلل الذكاء الاصطناعي", icon: Wand2, desc: "تحليل صور الجسم" },
        { href: "/tools/measurements", label: "قياسات الجسم", icon: Ruler, desc: "تتبع محيط الخصر والعضلات" },
        { href: "/setup", label: "إعادة ضبط البرنامج", icon: Settings, desc: "تحديث الأهداف والبيانات" },
    ];

    return (
        <main className="min-h-screen bg-black text-white p-6 pb-24 space-y-6">
            <header className="text-right">
                <h1 className="text-3xl font-bold text-primary">المزيد</h1>
                <p className="text-neutral-400">أدوات إضافية وإعدادات</p>
            </header>

            <div className="grid gap-4">
                {menuItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Card className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900 transition-colors">
                            <CardContent className="p-4 flex items-center justify-between">
                                <ChevronLeft className="w-5 h-5 text-neutral-600" />
                                <div className="flex items-center gap-4 text-right">
                                    <div>
                                        <h3 className="font-bold text-white">{item.label}</h3>
                                        <p className="text-xs text-neutral-400">{item.desc}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-primary">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    );
}
