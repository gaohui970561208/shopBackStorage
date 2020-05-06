<style lang="less">
.persion_center {
	width: 100%;
	.user_info_wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 30px 50px;
		.user_card {
			width: 100%;
			height: 500px;
			box-shadow: 0px 0px 3px 3px rgba(91, 160, 248, 0.6);
			border-radius: 5px;
			box-sizing: border-box;
			padding: 60px 50px;
		}
		.user_meg {
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
}
</style>
<template>
	<div class="persion_center">
		<div class="user_info_wrap">
			<div class="user_card">
				<div class="user_meg">
					<div class="avatar_img_wrap">
						<img :src="userInfo.avatarUrl" alt="" v-if="userInfo.avatarUrl" />
						<img src="../../assets/img/default_user.jpg" alt="" v-else />
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
							<div class="label">昵称：</div>
							<div class="text">{{ userInfo.nickName || userInfo.userName || '昵称' }}</div>
							<i class="icon iconfont iconchuangzuo" @click="updateInfoDialog(1)"></i>
						</div>
						<div class="meg_item">
							<div class="label">手机号：</div>
							<div class="text">{{ userInfo.phone }}</div>
							<i class="icon iconfont iconchuangzuo" @click="updateInfoDialog(3)"></i>
						</div>
						<div class="meg_item">
							<div class="label">收益：</div>
							<div class="text">{{ userInfo.profit | profitFormat }}</div>
						</div>
						<div class="meg_item">
							<div class="label">个人简介：</div>
							<div class="text">{{ userInfo.descript || '什么都没有留下' }}</div>
							<i class="icon iconfont iconchuangzuo" @click="updateInfoDialog(2)"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
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
	filters: {
		profitFormat(val) {
			if (!val) return '0.00';
			return (val / 100).toFixed(2);
		}
	},
	methods: {
		...mapActions({
			setUserInfo: 'users/setUserInfo'
		}),
		getFile(file, fileList) {
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			reader.readAsDataURL(file.raw);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.uploadAvatar(baseStr);
			};
		},
		async uploadAvatar(baseStr) {
			const userData = {
				userId: this.userInfo.userId
			};
			const uploadData = {
				avatarUrl: baseStr
			};
			try {
				const { data, ok } = await users.userAvatarUpdate(this.userInfo.userId, uploadData);
				if (!ok) return;
				this.setUserInfo(userData);
			} catch (error) {
				errors(error);
			}
		},
		updateInfoDialog(val) {
			let str = '';
			if (val === 1) {
				str = '请输入新的昵称';
			} else if (val === 2) {
				str = '请输入您的个人简介';
			} else if (val === 3) {
				str = '请输入手机号';
			}
			this.$prompt(str, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({ value }) => {
				if (val === 1) {
					this.updateNickName(value);
				} else if (val === 2) {
					this.updateDescript(value);
				} else if (val === 3) {
					this.updatePhone(value);
				}
			});
		},
		//修改昵称
		async updateNickName(value) {
			const userData = {
				userId: this.userInfo.userId
			};
			const reqData = {
				nickName: value
			};
			try {
				const { data, ok } = await users.userNickNameUpdate(this.userInfo.userId, reqData);
				if (!ok) return;
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.setUserInfo(userData);
			} catch (error) {
				errors(error);
			}
		},
		//修改个人简介
		async updateDescript(value) {
			const userData = {
				userId: this.userInfo.userId
			};
			const reqData = {
				descript: value
			};
			try {
				const { data, ok } = await users.userDescriptUpdate(this.userInfo.userId, reqData);
				if (!ok) return;
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.setUserInfo(userData);
			} catch (error) {
				errors(error);
			}
		},
		async updatePhone(value) {
			const userData = {
				userId: this.userInfo.userId
			};
			const reqData = {
				phone: parseInt(value)
			};
			try {
				const { data, ok } = await users.userPhoneUpdate(this.userInfo.userId, reqData);
				if (!ok) return;
				this.$message({
					type: 'success',
					message: data.msg
				});
				this.setUserInfo(userData);
			} catch (error) {
				errors(error);
			}
		}
	}
};
</script>
