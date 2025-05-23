const path = require('path');

module.exports = {
  entry: './src/extension.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
 module: {
  rules: [
    {
      test: /\.ts$/,
      exclude: [
        /node_modules/,
        path.resolve(__dirname, '../package/node_modules')
      ],
      use: 'ts-loader'
    }
  ]
}
};