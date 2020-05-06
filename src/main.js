import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/default.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

//设置全局路由首位，判断当前是否存在账号信息，若存在，则进行下一步，若不存在，则验证当前是否登录，若验证不通过
router.beforeEach((to, from, next) => {
	if (to.name === 'login') {
		next();
	} else {
		if (
			!store.state.users.userInfo ||
			Object.keys(store.state.users.userInfo).length === 0 ||
			!store.state.users.userInfo.userId
		) {
			if (localStorage.getItem('SHOPLOGIN')) {
				const dataStr = decodeURIComponent(escape(atob(localStorage.getItem('SHOPLOGIN'))));
				const index = dataStr.lastIndexOf('&&');
				const str = dataStr.substring(0, index);
				const time = dataStr.substring(index + 2, dataStr.length);
				const now = new Date().getTime();
				if (now - parseInt(time) > 30 * 60 * 1000) {
					localStorage.removeItem('SHOPLOGIN');
					router.push({
						name: 'login'
					});
					return;
				}
				const userInfo = JSON.parse(str);
				store.dispatch('users/setUserInfo', userInfo);
				next();
			} else {
				router.push({
					name: 'login'
				});
				return;
			}
		} else {
			next();
		}
	}
});

let app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
