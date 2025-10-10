import { describe, it, expect } from "vitest";
import { messageForRepo } from "./message";

describe("messageForRepo", () => {
  it("returns a friendly message including the owner name", () => {
    const out = messageForRepo("Andrew Wilks");
    expect(out).toContain("Hello from Andrew Wilks");
  });
});
