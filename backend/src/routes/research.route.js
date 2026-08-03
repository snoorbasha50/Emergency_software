const fp = require("fastify-plugin");
const { runPipeline } = require("../pipeline");

async function routes(fastify, options) {   // <-- accept options

  fastify.post("/api/research", async (request, reply) => {

    const { topic } = request.body;

    if (!topic) {
      return reply.status(400).send({
        message: "Topic required",
      });
    }

    const companies = await runPipeline(topic);

    return {
      success: true,
      companies,
    };
  });

}

module.exports = fp(routes);