const fs = require("fs");
const path = require("path");

async function writeSummary(results) {
  const sorted = results.sort(
    (a, b) => b.score - a.score
  );

  let markdown = `
# Startup Rankings

| Rank | Company | Score | Verdict |
|------|---------|---------|---------|
`;

  sorted.forEach((item, index) => {
    markdown += `| ${index + 1} | ${item.company} | ${item.score} | ${item.verdict} |\n`;
  });

  const outputDir = path.join(__dirname, "../output");
 if (process.env.NODE_ENV !== "production") {
  fs.writeFileSync(
    path.join(outputDir, "summary.md"),
    markdown
  );
}

  console.log("Summary written");
}

module.exports = {
  writeSummary,
};