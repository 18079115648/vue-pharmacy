<template>
    <div class="app">
    	<Header title="评价"></Header>
    	<div class="goods-item" v-for="(item, index) in goodsList" :key="index">
    		<p class="goods-name">{{item.title}}</p>
    		<section class="text-content">
				<img :src="item.thumb" class="goods-img"  />
				<textarea class="desc" v-model="item.content" placeholder="写下购买体验和使用感受，为其他患者提供参考"></textarea>
			</section>
			<div class="star-item">
				<span>商品评价</span>
				<div class="star">
					<span class="active" v-for="i in item.star" @click="changeGoodsStar(i, -1, item)"></span>
					<span v-for="n in 5-item.star" @click="changeGoodsStar(n + item.star, 1, item)"></span>
				</div>
			</div>
    	</div>
		<section class="evaluate-star">
			<div class="star-item">
				<span>服务态度</span>
				<div class="star">
					<span class="active" v-for="i in starList.serveStar" @click="changeStar(i, -1, 'serveStar')"></span>
					<span v-for="n in 5-starList.serveStar" @click="changeStar(n + starList.serveStar, 1, 'serveStar')"></span>
				</div>
			</div>
			<div class="star-item">
				<span>物流服务</span>
				<div class="star">
					<span class="active" v-for="i in starList.logiStar" @click="changeStar(i, -1, 'logiStar')"></span>
					<span v-for="n in 5-starList.logiStar" @click="changeStar(n + starList.logiStar, 1, 'logiStar')"></span>
				</div>
			</div>
		</section>
		<div class="save" @click="submitComment">提交</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			starList: {
				serveStar: 0,
				logiStar: 0
			},
			order_id: null,
			goodsList: [],
			
			disabledBtn: false
			
		}
	},
	created() {
		this.$api.orderDetail({
			id: this.$route.params.id
		}).then(res => {
			if(res.ret == 1){
				this.order_id = res.order_id
				res.goods.forEach((item) => {
					item.content = ''
					item.star = 0
					this.goodsList.push(item)
				})
			}
				
        }, err => {
        	
        })
	},
	mounted() {	
		
	},
	methods: {
		changeGoodsStar(index, status, item){
			if(status < 0 && item.star == index) {
				item.star = index - 1
			}else {
				item.star = index
			}
		},
		changeStar(index, status, item) {
			if(status < 0 && this.starList[item] == index) {
				this.starList[item] = index - 1
			}else {
				this.starList[item] = index
			}
		},
		submitComment() {
			let goods_ids = []
			let score = []
			let content = []
			let status = false
			this.goodsList.forEach((item) => {
				if(!item.content) {
					status = true
					return
				}
				goods_ids.push(item.goods_id)
				score.push(item.star)
				content.push('"' + String(item.content) + '"')
			})
			if(status) {
				Toast({
				  message: '请向对应商品填写您的评价或感受',
				  position: 'bottom',
				  duration: 1000
				});
				return
			}
			if(this.disabledBtn) {
				return
			}
			this.disabledBtn = true
			goods_ids = '[' + goods_ids.join(',') + ']'
			score = '[' + score.join(',') + ']'
			content = '[' + content.join(',') + ']'
			this.$api.createComment({
				order_id: this.order_id,
				goods_ids: goods_ids,
				score: score,
				content_json: content,
				score_service: this.starList.serveStar,
				score_speed: this.starList.logiStar
			}).then(res => {
				
				if(res.ret == 1) {
					this.$router.go(-1)
					this.disabledBtn = false
				}
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
} 
.goods-item{
	padding: 0.2rem 0.3rem;
	background: #fff;
	border-bottom: 1px solid #F5F5F5;
	.goods-name{
		padding-top: 0.3rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}
}
.text-content{
	
	padding: 0.3rem 0 0.15rem;
	display: flex;
	justify-content: flex-start;
	.goods-img{
		border: 1px solid #eee;
		width: 0.8rem;
		height: 0.8rem;
		margin-right: 0.3rem;
	}
	.desc{
		flex: 1;
		height: 1.5rem;
		outline: none;
		border: 1px solid #eee;
		padding: 0.1rem 0.2rem;
		line-height: 1.414;
		
	}
}
.evaluate-star{
	background: #fff;
	margin-top: 0.3rem;
	padding: 0.2rem 0.3rem;
	
}
.star-item{
	display: flex;
	justify-content: space-between;
	padding: 0.2rem 0;
	align-items: center;
	.star{
		padding-right: 0.4rem;
		display: flex;
		
		span{
			width: 0.55rem;
			height: 0.55rem;
			background: url(../../static/images/27@3x.png) no-repeat center;
			background-size: 70%;
		}
		span.active{
			background-image: url(../../static/images/28@3x.png);
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
textarea::-webkit-input-placeholder {
	color: #ccc;
}
</style>