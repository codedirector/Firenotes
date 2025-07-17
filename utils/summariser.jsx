import { GoogleGenerativeAI } from "@google/generative-ai";

async function summariser(text) {
  const apiKey = import.meta.env.VITE_gemini_key;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
   const prompt = `Summarize and explain the following ${text} in simple words. Focus on the main ideas. Use 2–3 short, clear paragraphs with no extra detail or fluff
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    return summary;
  } catch (error) {
    console.error("❌ Gemini API Error:", error);

    const status = error.status || error.response?.status;
    if (status === 429) {
      alert("You're being rate-limited. Try again later.");
    } else if (status === 403) {
      alert("Invalid API key or insufficient permissions.");
    } else {
      alert("Unexpected Gemini API error.");
    }

    throw error;
  }
}

export default summariser;
