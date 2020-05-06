<style lang="less">
.product_wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 30px 40px;
	.operate_wrap {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}
	.product_select {
		width: 80%;
	}
	.add_product_wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 20px 20px;
		.info_item {
			margin-top: 20px;
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			&:first-child {
				margin-top: 0;
			}
		}
		.label {
			width: 100px;
			font-size: 20px;
			text-align: right;
		}
		.text {
			outline: none;
			border: 0;
			border-bottom: 1px solid #393939;
			padding: 5px 20px;
			font-size: 20px;
			color: #393939;
		}
		.product_img_wrap {
			width: 100px;
			height: 100px;
			overflow: hidden;
			border-radius: 3px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			border: 1px solid #939393;
			cursor: pointer;
			img {
				width: 100%;
				height: 100%;
				vertical-align: top;
			}
		}
		.upload_text {
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			.up_text {
				text-align: center;
				color: #363636;
			}
			.up_tips {
				font-size: 12px;
				color: #939393;
			}
		}
	}
	.product_img {
		width: 150px;
		height: 150px;
		overflow: hidden;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		img {
			vertical-align: middle;
			object-fit: cover;
			width: 100%;
		}
	}
	.list_operate_wrap {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		.btn {
			padding: 0 5px;
			color: #409eff;
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	.el-table {
		margin-top: 50px;
		.cell {
			text-align: center;
		}
		.el-table__body-wrapper {
			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
}
</style>
<template>
	<div class="product_wrap">
		<div class="operate_wrap">
			<el-input placeholder="请输入商品名称" v-model.trim="searchTitle" class="input-with-select product_select">
				<el-button slot="append" icon="el-icon-search" @click="searchProducts"></el-button>
			</el-input>
			<div class="btn_wrap">
				<el-button class="btn" type="primary" @click="addProductDialog">添加商品</el-button>
			</div>
		</div>
		<el-table :data="productsList" max-height="700">
			<el-table-column prop="productName" label="商品名称" width="200"> </el-table-column>
			<el-table-column prop="productImg" label="商品图片" width="180">
				<template slot-scope="scope">
					<div class="product_img">
						<img :src="scope.row.productImg" alt="" />
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="categoryName" label="默认规格"> </el-table-column>
			<el-table-column prop="cateNum" label="默认规格库存"> </el-table-column>
			<el-table-column prop="catePrice" label="默认规格价格">
				<template slot-scope="scope">
					<div class="cell">{{ scope.row.catePrice | pirceFormat }}</div>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<div class="list_operate_wrap">
						<span class="btn" @click="updateStatus(1, 1, scope.row)" v-if="scope.row.status === 0"
							>上架</span
						>
						<span class="btn" @click="updateStatus(1, 0, scope.row)" v-if="scope.row.status === 1"
							>下架</span
						>
						<span class="btn" @click="editProduct(scope.row)">编辑</span>
						<span class="btn" @click="updateStatus(2, 1, scope.row)">删除</span>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<ProductInfo ref="productInfo" />
	</div>
</template>
<script>
import { product, errors } from '@/api';
import ProductInfo from '@/components/product/create';

export default {
	components: {
		ProductInfo
	},
	filters: {
		pirceFormat(val) {
			if (!val) return '0.00';
			return (val / 100).toFixed(2);
		}
	},
	data() {
		return {
			shopId: this.$route.params.id,
			productsList: [],
			searchTitle: '',
			productShowImg: null,
			productDesShowList: [],
			productData: {
				productName: '',
				productImg: null,
				productDescript: '',
				productDesList: [],
				classifyId: 0,
				status: 0,
				categoryList: []
			}
		};
	},
	mounted() {
		this.getProductList();
	},
	methods: {
		//获取商品列表
		async getProductList() {
			this.productsList = [];
			try {
				const { data, ok } = await product.listBack(this.shopId);
				if (!ok) return;
				console.log(data);
				this.productsList.push(...data.data);
			} catch (error) {
				errors(error);
			}
		},
		async searchProducts() {
			this.productsList = [];
			try {
				const params = {
					shopId: this.shopId
				};
				const reData = {
					title: this.searchTitle
				};
				const { data, ok } = await product.searchProducts(params, reData);
				if (!ok) return;
				console.log(data);
				this.productsList.push(...data.data);
			} catch (error) {
				errors(error);
			}
		},
		//添加商品弹窗
		addProductDialog() {
			this.$refs.productInfo.show('创建商品');
		},
		getFile(file, fileList) {
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			this.productShowImg = URL.createObjectURL(file.raw);
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.productData.productImg = baseStr;
			};
		},
		getDesFile(file, fileList) {
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			this.productShowImg = URL.createObjectURL(file.raw);
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.productData.productDesList.push(baseStr);
			};
		},
		//状态改变弹窗
		updateStatus(type, status, data) {
			let message = '';
			if (type === 1) {
				if (status === 0) {
					message = '是否下架？';
				} else if (status === 1) {
					message = '是否上架？';
				}
			} else if (type === 2) {
				message = '是否删除？';
			}
			this.$confirm(message, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				center: true
			})
				.then(() => {
					const params = {
						productId: data.productId
					};
					const reData = {
						type: type,
						status: status
					};
					this.updateProductStatus(params, reData);
				})
				.catch(() => {
					return;
				});
		},
		//修改商品信息
		async updateProductStatus(params, reData) {
			try {
				const { data, ok } = await product.updateProductStatus(params, reData);
				if (!ok) return;
				this.$message.success(data.msg);
				this.getProductList();
			} catch (error) {
				errors(error);
			}
		},
		editProduct(data) {
			this.$refs.productInfo.show('编辑商品', data.productId);
		}
	}
};
</script>
