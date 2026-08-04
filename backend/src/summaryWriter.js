const fs = require("fs");
const path = require("path");

async function writeSummary(results) {

  const sorted = results.sort(
    (a, b) => b.score - a.score
  );

  let markdown = `
# Startup Rankings

| Rank | Company | Score | Verdict |
|------|---------|-------|---------|
`;

  sorted.forEach((item, index) => {
    markdown += `| ${index + 1} | ${item.company} | ${item.score} | ${item.verdict} |\n`;
  });

  // Write summary only in local development
  if (process.env.NODE_ENV !== "production") {

    const outputDir = path.join(__dirname, "../output");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outputDir, "summary.md"),
      markdown
    );

  }

  console.log("Summary written");

  return markdown;

}

module.exports = {
  writeSummary,
};