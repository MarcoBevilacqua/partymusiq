"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");

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

  //Auth management
  await server.register(require("@hapi/cookie"));

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "sid-example",

      // Don't forget to change it to your own secret password!
      password: "password-should-be-32-characters",

      // For working via HTTP in localhost
      isSecure: false,
    },

    validate: async (request, session) => {
      console.log("checking credentials: " + request.auth.credentials);
      const validAccount = request.auth.credentials === session.id;

      if (!validAccount) {
        console.log("invalid request");
        console.log(session.id);
        return { isValid: false };
      }

      return { isValid: true };
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
