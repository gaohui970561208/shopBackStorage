<style lang="less">
.create_wrap {
	box-sizing: border-box;
	padding: 10px 0px;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	max-height: 60vh;
	overflow-x: hidden;
	overflow-y: auto;
	.contrainer {
		width: 540px;
	}
	.info_item {
		margin-top: 20px;
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		.label {
			width: 100px;
			font-size: 14px;
			color: #393939;
			text-align: right;
		}
		.info_text {
			width: 400px;
			box-sizing: border-box;
			font-size: 14px;
			color: #393939;
			padding: 5px 10px;
			border: 0;
			border-bottom: 1px solid #393939;
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
			}
			&[type='number'] {
				-moz-appearance: textfield;
			}
		}
		&:first-child {
			margin-top: 0;
		}
		.item_wrap {
			width: 400px;
		}
		.category_img_wrap {
			width: 60px;
			height: 60px;
			overflow: hidden;
			border-radius: 5px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			img {
				width: 100%;
				object-fit: cover;
				vertical-align: top;
			}
		}
		.table_label {
			padding-top: 20px;
			align-self: flex-start;
		}
		.table {
			margin-top: 0;
			border: 1px solid #939393;
		}
		.product_show_img {
			width: 150px;
			height: 150px;
			border-radius: 3px;
			overflow: hidden;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			border: 1px solid #939393;
			position: relative;
			img {
				width: 100%;
				vertical-align: top;
				object-fit: cover;
			}
			.del_icon {
				position: absolute;
				top: 10px;
				right: 10px;
				font-size: 20px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: rgba(0, 0, 0, 0.4);
				cursor: pointer;
			}
		}
		.img_label {
			align-self: flex-start;
		}
		.product_descript_list {
			width: 400px;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			.product_show_img {
				margin-top: 10px;
				&:nth-of-type(1),
				&:nth-of-type(2) {
					margin-top: 0;
				}
			}
		}
	}
	.el-table {
		.cell {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			text-align: center;
		}
		.el-table__body-wrapper {
			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
	.category_operate {
		width: 100%;
		box-sizing: border-box;
		padding: 0 5px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		.icon {
			font-size: 16px;
			color: #939393;
			cursor: pointer;
		}
		.default {
			color: #409eff;
		}
	}
	.el-dialog {
		width: 1100px;
	}
	.upload_text {
		width: 100%;
		height: 100%;
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
	.add_btn {
		margin-top: 20px;
	}
	.upload_descipt {
		margin-top: 30px;
	}
}
.create_category_wrap {
	flex-flow: column nowrap;
	.info_item {
		margin-top: 20px;
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		.label {
			width: 100px;
			font-size: 14px;
			color: #393939;
			text-align: right;
		}
		.info_text {
			width: 400px;
			box-sizing: border-box;
			font-size: 14px;
			color: #393939;
			padding: 5px 10px;
			border: 0;
			border-bottom: 1px solid #393939;
		}
		&:first-child {
			margin-top: 0;
		}
		.item_wrap {
			width: 400px;
		}
		.category_img_wrap {
			width: 60px;
			height: 60px;
			overflow: hidden;
			border-radius: 5px;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			img {
				width: 100%;
				object-fit: cover;
				vertical-align: top;
			}
		}
		.table_label {
			padding-top: 20px;
			align-self: flex-start;
		}
		.table {
			margin-top: 0;
			border: 1px solid #939393;
		}
		.product_show_img {
			width: 150px;
			height: 150px;
			border-radius: 3px;
			overflow: hidden;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			border: 1px solid #939393;
			img {
				width: 100%;
				vertical-align: top;
				object-fit: cover;
			}
		}
		.img_label {
			align-self: flex-start;
		}
		.product_descript_list {
			width: 400px;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			.product_show_img {
				margin-top: 10px;
				&:nth-of-type(1),
				&:nth-of-type(2) {
					margin-top: 0;
				}
			}
		}
	}
	.upload_text {
		width: 100%;
		height: 100%;
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
</style>
<template>
	<el-dialog :title="title" :visible.sync="showStatus" @closed="deleteCreateCategoy" :center="true">
		<div class="create_wrap">
			<div class="contrainer">
				<div class="info_item">
					<div class="label">商品名称：</div>
					<input
						type="text"
						class="info_text"
						v-model="productData.productName"
						placeholder="请输入商品名称"
					/>
				</div>
				<div class="info_item">
					<div class="label">商品描述：</div>
					<input
						type="text"
						class="info_text"
						v-model="productData.productDescript"
						placeholder="请输入商品描述"
					/>
				</div>
				<div class="info_item">
					<div class="label">商品类型：</div>
					<el-select v-model="productData.classifyId" placeholder="请选择">
						<el-option
							v-for="(item, index) in classifyList"
							:key="index"
							:label="item.classifyName"
							:value="item.classifyId"
						>
						</el-option>
					</el-select>
				</div>
				<div class="info_item">
					<div class="label">商品状态：</div>
					<el-switch
						v-model="productData.status"
						active-text="上架"
						inactive-text="下架"
						:active-value="1"
						:inactive-value="0"
					>
					</el-switch>
				</div>
				<div class="info_item">
					<div class="label table_label">商品规格：</div>
					<div class="item_wrap">
						<el-table class="table" :data="productData.categoryList" style="width: 100%" max-height="260">
							<el-table-column prop="categoryName" label="规格名称" width="80"> </el-table-column>
							<el-table-column prop="cateNum" label="规格库存" width="80"> </el-table-column>
							<el-table-column prop="catePrice" label="规格价格" width="80">
								<template slot-scope="scope">
									<span>{{ scope.row.catePrice | priceForamt }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="cateImgUrl" label="规格图片" width="80">
								<template slot-scope="scope">
									<div class="category_img_wrap">
										<img :src="scope.row.cateImgUrl" alt="" />
									</div>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="80">
								<template slot-scope="scope">
									<div class="category_operate">
										<el-tooltip class="item" effect="dark" content="设为默认" placement="top">
											<i
												class="btn icon iconfont iconsheweimoren"
												:class="
													productData.defaultCategoryId === scope.row.categoryId
														? 'default'
														: ''
												"
												@click="defaultCategory(scope.row)"
											></i>
										</el-tooltip>
										<el-tooltip class="item" effect="dark" content="编辑" placement="top">
											<i
												class="btn icon iconfont iconbianji"
												@click="editCategoryDialog(scope.row)"
											></i>
										</el-tooltip>
										<el-tooltip class="item" effect="dark" content="删除" placement="top">
											<i
												class="btn icon iconfont iconshanchu"
												@click="deleteCategory(scope.row, scope.$index)"
											></i>
										</el-tooltip>
									</div>
								</template>
							</el-table-column>
						</el-table>
						<el-button class="add_btn" type="primary" @click="addCategoryDialog">添加规格</el-button>
					</div>
				</div>
				<div class="info_item">
					<div class="label img_label">商品展示图片：</div>
					<el-upload action="" :show-file-list="false" :auto-upload="false" :on-change="getProductImgFile">
						<div class="product_show_img" v-if="productData.productImg">
							<img :src="productData.productImg" alt="" v-if="productData.productImg" />
						</div>
						<el-button v-else>上传商品展示图片</el-button>
					</el-upload>
				</div>
				<div class="info_item">
					<div class="label img_label">商品描述图片：</div>
					<div class="product_descript_list">
						<div class="product_show_img" v-for="(item, index) in productData.productDesList" :key="index">
							<i class="icon iconfont iconshanchu del_icon" @click="deleteProductDesDialog(index)"></i>
							<img :src="item" alt="" />
						</div>
						<el-upload
							class="upload_descipt"
							action=""
							:show-file-list="false"
							:auto-upload="false"
							:on-change="getDesListFile"
						>
							<el-tooltip
								class="item"
								effect="dark"
								content="图片会依次竖向排列在商品详情区域"
								placement="top"
							>
								<el-button>上传商品描述图片</el-button>
							</el-tooltip>
						</el-upload>
					</div>
				</div>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="addProduct">确 定</el-button>
		</span>
		<el-dialog :title="dialogTitle" :visible.sync="categoryShow" :append-to-body="true">
			<div class="create_category_wrap">
				<div class="info_item">
					<div class="label">规格名称：</div>
					<input
						type="text"
						class="info_text"
						v-model="categoryData.categoryName"
						placeholder="请输入规格名称"
					/>
				</div>
				<div class="info_item">
					<div class="label">规格库存：</div>
					<input
						type="text"
						class="info_text"
						v-model="categoryData.cateNum"
						placeholder="请输入规格的库存"
					/>
				</div>
				<div class="info_item">
					<div class="label">规格价格：</div>
					<input
						type="text"
						class="info_text"
						v-model="categoryData.catePrice"
						placeholder="请输入此规格的价格，单位为分"
					/>
				</div>
				<div class="info_item">
					<div class="label">规格图片：</div>
					<div class="product_show_img">
						<el-upload action="" :show-file-list="false" :auto-upload="false" :on-change="getCateFile">
							<img :src="categoryData.cateImgUrl" alt="" v-if="categoryData.cateImgUrl" />
							<div class="upload_text" v-else>
								<span class="up_text">上传规格商品图片</span>
								<span class="up_text up_tips">只能上传jpg/png文件</span>
								<span class="up_text up_tips">大小不超过500kb</span>
							</div>
						</el-upload>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="categoryShow = false">取 消</el-button>
				<el-button type="primary" @click="addCategory">确 定</el-button>
			</span>
		</el-dialog>
	</el-dialog>
</template>
<script>
import { product, errors } from '@/api';
import { mapState } from 'vuex';

export default {
	filters: {
		priceForamt(val) {
			if (!val) return '0.00';
			return (val / 100).toFixed(2);
		}
	},
	computed: {
		...mapState({
			classifyList: state => state.classify.classifyList
		})
	},
	data() {
		return {
			shopId: this.$route.params.id,
			title: '',
			productId: null,
			productData: {
				productName: '',
				productDescript: '',
				classifyId: null,
				categoryList: [],
				defaultCategoryId: 0,
				productImg: null,
				productDesList: [],
				status: 0
			},
			isCreate: true,
			showStatus: false,
			dialogTitle: '',
			categoryShow: false,
			categoryData: {
				shopId: this.$route.params.id,
				categoryName: '',
				cateNum: '',
				catePrice: '',
				cateImgUrl: null
			}
		};
	},
	methods: {
		show(title, productId) {
			this.title = title;
			if (productId) {
				this.productId = productId;
				this.getProductInfo(productId);
			}
			this.showStatus = true;
		},
		close() {
			this.showStatus = false;
			this.productId = null;
			this.title = '';
		},
		deleteCreateCategoy() {
			//创建状态下，退出时将所有的未定义的规格数据删除
			if (this.productData.categoryList.length > 0 && !this.productData.productId) {
				this.productData.categoryList.forEach(element => {
					product.deleteCategory(element.categoryId).then(({ data, ok } = res) => {
						if (!ok) return;
					});
				});
			}
		},
		//获取商品信息
		async getProductInfo(productId) {
			try {
				const { data, ok } = await product.productInfo(productId);
				if (!ok) return;
				this.productData = data.data;
			} catch (error) {
				errors(error);
			}
		},
		//添加规格
		async addCategory() {
			if (this.categoryData.categoryId) {
				this.editCategory();
				return;
			}
			if (
				parseInt(this.categoryData.cateNum) !== Number(this.categoryData.cateNum) ||
				parseInt(this.categoryData.catePrice) !== Number(this.categoryData.catePrice)
			) {
				this.$message.error('请输入正确的数字');
				return;
			}
			try {
				let params = null;
				if (this.productData.productId) {
					params = {
						shopId: this.shopId,
						productId: this.productData.productId
					};
				} else {
					params = {
						shopId: this.shopId
					};
				}
				const { data, ok } = await product.addCategory(params, this.categoryData);
				if (!ok) return;
				let cateData = this.categoryData;
				cateData.categoryId = data.data.insertId;
				this.productData.categoryList.push(cateData);
				//只有一个的时候直接默认此规格
				if (this.productData.categoryList.length === 1) {
					this.productData.defaultCategoryId = data.data.insertId;
				}
				//创建成功之后，将所有的数据回归到原本的状态
				this.closeCategoryDialog();
			} catch (error) {
				errors(error);
			}
		},
		//编辑规格
		async editCategory() {
			try {
				const { data, ok } = await product.updateCategory(this.categoryData.categoryId, this.categoryData);
				if (!ok) return;
				this.$message.success(data.msg);
				this.closeCategoryDialog();
			} catch (error) {
				errors(error);
			}
		},
		//获取商品展示图片
		getProductImgFile(file, fileList) {
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.productData.productImg = baseStr;
			};
		},
		//描述列表图片
		getDesListFile(file, fileList) {
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.productData.productDesList.push(baseStr);
			};
		},
		//添加规格图片
		getCateFile(file, fileList) {
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.categoryData.cateImgUrl = baseStr;
			};
		},
		//添加规格弹框
		addCategoryDialog() {
			this.dialogTitle = '添加规格';
			this.categoryData = {
				categoryName: '',
				cateNum: '',
				catePrice: '',
				cateImgUrl: null
			};
			this.categoryShow = true;
		},
		//关闭规格弹窗
		closeCategoryDialog() {
			this.categoryData = {
				categoryName: '',
				cateNum: '',
				catePrice: '',
				cateImgUrl: null
			};
			this.categoryShow = false;
		},
		//删除规格
		async deleteCategory(cateData, index) {
			if (this.productData.categoryList <= 1) {
				this.$message.error('至少保留一个规格数据');
			}
			try {
				const { data, ok } = await product.deleteCategory(cateData.categoryId);
				if (!ok) return;
				this.$message.success(data.msg);
				this.productData.categoryList.splice(index, 1);
			} catch (error) {
				errors(error);
			}
		},
		//设为默认
		defaultCategory(data) {
			this.productData.defaultCategoryId = data.categoryId;
			this.$message.success('设置成功');
		},
		//编辑规格
		editCategoryDialog(data) {
			this.dialogTitle = '编辑规格';
			this.categoryData = JSON.parse(JSON.stringify(data));
			this.categoryShow = true;
		},
		//添加商品
		async addProduct() {
			if (this.productData.productId) {
				this.editProduct();
				return;
			}
			if (this.productData.categoryList.length === 0) {
				this.$message.error('请添加规格');
				return;
			}
			try {
				const { data, ok } = await product.addProduct(this.shopId, this.productData);
				if (!ok) return;
				this.$parent.getProductList();
				this.productData = {
					productName: '',
					productDescript: '',
					classifyId: null,
					categoryList: [],
					defaultCategoryId: 0,
					productImg: null,
					productDesList: [],
					status: 0
				};
				this.close();
			} catch (error) {
				errors(error);
			}
		},
		async editProduct() {
			try {
				const { data, ok } = await product.updateProduct(this.productData.productId, this.productData);
				if (!ok) return;
				this.$parent.getProductList();
				this.productData = {
					productName: '',
					productDescript: '',
					classifyId: null,
					categoryList: [],
					defaultCategoryId: 0,
					productImg: null,
					productDesList: [],
					status: 0
				};
				this.close();
			} catch (error) {
				errors(error);
			}
		},
		deleteProductDesDialog(index) {
			this.$confirm('是否删除？', '删除描述图片')
				.then(() => {
					console.log(index);
					this.deleteProductDes(index);
				})
				.catch(error => {
					return;
				});
		},
		deleteProductDes(index) {
			this.productData.productDesList.splice(index, 1);
		}
	}
};
</script>
