import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatOpenAI({
  model: "gpt-5",
  temperature: 1,
  openAIApiKey: process.env.OPEN_API_KEY,
});

const chat = async (question) => {
  const aiMsg = await llm.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant who will engage in a conversation with we. Keep your reply short and concise.",
    },
    {
      role: "user",
      content: question,
    },
  ]);

  return aiMsg?.content;
};

export default chat;
