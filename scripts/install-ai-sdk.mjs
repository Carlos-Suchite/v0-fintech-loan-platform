import { execSync } from "child_process"
execSync("pnpm install ai@^6.0.0 @ai-sdk/react@^3.0.0", { stdio: "inherit", cwd: "/vercel/share/v0-project" })
console.log("AI SDK packages installed.")
