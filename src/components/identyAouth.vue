<template>
    <div class="app">
    	<Header title="实名认证"></Header>
    	<div class="user-info">
			<div class="link-item">
				<span>姓名</span>
				<input ref="Input" type="text" v-model.trim="userInfo.true_name" maxlength="20" placeholder="您的真实姓名" />
			</div>
			<div class="link-item">
				<span>身份证号</span>
				<input type="tel" v-model.trim="userInfo.id_card" maxlength="18" placeholder="您的身份证号" />
			</div>
    	</div>
		<div class="save" @click="save">保存</div>
    </div>
</template>
<script>
import qs from 'qs'
import { Toast } from 'mint-ui'
export default {
	data() {
	    return {
	    	userInfo: {},
	    	
	    	disabledBtn: false
	    }
	},
	mounted() {	
		this.userInfo = this.$storage.get('user_info')
		this.$refs.Input.focus()
		let that = this
		if(this.$refs.Input.setSelectionRange){
			setTimeout(function() { 
				that.$refs.Input.setSelectionRange(that.userInfo.true_name.length, that.userInfo.true_name.length)
			}, 0); 
			
		}
	},
	methods: {
		save() {
			if(this.disabledBtn) {
				return
			}
			this.disabledBtn = true
			this.$api.updataUserInfo(this.userInfo).then(res => { 
				if(res.ret !== 1) {
					Toast({
					  message: res.msg,
					  position: 'bottom',
					  duration: 10000
					});
					return
				}
				Toast({
				  message: '修改成功',
				  position: 'middle',
				  iconClass: 'toast-icon icon-success',
				  duration: 1000
				})
				setTimeout(() => {
					this.$router.go(-1)
					this.disabledBtn = false
				},800)
	        }, err => {
	        	this.disabledBtn = false
	        })
		}
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
	padding-top: 0.3rem;
} 
.user-info{
	background: #fff;
	padding-left: 0.3rem;
	.link-item{
		display: flex;
		height: 0.9rem;
		align-items: center;
		justify-content: space-between;
		padding-right: 0.3rem;
		border-bottom: 1px solid #f3f3f3;
		span{
			width: 2.3rem;
		}
		input{
			flex: 1;
		}
	}
}
.save{
	position: fixed;
	width: 1.3rem;
	height: 0.92rem;
	right: 0;
	top: 0;
	line-height: 0.9rem;
	color: #fff;
	z-index: 60;
	text-align: center;
}
</style>