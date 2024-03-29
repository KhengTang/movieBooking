const dbSettings = {
  db: process.env.DB || "admin",
  user: process.env.DB_USER || "rootuser",
  pass: process.env.DB_PASS || "rootPass",
  authMechanism: process.env.DB_AUTH || "SCRAM-SHA-1",
  servers: process.env.DB_SERVERS
    ? process.env.DB_SERVERS.split(" ")
    : ["host.docker.internal:27017"],
};

const serverSettings = {
  port: process.env.PORT || 3000,
  //ssl: require("./ssl"),
};

module.exports = Object.assign({}, { dbSettings, serverSettings });
