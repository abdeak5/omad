"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzePhysique(image1Base64: string, image2Base64: string) {
    if (!process.env.GEMINI_API_KEY) {
        return { error: "API Key not configured" };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const prompt = `You are an expert bodybuilding coach and physiologist. Analyze these two photos (Before/Current) of a user following an OMAD + Heavy Lifting protocol.
    Focus on:
    1. Muscle definition changes (specifically shoulders, chest, abs).
    2. Body fat reduction markers (waist taper, vascularity).
    3. Posture improvements.
    
    Provide a technical, motivating, but objective report. structured as:
    - **Visual Gains**: [Details]
    - **Fat Loss Markers**: [Details]
    - **Coach's Verdict**: [Summary]
    `;

        const imageParts = [
            {
                inlineData: {
                    data: image1Base64,
                    mimeType: "image/jpeg",
                },
            },
            {
                inlineData: {
                    data: image2Base64,
                    mimeType: "image/jpeg",
                },
            },
        ];

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();

        return { report: text };
    } catch (error: any) {
        console.error("Gemini Error:", error);
        return { error: error.message || "Analysis failed" };
    }
}
