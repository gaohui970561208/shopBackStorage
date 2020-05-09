import { httpCreate } from './http';

const http = httpCreate('/api/product');

export const product = {
	//添加商品
	/**
	 * @param { String } data.productName
	 * @param { String } data.productImg
	 * @param { String } data.productDescript
	 * @param { String } data.productDesList
	 * @param { Number } data.classifyId
	 * @param { Number } data.status
	 * @param { Array } data.categoryList
	 */
	addProduct(shopId, data) {
		return http.post(`/addProduct?shopId=${shopId}`, data);
	},
	//获取商品列表，后台
	listBack(shopId) {
		return http.get(`/listBack?shopId=${shopId}`);
	},
	//获取商品详情
	productInfo(productId) {
		return http.get(`/productInfo?productId=${productId}`);
	},
	//获取商品列表，移动端
	list() {
		return http.get('/list');
	},
	//添加购物车
	/**
	 * @param { Number } data.categoryId
	 * @param { Number } data.productNum
	 */
	addShopingCart(userId, data) {
		return http.post(`/addShopingCart?userId=${userId}`, data);
	},
	//查询商品，关键字模糊查询
	/**
	 * @param { Number } params.shopId;
	 * @param { Number } data.title;
	 */
	searchProducts(params, data) {
		return http.post('/searchProducts', data, { params });
	},
	//修改商品信息
	/**
	 * @param { String } data.productName
	 * @param { String } data.productImg
	 * @param { String } data.productDescript
	 * @param { String } data.productDesList
	 * @param { Number } data.classifyId
	 * @param { Array } data.categoryList
	 */
	updateProduct(productId, data) {
		return http.post(`/updateProduct?productId=${productId}`, data);
	},
	//添加规格
	/**
	 * @param { Number } data.productId
	 * @param { String } data.categoryName
	 * @param { Number } data.cateNum
	 * @param { Number } data.catePrice
	 * @param { String } data.cateImgUrl
	 */
	addCategory(params, data) {
		return http.post('/addCategory', data, { params });
	},
	//修改规格
	/**
	 * @param { String } data.categoryName
	 * @param { Number } data.cateNum
	 * @param { Number } data.catePrice
	 * @param { String } data.cateImgUrl
	 */
	updateCategory(categoryId, data) {
		return http.post(`/updateCategory?categoryId=${categoryId}`, data);
	},
	//删除规格
	deleteCategory(categoryId) {
		return http.delete(`/deleteCategory?categoryId=${categoryId}`);
	},
	//删除商品及上下架
	/**
	 * @param { Number } params.productId 商品id
	 * @param { Number } data.type 1-上下架操作， 2-删除操作
	 * @param { Number } data.status 上下架操作的状态
	 */
	updateProductStatus(params, data) {
		return http.post('/updateProductStatus', data, { params });
	},
	//添加分类
	addClassify(data) {
		return http.post('/addClassify', data);
	},
	//获取分类列表
	getClassifyList() {
		return http.get('/getClassifyList');
	},
	//删除分类
	deleteClassify(classifyId) {
		return http.delete(`/deleteClassify?classifyId=${classifyId}`);
	},
	//修改分类
	updateClassify(params, data) {
		return http.post('/updateClassify', data, { params });
	}
};
