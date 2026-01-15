const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  turbopack: {
    // Point Turbopack root to the repository root so Next can be resolved
    // when the builder runs from nested directories like `apps/web/app`.
    root: path.resolve(__dirname, '../../'),
  },
  // Use the monorepo root for output tracing as well to ensure file tracing
  // finds all workspace packages during CI builds.
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
}
