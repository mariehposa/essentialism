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

const testProject = {
  user_id: 1,
  project_name: "testing"
};

beforeAll(async () => {
  await db("projects").truncate();
  await db("users").truncate();
  await db("values").truncate();

  await request(server)
    .post("/api/auth/register")
    .send(addUser);

  const res = await request(server)
    .post("/api/auth/login")
    .send(testUserLogin);

  token = res.body.token;

  await db("projects").insert(testProject);
  await db("projects").insert(testProject);
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

  describe("[POST] /", () => {
    test("should return 201 Created", async () => {
      const project = {
        project_name: "biology"
      };
      const res = await request(server)
        .post("/api/user/1/projects")
        .send(project)
        .set({ authorization: token });
      expect(res.status).toBe(201);
    });
  });

  describe("[GET] /", () => {
    test("should return 200 OK", async () => {
      const res = await request(server)
        .get("/api/user/1/projects/1")
        .set({ authorization: token });
      expect(res.status).toBe(200);
    });
  });

  describe("[PUT] /", () => {
    test("should return 201 Created", async () => {
      const project = {
        project_name: "physics"
      };
      const res = await request(server)
        .put("/api/user/1/projects/1")
        .send(project)
        .set({ authorization: token });
      expect(res.status).toBe(201);
    });
  });

  describe("[DELETE] /", () => {
    test("should return 200 OK", async () => {
      const res = await request(server)
        .delete("/api/user/1/projects/2")
        .set({ authorization: token });
      expect(res.status).toBe(200);
    });
  });
});
