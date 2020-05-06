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
	.avatar_wrap {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		transition: all 0.3s linear;
		box-shadow: 0px 0px 1px 1px rgba(117, 123, 193, 0.8);
		position: relative;
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
		}
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
		<div class="route_text">
			<span>{{ title }}</span>
		</div>
		<div class="user_info">
			<div class="user_name">
				<span>
					{{ userInfo.nickName || userInfo.userName || '用户名' }}
				</span>
			</div>
			<el-popover placement="top" width="160" v-model="userListShow">
				<div class="user_list">
					<div style="cursor: pointer" @click="updatePassDialog">修改密码</div>
					<div style="cursor: pointer; margin-top: 10px" @click="exitLogin">退出登录</div>
				</div>
				<div class="user_item avatar_wrap" slot="reference">
					<img :src="userInfo.avatarUrl || null" alt="" />
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
	</div>
</template>
<script>
import { users, errors } from '@/api';
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	data() {
		return {
			title: '个人中心',
			userListShow: false,
			passwordShow: false,
			oldPass: '',
			confirmPass: '',
			newPass: ''
		};
	},
	mounted() {
		(this.title = this.$route.meta.title || '个人中心'), console.log(this.userInfo);
	},
	watch: {
		$route(newValue) {
			this.title = newValue.meta.title;
		}
	},
	methods: {
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
		}
	}
};
</script>
