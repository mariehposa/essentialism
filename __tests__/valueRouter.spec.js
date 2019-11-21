const request = require("supertest");
const server = require("../server");

const db = require("../database/dbConfig");

let token;

const testUser = {
  username: "ALengthyName",
  email: "emkay5@mail.com",
  password: "aPassword"
};

const testUserLogin = {
  username: "ALengthyName",
  password: "aPassword"
};

beforeAll(async () => {
  await db("users").truncate();

  await request(server)
    .post("/api/auth/register")
    .send(testUser);

  const res = await request(server)
    .post("/api/auth/login")
    .send(testUserLogin);

  token = res.body.token;
});

describe("Values Route", () => {
  describe("GET /", () => {
    test("returns 200 OK", async () => {
        console.log(token);
        
      const res = await request(server)
      .get("/api/value")
    //   .set()
      .set("Authorization", [token])

      console.log(Object.keys(res.req));

      expect(res.status).toBe(200);
    });
  });
});
