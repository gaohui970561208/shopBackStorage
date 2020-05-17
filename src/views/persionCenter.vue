<style lang="less">
.persion_center {
	width: 100%;
	.user_info_wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 30px 50px;
		.user_card {
			width: 100%;
			box-shadow: 0px 0px 3px 3px rgba(255, 190, 235, 0.6);
			border-radius: 5px;
			box-sizing: border-box;
			padding: 40px 50px;
		}
		.user_meg {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}
		.avatar_img_wrap {
			width: 200px;
			height: 200px;
			box-shadow: 0px 0px 1px 1px rgba(255, 190, 235, 0.6);
			border-radius: 50%;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				vertical-align: top;
			}
		}
		.operate_btn_wrap {
			position: absolute;
			top: 300px;
			width: 240px;
			height: 50px;
			font-size: 14px;
			align-self: flex-start;
			display: flex;
			flex-flow: column nowrap;
			.btn {
				font-size: #636363;
				cursor: pointer;
				input {
					display: none;
				}
			}
			.upload_avatar {
				width: 100%;
			}
			.el-upload {
				width: 100%;
			}
		}
	}
	.meg_content {
		margin-left: 100px;
		width: 40%;
		display: flex;
		flex-flow: column nowrap;
		.meg_item {
			margin-top: 40px;
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			font-size: 22px;
			color: #393939;
			div {
				color: inherit;
				font-size: inherit;
			}
			.icon {
				margin-left: 20px;
				font-size: 22px;
				color: #409eff;
				cursor: pointer;
			}
			&:first-child {
				margin-top: 0;
			}
			.descript {
				max-width: 90%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
	.user_price {
		width: 200px;
		.price_title {
			font-size: 40px;
			color: rgb(139, 135, 75);
		}
		.price_content {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			margin-top: 30px;
			.icon {
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.price_number {
				margin-left: 30px;
				font-size: 30px;
				color: #393939;
			}
		}
	}
	.shop_list_wrap {
		margin-top: 10px;
		width: 100%;
		box-sizing: border-box;
		padding: 30px 50px;
		.shop_list_tips {
			font-size: 30px;
			color: #393939;
		}
		.shop_table {
			margin-top: 10px;
			padding: 0 20px;
			box-shadow: 0px 0px 1px 1px rgba(255, 190, 235, 0.6);
			height: 300px;
			position: relative;
			.shop_table_logo {
				width: 100px;
				height: 100px;
				border-radius: 5px;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					vertical-align: top;
					width: 100%;
					height: 100%;
				}
			}
			.cell {
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.el-table__body-wrapper {
				&::-webkit-scrollbar {
					display: none;
				}
			}
			.shop_table_operate {
				width: 100%;
				height: 50px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-around;
				align-items: center;
				.btn {
					padding: 10px 20px;
					color: rgb(27, 152, 255);
					cursor: pointer;
				}
			}
		}
		.create_shop_btn {
			position: absolute;
			top: -50px;
			right: 0px;
		}
	}
	.edit_wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 20px 20px;
		.edit_item {
			margin-top: 40px;
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			&:first-child {
				margin-top: 0;
			}
		}
		.label {
			width: 150px;
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
		.shop_logo_wrap {
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
}
</style>
<template>
	<div class="persion_center">
		<div class="user_info_wrap">
			<div class="user_card">
				<div class="user_meg">
					<div class="avatar_img_wrap">
						<img :src="userInfo.avatarUrl" alt="" v-if="userInfo.avatarUrl" />
						<img src="../assets/img/default_user.jpg" alt="" v-else />
					</div>
					<div class="meg_content">
						<div class="meg_item">
							<div class="text">{{ userInfo.nickName || userInfo.userName || '昵称' }}</div>
						</div>
						<div class="meg_item">
							<div class="text">{{ userInfo.phone }}</div>
						</div>
						<div class="meg_item">
							<div class="text descript">{{ userInfo.descript || '暂无简介' }}</div>
						</div>
					</div>
					<div class="user_price">
						<div class="price_title">我的收益</div>
						<div class="price_content">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#iconicon_A5"></use>
							</svg>
							<div class="price_number">{{ userInfo.profit | profitFormat }} 元</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="shop_list_wrap">
			<div class="shop_list_tips">我的店铺：</div>
			<div class="shop_table">
				<div class="create_shop_btn">
					<el-button @click="createShow = true">创建店铺</el-button>
				</div>
				<el-table max-height="300" :data="shopList" style="width: 100%">
					<el-table-column prop="shopName" label="店铺名称" width="180"> </el-table-column>
					<el-table-column prop="shopLogo" label="店铺logo" width="180">
						<template slot-scope="scope">
							<div class="shop_table_logo">
								<img :src="scope.row.shopLogo" alt="" />
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="shopBrief" label="店铺简介"> </el-table-column>
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<div class="shop_table_operate">
								<div class="btn" @click="toShopDetail(scope.row)">查看</div>
								<div class="btn" @click="editShop(scope.row)">修改</div>
								<div class="btn" @click="deleteShopDialog(scope.row)">删除</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog title="提示" :visible.sync="editShow" :center="true">
			<div class="edit_wrap">
				<div class="edit_item">
					<div class="label">店铺名称：</div>
					<input type="text" class="text" v-model="shopData.shopName" placeholder="请输入店铺名称" />
				</div>
				<div class="edit_item">
					<div class="label">店铺简介：</div>
					<input type="text" class="text" v-model="shopData.shopBrief" placeholder="请输入店铺简介" />
				</div>
				<div class="edit_item">
					<div class="label">店铺Logo：</div>
					<el-upload action="" :show-file-list="false" :auto-upload="false" :on-change="getFile">
						<div class="shop_logo_wrap" v-if="editLogoSrc">
							<img :src="editLogoSrc" alt="" v-if="editLogoSrc" />
						</div>
						<el-button v-else>点击上传logo</el-button>
					</el-upload>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editShow = false">取 消</el-button>
				<el-button type="primary" @click="updateShop">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="创建店铺" :visible.sync="createShow" :center="true">
			<div class="edit_wrap">
				<div class="edit_item">
					<div class="label">店铺名称：</div>
					<input type="text" class="text" v-model="createShopData.shopName" placeholder="请输入店铺名称" />
				</div>
				<div class="edit_item">
					<div class="label">店铺简介：</div>
					<input type="text" class="text" v-model="createShopData.shopBrief" placeholder="请输入店铺简介" />
				</div>
				<div class="edit_item">
					<div class="label">店铺Logo：</div>
					<el-upload action="" :show-file-list="false" :auto-upload="false" :on-change="createFile">
						<div class="shop_logo_wrap" v-if="createLogoSrc">
							<img :src="createLogoSrc" alt="" v-if="createLogoSrc" />
						</div>
						<el-button v-else>点击上传logo</el-button>
					</el-upload>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="createShow = false">取 消</el-button>
				<el-button type="primary" @click="createShop">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import { users, shop, errors } from '@/api';
import { mapState, mapActions } from 'vuex';

export default {
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	filters: {
		profitFormat(val) {
			if (!val) return '0.00';
			return (val / 100).toFixed(2);
		}
	},
	data() {
		return {
			shopList: [],
			shopData: {
				shopName: null,
				shopLogo: null,
				shopBrief: null
			},
			createShopData: {
				shopName: null,
				shopLogo: null,
				shopBrief: null
			},
			editLogoSrc: null,
			createLogoSrc: null,
			editShow: false,
			createShow: false
		};
	},
	mounted() {
		this.getShopList();
	},
	methods: {
		...mapActions({
			setUserInfo: 'users/setUserInfo'
		}),
		async getShopList() {
			try {
				this.shopList = [];
				const { data, ok } = await shop.getShopList(this.userInfo.userId);
				if (!ok) return;
				this.shopList.push(...data.data);
			} catch (error) {
				errors(error);
			}
		},
		//修改店铺信息
		editShop(data) {
			this.shopData = JSON.parse(JSON.stringify(data));
			this.editLogoSrc = this.shopData.shopLogo;
			this.editShow = true;
		},
		async updateShop() {
			try {
				const { data, ok } = await shop.updateShop(this.shopData.shopId, this.shopData);
				if (!ok) return;
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.editShow = false;
				this.getShopList();
			} catch (error) {
				errors(error);
			}
		},
		getFile(file, fileList) {
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			this.editLogoSrc = URL.createObjectURL(file.raw);
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.shopData.shopLogo = baseStr;
			};
		},
		createFile(file, fileList) {
			console.log(file);
			if (file.size > 500 * 1024) {
				this.$message.error('图片大小太大，请选择500KB以下的图片');
				return;
			}
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			this.createLogoSrc = URL.createObjectURL(file.raw);
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.createShopData.shopLogo = baseStr;
			};
		},
		//店铺详情
		shopDetail(shopId) {
			this.$router.push({
				name: 'shopDetail',
				params: {
					id: shopId
				}
			});
		},
		//创建店铺
		async createShop() {
			if (!this.createShopData.shopName || this.createShopData.shopName.trim() === '') {
				this.$message.error('请输入店铺名称');
				return;
			}
			if (!this.createShopData.shopLogo || this.createShopData.shopLogo.trim() === '') {
				this.$message.error('请上传店铺logo');
				return;
			}
			try {
				const { data, ok } = await shop.addShop(this.userInfo.userId, this.createShopData);
				if (!ok) return;
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.createShow = false;
				this.getShopList();
				this.createShop = {
					shopName: null,
					shopLogo: null,
					shopBrief: null
				};
			} catch (error) {
				errors(error);
			}
		},
		//删除店铺
		deleteShopDialog(item) {
			this.$confirm('确认删除', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消'
			})
				.then(() => {
					this.deleteShop(item.shopId);
				})
				.catch(() => {
					return;
				});
		},
		async deleteShop(shopId) {
			try {
				const { data, ok } = await shop.deleteShop(shopId);
				if (!ok) return;
				this.$message.success(data.msg);
				this.getShopList();
			} catch (error) {
				errors(error);
			}
		},
		//查看店铺详情
		toShopDetail(data) {
			this.$router.push({
				name: 'shopDetail',
				params: {
					id: data.shopId
				}
			});
		}
	}
};
</script>
