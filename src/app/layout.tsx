import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Iron Monk",
    description: "OMAD + Heavy Lifting Protocol Manager",
    manifest: "/manifest.json",
};

import { Providers } from "./providers";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
