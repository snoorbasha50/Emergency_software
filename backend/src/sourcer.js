// npm install firecrawl
// import { Firecrawl } from 'firecrawl';
const {Firecrawl} = require('firecrawl');

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_KEY });



async function getStartups(topic){
    //call firecrawl api to get startups related to the topic
     const response=await fetch(process.env.FIRECRAWL_SEARCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FIRECRAWL_KEY}`
        },
        body: JSON.stringify({
            query: topic,
            limit: 5,
            // sources:["web"],
            includeDomains: [
           "ycombinator.com",
           "producthunt.com"
           ]
        })
    });

    const data=await response.json();
    console.log("data from firecrawl api",
        JSON.stringify(data.data.web, null, 2)
        );
        // filter the results to get only startups from ycombinator and producthunt 
    const startups = data.data.web
  .filter((item) => {
    const url = item.url;

    return (
      (
        url.includes("ycombinator.com/companies/") &&
        !url.includes("/industry/")
      ) ||
      url.includes("ycombinator.com/launches/") ||
      url.includes("producthunt.com")
    );
  })
  .map((item) => ({
    name: item.title,
    description: item.description,
    url: item.url,
    source: item.url.includes("ycombinator")
      ? "YC"
      : "Product Hunt",
  }));
    console.log("startups after filtering", startups);
    return startups;
}

module.exports = { getStartups };