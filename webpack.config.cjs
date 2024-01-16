const path = require('path');

module.exports = {
  entry: './index.js', // the starting point of your application
  output: {
    filename: 'bundle.js', // the resulting bundle file
    path: path.resolve(__dirname, 'dist'), // the output directory
  },
  target: 'node', // to bundle for node.js environment
  mode: 'production'
};