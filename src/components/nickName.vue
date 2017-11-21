<template>
    <div class="app">
    	<Header title="修改昵称"></Header>
    	<section class="content">
			<input ref="Input" type="text" maxlength="20" placeholder="昵称" @keyup.enter="save" v-model.trim="userInfo.username" />
		</section>
		<div class="save" @click="save">保存</div>
    </div>
</template>

<script>
import qs from 'qs'
import { Toast } from 'mint-ui'
export default {
	data() {
	    return {
	    	userInfo: {}
	    }
	},
	mounted() {	
		this.userInfo = this.$storage.get('user_info')
		this.$refs.Input.focus()
		let that = this
		if(this.$refs.Input.setSelectionRange){
			setTimeout(function() { 
				that.$refs.Input.setSelectionRange(that.userInfo.username.length, that.userInfo.username.length)
			}, 0); 
			
		}
	},
	methods: {
		save() {
			this.$api.updataUserInfo(this.userInfo).then(res => { 
				if(res.ret !== 1) {
					Toast({
					  message: res.msg,
					  position: 'bottom',
					  duration: 1000
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
				},800)
	        }, err => {
	        	
	        })
		}
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
} 
.content{
	padding-top: 0.4rem;
}
.content input{
	display: block;
	width: 6.9rem;
	margin: 0 auto;
	padding: 0.2rem;
	background: #fff;
	border-radius: 0.1rem;
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