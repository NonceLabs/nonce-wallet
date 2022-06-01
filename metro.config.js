// metro.config.js
const { getDefaultConfig } = require('metro-config')
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues()

module.exports = {
  resolver: {
    ...defaultResolver,
    sourceExts: [...defaultResolver.sourceExts, 'cjs'],
  },
}
