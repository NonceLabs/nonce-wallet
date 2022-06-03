module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            hooks: './hooks',
            types: './types',
            components: './components',
            theme: './theme',
            assets: './assets',
            utils: './utils',
            screens: './screens',
            navigation: './navigation',
            store: './store',
            locale: './locale',
            chain: './chain',
          },
        },
      ],
    ],
  }
}
