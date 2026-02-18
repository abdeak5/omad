"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function askGemini(prompt: string) {
    if (!process.env.GEMINI_API_KEY) {
        return { error: "API Key failed" };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Enforce concise, professional Arabic response
        const systemInstruction = `
    أنت مدرب لياقة بدنية وخبير تغذية محترف. أجب على السؤال التالي بدقة واختصار.
    اجعل إجابتك منظمة (نقاط) ومحفزة. اللغة: العربية.
    `;

        const result = await model.generateContent(`${systemInstruction}\n\nالسؤال: ${prompt}`);
        const response = await result.response;
        const text = response.text();

        return { result: text };
    } catch (error: any) {
        console.error("AI Advisor Error:", error);
        return { error: `حدث خطأ: ${error.message}` };
    }
}
