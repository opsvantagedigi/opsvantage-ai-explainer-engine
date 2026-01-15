/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  experimental: {
    // Explicitly set Turbopack root for CI in monorepo setups
    turbopack: {
      root: path.resolve(__dirname),
    },
  },
  // Keep outputFileTracingRoot in sync with turbopack.root
  outputFileTracingRoot: path.resolve(__dirname),
}
/** @type {import('next').NextConfig} */
module.exports = {
  // Ensure Turbopack uses the app directory as the project root in CI
  experimental: {
    turbopack: {
      root: path.resolve(__dirname),
    },
  },
  // Match Next's file-tracing root to the turbopack root
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
}
