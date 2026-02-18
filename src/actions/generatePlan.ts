"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateWorkoutPlan(userData: any) {
    if (!process.env.GEMINI_API_KEY) {
        return { error: "مفتاح API غير مكون" };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
    تخيل أنك مدرب كمال أجسام عالمي وخبير تغذية. قم بإنشاء خطة تدريب وتغذية مفصلة لمدة 4 أسابيع بناءً على بيانات المستخدم التالية:
    - الوزن: ${userData.weight} كجم
    - الطول: ${userData.height} سم
    - العمر: ${userData.age} سنة
    - الهدف: ${userData.goal} (تضخيم/تنشيف/إعادة تشكيل)
    - المستوى: ${userData.level}
    - عدد أيام التمرين: ${userData.days} أيام/أسبوع
    - المكان: ${userData.location} (جيم/منزل)
    - إصابات: ${userData.injuries || "لا يوجد"}

    المطلوب: إجابة بصيغة JSON فقط وبدون أي نصوص إضافية، تتبع هذا الهيكل بدقة:
    {
      "nutrition": {
        "calories": 2500,
        "macros": { "protein": 200, "carbs": 250, "fats": 70 },
        "advice": "نصائح تغذية...",
        "water_target": 3500
      },
      "schedule": [
        {
          "day_number": 1,
          "day_name": "يوم الدفع (Push)",
          "exercises": [
            { "name": "Bench Press", "sets": 4, "reps": "8-10", "rpe": 8, "note": "ركز على..." }
          ]
        }
        // ... لبقية الأيام
      ]
    }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, "").trim();

        return { plan: JSON.parse(text) };
    } catch (error: any) {
        console.error("Gemini Error:", error);
        return { error: "فشل في توليد الخطة. حاول مرة أخرى." };
    }
}
