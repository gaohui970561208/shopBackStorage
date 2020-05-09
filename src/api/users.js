import { httpCreate } from './http';

const http = httpCreate('/api/users');

export const users = {
	/** 登录
	 * @param { String } data.username 用户名
	 * @param { String } data.password 密码
	 */
	login(data) {
		return http.post('/login', data);
	},
	/** 注册
	 * @param { String } data.username 用户名
	 * @param { String } data.password 密码
	 * @param { Number } data.phone 手机号
	 */
	regesiter(data) {
		return http.post('/regesiter', data);
	},
	//修改密码
	updatePassword(params, data) {
		return http.post('/updatePassword', data, { params });
	},
	//获取用户信息
	getUserInfo(params) {
		return http.get('/userInfo', { params });
	},
	//修改用户头像
	/**
	 *
	 * @param { Number } userId  用户id
	 * @param { String } data.avatarUrl 图片的base64编码数据
	 */
	userAvatarUpdate(userId, data) {
		return http.post(`/userAvatarUpdate?userId=${userId}`, data);
	},
	//退出登录
	exit() {
		return http.get('/exit');
	},
	//登录状态查询
	testLogin() {
		return http.get('/testLogin');
	},
	//个人信息修改,昵称
	userNickNameUpdate(userId, data) {
		return http.post(`/userNickNameUpdate?userId=${userId}`, data);
	},
	//个人信息修改,昵称
	userNickNameUpdate(userId, data) {
		return http.post(`/userNickNameUpdate?userId=${userId}`, data);
	},
	//个人信息修改，简介
	userDescriptUpdate(userId, data) {
		return http.post(`/userDescriptUpdate?userId=${userId}`, data);
	},
	//个人信息修改，简介
	userPhoneUpdate(userId, data) {
		return http.post(`/userPhoneUpdate?userId=${userId}`, data);
	},
	//获取购物车列表
	getCartList(userId) {
		return http.get(`/getCartList?userId=${userId}`);
	},
	//购物车删除
	deleteShoppingCart(userId, data) {
		return http.post(`/deleteShoppingCart?userId=${userId}`, data);
	},
	updateUserInfo(params, data) {
		return http.post('/updateUserInfo', data, { params });
	}
};
