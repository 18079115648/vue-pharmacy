<template>
  <div class="app">
	    <keep-alive>
		    	<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	    <div class="loading" v-show = "loadingStatus">
	    	<div class="loading-box">
	    		<mt-spinner class="loading-icon" color="rgb(204, 204, 204)" :size="40"></mt-spinner>
	    	</div>
	    	
	    </div>
  </div>
</template>

<script>
import '../static/rem.js'
import { mapGetters } from 'vuex'
export default{
	  computed: {
	  	...mapGetters([
		    'loadingStatus'
			])
    }
}
</script>

<style lang="scss">
input::-webkit-inner-spin-button,  
input::-webkit-outer-spin-button { 
        -webkit-appearance: none !important; 
        appearance: none !important; 
        margin: 0 !important; 
}
input::-webkit-search-decoration,
input::-webkit-search-cancel-button {
		display: none;
}
.app{
	min-height: 100vh;
}
.price-color{
	color: #f60;
}
.com-color{
	color: #3cafb6;
}


.none-data{
	padding-top: 1.5rem;
}
.none-img{
	display: block;
	width: 1.4rem;
	margin: 0 auto;
}
.none-tip{
	text-align: center;
	padding-top: 0.8rem;
	color: #aaa;
}

.mint-switch-input:checked + .mint-switch-core {
    border-color: #3cafb6 !important;
    background-color: #3cafb6 !important;
}

.pics img{
	display: block;
	width: 100%;
}
.html-content img{
	display: block;
	max-width: 100%;
	margin-top: 0.2rem;
	margin-bottom: 0.2rem;
}

.pop-product-img{
	/*border: 1px solid #eee;*/
}
.modal-message>span{
	color: #39B382;
	font-size: 0.36rem;
	margin: 0 0.1rem;
}
.mint-swipe-indicator{
	background: #ccc !important;
	opacity: 1 !important;
}
.mint-swipe-indicator.is-active{
	background: #3cafb6 !important;
}
.btn-default{
	width: 6.9rem;
	height: 0.8rem;
	border-radius: 0.08rem;
	text-align: center;
	line-height: 0.8rem;
	color: #fff;
	background: #3cafb6;
	margin: 0 auto;
	font-size: 0.32rem;
}
.btn-hover:active{
	opacity: 0.7;
}
.loading{
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 20;
	background: #fff;
	
}
.loading-box{
	position: absolute;
	padding: 0.4rem;
	top: 50%;
	left: 50%;
	background: rgba(0, 0, 0, 0.7);
	
	transform: translate(-50%, -50%);
	border-radius: 0.1rem;
}

/*tab切换样式*/
.spipe-tab-content{
	position: absolute !important;
	width: 100%;
	left: 0;
	top: 1.7rem;
	right: 0;
	bottom: 0;
}
.mint-tab-container-wrap{
	height: 100% !important;
}
.spipe-tab-content .mint-tab-container-item{
	height: 100% !important;
	background: #F5F5F9;
}

/*动画*/
.move-right{
	transition: transform .1s ease-out;
}
.move-right.move-enter-avtive,.move-right.move-leave{
    transform: translate3d(0,0,0);
}
.move-right.move-enter{
    transform: translate3d(100%,0,0);
}
.move-right.move-leave-active{
	transform: translate3d(100%,0,0);
}
.sheetModal *{
	font-size: 0.32rem !important;
}
.toast-icon{
	width: 1.5rem;
	height: 1.5rem;
	display: inline-block !important;
	background-position: center;
	background-size: 100%;
	background-repeat: no-repeat;
}
.toast-icon.icon-success{
	background-image: url(../static/image/icon-success.png);
}
[v-cloak] {
  display: none;
}

	.has-right-arror{
		position: relative;
	}
	.has-right-arror:after {
		position: absolute;
		content: '';
		width: 0.12rem;
		height: 0.2rem;
		right: 0.3rem;
		top: 50%;
		margin-top: -0.12rem;
		background: url(../static/images/arror.png) no-repeat center;
		background-size: 100% 100%;
	}
	.fullEle{
		display: block;
		width: 100%;
		height: 100%;
	}
	.fullAuto{
		display: block;
		width: 100%;
		height: auto;
	}
	.mobile-btn::after{
		border-radius: 0.06rem;
		background-color: #000;
	    content: " ";
	    opacity: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    position: absolute
	}
	.mobile-btn:active::after{
		opacity: 0.3;
	}
   .fullDiv{
	   	position: absolute;
	   	width: 100%;
	   	/*height: 100%;*/
	   	min-height: 100%;
	   	left: 0;
	   	top: 0;
	   	background: #F5F5F9;
   }
  
  .mint-msgbox-message .excharge{
  	position: relative;
  	padding-top: 1.5rem;
  }
  .mint-msgbox-message .excharge:before{
  	content: '';
  	position: absolute;
  	border-radius: 50%;
  	width: 1rem;
  	height: 1rem;
  	background: #ddd;
  	left: 50%;
  	margin-left: -0.5rem;
  	top: 0.3rem;
  	
  }
  .case-kind .mint-radiolist-title{
  	font-size: 0.32rem;
  	color: #000;
  	margin: 0.4rem 0.3rem 0.2rem;
  }
  .case-kind .mint-cell-wrapper{
  	background: #fff;
  }
  .case-page-part .mint-tab-item-label{
	line-height: 0.8rem;
	font-size: 0.30rem;
  }
  .case-page-part.mint-navbar .mint-tab-item.is-selected{
  	border: none !important;
  	color: #39b382;
  }
  .case-page-part.mint-navbar .mint-tab-item.is-selected:after{
  	content: '';
  	position: absolute;
  	width: 1.2rem;
  	height: 2px;
  	background: #39B382;
  	bottom: 0;
  	left: 50%;
  	margin-left: -0.6rem;
  }
  .user-kind-select .mint-radiolist-title{
		display: none;
	}
	.user-kind-select .mint-cell{
		width: 50%;
		background: none !important;
		min-height: 0.9rem;
	}
	.user-kind-select .mint-cell-wrapper{
		background: none;
		padding: 0;
	}
	.user-kind-select .mint-radiolist-label{
		padding: 0 0.5rem;
	}
	.user-kind-select .mint-radio-core{
		width: 0.36rem;
		height: 0.36rem;
	}
	.user-kind-select .mint-radio-core::after{
		width: 0.16rem;
		height: 0.16rem;
		top: 0.08rem;
		left: 0.08rem;
	}
	.user-kind-select .mint-radio-input:checked + .mint-radio-core{
		background-color: #fff;
		border-color: #39B382;
	}
	.user-kind-select .mint-radio-input:checked + .mint-radio-core::after{
		background-color: #39B382;
	}
	.zhuanyi img{
		display: block;
		width: 100%;
		margin: 0.2rem 0;
	}
	.pics, .zhuanyi{
		overflow: hidden;
	}
	.pics *, .zhuanyi *{
		max-width: 100% !important;
	}
	.pics img{
		display: block;
		width: 100%;
	}
	select{
		border: 0;
		outline: none;
		appearance: none;
		background: #fff;
		font-size: 0.28rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: middle;	
	}
	.mint-indicator-text{
		font-size: 0.28rem !important;
	}
	.mint-datetime-action{
		color: #3cafb6 !important;
		font-size: 0.28rem !important;
	}
	.mint-datetime-action.mint-datetime-cancel{
		color: #333 !important;
	}
	.picker-slot{
		font-size: 0.28rem !important;
	}
	.picker-item.picker-selected{
		font-size: 0.3rem !important;
	}
	.mint-msgbox-confirm{
		color: #3cafb6 !important;
	}
	
	.payWay .mint-radiolist-title{
		display: none;
	}
	.payWay .mint-cell{
		min-height: auto;
		height: 1rem;
		display: flex;
		border-bottom: 1px solid #f5f5f5;
		background: none !important; 
	}
	.payWay .mint-cell-wrapper{
		font-size: 0.28rem;
		background: none !important; 
	}
	.payWay .mint-radio-core{
		width: 0.4rem;
		height: 0.4rem;
		border-color: #999;
	}
	.payWay .mint-radio-core::after{
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-size: 100% 100%; 
		
	}
	.payWay .mint-radio-input:checked + .mint-radio-core{
		background-color: #3cafb6;
    	border-color: #3cafb6;
	}
	.payWay .mint-radio-input:checked + .mint-radio-core::after{
		background-image: url(../static/images/43@3x.png)
	}
</style>
