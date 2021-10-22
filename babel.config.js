module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: process.env.ESM ? 'defaults and supports es6-module' : 'defaults' },
        modules: process.env.ESM ? false : 'auto'
      }
    ],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
}
