const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    entry: {
        main: path.resolve(__dirname, "src", "index.ts"),
    },
    plugins: [
        new NodemonPlugin({
            script: path.resolve(__dirname, "dist", "main.js"),
            watch: path.resolve(__dirname, "dist"),
            ignore: ["*.js.map"],
            verbose: true,
        }),
    ],
    devtool: "inline-source-map",
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 500,
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
