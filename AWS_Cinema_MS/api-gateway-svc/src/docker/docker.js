"use strict";
const Docker = require("dockerode");

const discoverRoutes = (container) => {
  return new Promise((resolve, reject) => {
    // here we retrieve our dockerSettings
    const dockerSettings = container.resolve("dockerSettings");

    // Debugging
    console.log(
      "docker.js - dockerSetting - \t" + JSON.stringify(dockerSettings)
    );

    // we instantiate our docker object, that will communicate with our docker-machine
    const docker = new Docker(dockerSettings);

    // function to avoid registering our database route and api route
    const avoidContainers = (name) => {
      if (
        /mongodb/.test(name) ||
        /api-gateway-svc/.test(name) ||
        /mongo-express/.test(name) ||
        /frontend-svc/.test(name)
      ) {
        return false;
      }
      return true;
    };

    const getUpstreamUrl = (containerDetails) => {
      // console.info(
      //   "docker.js - getUpstreamUrl container Info - \t" +
      //     JSON.stringify(containerDetails)
      // );

      const PublicPort = containerDetails?.Ports[0]?.PublicPort;
      const HostConfig = containerDetails?.HostConfig?.NetworkMode;
      const NetworkIP =
        containerDetails?.NetworkSettings?.Networks[HostConfig]?.IPAddress;
      const ServiceName =
        containerDetails?.Labels?.["com.docker.compose.service"];

      console.info("docker.js - getUpstreamUrl NetworkIP - " + NetworkIP);
      console.info("docker.js - getUpstreamUrl Public Port - " + PublicPort);
      console.info(
        "docker.js - getUpstreamUrl service name - " +
          containerDetails?.Labels?.["com.docker.compose.service"]
      );

      // const address = `${ServiceName}:${PublicPort}`;
      const address = `http://${dockerSettings.host}:${PublicPort}`;
      console.info("docker.js - getUpstreamUrl address - " + address);
      return address;
    };

    const addRoute = (routes, details) => {
      routes[details.Names] = {
        id: details.Id,
        name: details.Names[0].split("").splice(1).join(""),
        route: details.Labels.apiRoute,
        target: getUpstreamUrl(details),
      };
    };

    // docker.listServices((err, services) => {
    //   if (err) {
    //     reject(new Error("an error occurred listing containers, err: " + err));
    //   }
    //   console.log(
    //     "docker.js - list all services \n" + JSON.stringify(services)
    //   );
    //   const routes = new Proxy(
    //     {},
    //     {
    //       get(target, key) {
    //         console.log(`Get properties from -> "${key}" container`);
    //         return Reflect.get(target, key);
    //       },
    //       set(target, key, value) {
    //         console.log("Setting properties", key, value);
    //         return Reflect.set(target, key, value);
    //       },
    //     }
    //   );

    docker.listContainers((err, containers) => {
      if (err) {
        reject(new Error("an error occurred listing containers, err: " + err));
      }
      console.log(
        "docker.js - list all services \n" + JSON.stringify(containers)
      );
      const routes = new Proxy(
        {},
        {
          get(target, key) {
            console.log(`Get properties from -> "${key}" container`);
            return Reflect.get(target, key);
          },
          set(target, key, value) {
            console.log("Setting properties", key, value);
            return Reflect.set(target, key, value);
          },
        }
      );

      containers.forEach((containers) => {
        if (avoidContainers(containers.Names[0])) {
          addRoute(routes, containers);
        }
      });

      // and finally we resolve our routes
      resolve(routes);
    });
  });
};

module.exports = Object.assign({}, { discoverRoutes });
