const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/ui/index.jsx',
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'AIP team shopping List'
        })
    ]
};