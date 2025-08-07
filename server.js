import express from "express";
import { Configuration, OpenAIApi } from "openai";
import { aboutMe } from "./aboutMeData.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function getChatResponse(userQuery, context) {
  const prompt = `You are Abhinav's personal assistant. Answer questions about him using only this info:\n${JSON.stringify(context)}\nUser: ${userQuery}\nAssistant:`;
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt,
    max_tokens: 150,
    temperature: 0.5,
  });
  return response.data.choices[0].text;
}

app.post("/api/chat", async (req, res) => {
  const userQuery = req.body.query;
  const response = await getChatResponse(userQuery, aboutMe);
  res.json({ response });
});

app.listen(3000, () => console.log("Server running on port 3000"));