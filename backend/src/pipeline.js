const { analyzeStartup } = require("./analyze");
const { writeMemo } = require("./memoWriter");
const { writeSummary } = require("./summaryWriter");
const { getStartups } = require("./sourcer");

async function runPipeline(topic) {

    console.log("====================================");
    console.log("Pipeline Started");
    console.log("Topic:", topic);
    console.log("====================================");

    console.log("Step 1: Discovering startups...");

    let startups = await getStartups(topic);

    console.log(`Found ${startups.length} startups`);

    // Limit to 3 startups for faster execution
    startups = startups.slice(0, 3);

    console.log(`Analyzing ${startups.length} startups`);

    const analysisResults = [];

    for (let i = 0; i < startups.length; i++) {

        const startup = startups[i];

        console.log("------------------------------------");
        console.log(`Startup ${i + 1}/${startups.length}`);
        console.log(startup.name);
        console.log("------------------------------------");

        try {

            console.log("Running AI Analysis...");

            const analysis = await analyzeStartup(
                startup,
                topic
            );

            if (!analysis) {
                console.log("Analysis returned null");
                continue;
            }

            console.log("Analysis Completed");

            console.log("Generating Memo...");

            const result = await writeMemo(
                analysis
            );

            console.log("Memo Generated");

            analysisResults.push(result);

        } catch (err) {

            console.error(
                `Error processing ${startup.name}`
            );

            console.error(err);

        }

    }

    console.log("Generating Summary...");

    await writeSummary(analysisResults);

    console.log("====================================");
    console.log("Pipeline Completed");
    console.log("Companies:", analysisResults.length);
    console.log("====================================");

    return analysisResults;

}

module.exports = {
    runPipeline,
};