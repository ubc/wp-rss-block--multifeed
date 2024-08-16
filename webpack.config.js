const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	]
};