const { payload } = require("@hapi/hapi/lib/validation");
const Joi = require("@hapi/joi");
const fs = require("fs");
const fsMusicFolder = "./client/public/music";
Joi.objectId = require("joi-objectid")(Joi);

const userValidateSchema = require("../models/User");

const handleError = function (request, h, err) {
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const invalidItem = err.details[0];
    return h
      .response(`${JSON.stringify(err.details)}`)
      .code(400)
      .takeover();
  }

  return h.response(err).takeover();
};

module.exports = [
  {
    method: "GET",
    path: "/js/{file*}",
    handler: {
      directory: {
        path: "./client/dist/js",
        listing: true,
      },
    },
  },
  {
    method: "GET",
    path: "/css/{file*}",
    handler: {
      directory: {
        path: "./client/dist/css",
        listing: true,
      },
    },
  },
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
