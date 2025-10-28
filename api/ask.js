import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const question = req.query.q || "Hello!";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are NightAI, a concise chatbot." },
        { role: "user", content: question },
      ],
      max_tokens: 80,
    });

    res.status(200).send(completion.choices[0].message.content.trim());
  } catch (err) {
    console.error(err);
    res.status(500).send("NightAI is currently unavailable.");
  }
}
