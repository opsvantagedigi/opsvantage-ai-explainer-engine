#!/usr/bin/env node

import fetch from "node-fetch";

const DEPLOY_URL = process.env.DEPLOY_URL;
if (!DEPLOY_URL) {
  console.error("❌ DEPLOY_URL not set");
  process.exit(1);
}

const routes = [
  { path: "/", method: "GET", expected: [200], description: "Public landing page" },
  { path: "/login", method: "GET", expected: [200], description: "Login page" },
  { path: "/app", method: "GET", expected: [200, 302, 307], description: "Protected app wrapper" },
  { path: "/dashboard", method: "GET", expected: [200, 302, 307], description: "Protected dashboard" },
  {
    path: "/api/ai-explainer",
    method: "POST",
    expected: [200, 401],
    description: "Protected API route (POST)",
    body: JSON.stringify({ prompt: "smoke-test", niche: "smoke" }),
  },
];

function color(status) {
  if (status >= 200 && status < 300) return `\x1b[32m${status}\x1b[0m`;
  if (status === 401 || status === 302 || status === 307) return `\x1b[33m${status}\x1b[0m`;
  return `\x1b[31m${status}\x1b[0m`;
}

async function checkRoute(route) {
  const url = `${DEPLOY_URL}${route.path}`;
  const options = { method: route.method, redirect: "manual", headers: {} };
  if (route.method === "POST") { options.headers["Content-Type"] = "application/json"; options.body = route.body }
  try {
    const res = await fetch(url, options);
    const status = res.status;
    const ok = route.expected.includes(status);
    console.log(`${ok ? "✔️" : "❌"} ${route.path.padEnd(20)} → ${color(status)}  (${route.description})`);
    return ok;
  } catch (err) {
    console.error(`❌ ${route.path} → ERROR:`, err.message);
    return false;
  }
}

(async () => {
  console.log(`\n🔍 Running OpsVantage Smoke Tests`);
  console.log(`🔗 Target: ${DEPLOY_URL}\n`);
  let failures = 0;
  for (const route of routes) { const ok = await checkRoute(route); if (!ok) failures++ }
  console.log("\n──────────────────────────────");
  if (failures === 0) { console.log("🎉 All smoke tests passed — deployment is healthy.\n"); process.exit(0) }
  console.log(`⚠️  ${failures} route(s) failed smoke tests.\n`);
  process.exit(1);
})();