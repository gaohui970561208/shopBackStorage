import Vue from 'vue';
import Vuex from 'vuex';
import users from './users';
import classify from './classify';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		users,
		classify
	}
});
