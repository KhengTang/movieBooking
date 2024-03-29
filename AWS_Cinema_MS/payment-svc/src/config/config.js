const dbSettings = {
  db: process.env.DB || "admin",
  user: process.env.DB_USER || "rootuser",
  pass: process.env.DB_PASS || "rootPass",
  authMechanism: "SCRAM-SHA-1",
  servers: process.env.DB_SERVERS
    ? process.env.DB_SERVERS.split(" ")
    : ["host.docker.internal:27017"],
};

const serverSettings = {
  port: process.env.PORT || 3000,
  //ssl: require("./ssl"),
};

const stripeSettings = {
  secret:
    "sk_test_51KrdBUJH6s0YhjdSXpAnnUvzbtCagQU4JZaAD96gADJYWdQmkeUIG0ZA3XwI96ClpTy3fLpW6jCWd7cDXxvVAapN00xWboN0Sj",
  public: "1234512345",
};

module.exports = Object.assign(
  {},
  { dbSettings, serverSettings, stripeSettings }
);
