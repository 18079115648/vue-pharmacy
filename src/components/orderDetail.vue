<template>
    <div class="app">
    	<Header title="订单详情"></Header>
    	<div class="order-status">
    		<img v-if="orderDetail.icon == 1" src="../../static/images/54@3x.png" class="addr-icon" />
    		<img v-else-if="orderDetail.icon == 2" src="../../static/images/50@3x.png" class="addr-icon" />
    		<img v-else-if="orderDetail.icon == 3" src="../../static/images/49@3x.png" class="addr-icon" />
    		<img v-else-if="orderDetail.icon == 4" src="../../static/images/48@3x.png" class="addr-icon" />
    		<img v-else src="../../static/images/47@3x.png" class="addr-icon" />
    		<div class="order-status-info">
    			<p class="price-color">{{orderDetail.status_name}}</p>
    			<p class="tip">{{orderDetail.tip}}</p>
    			<p class="number">订单号：{{orderDetail.order_no}}</p>
    		</div>
    	</div>
    	<div class="order-addr">
    		<img src="../../static/images/52@3x.png" class="addr-icon" />
    		<div class="addr-detail">
    			<div class="addr-contact">
    				<span>收货人：{{orderDetail.customer}}</span>
    				<span>{{orderDetail.mobile}}</span>
    			</div>
    			<div class="addr-text">{{orderDetail.address_all}}</div>
    			<div class="id-card">身份证：{{orderDetail.id_card}}</div>
    		</div>
    		<!--<img src="../../static/images/arror.png" class="more-icon" />-->
    	</div>
    	<div class="recipe-content" v-if="orderDetail.type_order == 902">
    		<img src="../../static/images/51@3x.png" class="addr-icon" />
    		<div class="recipe-info">
    			<p>处方资料及联系方式</p>
    			<p class="phone">{{orderDetail.check_phone_user}}</p>
    		</div>
    		<img v-if="orderDetail.recipe_img" :src="orderDetail.recipe_img" class="recipe-img" @click="enlargeStatus = true"/>
    		<span class="none-recipe-img" v-if="!orderDetail.recipe_img">暂无处方图片</span>
    	</div>
    	<div class="product-list">
    		<div class="product-item" v-for="(obj, key) in orderDetail.goods" :key="key">
    			<img :src="obj.thumb" class="product-img" />
    			<div class="product-info">
    				<div class="product-name">{{obj.title}}</div>
    				<div class="product-amount">
    					<span class="price-color">&yen;{{obj.price_shop}}</span>
    					<span class="count">x{{obj.num}}</span>
    				</div>
    			</div>
    		</div>
    		
    	</div>
    	<div class="order-total">
    		<div class="cell-item">
    			<span>商品合计</span>
    			<span>&yen;{{orderDetail.amount_goods}}</span>
    		</div>
    		<div class="cell-item">
    			<span>运费</span>
    			<span>&yen;{{orderDetail.freight}}</span>
    		</div>
    	</div>
    	<div class="total-price">
    		<div class="price">
    			<span>实付款</span>
    			<span class="price-color">&yen;{{orderDetail.amount_payment}}</span>
    		</div>
    		<p class="time">下单时间：{{orderDetail.add_time}}</p>
    	</div>
		<div class="order-operate">
    		<span @click="orderCancel" v-if="orderDetail.status === 0 || orderDetail.status === 9">取消订单</span>
    		<span @click="payWx" v-if="orderDetail.status === 0 || orderDetail.status === 10" class="other">立即付款</span>
    		<span @click="orderReceipt" v-if="orderDetail.status === 50" class="other">确认收货</span>
    		<span @click="orderComment" v-if="orderDetail.status === 60 || orderDetail.status === 98" class="other">立即评价</span>
    		<span @click="orderDelete" v-if="orderDetail.status === 60 || orderDetail.status === 98 || orderDetail.status === 99 || orderDetail.status === 100 || orderDetail.status === 110" class="other">删除订单</span>
    	</div>
    	<enlarge-img v-show="enlargeStatus" :url="orderDetail.recipe_img" @enlargeCancel="enlargeStatus = false"></enlarge-img>
    </div>
</template>

<script>
import qs from 'qs'
import { Toast, Indicator } from 'mint-ui'
export default {
	data() {
	    return {
	    	isWx: this.$common.isWeixin(),
	    	
	    	orderDetail:{},
	    	enlargeStatus: false
	    }
	},
	created() {
		this.initData()
	},
	methods: {
		initData() {
			window.scrollTo(0,0)
			Indicator.open()
			this.$api.orderDetail({
				id: this.$route.params.id
			}).then(res => {
				Indicator.close()
				if(res.ret == 1){
					this.orderDetail = res
					
					//处方图片
					this.orderDetail.recipe_img = (this.orderDetail.img_user || this.orderDetail.img_check)
					switch (res.status) {
		                case 9:
		                    // 待审核
		                    this.orderDetail.icon = 1
		                    this.orderDetail.tip = '等待药师审核或者电话咨询'
		                    break
		                case 0:
		                    // 待付款
		                    this.orderDetail.icon = 2
		                    this.orderDetail.tip = '请及时付款，超时将关闭订单'
		                    break
		                case 10:
		                    // 已审核
		                    this.orderDetail.icon = 2
		                    this.orderDetail.tip = '审核已通过，请立即付款'
		                    break
		                case 49:
		                    // 待发货
		                    this.orderDetail.icon = 3
		                    this.orderDetail.tip = '已付款,等待卖家发货'
		                    break
		                case 1:
		                    // 已付款
		                    this.orderDetail.icon = 3
		                    this.orderDetail.tip = '已付款,等待卖家发货'
		                    break
		                case 60:
		                    // 待收货
		                    this.orderDetail.icon = 4
		                    this.orderDetail.tip = '已收货'
		                    break
		                case 50:
		                    // 已收货
		                    this.orderDetail.icon = 4
		                    this.orderDetail.tip = '已发货,等待确认收货'
		                    break
		                case 100:
		                    // 交易关闭
		                    this.orderDetail.icon = 5
		                    this.orderDetail.tip = '订单已关闭'
		                    break
		                case 11:
		                    // 审核不通过
		                    this.orderDetail.icon = 5
		                    this.orderDetail.tip = '审核未通过，订单已关闭'
		                    break
		                case 98:
		                    // 待评价
		                    this.orderDetail.icon = 5
		                    this.orderDetail.tip = '感谢您在本平台购物,欢迎再次光临'
		                    break
		                case 99:
		                    // 已评价
		                    this.orderDetail.icon = 5
		                    this.orderDetail.tip = '感谢您在本平台购物,欢迎再次光临'
		                    break
		            }
				}
					
	        }, err => {
	        	Indicator.close()
	        })
		},
		
		//取消订单
		orderCancel() {
			this.$api.orderCancel({
				id: this.$route.params.id
			}).then(res => {
				if(res.ret !== 1) {
					Toast({
					  message: res.msg,
					  position: 'bottom',
					  duration: 1000
					});
					return
				}
				Toast({
				  message: '订单取消成功',
				  position: 'middle',
				  iconClass: 'toast-icon icon-success',
				  duration: 1000
				})
				setTimeout(() => {
					this.initData()
				},500)
	        }, err => {
	        	
	        })
		},
		
		//支付
		payWx(){
			if(!this.isWx) {
				this.$router.push('/paySubmit/' + this.$route.params.id + '/' + '22')
				return
			}
			window.location.href = this.$store.state.back_uri + 'api/Payment/getCode/order_id/' + this.$route.params.id
		},
		
		//确认收货
		orderReceipt(){
			this.$api.orderReceipt({
				id: this.$route.params.id
			}).then(res => {
				if(res.ret !== 1) {
					Toast({
					  message: res.msg,
					  position: 'bottom',
					  duration: 1000
					});
					return
				}
				Toast({
				  message: '操作成功',
				  position: 'middle',
				  iconClass: 'toast-icon icon-success',
				  duration: 1000
				})
				setTimeout(() => {
					this.initData()
				},500)
		    }, err => {
		    	
		    })
		},
		
		//删除订单
		orderDelete() {
			this.$api.orderDelete({
				id: this.$route.params.id
			}).then(res => {
				if(res.ret !== 1) {
					Toast({
					  message: res.msg,
					  position: 'bottom',
					  duration: 1000
					});
					return
				}
				Toast({
				  message: '订单删除成功',
				  position: 'middle',
				  iconClass: 'toast-icon icon-success',
				  duration: 1000
				})
				setTimeout(() => {
					this.$router.go(-1)
				},1000)
	        }, err => {
	        	
	        })
		},
		//评价
		orderComment() {
			this.$router.push('/evaluate/' + this.$route.params.id)
		}
	},
	beforeRouteLeave(to, from, next) {
		if(this.enlargeStatus) {
			this.enlargeStatus = false
			next(false)
			return
		} else {
			next()
		}

	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
	line-height: 1.5;
	padding-bottom: 0.3rem;
	position: relative;
	font-size: 0.26rem;
} 
.order-status{
	display: flex;
	background: #FFFFFF;
	padding: 0.2rem 0.3rem;
	align-items: flex-start;
	margin-bottom: 0.2rem;
	.addr-icon{
		width: 0.32rem;
		margin-right: 0.3rem;
		margin-top: 0.08rem;
	}
	.order-status-info{
		flex: 1;
		overflow: hidden;
		.price-color{
			font-size: 0.3rem;
		}
		.tip{
			padding: 0.14rem 0;
			color: #999;
			font-size: 0.24rem;
			border-bottom: 1px solid #f6f6f6;
		}
		.number{
			padding-top: 0.15rem;
		}
	}
}
.recipe-content{
	display: flex;
	background: #FFFFFF;
	padding: 0.2rem 0.3rem;
	align-items: flex-start;
	margin-bottom: 0.2rem;
	.addr-icon{
		width: 0.22rem;
		height: 0.32rem;
		margin-right: 0.36rem;
		margin-top: 0.02rem;
	}
	.recipe-info{
		flex: 1;
		.phone{
			padding-top: 0.15rem;
		}
	}
	.recipe-img{
		width: 1rem;
		height: 1rem;
	}
	.none-recipe-img{
		height: 1rem;
		line-height: 1rem;
		color: #999;
		font-size: 0.24rem;
	}
}
.order-addr{
	position: relative;
	background: #FFFFFF;
	padding: 0.16rem 0.3rem;
	display: flex;
	align-items: center;
	margin-bottom: 0.2rem;
	.bg-line{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.addr-icon{
		width: 0.28rem;
		height: 0.36rem;
		margin-right: 0.34rem;
	}
	.more-icon{
		width: 0.16rem;
		height: 0.28rem;
		margin-left: 0.25rem;
	}
	.addr-detail{
		flex: 1;
		padding-right: 0.3rem;
		& > div{
			padding: 0.04rem 0;
			font-size: 0.24rem;
		}
		.addr-contact{
			display: flex;
			justify-content: space-between;
			font-size: 0.26rem;
		}
	}
}
.product-list{
	margin: 0.2rem 0;
	background: #f9f9f9;
	.product-item{
		padding: 0.2rem 0.3rem;
		border-bottom: 1px solid #f0f0f0;
		display: flex;
		.product-img{
			width: 1.4rem;
			height: 1.4rem;
			margin-right: 0.2rem;
			border: 1px solid #eee;
		}
		.product-info{
			flex: 1;
			display: flex;
			flex-direction: column;
			.product-name{
				flex: 1;
			}
			.product-amount{
				display: flex;
				justify-content: space-between;
				font-size: 0.3rem;
				.count{
					color: #888;
				}
			}
		}
	}
	.product-item:last-child{
		border: none;
	}
}
.order-total{
	padding: 0.15rem 0.3rem;
	background: #fff;
	border-bottom: 1px solid #f6f6f6;
	.cell-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 0.5rem;
	}
}
.total-price{
	background: #fff;
	padding: 0.24rem 0.3rem;
	margin-bottom: 0.2rem;
	.price{
		display: flex;
		justify-content: space-between;
		padding-bottom: 0.15rem;
		.price-color{
			font-size: 0.3rem;
		}
	}
	.time{
		color: #999999;
		text-align: right;
		font-size: 0.24rem;
	}
}
.order-operate{
	padding: 0.18rem 0.3rem;
	display: flex;
	justify-content: flex-end;
	background: #fff;
	span{
		height: 0.6rem;
		line-height: 0.6rem;
		border-radius: 0.28rem;
		padding: 0 0.3rem;
		border: 1px solid #ddd;
		margin-left: 0.24rem;
		color: #888;
	}
	span.other{
		color: #3cafb6;
		border-color: #3cafb6;
	}
}
</style>