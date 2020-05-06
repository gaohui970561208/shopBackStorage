module.exports = {
	publicPath: process.env.BASE_URL,
	productionSourceMap: process.env.SOURCE_MAP == 1,
	css: {
		// 配置css模块
		loaderOptions: {
			// 向预处理器 Loader 传递配置选项
			less: {
				// 配置less（其他样式解析用法一致）
				javascriptEnabled: true // 设置为true
			}
		}
	},
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].env = process.env.NODE_ENV;
			return args;
		});
	},
	//前端代理跨域
	devServer: {
		// proxy: {
		// 	'/api': {
		// 		target: 'http://www.centerain.com',
		// 		pathRewrite: { '^/api': '' },
		// 		changeOrigin: true
		// 	}
		// }
	}
};
