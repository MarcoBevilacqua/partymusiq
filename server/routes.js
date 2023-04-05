const { payload } = require("@hapi/hapi/lib/validation");
const Joi = require("@hapi/joi");
const fs = require("fs");
const fsMusicFolder = "./client/public/music";
Joi.objectId = require("joi-objectid")(Joi);

module.exports = [
  {
    method: "GET",
    path: "/mu",
    handler: (request, h) => {
      let allFiles = fs.readdirSync(fsMusicFolder);
      let filterByQuery = allFiles.filter((file) => {
        return file.toLowerCase().startsWith(request.query.search);
      });
      return filterByQuery;
    },
  },
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "everything is fine";
    },
  },
];
