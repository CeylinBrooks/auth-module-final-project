"use strict";

process.env.SECRET = "toes";

const server = require("../../../src/server.js").server;
const supergoose = require("@code-fellows/supergoose");

const mockRequest = supergoose(server);

let users = {
  admin: { username: "admin", password: "password" },
  user: { username: "user", password: "password" },
};

describe("Auth Router", () => {
  Object.keys(users).forEach((userType) => {
    describe(`${userType} users`, () => {
      it("can create one", async () => {
        const response = await mockRequest
          .post("/signup")
          .send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject._id).toBeDefined();
        expect(userObject.username).toEqual(users[userType].username);
      });

      it("can signin with basic", async () => {
        const response = await mockRequest
          .post("/signin")
          .auth(users[userType].username, users[userType].password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject._id).toBeDefined();
        expect(userObject.username).toEqual(users[userType].username);
      });

      it("can signin with bearer", async () => {
        // First, use basic to login to get a token
        const response = await mockRequest
          .post("/signin")
          .auth(users[userType].username, users[userType].password);

        const token = response.body.token;
        const bearerResponse = await mockRequest
          .get("/user")
          .set("Authorization", `Bearer ${token}`);

        expect(bearerResponse.status).toBe(200);
      });

      it("token saved in cookie is identical to cookie in body", async () => {
        let regex = /token=(.*);/;
        const response = await mockRequest
          .post("/signin")
          .auth(users[userType].username, users[userType].password);
        let matchCookie = regex.exec(response.header["set-cookie"])[1]
        expect(matchCookie).toEqual(response.body.token);
      });
    });

    describe("bad logins", () => {
      it("basic fails with known user and wrong password ", async () => {
        const response = await mockRequest.post("/signin").auth("admin", "xyz");
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
      });

      it("basic fails with unknown user", async () => {
        const response = await mockRequest
          .post("/signin")
          .auth("nobody", "xyz");
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
      });

      it("bearer fails with an invalid token", async () => {
        const bearerResponse = await mockRequest
          .get("/user")
          .set("Authorization", `Bearer foobar`);
        expect(bearerResponse.status).toBe(403);
      });
    });
  });
  describe("TEST FOR ACL", () => {
    it("Allows roles with admin can access /users", async () => {
      // Create admin role user
      let admin = { username: "admin1", password: "password", role: "admin" };
      const response = await mockRequest.post("/signup").send(admin);
      const token = response.body.token;
      const aclResponse = await mockRequest
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(aclResponse.status).toBe(200);
      expect(aclResponse.body).toEqual(["admin", "user", "admin1"]);
    });
    it("Should not allow roles with user to access /users", async () => {
      // Sign in to create token
      const response = await mockRequest
        .post("/signin")
        .auth("user", "password");
      const token = response.body.token;
      const aclResponse = await mockRequest
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(aclResponse.status).toBe(403);
    });
  });
});
