// @ts-ignore
const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("/socket.io", {
      target: "http://localhost:4000/"
    })
  );
  app.use(
    proxy("/api", {
      target: "http://localhost:4000/api",
      pathRewrite: { "^/api": "" }
    })
  );
};
