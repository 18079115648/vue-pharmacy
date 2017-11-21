<template>
    <div class="app">
    	<div class="search-content">
    		<span @click="back" class="back"></span>
    		<div class="search-input">
    			{{search_word}}
    		</div>
    		
    	</div>
    	<div class="content">
    		<Pagination :render="render" :param="pagination" :autoload="false" ref="pagination" uri="/goods/index">
				<div class="pop-product-list" v-show="pagination.content.length>0">
					<router-link :to="'/shopdetails/' + item.goods_id " class="pop-product-item" v-for="(item, index) in pagination.content" :key="index">
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
			</Pagination>
			<div class="none-data" v-show="pagination.content.length<1 && pagination.loadEnd">
	    		<img class="none-img" src="../../static/images/46@3x.png"  />
	    		<p class="none-tip">没有找到商品单信息</p>
	    	</div>
    	</div>
		
    </div>
</template>

<script>

export default {
	data() {
		return {
			search_word: '搜索您要的宝贝',
			pagination: {
                content: [],
                loadEnd: false,
                data: {
                	p: 1,
					wd: null
                }
            },
		}
	},
	created() {
		this.$storage.get('search_word') && (this.search_word = this.$storage.get('search_word'))
	},
	mounted() {
		this.pagination = {
            content: [],
            loadEnd: false,
            data: {
            	p: 1,
				wd: this.$storage.get('search_word')
            }
        }
		this.$store.commit('setLoadingStatus', true)
		this.$refs.pagination.refresh()
	},
	methods: {
		back() {
			this.$router.go(-1)
		},
		render(res) {
            res.data.forEach((item) => {
            	this.pagination.content.push(item)
            })
        }
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
	padding-top: 0.96rem;
} 
.content{
	position: absolute;
	width: 100%;
	left: 0;
	top: 0.96rem;
	bottom: 0;
	overflow-y: auto;
}
.search-content{
	position: fixed;
	width: 100%;
	left: 0;
	top: 0;
	display: flex;
	background: #fff;
	height: 0.96rem;
	line-height: 0.6rem;
	padding: 0.18rem 0.3rem;
	border-bottom: 1px solid #F5F5F9;
	z-index: 30;
	& > span.back{
		width: 0.6rem;
		margin-right: 0.3rem;
		color: #3cafb6;
		background: url(../../static/images/com-back.png) no-repeat center;
		background-size: 80%;
	}
	.search-input{
		flex: 1;
		background: #F5F5F9;
		padding: 0 0.15rem;
		border-radius: 0.08rem;
		color: #666;
	}
}
.pop-product-list{
	display: flex;
	flex-wrap: wrap;
	padding: 0.2rem 0.04rem;
}
.pop-product-item{
	width: 50%;
	height: 4.9rem;
	padding: 0 0.08rem;
	margin-bottom: 0.2rem;
}
.pop-product-item>div{
	background: #fff;
	padding: 0.16rem;
}
.pop-product-img{
	width: 3.15rem;
	height: 3.15rem;
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
.none-img{
	width: 0.9rem !important;
}
</style>