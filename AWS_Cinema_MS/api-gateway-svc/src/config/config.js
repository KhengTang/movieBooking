const fs = require("fs");

const serverSettings = {
  port: process.env.PORT || 8080,
  //ssl: require("./ssl"),
};

// const machine = process.env.DOCKER_HOST || "tcp://host.docker.internal:2375";
// const tls = process.env.DOCKER_TLS_VERIFY || 0;
// const certDir = process.env.DOCKER_CERT_PATH || "";

//const machine = "tcp://localhost:2375";
const machine = "tcp://host.docker.internal:2375";
const tls = 0;
const certDir = "/certs";

console.log("Debugging => config.js - ");
console.log("machine - " + machine.toString());
console.log(
  "host - " +
    machine.substr(machine.indexOf(":", 0) + 3, machine.indexOf(":", 6) - 6)
);
console.log("port - " + parseInt(machine.substr(-4), 10));
console.log("\n");

if (!machine) {
  throw new Error("You must set the DOCKER_HOST environment variable");
}
// if (tls === 1) {
//   throw new Error(
//     "When using DOCKER_TLS_VERIFY=1 you must specify the property DOCKER_CERT_PATH for certificates"
//   );
// }
// if (!certDir) {
//   throw new Error("You must set the DOCKER_CERT_PATH environment variable");
// }

const dockerSettings = {
  host: machine.substr(
    machine.indexOf(":", 0) + 3,
    machine.indexOf(":", 6) - 6
  ),
  port: parseInt(machine.substr(-4), 10),
  checkServerIdentity: false,
  // ca: fs.readFileSync(certDir + "/server.csr"),
  // cert: fs.readFileSync(certDir + "/server.crt"),
  // key: fs.readFileSync(certDir + "/server.key"),
  version: "v1.25",
};

module.exports = Object.assign({}, { serverSettings, dockerSettings });
