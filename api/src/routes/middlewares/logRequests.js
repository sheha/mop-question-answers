const morgan = require("morgan");
const logger = require("logger");
const crypto = require("crypto");

// log request to stdout
const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const logRequests = function(app) {
  app.use(function(req, res, next) {
    req.uuid = crypto
      .randomBytes(8)
      .toString("base64")
      .slice(0, -1);
    logger.filters = [
      function(level, msg, meta) {
        return `{${req.uuid}} ${msg}`;
      }
    ];
    next();
  });
  morgan.token("userId", function(req) {
    return (req.user && req.user.username) || "anonymous";
  });
  morgan.token("time", function(req) {
    return new Date().toISOString();
  });
  morgan.token("clientIP", function(req) {
    return req.ip;
  });
  morgan.token("uuid", function(req) {
    return req.uuid;
  });

  app.use(
    morgan(
      ":method :url (:status) - :userId :clientIP - :response-time ms :res[content-length]"
    )
  );
};

module.exports = logRequests;
