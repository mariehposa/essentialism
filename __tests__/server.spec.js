const request = require("supertest");
const server = require("../server");

describe("server", () => {
  describe("[GET] / endpoint", () => {
    test("should return 200 OK", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Its working!" });
    });
  });
});
