<style lang="less">
.shop_index_wrap {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	transition: all 0.3s linear;
	.nav_wrap {
		width: 200px;
		height: 100%;
		background-color: #979797;
		transition: all 0.3s linear;
		flex-shrink: 1;
	}
	.logo_wrap {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(to top, rgba(137, 121, 210, 0.6), rgba(172, 169, 110, 0.8));
		transition: all 0.3s linear;
		span {
			color: #ffffff;
			letter-spacing: 2px;
			font-size: 22px;
			text-shadow: 5px 5px 5px rgba(210, 139, 231, 0.8), 3px 5px 5px rgba(26, 170, 217, 0.8);
		}
	}
	.nav {
		width: 100%;
		.nav_item {
			margin: 5px 0;
			width: 100%;
			height: 70px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}
		.icon {
			font-size: 24px;
			color: #ffffff;
		}
		span {
			padding-left: 20px;
			font-size: 20px;
			color: #ffffff;
		}
	}
	.content_wrap {
		width: calc(100vw - 200px);
		flex: 1;
	}
}
@media screen and (max-width: 1400px) {
	.shop_index_wrap {
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
	.content_wrap {
		width: calc(100vw - 100px);
		flex: 1;
	}
}
</style>
<template>
	<div class="shop_index_wrap">
		<div class="nav_wrap">
			<div class="logo_wrap">
				<span>电子商务管理系统</span>
			</div>
			<div class="nav">
				<div class="nav_item" @click="goto('shopInfo')">
					<i class="icon iconfont iconziyuan9"></i>
					<span>店铺信息</span>
				</div>
				<div class="nav_item" @click="goto('products')">
					<i class="icon iconfont iconziyuan"></i>
					<span>商品管理</span>
				</div>
				<div class="nav_item" @click="goto('orders')">
					<i class="icon iconfont iconziyuan9"></i>
					<span>订单管理</span>
				</div>
			</div>
		</div>
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
