<template>
    <div class="app">
    	<Header title="关于我们"></Header>
    	<img src="../../static/images/1-12.png" class="logo"  />
    	<div class="html-content" v-html="content">
    		
    	</div>
    </div>
</template>

<script>
import qs from 'qs'
import { Toast } from 'mint-ui'
export default {
	data() {
	    return {
	    	content: ''
	    }
	},
	created() {	
		this.$api.about().then(res => { 
			this.content = res.content
        }, err => {
        	
        })
	}
}
</script>

<style lang="scss" scoped>
.app{
	/*background: #f5f5f9;*/
} 
.logo{
	display: block;
	width: 3rem;
	margin: 0.6rem auto 0.2rem;
}
.html-content{
	padding: 0.3rem;
	line-height: 1.5;
}
</style>