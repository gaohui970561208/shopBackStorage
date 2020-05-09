import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/home'),
		redirect: '/persionCenter',
		children: [
			{
				path: '/persionCenter',
				name: 'persionCenter',
				meta: {
					title: '个人中心'
				},
				component: () => import('@/views/persionCenter')
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
			},
			{
				path: 'admin',
				name: 'admin',
				component: () => import('@/views/admin')
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue')
	}
];

const router = new VueRouter({
	routes
});

export default router;
