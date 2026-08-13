import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("gallery app does not import sharp watermarking at module startup", async () => {
  const galleryApp = await readFile("server/lib/gallery-app.ts", "utf8");

  assert.doesNotMatch(galleryApp, /^import \{.*from "\.\/gallery-watermark"/m);
  assert.match(galleryApp, /import\("\.\/gallery-watermark\.js"\)/);
});

test("server runtime imports use deployed ESM file extensions", async () => {
  const files = [
    "server/lib/gallery-app.ts",
    "server/lib/gallery-watermark.ts",
    "server/lib/supabase-admin.ts",
  ];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const runtimeRelativeImports = source.matchAll(/^(?!import type)(?:import .* from |.*import\()("\.\.?\/[^".]+")/gm);

    for (const match of runtimeRelativeImports) {
      assert.fail(`${file} has extensionless runtime import ${match[1]}`);
    }
  }
});
