// Groq API - Fast and free AI inference
const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
const model = "llama-3.3-70b-versatile"; // Current recommended model (updated)

export async function callGemini(payload) {
  if (!apiKey || apiKey.includes("YOUR_API_KEY")) {
    throw new Error("API key not configured. Please add VITE_GROQ_API_KEY to your .env file.");
  }

  try {
    // Convert Gemini-style payload to Groq/OpenAI format
    const userMessage = payload.contents?.[0]?.parts?.[0]?.text || "";

    const groqPayload = {
      model: model,
      messages: [
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 2048
    };

    // Handle JSON response requests
    if (payload.generationConfig?.responseMimeType === "application/json") {
      groqPayload.response_format = { type: "json_object" };
      groqPayload.messages[0].content += "\n\nPlease respond with valid JSON only.";
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(groqPayload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("No content received from API.");
    }

    // Parse JSON if requested
    if (payload.generationConfig?.responseMimeType === "application/json") {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.warn("Failed to parse JSON response:", e);
        return text.trim();
      }
    }

    return text.trim();
  } catch (error) {
    console.error("Groq API call failed:", error);
    throw error;
  }
}