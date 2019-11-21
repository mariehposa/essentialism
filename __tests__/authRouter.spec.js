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

  const a = await request(server)
    .post("/api/auth/register")
    .send(addUser);

  const res = await request(server)
    .post("/api/auth/login")
    .send(testUserLogin);

  token = res.body.token;
//   console.log(token);
});

describe("api/auth/* endpoints", () => {
  describe("[POST] /api/auth", () => {
    test("should return 201 Created", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send(addUser);
      expect(response.status).toBe(201);
    });
  });
});
