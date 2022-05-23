const supertest = require("supertest");

const urlInDev = "host.docker.internal:3005";
const urlInProduction = "localhost:8080";

module.exports = (payload) => {
  console.info(
    "notification.service.js emailPayload - " + JSON.stringify(payload) + "\n\n"
  );
  return new Promise((resolve, reject) => {
    supertest(urlInDev)
      .post("/notification/sendEmail")
      .send({ payload })
      .end((err, res) => {
        console.info(
          "notification.service.js emailPayload - " +
            JSON.stringify(payload) +
            "\n\n"
        );
        if (err) {
          reject(
            new Error("An error occurred with the payment service, err: " + err)
          );
        }
        resolve(res.body);
      });
  }).then(() => {
    supertest(urlInDev)
      .post("/notification/sendSMS")
      .send({ payload })
      .end((err, res) => {
        console.info(
          "notification.service.js smsPayload - " +
            JSON.stringify(payload) +
            "\n\n"
        );
        if (err) {
          reject(
            new Error("An error occurred with the payment service, err: " + err)
          );
        }
      });
  });
};

// const supertest = require("supertest");
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = "1";

// module.exports = (payload, headers) => {
//   return new Promise((resolve, reject) => {
//     supertest("http://notification-service")
//       .post("/notification/sendEmail")
//       .send({ payload })
//       .set(headers)
//       .end((err, res) => {
//         if (err) {
//           reject(
//             new Error("An error occurred with the payment service, err: " + err)
//           );
//         }
//         resolve(res.body);
//       });
//   });
// };

// module.exports = (options) => {
//   return new Promise((resolve, reject) => {
//     resolve(options);
//   });
// };
