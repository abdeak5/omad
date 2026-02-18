"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function scanFood(imageBase64: string) {
    if (!process.env.GEMINI_API_KEY) {
        return { error: "API Key failed" };
    }

    try {
        // Use gemini-1.5-flash for speed and vision capabilities
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
    You are an expert nutritionist. Analyze this food image.
    Identify the food items, estimate the portion size, and calculate:
    1. Total Calories
    2. Protein (g)
    3. Carbs (g)
    4. Fats (g)
    5. Health Score (1-10)

    Return ONLY valid JSON in this format:
    {
      "food_name": "Grilled Chicken with Rice",
      "calories": 550,
      "macros": { "p": 40, "c": 60, "f": 15 },
      "health_score": 9,
      "analysis": "Excellent source of lean protein. Rice provides clean carbs..."
    }
    `;

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: "image/jpeg",
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, "").trim();

        return { result: JSON.parse(text) };
    } catch (error: any) {
        console.error("Food Scan Error:", error);
        return { error: "فشل في تحليل الطعام. حاول صورة أوضح." };
    }
}
