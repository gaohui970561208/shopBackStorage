<style lang="less">
.index {
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	transition: all 0.3s linear;
	.content_wrap {
		flex: 1;
	}
}
@media screen and (max-width: 1400px) {
	.index {
		.nav_wrap {
			width: 100px;
		}
		.logo_wrap {
			height: 80px;
			padding: 0 10px;
			span {
				color: #ffffff;
				letter-spacing: 2px;
				font-size: 18px;
			}
		}
		.nav {
			width: 100%;
			.nav_item {
				width: 100%;
				height: 100px;
				display: flex;
				background-color: #666666;
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;
			}
			.icon {
				font-size: 24px;
				color: #ffffff;
			}
			span {
				padding-left: 0;
				padding-top: 10px;
				font-size: 20px;
				color: #ffffff;
			}
		}
	}
}
</style>
<template>
	<div class="index">
		<div class="content_wrap">
			<HeadBar />
			<router-view />
		</div>
	</div>
</template>
<script>
import HeadBar from '@/components/index/header.vue';
import { mapState } from 'vuex';
import { users, errors } from '@/api';

export default {
	data() {
		return {
			msg: '点击登录'
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	components: {
		HeadBar
	},
	mounted() {},
	methods: {
		goto(name) {
			if (name === this.$route.name) return;
			this.$router.push({
				name: name
			});
		}
	}
};
</script>
