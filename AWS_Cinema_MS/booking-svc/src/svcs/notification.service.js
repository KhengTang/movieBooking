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
module.exports = (options) => {
  return new Promise((resolve, reject) => {
    resolve(options);
  });
};
