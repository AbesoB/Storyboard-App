const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

async function parseScript(scriptText) {
  const prompt = `Eres un asistente experto en guiones cinematográficos...`;
  const res = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
    temperature: 0.2,
    max_tokens: 2000
  });
  return JSON.parse(res.data.choices[0].message.content);
}

module.exports = { parseScript };