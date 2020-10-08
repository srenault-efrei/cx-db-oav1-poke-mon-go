module.exports = (api) => {
  api.cache(true);

  const presets = ['@babel/env', '@babel/typescript'];
  const plugins = ['@babel/plugin-transform-runtime'];

  return {
    presets,
    plugins,
  };
};
