const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname),
}
