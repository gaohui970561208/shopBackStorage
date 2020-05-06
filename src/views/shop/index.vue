<style lang="less">
.shop_center {
	width: 100%;
	box-sizing: border-box;
	padding: 30px 50px;
	.title {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		font-size: 24px;
		color: #393939;
		font-weight: 500;
	}
	.shop_list_wrap {
		margin-top: 20px;
		width: 100%;
		max-height: 75vh;
		box-sizing: border-box;
		padding: 10px 2px;
		overflow-x: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar {
			display: none;
		}
		.list_item {
			margin-top: 20px;
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			position: relative;
			padding: 0 20px;
			border-radius: 5px;
			box-shadow: 0px 0px 1px 1px rgba(86, 143, 255, 0.8);
			&:first-child {
				margin-top: 0;
			}
			&:hover {
				box-shadow: 0px 0px 5px 1px rgba(86, 143, 255, 0.8);
			}
			.shop_logo_wrap {
				width: 200px;
				height: 200px;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10px;
				img {
					width: 100%;
					height: 100%;
					vertical-align: top;
				}
			}
			.shop_meg {
				width: 500px;
				margin-left: 100px;
			}
			.meg_item {
				margin-top: 30px;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				&:first-child {
					margin-top: 0;
				}
				.text {
					font-size: 24px;
					color: #393939;
				}
			}
			.edit {
				position: absolute;
				top: 50px;
				right: 100px;
				width: 40px;
				height: 40px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				.icon {
					color: #393939;
					font-size: 30px;
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
				}
			}
			.delete {
				position: absolute;
				top: 50px;
				right: 50px;
				width: 40px;
				height: 40px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				.icon {
					color: #393939;
					font-size: 30px;
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
	.edit_wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 20px 20px;
		.edit_item {
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
			font-size: 25px;
			text-align: right;
		}
		.text {
			outline: none;
			border: 0;
			border-bottom: 1px solid #393939;
			padding: 5px 20px;
			font-size: 25px;
			color: #393939;
		}
		.shop_logo_wrap {
			width: 200px;
			height: 200px;
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
	<div class="shop_center">
		<div class="title">
			<span>店铺列表</span>
			<div class="user_item create_shop">
				<el-button @click="createShow = true">创建店铺</el-button>
			</div>
		</div>
		<div class="shop_list_wrap">
			<div class="list_item" v-for="(item, index) in shopList" :key="index" @click="shopDetail(item.shopId)">
				<div class="shop_logo_wrap">
					<img :src="item.shopLogo" alt="" />
				</div>
				<div class="shop_meg">
					<div class="meg_item">
						<div class="text">店名：</div>
						<div class="text">{{ item.shopName }}</div>
					</div>
					<div class="meg_item">
						<div class="text">简介：</div>
						<div class="text">{{ item.shopBrief }}</div>
					</div>
				</div>
				<div class="edit" @click.stop="editShop(item)">
					<i class="icon iconfont iconbianji"></i>
				</div>
				<div class="delete" @click.stop="deleteShopDialog(item)">
					<i class="icon iconfont iconshanchu"></i>
				</div>
			</div>
		</div>
		<el-dialog title="提示" :visible.sync="editShow">
			<div class="edit_wrap">
				<div class="edit_item">
					<div class="label">店名：</div>
					<input type="text" class="text" v-model="shopData.shopName" placeholder="请输入店铺名称" />
				</div>
				<div class="edit_item">
					<div class="label">简介：</div>
					<input type="text" class="text" v-model="shopData.shopBrief" placeholder="请输入店铺简介" />
				</div>
				<div class="edit_item">
					<div class="label">Logo：</div>
					<el-upload action="" :show-file-list="false" :auto-upload="false" :on-change="getFile">
						<div class="shop_logo_wrap">
							<img :src="editLogoSrc" alt="" v-if="editLogoSrc" />
							<div class="upload_text" v-else>
								<span class="up_text">上传logo</span>
								<span class="up_text up_tips">只能上传jpg/png文件</span>
								<span class="up_text up_tips">大小不超过500kb</span>
							</div>
						</div>
					</el-upload>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editShow = false">取 消</el-button>
				<el-button type="primary" @click="updateShop">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="createShow">
			<div class="edit_wrap">
				<div class="edit_item">
					<div class="label">店名：</div>
					<input type="text" class="text" v-model="createShopData.shopName" placeholder="请输入店铺名称" />
				</div>
				<div class="edit_item">
					<div class="label">简介：</div>
					<input type="text" class="text" v-model="createShopData.shopBrief" placeholder="请输入店铺简介" />
				</div>
				<div class="edit_item">
					<div class="label">Logo：</div>
					<el-upload action="" :show-file-list="false" :auto-upload="false" :on-change="createFile">
						<div class="shop_logo_wrap">
							<img :src="createLogoSrc" alt="" v-if="createLogoSrc" />
							<div class="upload_text" v-else>
								<span class="up_text">上传logo</span>
								<span class="up_text up_tips">只能上传jpg/png文件</span>
								<span class="up_text up_tips">大小不超过500kb</span>
							</div>
						</div>
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
import { shop, errors } from '@/api';
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
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
		}
	}
};
</script>
