<style lang="less">
.login {
	width: 100%;
	min-height: 100vh;
	overflow: hidden;
	position: relative;
	background-image: url(../assets/img/login_bg.jpg);
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	.login_wrap {
		position: absolute;
		top: 50%;
		right: 0%;
		transform: translate(-50%, -50%);
		width: 30%;
		height: 450px;
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0px 0px 2px 2px rgba(255, 114, 201, 0.856);
	}
	.logo_wrap {
		width: 200px;
		height: auto;
		.logo {
			width: 100%;
			vertical-align: top;
		}
	}
	.title {
		width: 100%;
		height: 100px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 1px 1px 1px rgba(255, 114, 201, 0.856);
		.title_text {
			font-family: '楷体', 'Times New Roman';
			font-size: 40px;
			letter-spacing: 10px;
			color: white;
			text-shadow: 0 0 5px rgba(255, 114, 201, 0.856), 5px -2px 20px rgb(237, 161, 252);
		}
		.system_text {
			margin-left: 20px;
			font-size: 20px;
			letter-spacing: 0px;
			color: rgba(255, 114, 201, 0.856);
		}
	}
	.login_data {
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
		padding: 10px 20px;
		display: flex;
		flex-flow: column nowrap;
		.input_wrap {
			width: 100%;
			margin-top: 30px;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.label {
				min-width: 80px;
				width: 15%;
				flex-shrink: 0;
				font-size: 16px;
				color: #373737;
			}
			.text {
				width: 80%;
				outline: none;
				border: 0;
				border-bottom: 1px solid rgba(114, 114, 114, 0.8);
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				height: 40px;
				font-size: 18px;
				padding-left: 10px;
			}
		}
	}
	.btn_wrap {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: 400px;
		height: 100px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
		span {
			color: #ffffff;
			background-color: rgba(255, 114, 201, 0.856);
			font-size: 20px;
			padding: 10px 40px;
			border-radius: 12px;
			letter-spacing: 5px;
			cursor: pointer;
		}
	}
}
</style>
<template>
	<div class="login">
		<div class="login_wrap">
			<div class="title">
				<div class="logo_wrap">
					<img src="../assets/img/logo.png" alt="" class="logo" />
				</div>
				<span class="system_text">后台管理系统</span>
			</div>
			<div class="login_data">
				<div class="input_wrap">
					<div class="label">用户名:</div>
					<input type="text" class="text" placeholder="请输入用户名" v-model.trim="username" />
				</div>
				<div class="input_wrap">
					<div class="label">密码:</div>
					<input type="password" class="text" placeholder="请输入密码" v-model.trim="password" />
				</div>
				<div class="input_wrap" v-show="!loginShow">
					<div class="label">手机号:</div>
					<input type="text" class="text" placeholder="请输入手机号" v-model.trim="phone" />
				</div>
			</div>
			<div class="btn_wrap">
				<span @click="login">{{ loginText }}</span>
				<span @click="regesiter">{{ regeText }}</span>
			</div>
		</div>
	</div>
</template>
<script>
import { users, error } from '@/api';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
	data() {
		return {
			loginShow: true,
			loginText: '登录',
			regeText: '注册',
			username: '',
			password: '',
			phone: ''
		};
	},
	methods: {
		...mapActions({
			setUserInfo: 'users/setUserInfo'
		}),
		async login() {
			if (this.loginShow) {
				localStorage.removeItem('SHOPLOGIN');
				const time = new Date().getTime();
				const userData = {
					username: this.username,
					password: btoa(this.password + '+' + time)
				};
				const { data, ok } = await users.login(userData);
				console.log(data);
				if (!ok) return;
				this.$message.success(data.msg);
				//将信息存入本地
				//因为存在中文，此时将
				const loginData = {
					userId: data.data.userId
				};
				this.setUserInfo(loginData);
				const userDataStr = btoa(unescape(encodeURIComponent(JSON.stringify(loginData) + '&&' + time)));
				localStorage.setItem('SHOPLOGIN', userDataStr);
				setTimeout(() => {
					this.$router.push({
						name: 'home'
					});
				}, 10);
			} else {
				this.loginShow = true;
			}
		},
		async regesiter() {
			if (this.loginShow) {
				this.loginShow = false;
			} else {
				const userData = {
					username: this.username,
					password: this.password,
					phone: this.phone
				};
				const { data, ok } = await users.regesiter(userData);
				console.log(data);
				if (!ok) return;
				this.$message.success(data.msg);
				this.login();
			}
		}
	}
};
</script>
