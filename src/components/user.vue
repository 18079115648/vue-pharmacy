<template>
    <div class="app">
    	<div class="user-top">
    		<router-link to="/indexSetting" v-if="!isWx" class="set-up other-icon"></router-link>
    		<router-link to="/advices" class="news other-icon"></router-link>
    		<router-link to="/userInfo" class="to-info" >
    			<img :src="headImg" class="avatar" />
    			<p class="nick-name">{{userInfo.username}}</p>
    		</router-link>
    	</div>
    	<div class="user-nav">
    		<router-link to="/myBalance" class="user-nav-item" >
    			<p class="amount charge"><span>{{userInfo.user_money}}</span>元</p>
    			<p class="nav-text">余额</p>
    		</router-link>
    		<router-link :to="'/myIntergal/' + bindMenber" class="user-nav-item" >
    			<p class="amount integral"><span>{{userInfo.pay_points}}</span>分</p>
    			<p class="nav-text">积分</p>
    		</router-link>
    	</div>
    	<div class="user-order">
    		<div class="order-top ">
    			<span>我的订单</span>
    			<router-link to="/allOrders/-1" class="more-order has-right-arror" >
	    			查看全部订单
	    		</router-link>
    		</div>
    		<div class="order-nav">
    			<router-link to="/allOrders/9" class="order-nav-item">
    				<span v-if="userInfo.order_check_is_0 > 0" class="count">{{userInfo.order_check_is_0}}</span>
    				<img src="../../static/images/54@3x.png" class="nav-icon" />
    				<p>待审核</p>
    			</router-link>
    			<router-link to="/allOrders/0" class="order-nav-item">
    				<span v-if="userInfo.order_0 > 0" class="count">{{userInfo.order_0}}</span>
    				<img src="../../static/images/50@3x.png" class="nav-icon" />
    				<p>待付款</p>
    			</router-link>
    			<router-link to="/allOrders/49" class="order-nav-item">
    				<span v-if="userInfo.order_49 > 0" class="count">{{userInfo.order_49}}</span>
    				<img src="../../static/images/49@3x.png" class="nav-icon" />
    				<p>待发货</p>
    			</router-link>
    			<router-link to="/allOrders/50" class="order-nav-item">
    				<span v-if="userInfo.order_50 > 0" class="count">{{userInfo.order_50}}</span>
    				<img src="../../static/images/48@3x.png" class="nav-icon" />
    				<p>待收货</p>
    			</router-link>
    			<router-link to="/allOrders/98" class="order-nav-item">
    				<span v-if="userInfo.order_98 > 0" class="count">{{userInfo.order_98}}</span>
    				<img src="../../static/images/47@3x.png" class="nav-icon" />
    				<p>待评价</p>
    			</router-link>
    		</div>
    	</div>
    	<div class="user-link">
    		<router-link to="/Myhealth" class="link-item has-right-arror">
				<img src="../../static/images/9@3x.png" class="nav-icon" />
				我的健康
			</router-link>
			<router-link to="/healthRecords" class="link-item has-right-arror">
				<img src="../../static/images/8@3x.png" class="nav-icon" />
				健康档案
			</router-link>
			<router-link to="/addressList/list" class="link-item  has-right-arror">
				<img src="../../static/images/7@3x.png" class="nav-icon addr" />
				收货地址
			</router-link>
			
    	</div>
    	<div class="user-link" style="margin-bottom: 0.8rem;" v-if="isWx">
    		<router-link to="/aboutUs" class="link-item has-right-arror">
				<img src="../../static/images/6@3x.png" class="nav-icon" />
				关于我们
			</router-link>
    	</div>
    	<Menu actived="five"></Menu>
    </div>
</template>

<script>

export default {
	data() {
		return {
			isWx: this.$common.isWeixin(),
			
			userInfo: {},
			headImg:'',
			bindMenber: 0,
			isWx: this.$common.isWeixin()
		}
	},
	created() {
		this.$api.user().then(res => { 
			if(res.ret == 1) {
				this.userInfo = res
				this.headImg = res.img_head || '../../static/images/avatar.png'
				this.bindMenber = res.bind
				this.$storage.set('user_money', this.userInfo.user_money)
			}
        }, err => {
        	
        })
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
	font-size: 0.26rem;
} 
.user-top{
	height: 3.3rem;
	/*background: url(../../static/images/10@3x.png) no-repeat center;*/
	/*background-size: 100% auto;*/
	background: #3cafb6;
	position: relative;
}
.other-icon{
	position: absolute;
	width: 1rem;
	height: 1rem;
	top: 0rem;
	background-position: center;
	background-size: 55%;
	background-repeat: no-repeat;
}
.other-icon.set-up{
	left: 0;
	background-image: url(../../static/images/set.png);
}
.other-icon.news{
	right: 0;
	background-image: url(../../static/images/news.png);
	background-size: 42%;
}
.to-info{
	display: block;
	margin: 0 auto;
	width: 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 0.6rem;
	.avatar{
		display: block;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
	}
	.nick-name{
		color: #fff;
		font-size: 0.3rem;
		padding-top: 0.3rem;
	}
}
.user-nav{
	background: #fff;
	margin-bottom: 0.3rem;
	display: flex;
	padding: 0.2rem;
	.user-nav-item{
		flex: 1;
		text-align: center;
		.amount{
			padding: 0.1rem 0 0.2rem;
			span{
				font-size: 0.44rem;
				font-weight: 700;
			}
		}
		.charge{
			color: #22ac38;
		}
		.integral{
			color: #f8b62d;
		}
	}
}
.user-order{
	background: #FFFFFF;
	margin-bottom: 0.3rem;
	.order-top{
		height: 0.86rem;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #f3f3f3;
		padding-left: 0.3rem;
		line-height: 0.86rem;
		.more-order{
			padding-right: 0.6rem;
			color: #666;
			font-size: 0.26rem;
		}
	}
}
.order-nav{
	display: flex;
	.order-nav-item{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 0.24rem;
		color: #666;
		position: relative;
		padding: 0.1rem 0 0.2rem;
		& > img{
			display: block;
			height: 0.34rem;
			margin: 0.2rem 0;
		}
		& > .count{
			position: absolute;
			min-width: 0.32rem;
			height: 0.32rem;
			border: 1px solid #ff6600;
			border-radius: 50%;
			text-align: center;
			line-height: 0.32rem;
			color: #f60;
			left: 50%;
			padding: 0 0.04rem;
			background: #fff;
			top: 0.14rem;
			font-size: 0.2rem;
		}
	}
}
.user-link{
	background: #FFFFFF;
	padding-left: 0.3rem;
	margin-top: 0.3rem;
	margin-bottom: 0.3rem;
	.link-item{
		display: flex;
		height: 0.9rem;
		align-items: center;
		border-bottom: 1px solid #f3f3f3;
		& > img{
			width: 0.4rem;
			margin-right: 0.3rem;
		}
		.addr{
			width: 0.34rem;
			margin-right: 0.36rem;
		}
	}
	
}
</style>