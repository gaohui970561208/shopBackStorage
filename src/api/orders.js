import { httpCreate } from './http';

const http = httpCreate('/api/order');

export const order = {
	//获取订单列表
	getOrderList(shopId) {
		return http.get(`/getOrderList?shopId=${shopId}`);
	},
	//创建订单
	/**
	 *
	 * @param { Number } userId
	 * @param { Number } data.shopId
	 * @param { Array } data.categoryIdList
	 * @param { Number } data.price
	 */
	createOrder(userId, data) {
		return http.post(`/createOrder?userId=${userId}`, data);
	},
	//获取订单详情
	orderInfo(orderId) {
		return http.get(`/orderInfo?orderId=${orderId}`);
	},
	//订单支付
	payOrder(orderId) {
		return http.put(`/payOrder?orderId=${orderId}`);
	},
	//订单发货
	sendOrder(orderId) {
		return http.put(`/sendOrder?orderId=${orderId}`);
	},
	//确认收获
	confirmOrder(orderId) {
		return http.put(`/confirmOrder?orderId=${orderId}`);
	},
	//发起退款
	/**
	 * @param { String } data.backDes 退款理由
	 */
	createBack(orderId, data) {
		return http.post(`/createBack?orderId=${orderId}`, data);
	},
	//同意退款
	confirmBack(orderId) {
		return http.put(`/confirmBack?orderId=${orderId}`);
	},
	//退款驳回
	cancelBack(orderId) {
		return http.put(`/cancelBack?orderId=${orderId}`);
	},
	//删除订单
	deleteOrder(orderId) {
		return http.delete(`/deleteOrder?orderId=${orderId}`);
	}
};
