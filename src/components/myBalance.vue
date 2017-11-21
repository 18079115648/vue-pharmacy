<template>
	<div class="app">
		<Header title="我的余额"></Header>
		<div class="balance-top">
			<p class="tit">账户余额(元)</p>
			<p class="balance-amount">{{balance}}</p>
			<router-link to="/recharge" class="recharge-btn">充值</router-link>
		</div>
		<div class="content">
			<Pagination :render="render" :param="pagination" ref="pagination" uri="/order/recharge">
				<div class="balance-list" v-show="pagination.content.length>0">
					<div class="balance-item" v-for="(item, index) in pagination.content" :key="index">
						<p class="item-name">
							<span>{{item.description}}</span>
							<span v-if="item.status" class="price-color">+{{item.change_money}}</span>
							<span v-if="!item.status">{{item.change_money}}</span>
						</p>
						<p class="item-time">
							<span>{{item.entrydate}}</span>
							<span v-if="item.status">充值成功</span>
							<span style="color: #ed5349;" v-if="!item.status">充值失败</span>
						</p>
					</div>
				</div>
			</Pagination>
			<div class="none-data" v-show="pagination.content.length<1 && pagination.loadEnd">
	    		<p class="none-tip">暂无数据信息</p>
	    	</div>
		</div>
		
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				balance: 0,
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
			this.balance = parseFloat(this.$storage.get('user_money')).toFixed(2)
		},
		mounted() {

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
	position: relative;
} 	
.balance-top{
	height: 2.1rem;
	background: #3cafb6;
	position: fixed;
	width: 100%;
	left: 0;
	top: 0.92rem;
	z-index: 10;
	color: #fff;
	padding: 0 0.3rem;
	.tit{
		padding: 0.2rem 0;
	}
	.balance-amount{
		font-size: 0.7rem;
		padding-top: 0.3rem;
		width: 5rem;
		overflow: hidden;
	}
	.recharge-btn{
		position: absolute;
		border: 1px solid #fff;
		height: 0.6rem;
		padding: 0 0.45rem;
		line-height: 0.6rem;
		border-radius: 0.3rem;
		right: 0.3rem;
		bottom: 0.5rem;
		color: #fff;
	}
}
.content{
	position: absolute;
	width: 100%;
	top: 3.02rem;
	bottom: 0;
	overflow-y: auto;
}
.balance-list{
	background: #FFFFFF;
	padding: 0 0.3rem;
	.balance-item{
		border-bottom: 1px solid #F9F9F9;
		padding: 0.15rem 0;
		& > p{
			padding: 0.15rem 0;
			display: flex;
			justify-content: space-between;
			.price-color{
				font-weight: 700;
			}
		}
		.item-time{
			color: #999;
			font-size: 0.26rem;
		}
	}
}
</style>