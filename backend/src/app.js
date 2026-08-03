const Fastify = require("fastify");
const cors = require("@fastify/cors");

const researchRoutes = require("./routes/research.route");

async function buildApp() {


  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: process.env.CLIENT_URL,
  });


  app.get("/health", async () => ({
    status: "ok",
  }));

  await app.register(researchRoutes, {
    prefix: "/api",
  });

  console.log(app.printRoutes(),"routes");

  return app;
}

module.exports = {
  buildApp,
};