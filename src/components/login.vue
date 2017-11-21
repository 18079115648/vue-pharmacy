<template>
    <div class="app" id="app" :style="{ height: wH + 'px' }">
	    	<img src="../../static/images/1-12.png" class="logo"  />
	    	<div class="form-content">
	    		<div class="form-item">
	    			<div class="icon phone"></div>
	    			<input v-model="phone" @input="inputNumber" type="tel" style="width: 5.8rem;" placeholder="请输入手机号" maxlength="11" />
	    		</div>
	    		<div class="form-item">
	    			<div class="icon code"></div>
	    			<input v-model="code" type="tel" @input="inputNumber" placeholder="请输入验证码" maxlength="6" />
	    			<div class="captcha-btn" :class="{'disabled': !enableSend}" @click="getCode">{{captchaLabel}}</div>
	    		</div>
	    	</div>
	    	<div class="btn-default btn-hover btn-login" @click="login">登录</div>
    </div>
</template>

<script>
import $ from 'jquery'
import { Toast } from 'mint-ui'
export default {
	data() {
	    return {
	    	phone: '',
	    	code: '',
	    	wH: 0,
	    	captchaLabel:'获取验证码',
	    	timer: null,
	    	count: 60,
	    	enableSend: true
	    }
	},
	mounted() {	
		this.wH = $('#app').height()
	},
	methods: {
		inputNumber() {
			if (!/^\d*$/.test(this.phone)) {	
	            this.phone = this.phone.replace(/\D+/g,'')            
	        } 
		},
		getTokenSms(data) {
			return this.$api.getTokenSms(data)
		},
		getCodeSms(data) {
			return this.$api.getCodeSms(data)
		},
		getCode() {
			if(!this.enableSend) {
				return
			}
			if(!this.checkPhone) {
				Toast({
				  message: '请输入正确的手机号',
				  position: 'bottom',
				  duration: 1000
				});
				return
			}
			
			this.getTokenSms({
				mobile: this.phone
			}).then(res => {
				if(res.ret == 1) {
					return this.getCodeSms({
						mobile: this.phone,
						token: res.token
					})
				}
	        }).then(res => {
				if(res.ret == 1) {
					this.enableSend = false
					this.count = 60
					this.captchaLabel = '重新获取('+ this.count +')'
					this.timer = setInterval(() => {
						console.log(this.count)
						this.count--
						this.captchaLabel = '重新获取('+ this.count +')'
						if(this.count < 1) {
							this.enableSend = true
							this.captchaLabel = '获取验证码'
							clearInterval(this.timer)
						}
					}, 1000)
				}
	        })
			
		},
		login() {
			if(!this.checkPhone) {
				Toast({
				  message: '请输入正确的手机号',
				  position: 'bottom',
				  duration: 1000
				});
				return
			}
			if(!this.checkCode) {
				Toast({
				  message: '验证码错误',
				  position: 'bottom',
				  duration: 1000
				});
				return
			}
			
			this.$api.registerUser({
				username: this.phone,
                password: '',
                code: this.code
			}).then(res => {
				if(res.ret == 1) {
					this.loginSuccess()
				}
	        }, err => {
	        	
	        })
		},
		loginSuccess() {
			let redirectURI = '/user'
            if (this.$storage.get('history_uri') && this.$storage.get('history_uri') != '/login') {
                redirectURI = this.$storage.get('history_uri')
            }
            this.$router.replace(redirectURI)
		}
	},
	computed: {
		checkPhone: function() {
			if(/^1[34578]\d{9}$/.test(this.phone)){   
		        return true; 
		    } 
		    return false
		},
		checkCode: function() {
			if(/^\d{6}$/.test(this.code)){   
		        return true; 
		    } 
		    return false
		}
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #fff;
	position: relative;
	padding: 0.4rem 0.5rem;
	font-size: 0.28rem;
} 
.logo{
	display: block;
	width: 2rem;
	margin: 0.6rem auto;
}
.form-content{
	padding-top: 0.3rem;
}
.form-item{
	padding: 0.24rem 0;
	border-bottom: 1px solid #f3f3f3;
	display: flex;
	align-items: center;
	.icon{
		width: 0.6rem;
		height: 0.5rem;
		overflow: hidden;
		background-position: left center;
		background-repeat: no-repeat;
		background-size: 40%;
	}
	.icon.phone{
		background-image: url(../../static/images/18@3x.png);
	}
	.icon.code{
		background-image: url(../../static/images/17@3x.png);
	}
	input{
		width: 3.3rem;
		font-size: 0.28rem;
	}
	.captcha-btn{
		width: 2.3rem;
		margin-left: 0.3rem;
		padding-left: 0.3rem;
		border-left: 2px solid #3cafb6;
		color: #3cafb6;
	}
	.captcha-btn.disabled{
		color: #ccc;
	}
}
input::-webkit-input-placeholder {
	color: #ccc;
}
.btn-login{
	width: 6.5rem;
	margin-top: 1rem;
}
</style>