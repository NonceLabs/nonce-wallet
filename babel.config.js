module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            hooks: './hooks',
            types: './types',
            components: './components',
            constants: './constants',
            assets: './assets',
            utils: './utils',
            screens: './screens',
            navigation: './navigation',
            store: './store',
            locale: './locale',
          },
        },
      ],
    ],
  }
}
