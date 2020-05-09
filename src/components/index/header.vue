<style lang="less">
.header {
	padding: 0px 40px;
	height: 100px;
	transition: all 0.3s linear;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	box-shadow: 1px 0px 1px rgba(117, 123, 193, 0.8);
	.top_logo_wrap {
		height: 50%;
		.logo {
			height: 100%;
			vertical-align: top;
		}
	}
	.route_text {
		font-size: 20px;
		font-weight: 600;
	}
	.user_info {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		.user_item {
			cursor: pointer;
		}
	}
	.setting_icon {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 40px;
		transition: all 0.4s linear;
		cursor: pointer;
		&:hover {
			background-color: rgba(255, 143, 246, 0.295);
		}
		.icon {
			font-size: 40px;
			color: #939393;
		}
	}
	.avatar_wrap {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		transition: all 0.3s linear;
		box-shadow: 0px 0px 1px 1px rgba(255, 190, 235, 0.6);
		position: relative;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			vertical-align: top;
		}
	}
	.user_name {
		padding: 0 50px;
		span {
			font-size: 20px;
			color: #636363;
		}
	}
	.user_list {
		width: 100%;
		height: 80px;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	.create_shop {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.update_password {
		margin: 0 auto;
		box-sizing: border-box;
		padding: 10px 0px;
		display: flex;
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
			.descrpit {
				align-self: flex-start;
			}
			.info_text {
				min-width: 70%;
				box-sizing: border-box;
				outline: none;
				font-size: 14px;
				color: #393939;
				padding: 10px 10px;
				border: 1px solid rgba(0, 0, 0, 0.2);
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
				}
				&[type='number'] {
					-moz-appearance: textfield;
				}
			}
			textarea.info_text {
				height: 200px;
				outline: none;
				resize: none;
			}
			&:first-child {
				margin-top: 0;
			}
			.item_wrap {
				width: 400px;
			}
			.avatar_img_wrap {
				width: 100px;
				height: 100px;
				border-radius: 50%;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					width: 100%;
					height: 100%;
					vertical-align: top;
				}
			}
		}
	}
	.admin_entry {
		margin-right: 40px;
	}
}
@media screen and (max-width: 1400px) {
	.header {
		height: 80px;
		.avatar_wrap {
			width: 40px;
			height: 40px;
		}
	}
}
</style>
<template>
	<div class="header">
		<div class="top_logo_wrap">
			<img src="../../assets/img/logo.png" alt="" class="logo" />
		</div>
		<div class="user_info">
			<el-button
				class="admin_entry"
				type="primary"
				@click="toAdmin"
				v-if="userInfo.isAdmin && this.$route.name !== 'admin'"
				>管理员入口</el-button
			>
			<div class="setting_icon" @click="updateUserInfoDialog">
				<i class="icon iconfont iconset"></i>
			</div>
			<el-popover placement="top" width="160" v-model="userListShow">
				<div class="user_list">
					<div style="cursor: pointer" @click="toPersionCenter">个人中心</div>
					<div style="cursor: pointer; margin-top: 20px" @click="updatePassDialog">修改密码</div>
					<div style="cursor: pointer; margin-top: 20px" @click="exitLogin">退出登录</div>
				</div>
				<div class="user_item avatar_wrap" slot="reference">
					<img :src="userInfo.avatarUrl" alt="" v-if="userInfo.avatarUrl" />
					<img src="../../assets/img/default_user.jpg" alt="" v-else />
				</div>
			</el-popover>
		</div>
		<el-dialog title="修改密码" :visible.sync="passwordShow">
			<div class="update_password">
				<div class="info_item">
					<div class="label">旧密码：</div>
					<input type="text" class="info_text" v-model="oldPass" placeholder="请输入旧密码" />
				</div>
				<div class="info_item">
					<div class="label">新密码：</div>
					<input type="text" class="info_text" v-model="newPass" placeholder="请确认密码" />
				</div>
				<div class="info_item">
					<div class="label">确认密码：</div>
					<input type="text" class="info_text" v-model="confirmPass" placeholder="请输入新密码" />
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="passwordShow = false">取 消</el-button>
				<el-button type="primary" @click="updatePassword">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改信息" :visible.sync="userInfoShow" width="40%" :center="true">
			<div class="update_password">
				<div class="info_item">
					<div class="label">昵称：</div>
					<input type="text" class="info_text" v-model="userData.nickName" placeholder="请输入新昵称" />
				</div>
				<div class="info_item">
					<div class="label">手机：</div>
					<input type="text" class="info_text" v-model="userData.phone" placeholder="请输入您的手机号" />
				</div>

				<div class="info_item">
					<div class="label">头像：</div>
					<el-upload
						class="upload_descipt"
						action=""
						:show-file-list="false"
						:auto-upload="false"
						:on-change="getFile"
					>
						<div class="avatar_img_wrap" v-if="userData.avatarUrl">
							<img :src="userData.avatarUrl" alt="" />
						</div>
						<el-tooltip
							class="item"
							effect="dark"
							content="图片会依次竖向排列在商品详情区域"
							placement="top"
							v-else
						>
							<el-button>上传商品描述图片</el-button>
						</el-tooltip>
					</el-upload>
				</div>
				<div class="info_item">
					<div class="label descrpit">个性签名：</div>
					<textarea
						type="text"
						class="info_text"
						v-model="userData.descript"
						placeholder="请输入您的个性签名"
					/>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="userInfoShow = false">取 消</el-button>
				<el-button type="primary" @click="updateUserInfo">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import { users, errors } from '@/api';
import { mapState, mapActions } from 'vuex';

export default {
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	data() {
		return {
			userListShow: false,
			passwordShow: false,
			userInfoShow: false,
			userData: {
				nickName: '',
				phone: '',
				descript: '',
				avatarUrl: null
			},
			oldPass: '',
			confirmPass: '',
			newPass: ''
		};
	},
	methods: {
		...mapActions({
			setUserInfo: 'users/setUserInfo'
		}),
		exitLogin() {
			localStorage.removeItem('SHOPLOGIN');
			this.$router.push({
				name: 'login'
			});
		},
		updatePassDialog() {
			this.oldPass = '';
			this.confirmPass = '';
			this.newPass = '';
			this.passwordShow = true;
		},
		async updatePassword() {
			//进行密码验证
			if (this.oldPass === this.userInfo.password && this.newPass === this.confirmPass) {
				const params = {
					userId: this.userInfo.userId
				};
				const time = new Date().getTime();
				const reData = {
					password: btoa(this.newPass + '+' + time)
				};
				try {
					const { data, ok } = await users.updatePassword(params, reData);
					if (!ok) return;
					this.$message.success(data.msg);
					localStorage.removeItem('SHOPLOGIN');
					this.$router.push({
						name: 'login'
					});
				} catch (error) {
					errors(error);
				}
			} else {
				this.$message.error('请输入正确的密码');
			}
		},
		//获取头像图片
		getFile(file, fileList) {
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.userData.avatarUrl = baseStr;
			};
		},
		toPersionCenter() {
			if (this.$route.name === 'persionCenter') {
				return;
			} else {
				this.$router.push({
					name: 'persionCenter'
				});
			}
		},
		toAdmin() {
			this.$router.push({
				name: 'admin'
			});
		},
		//修改用户信息弹窗
		updateUserInfoDialog() {
			this.userInfoShow = true;
			this.userData.nickName = this.userInfo.nickName || this.userInfo.userName;
			this.userData.phone = this.userInfo.phone || '';
			this.userData.avatarUrl = this.userInfo.avatarUrl || null;
			this.userData.descript = this.userInfo.descript || '';
		},
		async updateUserInfo() {
			try {
				const params = {
					userId: this.userInfo.userId
				};
				const reData = this.userData;
				const { data, ok } = await users.updateUserInfo(params, reData);
				if (!ok) return;
				this.$message.success(data.msg);
				this.setUserInfo(params);
				this.userData = {
					nickName: '',
					phone: '',
					descript: '',
					avatarUrl: null
				};
				this.userInfoShow = false;
			} catch (error) {
				errors(error);
			}
		}
	}
};
</script>
