<template>
    <div class="app">
    	<Header :title="title"></Header>
    	<div class="content">
    		<div class="none-data" v-show="pagination.content.length<1 && pagination.loadEnd">
	    		<img class="none-img" src="../../static/images/25@3x.png"  />
	    		<p class="none-tip">暂无订单信息</p>
	    	</div>
	    	<Pagination :render="render" :autoload="false" :param="pagination" ref="pagination" uri="/order/index">
					<div class="order-list" v-show="pagination.content.length>0">
	        	<div class="order-item" v-for="(item, index) in pagination.content" :key="index">
	        		<router-link :to="'/orderDetail/' + item.order_id">
	        			<div class="order-top">
		        			<span>{{item.update_time}}</span>
		        			<span class="price-color">{{item.status_name}}</span>
		        		</div>
		        		<div class="product-list">
					    		<div class="product-item" v-for="(obj, key) in item.goods" :key="key">
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
					    		共 {{item.total}} 件商品， 合计：&yen;{{item.amount_payment}}
					    	</div>
	        		</router-link>
		        		
			    	<div class="order-operate">
			    		<span @click="selectCancel(item.order_id, index)" v-if="item.status === 0 || item.status === 9">取消订单</span>
			    		<span @click="payWx(item.order_id)"  v-if="item.status === 0 || item.status === 10" class="other">立即付款</span>
			    		<span @click="orderReceipt(item.order_id)" v-if="item.status === 50" class="other">确认收货</span>
			    		<span @click="orderComment(item.order_id)" v-if="item.status === 60 || item.status === 98" class="other">立即评价</span>
			    		<span @click="selectDelete(item.order_id, index)" v-if="item.status === 60 || item.status === 98 || item.status === 99 || item.status === 100 || item.status === 110" class="other">删除订单</span>
			    	</div>
	        	</div>
	        	
	        </div>
				</Pagination>
    	</div>
	    	
        
	    <confirm-modal :show="deleteShow" @confirm_modal="orderDelete" @closeModal="deleteShow = false" message="确定删除该订单?"></confirm-modal>	
	    <confirm-modal :show="cancelShow" @confirm_modal="orderCancel" @closeModal="cancelShow = false" message="确定取消该订单?"></confirm-modal>	
    </div>
</template>

<script>
import qs from 'qs'
import { Toast } from 'mint-ui'
export default {
	data() {
	    return {
	    	isWx: this.$common.isWeixin(),
	    	
	    	
	    	deleteShow: false,
	    	cancelShow: false,
	    	currIndex: null,
	    	currId: null,
	    	title: '',
	    	pagination: {
		        content: [],
		        loadEnd: false,
		        data: {
		        	p: 1,
					status: 0
		        }
		    },
	    }
	},
	mounted() {
		this.status = Number(this.$route.params.status)
		this.pagination = {
					        content: [],
					        loadEnd: false,
					        data: {
					        	p: 1,
							    status: this.status
					        }
					    }
		switch (this.status) {
			case -1:
			  this.title = '我的订单'
			  break;
			case 0:
			  this.title = '待付款'
			  break;
			case 9:
			  this.title = '待审核'
			  break;
			case 49:
			  this.title = '待发货'
			  break;
			case 50:
			  this.title = '待收货'
			  break;
			case 98:
			  this.title = '待评价'
			  break;
		}
		this.$refs.pagination.refresh()
	},
	methods: {
		  render(res) {
				res.data.forEach((item) => {
        	this.pagination.content.push(item)
        })
			},
			
			//取消订单
			selectCancel(id, index){
				this.currIndex = index
				this.currId = id
				this.cancelShow = true
			},
			orderCancel() {
				this.$api.orderCancel({
					id: this.currId
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
						this.pagination = {
									        content: [],
									        loadEnd: false,
									        data: {
									        	p: 1,
												status: this.status
									        }
									    }
						this.$refs.pagination.refresh()
					},500)
		        }, err => {
		        	
		        })
			},
			
			//确认收货
			orderReceipt(id){
				this.$api.orderReceipt({
					id: id
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
						this.pagination = {
									        content: [],
									        loadEnd: false,
									        data: {
									        	p: 1,
												status: this.status
									        }
									    }
						this.$refs.pagination.refresh()
					},500)
		        }, err => {
		        	
		        })
			},
			
			//支付
			payWx(id){
				if(!this.isWx) {
					this.$router.push('/paySubmit/' + id + '/' + '22')
					return
				}
				window.location.href = this.$store.state.back_uri + 'api/Payment/getCode/order_id/' + id
			},
			
			//删除订单
			selectDelete(id, index){
				this.currIndex = index
				this.currId = id
				this.deleteShow = true
			},
			orderDelete() {
				this.$api.orderDelete({
					id: this.currId
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
						this.pagination.content.splice(this.currIndex, 1)
					},500)
		        }, err => {
		        	
		        })
			},
			//评价
			orderComment(id){
				this.$router.push('/evaluate/' + id)
			}
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
	line-height: 1.4;
	position: relative;
	padding-bottom: 0.3rem;
} 
.content{
	position: absolute;
	width: 100%;
	left: 0;
	top: 0.92rem;
	bottom: 0;
	overflow-y: auto;
	padding-bottom: 0.3rem;
}
.order-list .order-item:last-child{
	margin-bottom: 0;
}
.order-item{
	background: #fff;
	margin-bottom: 0.2rem;
	.order-top{
		display: flex;
		justify-content: space-between;
		padding: 0.2rem 0.3rem;
		color: #888;
	}
	.order-total{
		padding: 0.22rem 0.3rem;
		text-align: right;
		border-bottom: 1px solid #f6f6f6;
	}
	.order-operate{
		padding: 0.14rem 0.3rem;
		display: flex;
		justify-content: flex-end;
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
}
.product-list{
	background: #f9f9f9;
	.product-item{
		padding: 0.2rem 0.3rem;
		border-bottom: 1px solid #f0f0f0;
		display: flex;
		.product-img{
			width: 1.4rem;
			height: 1.4rem;
			margin-right: 0.2rem;
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

</style>