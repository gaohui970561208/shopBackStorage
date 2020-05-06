import { httpCreate } from './http';

const http = httpCreate('/api/shop');

export const shop = {
	//添加店铺
	/**
	 * @param { String } data.shopName
	 * @param { String } data.shopLogo
	 * @param { Array } data.classifyList
	 * @param { String } data.shopBrief
	 */
	addShop(userId, data) {
		return http.post(`/addShop?userId=${userId}`, data);
	},
	//修改店铺信息
	/**
	 * @param { String } data.shopName
	 * @param { String } data.shopLogo
	 * @param { String } data.shopBrief
	 */
	updateShop(shopId, data) {
		return http.post(`/updateShop?shopId=${shopId}`, data);
	},
	//删除店铺
	deleteShop(shopId) {
		return http.delete(`/deleteShop?shopId=${shopId}`);
	},
	//获取店铺信息列表
	getShopList(userId) {
		return http.get(`/list?userId=${userId}`);
	},
	//获取店铺信息
	/**
	 * @param { Number } params.shopId
	 */
	getShopInfo(params) {
		return http.get('/getShopInfo', { params });
	}
};
