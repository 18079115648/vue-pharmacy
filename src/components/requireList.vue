<template>
    <div class="app">
    	<Header title="需求清单"></Header>
    	<div class="edit-status" v-show="cartData.length>0" @click="editStatus = !editStatus">
    		<span v-show="!editStatus">编辑</span>
    		<span v-show="editStatus">完成</span>
    	</div>
    	<div class="none-data" v-show="cartData.length<1">
    		<img class="none-img" src="../../static/images/42@3x.png"  />
    		<p class="none-tip">购物车瘪瘪的 ~ ~</p>
    	</div>
    	<div class="product-list" v-show="cartData.length>0">
			<div class="product-item" v-for="(item, index) in cartData" :key="index">
				<div class="select-status" @click="item.active = !item.active">
					<label class="fullEle">
						<span class="checkbox-icon " :class="{'active': item.active}"></span>
					</label>
				</div>
				<div class="product-detail">
					<img :src="item.thumb" class="product-img" />
					<div class="product-info">
						<div class="product-name">{{item.title}}</div>
						<div class="product-amount">
							<span class="price-color">&yen;{{item.price_shop}}</span>
							<div class="count-content">
								<span @click="minus(item)">-</span>
								<span class="count">{{item.num}}</span>
								<span @click="plus(item)">+</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="total-content" v-show="cartData.length>0">
			<div class="select-status" @click="toggleAllCheck">
				<label class="fullEle">
					<span class="checkbox-icon" :class="{'active': checkAll}"></span>
				</label>
			</div>
			<div class="total-text">
				<span>全选</span>
				<div class="total-price" v-show="!editStatus">
					<span>合计：</span>
					<span class="price-color">&yen;{{checkTotalPrice}}</span>
				</div>
				<div class="btn-operate disabled" v-show="!editStatus && checkNum<1">提交预定</div>
				<div class="btn-operate" v-show="!editStatus && checkNum>0" @click="paySubmit">提交预定({{checkNum}})</div>
				<div class="btn-delete" v-show="editStatus" @click="deleteGoods">删除</div>
			</div>
		</div>
		<confirm-modal :show="deleteShow" @confirm_modal="cartDelete" @closeModal="deleteShow = false" message="确定删除该商品?"></confirm-modal>	
    </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
	data() {
	    return {
	    	deleteShow: false,
	    	editStatus: false,
		    cartData: [],
	    }
	},
	created() {
		this.$store.commit('setLoadingStatus', true)
		this.initData()
	},
	computed: {
		  checkAll: function() {
		  	let all = true
		  	this.cartData.forEach((item) => {
		  		if(!item.active) {
		  			all = false
		  			return
		  		}
		  	})
		  	return all
		  },
		  checkNum: function() {
		  	let num = 0
		  	this.cartData.forEach((item) => {
		  		if(item.active) {
		  			num+=1
		  		}
		  	})
		  	return num
		  },
		  checkTotalPrice: function() {
		  	let price = 0
		  	this.cartData.forEach((item) => {
		  		if(item.active) {
		  			price+=(parseFloat(item.price_shop) * item.num)
		  		}
		  	})
		  	return parseFloat(price).toFixed(2)
		  },
		  checkGoodsId: function() {
		  	let arr = []
		  	this.cartData.forEach((item) => {
		  		if(item.active) {
		  			arr.push(item.goods_id)
		  		}
		  	})
		  	return arr
		  }
	},
	methods: {
		initData() {
			this.$api.getCartData({
				type_id: 902
			}).then(res => {
				if(res.ret == 1) {
					Indicator.close()
					this.cartData = []
					res.data.forEach((item) => {
						item.active = false
						this.cartData.push(item)
					})
				}
		    }, err => {
		    	
		    })
		},
		minus(item){
			if(item.num < 2) {
				return
			}
			item.num--
			this.$api.updataCartData({
				type_id: 902,
				goods_id: item.goods_id,
				num: item.num
			}).then(res => {
				if(res.ret == 1) {
					
				}
		    }, err => {
		    	
		    })
		},
		plus(item){
			item.num++
			this.$api.updataCartData({
				type_id: 902,
				goods_id: item.goods_id,
				num: item.num
			}).then(res => {
				if(res.ret == 1) {
					
				}
		    }, err => {
		    	
		    })
		},
		toggleAllCheck() {
			if(this.checkAll) {
				this.cartData.forEach((item) => {
		  		item.active = false
		  	})
			}else {
				this.cartData.forEach((item) => {
		  		item.active = true
		  	})
			}
		},
		paySubmit() {
			this.$storage.set('select_goods_arr', this.checkGoodsId)
			this.$router.push({
				path: '/orderSubmit/' + 902 + '/' + 2
			})
		},
		deleteGoods() {
			this.deleteShow = true
		},
		cartDelete() {
			Indicator.open()
			let str = ''
			this.checkGoodsId.forEach((value) => {
				str+=(',' + value)
			})
			this.$api.deleteCartData({
				type_id: 902,
				goods_ids: str.substr(1)
			}).then(res => {
				if(res.ret == 1) {
					this.deleteShow = false
			    	this.editStatus = false
					this.initData()
				}
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
.edit-status{
	position: fixed;
	right: 0;
	top: 0;
	width: 1.2rem;
	height: 0.92rem;
	text-align: center;
	line-height: 0.92rem;
	z-index: 40;
	color: #fff;
}
.product-list{
	position: absolute;
	width: 100%;
	left: 0;
	top: 0.92rem;
	bottom: 0.9rem;
	overflow-y: auto;
}
.product-item{
	background: #f9f9f9;
	padding: 0.2rem 0;
	height: 2.2rem;
	display: flex;
	margin-bottom: 0.2rem;
}
.select-status{
	width: 1rem;
	height: 100%;
	& > input{
		display: none;
	}
	& > label{
		display: flex;
		align-items: center;
		justify-content: center;
		.checkbox-icon{
			width: 0.4rem;
			height: 0.4rem;
			overflow: hidden;
			border: 1px solid #666;
			border-radius: 50%;
		}
		.checkbox-icon.active{
			border-color: #3cafb6;
			background: url(../../static/images/43@3x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
}
.product-detail{
	flex: 1;
	display: flex;
	.product-img{
		width: 1.8rem;
		height: 1.8rem;
		margin-right: 0.26rem;	
	}
	.product-info{
		flex: 1;
		padding: 0.1rem 0;
		padding-right: 0.3rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		
		.product-amount{
			height: 0.7rem;
			display: flex;
			align-items:flex-end;
			justify-content: space-between;
			.price-color{
				font-size: 0.32rem;
			}
			.count-content{
				display: flex;
				align-items: center;
				
				*{
					height: 0.6rem;
					line-height: 0.6rem;
					text-align: center;
					background: #efefef;
					border-radius: 0.06rem;
					margin: 0 0.04rem;
				}
				& > span{
					width: 0.6rem;
					font-size: 0.36rem;
				}
				& > span.count{
					width: 0.7rem;
					font-size: 0.32rem;
				}
			}
		}
	}
}
.total-content{
	position: fixed;
	width: 100%;
	left: 0;
	bottom: 0;
	height: 0.9rem;
	background: #FFFFFF;
	border-top: 1px solid #eee;
	display: flex;
	.total-text{
		flex: 1;
		display: flex;
		justify-content: space-between;
		line-height: 0.9rem;
		font-size: 0.3rem;
		.total-price{
			flex: 1;
			text-align: right;
			padding: 0 0.35rem 0 0.3rem;
			display: flex;
			justify-content: flex-end;
			.price-color{
				min-width: 1rem;
				text-align: left;
				font-size: 0.34rem;
			}
		}
		.btn-operate{
			width: 2.4rem;
			text-align: center;
			background: #3cafb6;
			color: #fff;
		}
		.btn-operate.disabled{
			color: #999;
    		background: #d7d7d7;
    		letter-spacing: 1px;
		}
	}
}
.btn-delete{
	background: #f19325;
    color: #fff;
    height: 0.66rem;
    align-self: center;
    line-height: 0.66rem;
    font-size: 0.28rem;
    padding: 0 0.5rem;
    margin-right: 0.4rem;
    border-radius: 0.08rem;
}
</style>