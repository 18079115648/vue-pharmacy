<template>
	<div class="app">
		<!--顶部-->
		<Header title="订单支付"></Header>
		<!--banner-->
		<div class="reminder">
			<p>订单提交成功，只差最后一步</p>
			<p class="tip">请尽快完成支付，超时订单将自动被取消！</p>
			<img class="time" src="../../static/images/time.png"  />
		</div>
		
		<!--订单号和金额-->
		<div class="order-info">
			<div>
				<div class="fl">订单号</div>
				<span class="fr">{{order_no}}</span>
			</div>
			
			<div>
				<div>实付金额</div>
				<span class="price-color">&yen;11111</span>
			</div>
		</div>
		<!--选择支付方式-->
		<div class="payWay">
			<span>请选择支付方式</span>
			<mt-radio
			  align="right"
			  v-model="payWayId"
			  :options="options">
			</mt-radio>
		</div>
		<div class="btn-default pay">
			确认支付
		</div>
	</div>
</template>

<script type="text/javascript">
import { Toast } from 'mint-ui'
	export default {
		data(){
			return {
		        options: [{
				    label: '微信支付',
				    value: '1'
				  },{
				    label: '支付宝支付',
				    value: '2'
				  }],
				
				payWayId: '1',
				order_id: null,
				order_no: null
			}
		},
		created() {
			this.order_id = this.$route.params.order_id
			this.order_no = this.$route.params.order_no
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		position: relative;
		background: #F5F5F9;
		padding-bottom: 1rem;
	}
	.reminder{
		height: 2rem;
		background: #fff;
		padding: 0.55rem 0.3rem 0;
		padding-left: 1.45rem;
		position: relative;
		& > p{
			padding-bottom: 0.3rem;
		}
		.tip{
			font-size: 0.24rem;
		}
		.time{
			position: absolute;
			width: 0.7rem;
			left: 0.4rem;
			top: 0.65rem;
		}
	}
	.order-info{
		margin: 0.2rem 0;
		background: #fff;
		padding: 0.2rem 0.3rem;
		&>div{
			display: flex;
			justify-content: space-between;
			padding: 0.15rem 0;
		}
	}
	/*选择支付方式*/
	.payWay{
		background: #FFFFFF;
		position: relative;
	}
	.payWay span{
		width: 100%;
		display: block;
		height:0.88rem ;
		padding: 0 0.3rem;
		border-bottom:1px solid #f5f5f5 ;
		line-height: 0.88rem;
	}
	
	.pay{
		margin-top: 1rem;
	}

</style>