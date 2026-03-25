import fs from "node:fs";
import path from "node:path";

const target = path.join(
  process.cwd(),
  "node_modules",
  "@vercel",
  "analytics",
  "tsconfig.json",
);

if (!fs.existsSync(target)) {
  process.exit(0);
}

try {
  const nextConfig = {
    extends: "../../../tsconfig.json",
    compilerOptions: {
      module: "esnext",
    },
    include: ["./dist/**/*.d.ts"],
    exclude: [],
  };

  fs.writeFileSync(target, `${JSON.stringify(nextConfig, null, 2)}\n`, "utf8");
} catch (error) {
  console.warn(
    "[postinstall] Could not patch @vercel/analytics tsconfig:",
    error instanceof Error ? error.message : error,
  );
}
