<style lang="less">
#app {
	width: 100%;
	height: 100vh;
	overflow: hidden;
}
</style>

<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import { classify, errors } from '@/api';
import { mapActions } from 'vuex';

export default {
	mounted() {
		this.getClassifyList();
	},
	methods: {
		...mapActions({
			getClassifyList: 'classify/setClassifyList'
		})
	}
};
</script>
