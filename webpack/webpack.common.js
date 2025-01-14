const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
        "popup": path.join(srcDir, 'popup.tsx'),
        "options": path.join(srcDir, 'options.tsx'),
        "allow-in-incognito": path.join(srcDir, 'allow-in-incognito.tsx'),
        "redirect": path.join(srcDir, 'redirect.tsx'),
        "background": path.join(srcDir, 'background.ts'),
        "content_script": path.join(srcDir, 'content_script.tsx'),
    },
    output: {
        path: path.join(__dirname, "../chrome_extension/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|jpg)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "public" }],
            options: {},
        }),
    ],
};
