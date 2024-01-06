// 按照此规范

import axios from 'axios';
import env from './config';
import { Message } from 'element-ui';
axios.defaults.withCredentials = true;

const config = {
	...env,
	errors(err) {
		const msg = err.code === 'ECONNABORTED' ? '网络超时，请刷新重试' : err.msg || err.message || err.toString();
		console.error(err);
		Message.error(msg);
	},
	login(res) {
		const data = res.data;
	},
	filter(res) {
		const { status, data } = res;
		if (status >= 200 && status < 300) {
			if (data.code === 0) {
				res.ok = true;
				return res;
			} else if (data.code == 401) {
				// this.login(res);
			}
		}
		this.errors(data.msg);
		res.ok = false;
		return res;
	},
};

const httpCreate = (baseURL, timeout = 600e3) => {
	const instance = axios.create({
		baseURL: config.apiPath + baseURL,
		timeout,
		headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
	});
	instance.interceptors.response.use(config.filter.bind(config));
	return instance;
};

const { errors, filter, baseURL } = config;

const getUrlPath = (path) => {
	return (config.backend ? config.backend : config.host) + path;
};

export { httpCreate, errors, filter, baseURL, getUrlPath };
