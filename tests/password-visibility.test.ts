import assert from "node:assert/strict";
import test from "node:test";

import { getPasswordInputType } from "../src/lib/password-visibility";

test("uses password input type while hidden", () => {
  assert.equal(getPasswordInputType(false), "password");
});

test("uses text input type while visible", () => {
  assert.equal(getPasswordInputType(true), "text");
});
