const { payload } = require("@hapi/hapi/lib/validation");
const Joi = require("@hapi/joi");
const fs = require("fs");
const fsMusicFolder = "../client/public/music";
Joi.objectId = require("joi-objectid")(Joi);

module.exports = [
  {
    method: "GET",
    path: "/mu",
    handler: (request, h) => {
      let allFiles = fs.readdirSync(fsMusicFolder);
      let normalizedSearch = request.query.search.toLowerCase();
      let filterByQuery = allFiles.filter((file) => {
        return file.toLowerCase().startsWith(normalizedSearch);
      });
      return filterByQuery;
    },
  },
];
