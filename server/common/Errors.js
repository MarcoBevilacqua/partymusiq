module.exports = {
  handle: (request, h, err) => {
    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
      const invalidItem = err.details[0];
      return h
        .response(`${JSON.stringify(err.details)}`)
        .code(400)
        .takeover();
    }

    return h.response(err).takeover();
  },
};
