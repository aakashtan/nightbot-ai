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
        { role: "system", content: "You are NightAI, a friendly and concise chatbot." },
        { role: "user", content: question },
      ],
      max_tokens: 80,
    });

    const answer = completion.choices[0].message.content.trim();
    res.status(200).send(answer);
  } catch (err) {
    console.error(err);
    res.status(500).send("NightAI is taking a nap 😴");
  }
}
