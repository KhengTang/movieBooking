/* eslint-env mocha */
const supertest = require("supertest");

describe("movies-service", () => {
  const api = supertest("http://localhost:3000");
  it("returns a 200 for a known movies", (done) => {
    api.get("/movies/premieres").expect(200, done);
  });
});
