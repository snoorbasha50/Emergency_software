require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
   model: "gemini-3-flash-preview",
});

async function analyzeStartup(startup, topic) {
  console.log(`Analyzing startup: ${startup.name}`);

  // STEP 1 - Scrape website
  const scrapeResponse = await fetch(
    process.env.FIRECRAWL_SCRAPE_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FIRECRAWL_KEY}`,
      },
      body: JSON.stringify({
        url: startup.url,
        formats: ["markdown"],
        onlyMainContent: true,
      }),
    }
  );

  const scrapedData = await scrapeResponse.json();

  if (!scrapedData.success) {
    console.log("Scrape failed");
    return null;
  }

  const markdown = (
    scrapedData?.data?.markdown || ""
  ).slice(0, 6000);

  console.log(`Scraped ${markdown.length} characters`);

  // STEP 2 - Load Prompt
  const promptTemplate = fs.readFileSync(
    path.join(
      __dirname,
      "../prompts/investment-analysis.txt"
    ),
    "utf8"
  );

  // STEP 3 - Startup Context
  const startupContext = `
Company Name: ${startup.name}

Company Description:
${startup.description}

Source:
${startup.source}

Company URL:
${startup.url}

Analyze this company.

Website Data:

${markdown}
`;

  // STEP 4 - Final Prompt
  const finalPrompt = `
${promptTemplate.replace("{{TOPIC}}", topic)}

${startupContext}
`;

  console.log(
    finalPrompt.slice(-3000),
    "\n\nLAST 3000 CHARS OF PROMPT"
  );

  // STEP 5 - Gemini Analysis with Retry
  const result = await generateWithRetry(
    finalPrompt
  );

  const response = result.response.text();

  console.log("Gemini Response Received");

  const cleanJson = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log("RAW GEMINI RESPONSE:\n", cleanJson);

  if (!cleanJson) {
    throw new Error(
      "Empty response from Gemini"
    );
  }

  const analysis = JSON.parse(cleanJson);

  console.log(
    "Analysis Complete:",
    analysis.company
  );

  return analysis;
}



async function generateWithRetry(prompt) {
  const delays = [3000, 5000, 10000];

  for (let i = 0; i < delays.length; i++) {
    try {
      const result =
        await model.generateContent(prompt);

      return result;
    } catch (err) {
      if (
        err.status === 503 ||
        err.status === 429
      ) {
        console.log(
          `Gemini busy. Retrying in ${
            delays[i] / 1000
          }s...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, delays[i])
        );
      } else {
        throw err;
      }
    }
  }

  throw new Error(
    "Gemini unavailable after retries"
  );
}

module.exports = {
  analyzeStartup,
};