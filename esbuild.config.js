const { nodeExternalsPlugin } = require('esbuild-node-externals')

module.exports = (serverless) => ({
  target: 'node20',
  minify: true,
  bundle: true,
  plugins: [nodeExternalsPlugin()],
  keepNames: true
})
