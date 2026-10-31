import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    test: {
        projects: [
            {
                extends: true,
                test: {
                    name: "unit",
                    globals: true,
                    environment: "node",
                    include: ["src/tests/**/*.test.ts"],
                    setupFiles: ["./src/tests/setup.ts"],
                    fileParallelism: false,
                },
            },
        ],
    },
});
