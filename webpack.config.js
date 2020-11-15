/**
 * @file webpack.config.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Web Pack configuration file
 */
const path                 = require("path"),
      webpack              = require("webpack"),
      CopyPlugin           = require('copy-webpack-plugin'),
      HtmlWebpackPlugin    = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log("Exclude! ", path.resolve(path.join(__dirname, "client", "index.html")));

module.exports = {
    "entry": "./webpack/index.js",
    "output": {
        "path": path.join(__dirname, "dist"),
        "filename": "main.js"

    },
    "target": "web",
    "optimization": {
    },
    "module": {
        "rules": [
            {
                "test": /\.css$/i,
                "use": [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                "use":     ["babel-loader"],
                "test":    /\.js$/,
                "exclude": /node_modules/
            },
            {
                "test":   /\.(jpe?g|png|gif|svg|ico)$/i,
                "loader": "file-loader"
            },
            {
                "test":   /\.html$/i,
                "loader": "html-loader",
                "options": {
                    "minimize": true
                },
                "exclude": [
                    path.resolve(path.join(__dirname, "client", "index.html"))
                ]
            },
        ]
    },
    "plugins": [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            "filename": "index.html",
            "template": path.join(__dirname, "build", "index-webpack.html")
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            "$":      "jquery",
            "jQuery": "jquery"
        }),
        new CopyPlugin({
            "patterns": [
                { "from": "client/icons",  "to": "icons"  },
                { "from": "client/images", "to": "images" }
            ]
        })
    ]
};

