import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/views/index.vue'),
		redirect: '/persionCenter',
		children: [
			{
				path: 'persionCenter',
				name: 'persionCenter',
				meta: {
					title: '个人中心'
				},
				component: () => import('@/views/persion')
			},
			{
				path: 'shopManage',
				name: 'shopManage',
				meta: {
					title: '店铺管理'
				},
				component: () => import('@/views/shop')
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue')
	},
	{
		path: '/shopDetail/:id',
		name: 'shopDetail',
		component: () => import('@/views/shopDetail'),
		redirect: '/shopDetail/:id/shopInfo',
		children: [
			{
				path: 'shopInfo',
				name: 'shopInfo',
				meta: {
					title: '店铺信息'
				},
				component: () => import('@/views/shopDetail/shopInfo')
			},
			{
				path: 'products',
				name: 'products',
				meta: {
					title: '商品管理'
				},
				component: () => import('@/views/shopDetail/products')
			},
			{
				path: 'orders',
				name: 'orders',
				meta: {
					title: '订单管理'
				},
				component: () => import('@/views/shopDetail/orders')
			}
		]
	}
];

const router = new VueRouter({
	routes
});

export default router;
