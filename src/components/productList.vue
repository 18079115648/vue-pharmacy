<template>
    <div class="app">
    	<Header :title="title"></Header>
    	<div class="content">
    		<Pagination :render="render" :param="pagination" :autoload="false" ref="pagination" :uri="uri">
				<div class="pop-product-list" v-show="pagination.content.length>0">
					<router-link :to="'/shopdetails/' + item.goods_id" class="pop-product-item" v-for="(item, index) in pagination.content" :key="index">
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
	    		<img class="none-img" src="../../static/images/42@3x.png"  />
	    		<p class="none-tip">没有找到商品单信息</p>
	    	</div>
    	</div>
    	
	    	
    </div>
</template>

<script>

export default {
	data() {
		return {
			title: '',
			uri: '',
			pagination: {
                content: [],
                loadEnd: false,
                data: {
                	p: 1
                }
            },
		}
	},
	created() {
		this.$store.commit('setLoadingStatus', true)
	},
	mounted() {
		
		if(this.$route.params.type === 'active') {
			this.uri = '/activity/goods'
			this.pagination = {
	            content: [],
	            loadEnd: false,
	            data: {
	            	p: 1,
					id: this.$route.params.id
	            }
	        }
			this.title = this.$storage.get('activity_cat')
		}else if(this.$route.params.type === 'goods') {
			this.uri = '/goods/index'
			this.pagination = {
	            content: [],
	            loadEnd: false,
	            type: 'post',
	            data: {
	            	p: 1,
					cat_id: this.$route.params.id
	            }
	        }
			this.title = this.$storage.get('product_cat')
		}
		
		this.$refs.pagination.refresh()
	},
	methods: {
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
	position: relative;
} 
.content{
	position: absolute;
	width: 100%;
	left: 0;
	top: 0.92rem;
	bottom: 0;
	overflow-y: auto;
}
.search-content{
	display: flex;
	background: #fff;
	height: 0.96;
	line-height: 0.6rem;
	padding: 0.18rem 0.3rem;
	border-bottom: 1px solid #F5F5F9;
	& > span{
		width: 0.9rem;
		color: #3cafb6;
	}
	.search-input{
		flex: 1;
		background: #F5F5F9;
		padding: 0 0.15rem;
		border-radius: 0.08rem;
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