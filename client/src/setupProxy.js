const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("/socket.io", {
      target: "http://localhost:5443/"
    })
  );
  app.use(
    proxy("/api", {
      target: "http://localhost:5443/api",
      pathRewrite: { "^/api": "" }
    })
  );
};
