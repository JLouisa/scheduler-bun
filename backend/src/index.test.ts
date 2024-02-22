import { Elysia } from "elysia";
import { describe, expect, it } from "bun:test";

describe("Index", () => {
  it("return a response", async () => {
    const app = new Elysia().get("/", () => "Hello World");

    const response = await app
      .handle(new Request("http://localhost:3000/"))
      .then((res) => res.text());

    expect(response).toBe("Hello World");
  });
});

describe("Index json", () => {
  it("return a response", async () => {
    const app = new Elysia().get("/json", () => ({
      hello: "world",
    }));

    const response = await app
      .handle(new Request("http://localhost:3000/json"))
      .then((res) => res.json());

    expect(response).toEqual({
      hello: "world",
    });
  });
});
