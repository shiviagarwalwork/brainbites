module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/constants': './src/constants',
            '@/hooks': './src/hooks',
            '@/stores': './src/stores',
            '@/types': './src/types',
            '@/services': './src/services',
            '@/features': './src/features',
            '@/utils': './src/utils',
            '@/data': './src/data',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
