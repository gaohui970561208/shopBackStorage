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
		background-color: rgba(253, 182, 255, 0.2);
		transition: all 0.3s linear;
		flex-shrink: 1;
	}
	.nav {
		width: 100%;
		.nav_item {
			margin: 5px 0;
			width: 100%;
			height: 70px;
			display: flex;
			background-color: rgb(255, 225, 253);
			border-radius: 30px 0 0 30px;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			transition: all 0.3s linear;
		}
		.active_nav {
			background-color: rgb(209, 209, 209);
		}
		.icon {
			font-size: 24px;
			color: rgb(66, 66, 66);
		}
		span {
			padding-left: 20px;
			font-size: 20px;
			color: rgb(71, 71, 71);
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
		.nav {
			width: 100%;
			.nav_item {
				width: 100%;
				height: 100px;
				display: flex;
				background-color: rgb(209, 209, 209);
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;
				border-radius: 30px 0 0 30px;
			}
			.active_nav {
				background-color: rgb(138, 138, 138);
			}
			.nav_text {
				display: none;
			}
			.icon {
				font-size: 40px;
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
			<div class="nav">
				<div
					class="nav_item"
					:class="!routeName || routeName === 'shopInfo' ? 'active_nav' : ''"
					@click="goto('shopInfo')"
				>
					<i class="icon iconfont iconziyuan9"></i>
					<span class="nav_text">店铺信息</span>
				</div>
				<div class="nav_item" :class="routeName === 'products' ? 'active_nav' : ''" @click="goto('products')">
					<i class="icon iconfont icongoods-copy"></i>
					<span class="nav_text">商品管理</span>
				</div>
				<div class="nav_item" :class="routeName === 'orders' ? 'active_nav' : ''" @click="goto('orders')">
					<i class="icon iconfont icondingdan"></i>
					<span class="nav_text">订单管理</span>
				</div>
			</div>
		</div>
		<div class="content_wrap">
			<router-view />
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import { users, errors } from '@/api';

export default {
	data() {
		return {
			routeName: null
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	watch: {
		$route(newVal) {
			this.routeName = newVal.name;
		}
	},
	mounted() {
		this.routeName = this.$route.name;
		console.log(this.routeName);
	},
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
