/* eslint-env mocha */
const { EventEmitter } = require("events");
const test = require("assert");
const mongo = require("./mongo");
const { dbSettings } = require("./config");
const { Console } = require("console");

describe("Mongo Connection", () => {
  it("should emit db Object with an EventEmitter", (done) => {
    const mediator = new EventEmitter();

    mongo.connect(dbSettings, mediator);

    mediator.on("db.ready", (db) => {
      db.db("admin")
        .admin()
        .listDatabases((err, dbs) => {
          test.equal(null, err);
          test.ok(dbs.databases.length > 0);
          db.close();
          done();
        });
    });

    mediator.on("db.error", (err) => {
      console.log(err);
    });

    mediator.emit("boot.ready");
  });
});
