const request = require("supertest");
const server = require("../server");

const db = require("../database/dbConfig");

let token;

const addUser = {
  username: "test",
  email: "test@email.com",
  password: "test"
};

const testUserLogin = {
  username: "test",
  password: "test"
};
beforeAll(async () => {
  await db("users").truncate();

  await request(server)
    .post("/api/auth/register")
    .send(addUser);

  const res = await request(server)
    .post("/api/auth/login")
    .send(testUserLogin);

  token = res.body.token;
});

describe("Values Route", () => {
  describe("GET /", () => {
    test("returns 200 OK", async () => {
      // console.log(token);
      const res = await request(server)
        .get("/api/value")
        //   .set()
        .set({ authorization: token });
      // console.log(Object.keys(res.req));
      // console.log(res.body);
      expect(res.status).toBe(200);
    });

    test("returns an array", async () => {
      // console.log(token);
      const res = await request(server)
        .get("/api/value")
        .set({ authorization: token });
      // console.log(res.body);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /", () => {
    test("returns 200 OK", async () => {
      const res = await request(server)
        .get("/api/value/3")
        .set({ authorization: token });
      expect(res.status).toBe(200);
    });
  });

});
