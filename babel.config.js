module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@app': ['./src/app'],
            '@entity': ['./src/entity'],
            '@features': ['./src/features'],
            '@screens': ['./src/screens'],
            '@shared': ['./src/shared'],
            '@widgets': ['./src/widgets'],
            '@assets': ['./assets'],
          },
        },
      ],
    ],
  };
};
