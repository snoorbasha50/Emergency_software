const { analyzeStartup } = require("./analyze");
const { writeMemo } = require("./memoWriter");
const { writeSummary } = require("./summaryWriter");
const { getStartups } = require("./sourcer");

async function runPipeline(topic) {

    const startups = await getStartups(topic);

    const analysisResults = [];

    for (const startup of startups) {

        const analysis = await analyzeStartup(startup, topic);

        if (!analysis) continue;

        const result = await writeMemo(analysis);

        analysisResults.push(result);

    }

    await writeSummary(analysisResults);

    return analysisResults;

}

module.exports = {
  runPipeline,
};