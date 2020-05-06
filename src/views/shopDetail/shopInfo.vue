<style lang="less">
.shop_info_wrap {
	width: 100%;
	.shop_info {
		width: 100%;
		box-sizing: border-box;
		padding: 30px 50px;
		.shop_card {
			width: 100%;
			height: 500px;
			box-shadow: 0px 0px 3px 3px rgba(91, 160, 248, 0.6);
			border-radius: 5px;
			box-sizing: border-box;
			padding: 60px 50px;
		}
		.shop_meg {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
		}
		.avatar_img_wrap {
			width: 240px;
			height: 240px;
			box-shadow: 0px 0px 1px 1px rgba(91, 160, 248, 0.6);
			border-radius: 50%;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
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
		padding-top: 40px;
		min-width: 700px;
		display: flex;
		flex-flow: column nowrap;
		.meg_item {
			margin-top: 80px;
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
	<div class="shop_info_wrap">
		<div class="shop_info">
			<div class="shop_card">
				<div class="shop_meg">
					<div class="avatar_img_wrap">
						<img :src="shopInfo.shopLogo" alt="" v-if="shopInfo.shopLogo" />
						<img src="../../assets/img/default_shop.jpg" alt="" v-else />
						<div class="operate_btn_wrap">
							<el-upload
								class="upload-demo"
								action=""
								:show-file-list="false"
								:auto-upload="false"
								:on-change="getFile"
							>
								<el-button type="primary" class="btn upload_avatar">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
							</el-upload>
						</div>
					</div>
					<div class="meg_content">
						<div class="meg_item">
							<div class="label">店铺名称：</div>
							<div class="text">{{ shopInfo.shopName || '店铺名称' }}</div>
							<i class="icon iconfont iconchuangzuo" @click="updateInfoDialog(1)"></i>
						</div>
						<div class="meg_item">
							<div class="label">店铺简介：</div>
							<div class="text">{{ shopInfo.shopBrief || '什么都没有留下' }}</div>
							<i class="icon iconfont iconchuangzuo" @click="updateInfoDialog(2)"></i>
						</div>
						<div class="meg_item">
							<el-button @click="editShop">修改店铺信息</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="提示" :visible.sync="editShow">
			<div class="edit_wrap">
				<div class="edit_item">
					<div class="label">店名：</div>
					<input type="text" class="text" v-model="shopInfo.shopName" placeholder="请输入店铺名称" />
				</div>
				<div class="edit_item">
					<div class="label">简介：</div>
					<input type="text" class="text" v-model="shopInfo.shopBrief" placeholder="请输入店铺简介" />
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
	mounted() {
		this.getShopInfo();
	},
	data() {
		return {
			shopId: this.$route.params.id,
			shopInfo: {
				shopName: null,
				shopBrief: null,
				shopLogo: null
			},
			editLogoSrc: null,
			editShow: false
		};
	},
	methods: {
		async getShopInfo() {
			try {
				const reqData = {
					shopId: this.shopId
				};
				const { data, ok } = await shop.getShopInfo(reqData);
				if (!ok) return;
				console.log(data);
				this.shopInfo = data.data;
			} catch (error) {
				errors(error);
			}
		},
		//修改店铺信息
		editShop() {
			this.editLogoSrc = this.shopInfo.shopLogo;
			this.editShow = true;
		},
		async updateShop() {
			try {
				const { data, ok } = await shop.updateShop(this.shopId, this.shopInfo);
				if (!ok) return;
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.editShow = false;
				this.getShopInfo();
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
				_this.shopInfo.shopLogo = baseStr;
			};
		}
	}
};
</script>
