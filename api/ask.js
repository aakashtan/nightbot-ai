import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const question = req.query.q || "Hello!";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // or "gpt-4o" if you have access
      messages: [
        { role: "system", content: "You are NightAI, a helpful chatbot." },
        { role: "user", content: question },
      ],
      max_tokens: 80,
    });

    const answer = completion.choices[0].message.content.trim();

    res.status(200).json({ answer });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "AI service unavailable" });
  }
}
