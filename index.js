"use strict";

const Hapi = require("@hapi/hapi");
const Path = require("path");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(require("@hapi/inert"));

  await server.register({
    plugin: require("hapi-mongodb"),
    options: {
      url: "mongodb://localhost:27018/partymusiq",
      settings: {
        useUnifiedTopology: true,
      },
      decorate: true,
    },
  });

  const routes = require("./routes");
  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log("error:" + err);
  process.exit(1);
});

init();
