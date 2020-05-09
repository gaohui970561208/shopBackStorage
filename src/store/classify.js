import { product, errors } from '@/api';

export default {
	namespaced: true,
	state: {
		classifyList: []
	},
	mutations: {
		SET_CLASSIFYLIST(state, data) {
			state.classifyList = data;
		}
	},
	actions: {
		async setClassifyList({ commit }, ploy) {
			try {
				const { data, ok } = await product.getClassifyList(ploy);
				if (!ok) return;
				commit('SET_CLASSIFYLIST', data.data);
			} catch (error) {
				errors(error);
			}
		}
	}
};
