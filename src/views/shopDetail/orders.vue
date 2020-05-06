<style lang="less">
.order_wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 30px 40px;
	.order_product_list {
		width: 100%;
		height: 100px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		.product_itme {
			margin-top: 10px;
			&:first-child {
				margin-top: 0;
			}
		}
	}
	.el-table {
		.cell {
			text-align: center;
		}
	}
	.order_operate_wrap {
		width: 130px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		.opera_btn {
			padding: 0 5px;
			color: #409eff;
			font-size: 14px;
			cursor: pointer;
		}
	}
	.address_wrap {
		width: 100%;
		display: flex;
		flex-flow: column;
		.table {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			.label {
				width: 60px;
				flex-shrink: 0;
			}
			.text {
				text-align: left;
			}
		}
	}
	.product_img {
		width: 80px;
		height: 80px;
		overflow: hidden;
		border-radius: 10px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		img {
			width: 100%;
			height: 100%;
			vertical-align: top;
		}
	}
}
</style>
<template>
	<div class="order_wrap">
		<el-table :data="orderList" style="width: 100%" max-height="800">
			<el-table-column prop="orderId" label="订单号" width="120"> </el-table-column>
			<el-table-column prop="status" label="订单状态" width="100">
				<template slot-scope="scope">
					<div class="cell">
						<span>{{ scope.row.status | orderStatusFormat }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="商品列表">
				<template slot-scope="scope">
					<div class="order_product_list">
						<div class="product_item" v-for="(item, index) in scope.row.productList" :key="index">
							<div class="product_img">
								<img :src="item.cateImgUrl || null" alt="" />
							</div>
							<span>{{ item.productName }}.{{ item.categoryName }} X {{ item.productNum }}</span>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column width="200" prop="address" label="收货地址">
				<template slot-scope="scope">
					<div class="address_wrap">
						<div class="table">
							<div class="label">姓名：</div>
							<div class="text">{{ scope.row.address.name }}</div>
						</div>
						<div class="table">
							<div class="label">手机：</div>
							<div class="text">{{ scope.row.address.phone }}</div>
						</div>
						<div class="table">
							<div class="label">地址：</div>
							<div class="text">{{ scope.row.address.address }}</div>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="订单金额">
				<template slot-scope="scope">
					<div class="cell">
						<span>{{ scope.row.price | priceFormat }} 元</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="backStatus" label="退款状态">
				<template slot-scope="scope">
					<div class="cell">
						<span>{{ scope.row.backStatus | backStatusFormat }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column width="150" label="操作">
				<template slot-scope="scope">
					<div class="order_operate_wrap">
						<span class="opera_btn" v-if="scope.row.status === 1" @click="sendProductDiaog(scope.row)"
							>发货</span
						>
						<span class="opera_btn" v-if="scope.row.backStatus === 1" @click="backShow(scope.row)"
							>退款查看</span
						>
						<span class="opera_btn" v-if="scope.row.status === 5" @click="deleteDialog(scope.row)"
							>删除</span
						>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import { order, errors } from '@/api';
import { mapState } from 'vuex';

export default {
	filters: {
		orderStatusFormat(val) {
			if (val === 0) {
				return '未付款';
			} else if (val === 1) {
				return '待发货';
			} else if (val === 2) {
				return '已发货';
			} else if (val === 3) {
				return '已收货';
			} else if (val === 4) {
				return '已完成';
			} else if (val === 5) {
				return '已取消';
			}
		},
		payStatusFormat(val) {
			if (val == 0) {
				return '未付款';
			} else if (val === 1) {
				return '正在支付';
			} else if (val === 2) {
				return '已付款';
			} else if (val === 3) {
				return '付款失败';
			}
		},
		priceFormat(val) {
			if (!val) return '0.00';
			return (val / 100).toFixed(2);
		},
		backStatusFormat(val) {
			if (val === 0) {
				return '正常';
			} else if (val === 1) {
				return '发起退款';
			} else if (val === 2) {
				return '退款完成';
			} else if (val === 3) {
				return '退款驳回';
			}
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	data() {
		return {
			shopId: this.$route.params.id,
			orderList: []
		};
	},
	mounted() {
		this.getOrderList();
	},
	methods: {
		async getOrderList() {
			this.orderList = [];
			try {
				const { data, ok } = await order.getOrderList(this.shopId);
				if (!ok) return;
				console.log(data);
				this.orderList.push(...data.data);
			} catch (error) {
				errors(error);
			}
		},
		//发货弹框
		sendProductDiaog(data) {
			this.$confirm('确认发货?', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消'
			})
				.then(() => {
					this.sendProduct(data.orderId);
				})
				.catch(() => {
					return;
				});
		},
		//修改订单发货状态
		async sendProduct(orderId) {
			try {
				const { data, ok } = await order.sendOrder(orderId);
				if (!ok) return;
				this.$message.success(data.msg);
				this.getOrderList();
			} catch (error) {
				errors(error);
			}
		},
		backShow(data) {
			const backMsg = data.backDes;
			this.$confirm(backMsg, '退款理由', {
				confirmButtonText: '确认退款',
				cancelButtonText: '退款驳回'
			})
				.then(() => {
					this.confirmBack(data.orderId);
				})
				.catch(() => {
					this.cancelBack(data.orderId);
				});
		},
		//确认退款
		async confirmBack(orderId) {
			try {
				const { data, ok } = await order.confirmBack(orderId);
				if (!ok) return;
				this.$message.success(data.msg);
				this.getOrderList();
			} catch (error) {
				errors(error);
			}
		},
		//退款驳回
		async cancelBack(orderId) {
			try {
				const { data, ok } = await order.cancelBack(orderId);
				if (!ok) return;
				this.$message.success(data.msg);
				this.getOrderList();
			} catch (error) {
				errors(error);
			}
		},
		//删除弹框
		deleteDialog(data) {
			this.$confirm('是否删除', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消'
			})
				.then(() => {
					this.deleteOrder(data.orderId);
				})
				.catch(() => {
					return;
				});
		},
		async deleteOrder(orderId) {
			try {
				const { data, ok } = await order.deleteOrder(orderId);
				if (!ok) return;
				this.$message.success(data.msg);
				this.getOrderList();
			} catch (error) {
				errors(error);
			}
		}
	}
};
</script>
