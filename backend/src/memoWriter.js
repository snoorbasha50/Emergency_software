const fs = require("fs");
const path = require("path");

async function writeMemo(analysis) {

  const totalScore =
    analysis.teamScore +
    analysis.productScore +
    analysis.marketScore +
    analysis.tractionScore +
    analysis.thesisFitScore;

  let verdict = "PASS";

  if (totalScore >= 80) {
    verdict = "TAKE A MEETING";
  } else if (totalScore >= 60) {
    verdict = "WATCH";
  }

  const memo = `
# ${analysis.company}

## Verdict
${verdict}

## Total Score
${totalScore}/100

## Score Breakdown

| Category | Score |
|-----------|-------|
| Team | ${analysis.teamScore}/20 |
| Product | ${analysis.productScore}/20 |
| Market | ${analysis.marketScore}/20 |
| Traction | ${analysis.tractionScore}/20 |
| Thesis Fit | ${analysis.thesisFitScore}/20 |
| Total | ${totalScore}/100 |

## Team
${analysis.team}

## Product
${analysis.product}

## Market
${analysis.market}

## Traction
${analysis.traction}

## Competitive Advantage
${analysis.competitiveAdvantage}

## Thesis Fit
${analysis.thesisFit}

## Risks
${analysis.risks}

## Confidence
${analysis.confidence}

## What Would Change My Mind
${analysis.whatWouldChangeMyMind}
`;

  // Only write markdown locally (not in Lambda)
  if (process.env.NODE_ENV !== "production") {

    const outputDir = path.join(__dirname, "../output");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = analysis.company
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();

    fs.writeFileSync(
      path.join(outputDir, `${fileName}.md`),
      memo
    );

  }

  return {
    company: analysis.company,
    score: totalScore,
    verdict,
    memo,
    analysis,
  };

}

module.exports = {
  writeMemo,
};