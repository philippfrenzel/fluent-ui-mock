import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";

const OUT_DIR = path.resolve("mocks");
const HOST = "127.0.0.1";
const PORT = 4173;
const BASE_URL = `http://${HOST}:${PORT}`;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: process.platform === "win32", ...opts });
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`))));
  });
}

function waitForPort(host, port, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const socket = new net.Socket();
      socket.setTimeout(1000);
      socket
        .once("connect", () => {
          socket.destroy();
          resolve();
        })
        .once("error", () => {
          socket.destroy();
          if (Date.now() - start > timeoutMs) reject(new Error(`Timed out waiting for ${host}:${port}`));
          else setTimeout(attempt, 250);
        })
        .once("timeout", () => {
          socket.destroy();
          if (Date.now() - start > timeoutMs) reject(new Error(`Timed out waiting for ${host}:${port}`));
          else setTimeout(attempt, 250);
        })
        .connect(port, host);
    };
    attempt();
  });
}

async function main() {
  await run("npm", ["run", "build"]);

  const preview = spawn("npm", ["run", "preview"], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, PORT: String(PORT) }
  });

  try {
    await waitForPort(HOST, PORT);

    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    const shots = [
      { route: "/reference-tables", file: "01-reference-tables-list.png" },
      { route: "/reference-tables/country_codes", file: "02-reference-table-detail.png" },
      { route: "/admin/reference-tables/country_codes/edit", file: "03-reference-table-admin-edit.png" }
    ];

    for (const s of shots) {
      await page.goto(`${BASE_URL}${s.route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      await page.screenshot({ path: path.join(OUT_DIR, s.file), fullPage: true });
      console.log(`Saved: ${path.join(OUT_DIR, s.file)}`);
    }

    await browser.close();
  } finally {
    preview.kill("SIGTERM");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
