
require("dotenv").config();

const { runPipeline } = require("./pipeline");

async function main() {
  const topic = process.argv[2];

  if (!topic) {
    console.log("Provide topic");
    process.exit(1);
  }

  const result = await runPipeline(topic);

  console.log(result);
}

main();

