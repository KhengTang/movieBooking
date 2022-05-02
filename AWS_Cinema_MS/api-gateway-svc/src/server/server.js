"use strict";
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const spdy = require("spdy");

const start = (container) => {
  return new Promise((resolve, reject) => {
    // const { port, ssl } = container.resolve("serverSettings");
    const { port } = container.resolve("serverSettings");
    const routes = container.resolve("routes");

    if (!routes) {
      reject(new Error("The server must be started with routes discovered"));
    }
    if (!port) {
      reject(new Error("The server must be started with an available port"));
    }

    const app = express();
    console.log("server.js - routes Object - " + JSON.stringify(routes));
    for (let id of Reflect.ownKeys(routes)) {
      const { route, target } = routes[id];
      app.use(
        route,
        createProxyMiddleware({
          target,
          changeOrigin: true,
          logLevel: "debug",
        })
      );
    }

    if (process.env.NODE === "test") {
      const server = app.listen(port, () => resolve(server));
    } else {
      // Disable the ssl connection
      // const server = spdy
      //   .createServer(ssl, app)
      //   .listen(port, () => resolve(server));
      const server = app.listen(port, () => resolve(server));
    }
  });
};

module.exports = Object.assign({}, { start });
