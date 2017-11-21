<template>
    <div class="app">
    	<Header title="金象大药房" back="hidden"></Header>
    	
    	<div class="search-content">
    		<a href="#/search" class="search-input">
    			<img src="../../static/images/search-icon.png" />
    			<span>搜索你要的宝贝</span>
    		</a>
    	</div>
    	<div class="content">
    		<mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
			 	<section class="product-banner">
					<mt-swipe :auto="0">
						<mt-swipe-item v-for="(item,index) in bannerList" :key="index">
							<router-link :to="'/shopdetails/' + item.goods_id " class="fullEle">
								<img :src="item.thumb" class="fullEle" />
							</router-link>
						</mt-swipe-item>
					</mt-swipe>
				</section>
				<section class="product-nav">
					<div class="left">
						<div @click="goList(bannerCat[0].activity_id, bannerCat[0].name)" class="fullEle">
							<img :src="bannerCat[0].thumb" class="fullEle" />
						</div>
					</div>
					<div class="right">
						<div class="top">
							<div @click="goList(bannerCat[1].activity_id, bannerCat[1].name)" class="fullEle">
								<img :src="bannerCat[1].thumb" class="fullEle" />
							</div>
						</div>
						<div class="bottom">
							<div @click="goList(bannerCat[2].activity_id, bannerCat[2].name)"  class="fullEle">
								<img :src="bannerCat[2].thumb" class="fullEle" />
							</div>
						</div>
					</div>
				</section>
				<section class="pop-product">
					<div class="pop-product-tit">
						<div class="tit"><span class="pop-icon"></span>人气热销</div>
					</div>
					<div class="pop-product-list">
						<router-link :to="'/shopdetails/' + item.goods_id " class="pop-product-item" v-for="(item, index) in hotList" :key="index">
							<div class="fullEle">
								<div class="pop-product-img">
									<img class="fullEle" :src="item.thumb" />
								</div>
								<div class="pop-product-desc">
									<p class="pop-product-name">{{item.title}}</p>
									<p class="pop-product-price price-color">&yen; {{item.price_shop}}</p>
								</div>
							</div>
							
						</router-link>
					</div>
				</section>
			</mt-loadmore>
	    		
    	</div>
	    	
        <Menu actived="first"></Menu>
    </div>
</template>

<script>
import {Indicator } from 'mint-ui'
export default {
	data() {
		return {
			bannerList: [],
			bannerCat: [{},{},{}],
			hotList: [],
			
			allLoaded: true
		}
	},
	created() {
//		window.scrollTo(0,0)
//		this.$api.indexBanner().then(res => {   
//          res.forEach((item) => {
//          	let obj = {
//          		type_id: item.goods.type_id,
//          		type_id_name: item.goods.type_id_name,
//          		goods_id: item.goods.goods_id,
//          		thumb: item.thumb
//          	}
//          	this.bannerList.push(obj)
//          })
//      }, err => {
//      	
//      })
//		this.$api.indexBannerCat().then(res => {   
//			this.bannerCat = res.data
//      }, err => {
//      	
//      })
//		this.$api.indexHot().then(res => {   
//			res.forEach((item) => {
//          	this.hotList.push(item.goods)
//          })
//      }, err => {
//      	
//      })
		this.homeData()
	},
	methods: {
		loadTop() {
			Indicator.open('加载中...')
			this.homeData()
		    
		},
		homeData() {
			
			this.$api.indexBanner().then(res => {   
				this.bannerList = []
	            res.forEach((item) => {
	            	let obj = {
	            		type_id: item.goods.type_id,
	            		type_id_name: item.goods.type_id_name,
	            		goods_id: item.goods.goods_id,
	            		thumb: item.thumb
	            	}
	            	this.bannerList.push(obj)
	            })
	            return this.$api.indexBannerCat()
	        }).then(res => {
	        	this.bannerCat = res.data
	        	return this.$api.indexHot()
	        }).then(res => {
	        	Indicator.close()
	        	this.hotList = []
	        	res.forEach((item) => {
	            	this.hotList.push(item.goods)
	            })
	        	this.$refs.loadmore.onTopLoaded();
	        })
		},
		goList(id, name){
	  		this.$storage.set('activity_cat', name)
	  		this.$router.push('/productList/active/' + id)
	  	}
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
	padding-top: 0.8rem;
	position: relative;
}    
.search-content{
	padding: 0 0.35rem 0.25rem;
	background: #3cafb6;
	position: fixed;
	left: 0;
	width: 100%;
	top: 0.92rem;
	z-index: 10;
}
.search-input{
	width: 100%;
	height: 0.55rem;
	background: #FFFFFF;
	border-radius: 0.08rem;
	display: flex;
	align-items: center;
	img{
		width: 0.32rem;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
	}
	span{
		color: #777;
	}
}
.content{
	position: absolute;
	width: 100%;
	left: 0;
	top: 1.72rem;
	bottom: 1rem;
	overflow-y: auto;
}
.product-banner{
	width: 100%;
	height: 3rem;
	background: #fff;
}
.product-nav{
	margin-top: 0.2rem;
	display: flex;
	height: 5rem;
	div{
		flex: 1;
		background: #fff;
	}
	.right{
		border-left: 1px solid #F5F5F9;
		div{
			height: 2.5rem;
		}
		.top{
			border-bottom: 1px solid #F5F5F9;
		}
	}
}
.pop-product-tit {
	height: 1.1rem;
	background: #f5f5f9;
	line-height: 1.1rem;
	text-align: center;
}

.pop-product-tit .tit {
	display: inline-block;
	height: 100%;
	color: #ffad06;
	font-size: 0.3rem;
	position: relative;
	padding-left: 0.46rem;
}

.pop-product-tit .tit:after {
	content: '';
	width: 0.5rem;
	height: 0;
	border-bottom: 1px solid #ffad06;
	position: absolute;
	right: -0.8rem;
	top: 48%;
}

.pop-product-tit .tit:before {
	content: '';
	width: 0.5rem;
	height: 0;
	border-bottom: 1px solid #ffad06;
	position: absolute;
	left: -0.8rem;
	top: 48%;
}

.pop-icon {
	position: absolute;
	width: 0.36rem;
	height: 0.36rem;
	background: url(../../static/images/pop-icon.png) no-repeat center;
	background-size: 100%;
	left: 0;
	top: 50%;
	margin-top: -0.18rem;
}
.pop-product-list{
	display: flex;
	flex-wrap: wrap;
	padding: 0 0.04rem;
}
.pop-product-item{
	width: 50%;
	height: 5rem;
	padding: 0 0.08rem;
	margin-bottom: 0.2rem;
}
.pop-product-item>div{
	background: #fff;
	padding: 0.16rem;
}
.pop-product-img{
	width: 3.23rem;
	height: 3.23rem;
}
.pop-product-desc{
	padding-top: 0.3rem;
}
.pop-product-name{
	line-height: 1.2;
	height: 0.64rem;
	overflow: hidden;
}
.pop-product-price{
	padding-top: 0.16rem;
	font-size: 0.3rem;
}
</style>