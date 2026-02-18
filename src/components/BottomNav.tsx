"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Activity, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkoutRotation } from "@/hooks/useWorkoutRotation";

export function BottomNav() {
    const pathname = usePathname();
    const { nextWorkout } = useWorkoutRotation();

    const links = [
        { href: "/", label: "الرئيسية", icon: Home },
        { href: `/workout/${nextWorkout}`, label: "تمرين", icon: Dumbbell },
        { href: "/cardio", label: "كارديو", icon: Activity },
        { href: "/more", label: "المزيد", icon: Wand2 },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-t border-neutral-800 flex items-center justify-around z-50 pb-safe">
            {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1",
                            isActive ? "text-primary" : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        <Icon className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{link.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
