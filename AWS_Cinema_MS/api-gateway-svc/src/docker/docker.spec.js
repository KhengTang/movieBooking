/* eslint-env mocha */
const Docker = require("dockerode");
const fs = require("fs");
const { dockerSettings } = require("../config/config");

describe("Docker Connection", () => {
  it("should connect with docker", (done) => {
    const docker = new Docker(dockerSettings);

    // Only in host computer (Outside, npm test npm start ....etc)
    //const docker = new Docker({ host: "localhost", port: 2375 });

    // show the container object
    // console.info(
    //   "docker.spec.js - dockerObj - \t" + JSON.stringify(dockerSettings)
    // );

    // Calling Docker.info
    // https://docs.docker.com/engine/api/v1.37/#operation/SystemInfo
    // Change Calling Docker.listContainers
    docker.listContainers(function (err, container) {
      if (err) {
        console.log(err);
      }

      // const found = container.find((node) => node.Image === "aws/payment-svc");

      // console.info(found);
      // console.info(found.Ports[0].PublicPort);
      // console.info(found.HostConfig.NetworkMode);
      // const NetworkMode = found.HostConfig.NetworkMode;
      // console.info(found.NetworkSettings.Networks[NetworkMode].IPAddress);
      console.log(
        "docker.spec.js - displaying dockerode all container Object - \n"
        //JSON.stringify(container)
        //container
      );

      console.log(container);
      done();
    });
  });
});
