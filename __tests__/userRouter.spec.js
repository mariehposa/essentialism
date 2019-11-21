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

const testValue = { value_name: 'aValue'}

beforeAll(async () => {
  await db("users").truncate();
  await db("values").truncate();

  await request(server)
    .post("/api/auth/register")
    .send(addUser);

  const res = await request(server)
    .post("/api/auth/login")
    .send(testUserLogin);

  token = res.body.token;
});

describe("Users Route", () => {
  describe("GET /", () => {
    test("returns 200 OK", async () => {
      const res = await request(server)
        .get("/api/user/1/projects")
        .set({ authorization: token });
      expect(res.status).toBe(200);
    });

    test("returns an array", async () => {
      const res = await request(server)
        .get("/api/user/1/projects")
        .set({ authorization: token });
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

});
