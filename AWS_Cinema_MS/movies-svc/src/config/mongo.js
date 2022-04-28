const MongoClient = require("mongodb").MongoClient;

const getMongoURL = (options) => {
  const url = options.servers;

  //working - const adjurl = `mongodb://${options.user}:${options.pass}@${url}?authSource=admin&authMechanism=${options.authMechanism}&connectTimeoutMS=10000&compressors=none`
  //mongodb://rootuser:rootPass@host.docker.internal:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256
  //const adjurl =
  //  "mongodb://0.0.0.0:27017/admin?connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1";
  //console.info(url);
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
          /*
          Test Connection to Admin DB
          var dbo = db.db("admin");
          console.info("Database created!");
          dbo.command({ listDatabases: 1,nameOnly: true }, function (err, result) {
          console.info(JSON.parse(result).databases.length)
          });
          */
        }
      }
    );
  });
};

module.exports = Object.assign({}, { connect });
