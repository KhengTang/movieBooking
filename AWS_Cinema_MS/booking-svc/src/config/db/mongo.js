const MongoClient = require("mongodb").MongoClient;

const getMongoURL = (options) => {
  const url = options.servers;

  return `mongodb://${options.user}:${options.pass}@${url}/?authSource=admin&authMechanism=${options.authMechanism}&connectTimeoutMS=1000`;
};

const connect = (options, mediator) => {
  mediator.once("boot.ready", () => {
    MongoClient.connect(
      getMongoURL(options),
      { useNewUrlParser: true },
      (err, db) => {
        if (err) {
          mediator.emit("db.error", err);
        } else {
          mediator.emit("db.ready", db);
        }
      }
    );
  });
};

module.exports = Object.assign({}, { connect });
