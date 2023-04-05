"use strict";

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
      password: payload.password,
    });
    if (user) {
      request.cookieAuth.set({ username: user.username });
      return { isValid: true, credentials: { username: user.username } };
    }
  },
  logout: async (request, h) => {
    request.cookieAuth.clear();
    return true;
  },
  create: async (request, h) => {
    const payload = request.payload;
    const inserted = await request.mongo.db.collection("users").insertOne(payload);
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

    console.log(user);
    return user;
  },
};
