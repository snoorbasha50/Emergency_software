const awsLambdaFastify = require("@fastify/aws-lambda");
const { buildApp } = require("./app");

let proxy;

exports.handler = async (event, context) => {
  if (!proxy) {
    const app = await buildApp();

    await app.ready();

    proxy = awsLambdaFastify(app);
  }
  console.log("🚀 Startup Research API v3.4");

  return proxy(event, context);
};