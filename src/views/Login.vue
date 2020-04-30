<template>
	<div class="login">
		<div class="logo">
			<img src="../assets/logo.jpg" alt="my login image" />
		</div>
		<!-- 手机号 -->
		<InputGroup
			type="number"
			v-model="phone"
			placeholder="手机号"
			:btnTitle="btnTitle"
			:disabled="disabled"
			:error="errors.phone"
			@btnClick="getVerifyCode"
		></InputGroup>
		<!-- 验证码 -->
		<InputGroup type="number" v-model="verifyCode" placeholder="验证码" :error="errors.code"></InputGroup>
		<!-- 用户服务协议 -->
		<div class="login_des">
			<p>
				新用户登录即自动注册，表示已同意
				<span>《用户服务协议》</span>
			</p>
		</div>
		<!-- 登录按钮 -->
		<div class="login_btn">
			<button :disabled="isClick" @click="handleLogin">登录</button>
		</div>
	</div>
</template>

<script>
import InputGroup from '../components/InputGroup';
export default {
	name: 'login',
	components: {
		InputGroup,
	},
	data() {
		return {
			phone: '',
			verifyCode: '',
			errors: {},
			btnTitle: '获取验证码',
			disabled: false,
		};
	},
	computed: {
		isClick() {
			//手机号为空或者验证码为空，改变登录按钮响应
			if (!this.phone || !this.verifyCode) return true;
			else {
				return false;
			}
		},
	},
	methods: {
		//登录按钮点击
		async handleLogin() {
			//取消错误提醒
			this.errors = {};
			// 发送请求
			try {
				const result = await this.$axios.post('/api/posts/sms_back', {
					phone: this.phone,
					code: this.verifyCode,
				});
				// console.log(result.data);
				// 检验成功 设置登录状态并且跳转到/
				localStorage.setItem('ele_login', result.data.user._id);
				this.$router.push('/');
			} catch (err) {
				//返回错误信息
				this.errors = {
					code: err.response.data.msg,
				};
			}
		},
		//获取验证码
		async getVerifyCode() {
			if (this.validatePhone()) {
				// 发送网络请求
				try {
					const result = await this.$axios.post('/api/posts/sms_send', {
						sid: 'ff31a981f5d3904e8f1db36aae89194f', //看第6-1,6-2,6-3课,获取你自己的sid
						token: '82fa62cbdcf4f6d7b513e96416ff721d', //看第6-1,6-2,6-3课,获取你自己的token
						appid: '5ca75e223b3348aebdc414f786f93a5e', //看第6-1,6-2,6-3课,获取你自己的appid
						templateid: '540947', //看第6-1,6-2,6-3课,获取你自己的templateid
						phone: this.phone,
					});
					console.log(result);
					this.validateBtn();
				} catch (err) {
					console.log(err);
				}
			}
		},
		validatePhone() {
			// 验证手机号码
			if (!this.phone) {
				this.errors = {
					phone: '手机号码不能为空',
				};
				return false;
			} else if (!/^1[345678]\d{9}$/.test(this.phone)) {
				this.errors = {
					phone: '请填写正确的手机号码',
				};
				return false;
			} else {
				this.errors = {};
				return true;
			}
		},
		validateBtn() {
			let time = 60;
			let timer = setInterval(() => {
				if (time == 0) {
					clearInterval(timer);
					this.btnTitle = '获取验证码';
					this.disabled = false;
				} else {
					// 倒计时
					this.btnTitle = time + '秒后重试';
					this.disabled = true;
					time--;
				}
			}, 1000);
		},
	},
};
</script>

<style scoped>
.login {
	width: 100%;
	height: 100%;
	padding: 30px;
	box-sizing: border-box;
	background: #fff;
}
.logo {
	text-align: center;
}
.logo img {
	width: 150px;
}
.text_group,
.login_des,
.login_btn {
	margin-top: 20px;
}
.login_des {
	color: #aaa;
	line-height: 22px;
}
.login_des span {
	color: #4d90fe;
}
.login_btn button {
	width: 100%;
	height: 40px;
	background-color: #48ca38;
	border-radius: 4px;
	color: white;
	font-size: 14px;
	border: none;
	outline: none;
}
.login_btn button[disabled] {
	background-color: #8bda81;
}
</style>
