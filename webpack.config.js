module.exports = {
  entry: {
    index: './src/index.js',
    record: './src/record.js',
    face: './src/face.js',
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
