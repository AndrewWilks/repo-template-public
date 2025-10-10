import { describe, it, expect } from "vitest";
import { messageForRepo } from "./message";

describe("messageForRepo", () => {
  it("returns a friendly message including the owner name", () => {
    const out = messageForRepo();
    // strip ANSI escape sequences before asserting
    const plain = out.replace(/\u001b\[[0-9;]*m/g, "");
    expect(plain.toLowerCase()).toContain(
      "thank you for checking out this repository"
    );
    expect(plain).toContain("Contact: me@andrewwilks.au");
  });
});
