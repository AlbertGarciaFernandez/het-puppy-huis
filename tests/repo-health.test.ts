import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("package metadata matches this project", async () => {
  const packageJson = JSON.parse(await readFile("package.json", "utf8")) as {
    name: string;
    dependencies?: Record<string, string>;
  };

  assert.equal(packageJson.name, "het-puppy-huis");
  assert.equal(packageJson.dependencies?.["@google/genai"], undefined);
  assert.equal(packageJson.dependencies?.["better-sqlite3"], undefined);
});

test("README documents the Het Puppy Huis setup", async () => {
  const readme = await readFile("README.md", "utf8");

  assert.match(readme, /Het Puppy Huis/);
  assert.match(readme, /npm run dev:api/);
  assert.doesNotMatch(readme, /AI Studio|GEMINI_API_KEY/);
});

test("navbar has no tablet breakpoint gap", async () => {
  const navbar = await readFile("src/components/Navbar.tsx", "utf8");

  assert.match(navbar, /hidden md:block/);
  assert.match(navbar, /md:hidden/);
  assert.doesNotMatch(navbar, /hidden lg:block/);
});
