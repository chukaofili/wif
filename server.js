const http = require("http");
const { createTerminus } = require("@godaddy/terminus");
const { name, version } = require("./package.json");
const app = require("./app");

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = process.env.HOST ?? "http://localhost";
const environment = process.env.NODE_ENV || "development";

const server = http.createServer(app);
createTerminus(server, {
  signal: "SIGINT",
  healthChecks: {
    "/health": async () => {
      return Promise.resolve({
        name,
        environment,
        version,
      });
    },
  },
  useExit0: true,
  onSignal: async () => {
    console.info("[server]: Server is shutting down, starting cleanup ...");
    // start cleanup here
    return Promise.resolve();
  },
  onShutdown: async () => {
    console.info("[server]: Cleanup finished, server is shutting down");
    console.info("[server]: Server shutdown complete!");
    return Promise.resolve();
  },
});

server.listen(port, () => {
  console.info(`[server]: Starting ${name} v${version} in ${environment} mode`);
  console.info(`[server]: Server is running at ${host}:${port}`);
});
