import { users, errors } from '@/api';

export default {
	namespaced: true,
	state: {
		userInfo: {}
	},
	mutations: {
		SET_USERINFO(state, data) {
			state.userInfo = data;
		}
	},
	actions: {
		async setUserInfo({ commit }, ploy) {
			try {
				const { data, ok } = await users.getUserInfo(ploy);
				if (!ok) return;
				commit('SET_USERINFO', data.data);
			} catch (error) {
				errors(error);
			}
		}
	}
};
