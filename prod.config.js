const path = require("path");
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    entry: {
        main: path.resolve(__dirname, "src", "index.ts"),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
};
