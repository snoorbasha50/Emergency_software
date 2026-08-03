require("dotenv").config();

const { buildApp } = require("./app");

async function start() {

  const app = await buildApp();

  await app.listen({
    port: 4000,
    host: "0.0.0.0",
  });

  console.log("Server running");

}

start();