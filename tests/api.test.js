const request = require("supertest")
const app = require("../src/app")

describe("Authentication API", () => {

  test("Health endpoint should work", async () => {
    const res = await request(app).get("/health")
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe("OK")
  })

  test("Login endpoint should reject invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@example.com",
        password: "wrongpassword"
      })

    expect(res.statusCode).toBe(401)
  })

})