"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: true,
    },
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

  //Auth management
  await server.register(require("@hapi/cookie"));

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "partymusiqv1",

      // Don't forget to change it to your own secret password!
      password: "password-should-be-32-characters",

      // For working via HTTP in localhost
      isSecure: false,
      ttl: 10 * 60 * 60 * 1000,
      path: "/",
    },

    validate: async (request, session) => {
      const validAccount = await request.mongo.db.collection("users").findOne({
        username: session.username,
      });

      if (!validAccount) {
        console.log("Invalid User");
        return { isValid: false };
      }

      console.log("USER IS AUTHENTICATED");
      return { isValid: true, credentials: request.auth.credentials };
    },
  });

  server.auth.default("session");

  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log("error:" + err);
  process.exit(1);
});

init();
