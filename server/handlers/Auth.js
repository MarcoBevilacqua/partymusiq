"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = {
  check: async (request, h) => {
    //console.log(request.auth);
    if (!request.auth.isAuthenticated) {
      console.log("User is not authenticated");
      return h.response("Unauthorized").code(401);
    }
    return h.response(request.auth.credentials);
  },
  login: async (request, h) => {
    const payload = request.payload;
    const user = await request.mongo.db.collection("users").findOne({
      username: payload.username,
    });

    console.log(user);

    console.log("Comparing " + user.password + " with " + payload.password);

    let userIsValid = await bcrypt.compare(payload.password, user.password);

    console.log("User is valid: " + userIsValid);

    if (!userIsValid) {
      return h.response("Invalid Password").code(403);
    }
    if (user && userIsValid) {
      request.cookieAuth.set({ username: user.username });
      return { isValid: true, credentials: { username: user.username } };
    }
  },
  logout: async (request, h) => {
    request.cookieAuth.clear();
    return true;
  },
  create: async (request, h) => {
    let { name, username, password } = request.payload;

    let encPassword = await bcrypt.hash(password, saltRounds);

    const inserted = await request.mongo.db
      .collection("users")
      .insertOne({ name: name, username: username, password: encPassword });
    if (!inserted) {
      return h.response().code(500);
    }
    console.log(inserted);

    const user = await request.mongo.db.collection("users").findOne(
      {
        _id: inserted.insertedId,
      },
      { projection: { username: 1 } }
    );

    request.cookieAuth.set({ username: user.username });
    return user;
  },
};
