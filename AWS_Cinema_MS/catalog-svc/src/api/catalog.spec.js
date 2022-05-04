/* eslint-env mocha */
const request = require("supertest");
const server = require("../server/server");

describe("Movies API", () => {
  let app = null;
  const testCinemasCity = [
    {
      _id: "588ac3a02d029a6d15d0b5c4",
      name: "Block Cinema Jurong East",
    },
    {
      _id: "588ac3a02d029a6d15d0b5c5",
      name: "Block Cinema Jurong Point",
    },
  ];

  const testCinemaId = {
    _id: "588ac3a02d029a6d15d0b5c4",
    name: "Block Cinema Jurong East",
    cinemaPremieres: [
      {
        id: "1",
        title: "Hans Solo",
        runtime: 115,
        plot: "With the emerging demand of hyperfuel and other resources, Han Solo finds himself in the middle of a heist alongside other criminals, where they meet the likes of Chewbacca and Lando Calrissian in an adventurous situation exposing the criminal underworld.",
        poster: "link to poster...",
      },
      {
        id: "2",
        title: "Deadpool 2",
        runtime: 124,
        plot: "After losing Vanessa (Morena Baccarin), the love of his life, 4th-wall breaking mercenary Wade Wilson aka Deadpool (Ryan Reynolds) must assemble a team and protect a young, fat mutant Russell Collins aka Firefist (Julian Dennison) from Cable (Josh Brolin), a no-nonsense, dangerous cyborg from the future, and must also learn the most important lesson of all: to be part of a family again.",
        poster: "link to poster...",
      },
      {
        id: "3",
        title: "Hotel Transylvannia",
        runtime: 107,
        plot: "Count Dracula runs a high-end resort for monsters and is overprotective of his daughter, Mavis. When a human named Johnny enters the hotel, Dracula tries to prevent Mavis from falling for him.",
        poster: "link to poster...",
      },
    ],
  };

  const testSchedulesMovie = [
    {
      _id: "Block Cinema Jurong East",
      schedules: [
        {
          room: 2.0,
          schedules: ["10:15"],
        },
        {
          room: 1.0,
          schedules: ["6:55", "4:35", "10:15"],
        },
        {
          room: 3.0,
          schedules: ["10:15"],
        },
      ],
    },
    {
      _id: "Las Americas",
      schedules: [
        {
          room: 2.0,
          schedules: ["3:25", "10:15"],
        },
        {
          room: 1.0,
          schedules: ["12:15", "10:15"],
        },
      ],
    },
  ];

  let testRepo = {
    getCinemasByCity(location) {
      console.log(location);
      return Promise.resolve(testCinemasCity);
    },
    getCinemaById(cinemaId) {
      console.log(cinemaId);
      return Promise.resolve(testCinemaId);
    },
    getCinemaScheduleByMovie(cinemaId, movieId) {
      console.log(cinemaId, movieId);
      return Promise.resolve(testSchedulesMovie);
    },
  };

  beforeEach(() => {
    return server
      .start({
        port: 3000,
        repo: testRepo,
      })
      .then((serv) => {
        app = serv;
      });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it("can return cinemas by location", (done) => {
    const location = {
      city: "588ababf2d029a6d15d0b5bf",
    };
    request(app)
      .get(`/cinemas?cityId=${location.city}`)
      .expect((res) => {
        res.body.should.containEql(testCinemasCity[0]);
        res.body.should.containEql(testCinemasCity[1]);
      })
      .expect(200, done);
  });

  it("can get movie premiers by cinema", (done) => {
    request(app)
      .get("/cinemas/588ac3a02d029a6d15d0b5c4")
      .expect((res) => {
        res.body.should.containEql(testCinemaId);
      })
      .expect(200, done);
  });

  it("can get schedules by cinema and movie", (done) => {
    request(app)
      .get("/cinemas/588ababf2d029a6d15d0b5bf/1")
      .expect((res) => {
        //console.info("results : " + JSON.stringify(res.body));
        res.body.should.containEql(testSchedulesMovie[0]);
        res.body.should.containEql(testSchedulesMovie[1]);
      })
      .expect(200, done);
  });
});
