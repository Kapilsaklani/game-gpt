// Gemini 2.0 API integration
export async function fetchGeminiResponse(chatHistory, userInput, apiKey) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: chatHistory.concat([
          { role: "user", parts: [{ text: userInput }] },
        ]),
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    }
  );
  if (!response.ok) throw new Error("Gemini API error");
  const data = await response.json();
  // Extract the model's reply from the response structure
  const modelReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response.";
  return modelReply;
}
