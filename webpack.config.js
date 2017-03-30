module.exports = {
  entry: {
    index: './src/index.js',
    record: './src/record.js',
    face: './src/face.js',
    'static-face': './src/static-face.js',
  },
  output: {
    filename: './docs/[name].js'
  },
  module: {
    loaders: [
      // { test: /\.json$/, loaders: ['json-loader'] }
    ]
  }
};
