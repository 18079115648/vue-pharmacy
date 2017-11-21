<template>
    <div class="app">
    	<Header title="确认订单"></Header>
    	<div class="order-addr">
    		<img src="../../static/images/line.png" class="bg-line" />
    		<img src="../../static/images/52@3x.png" class="addr-icon" />
    		<div class="addr-detail">
    			<div class="addr-contact">
    				<span>收货人：张三</span>
    				<span>18079115648</span>
    			</div>
    			<div class="addr-text">阿里山</div>
    			<div class="id-card">身份证：360127</div>
    		</div>
    		<img src="../../static/images/arror.png" class="more-icon" />
    	</div>
    	<div class="customer-info">
    		<div class="cell-item">
    			<span class="phone-tip">手机</span>
    			<input class="phone" type="tel" placeholder="输入您的手机号，供药师回拨" />
    		</div>
    		<div class="cell-item">
    			<div class="updata-text">
    				<p>上传处方</p>
    				<p class="tip">上传处方可以缩短审核时间，仅限一张</p>
    			</div>
    			<div class="updata-icon">
    				<img src="../../static/images/11@3x.png" class="fullEle" />
    			</div>
    		</div>
    	</div>
    	<div class="product-list">
    		<div class="product-item">
    			<img src="" class="product-img" />
    			<div class="product-info">
    				<div class="product-name">阿大口大利空</div>
    				<div class="product-amount">
    					<span class="price-color">&yen;111</span>
    					<span class="count">x1</span>
    				</div>
    			</div>
    		</div>
    		<div class="product-item">
    			<img src="" class="product-img" />
    			<div class="product-info">
    				<div class="product-name">阿大口大利空</div>
    				<div class="product-amount">
    					<span class="price-color">&yen;111</span>
    					<span class="count">x1</span>
    				</div>
    			</div>
    		</div>
    		<div class="product-item">
    			<img src="" class="product-img" />
    			<div class="product-info">
    				<div class="product-name">阿大口大利空</div>
    				<div class="product-amount">
    					<span class="price-color">&yen;111</span>
    					<span class="count">x1</span>
    				</div>
    			</div>
    		</div>
    		<div class="product-item">
    			<img src="" class="product-img" />
    			<div class="product-info">
    				<div class="product-name">阿大口大利空</div>
    				<div class="product-amount">
    					<span class="price-color">&yen;111</span>
    					<span class="count">x1</span>
    				</div>
    			</div>
    		</div>
    		<div class="product-item">
    			<img src="" class="product-img" />
    			<div class="product-info">
    				<div class="product-name">阿大口大利空</div>
    				<div class="product-amount">
    					<span class="price-color">&yen;111</span>
    					<span class="count">x1</span>
    				</div>
    			</div>
    		</div>
    		<div class="product-item">
    			<img src="" class="product-img" />
    			<div class="product-info">
    				<div class="product-name">阿大口大利空</div>
    				<div class="product-amount">
    					<span class="price-color">&yen;111</span>
    					<span class="count">x1</span>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="order-total">
    		<div class="cell-item">
    			<span>商品合计</span>
    			<span>&yen;111</span>
    		</div>
    		<div class="cell-item">
    			<span>运费</span>
    			<span>&yen;111</span>
    		</div>
    	</div>
    	<div class="points">
    		<span class="point-icon">积分</span>
    		<span>返200积分</span>
    	</div>
    	<div class="pay-content">
    		<div class="total-num">
    			共<span class="price-color"> 5 </span>件， 
    			实付 <span class="price-color"> &yen; 111</span>
    		</div>
    		<div class="pay-btn">微信支付</div>
    	</div>
    </div>
</template>

<script>

export default {
	data() {
	    return {
	    	editStatus: false,
		    selected: [],
		    aa: 1,
		    bb: 2
	    }
	},
	methods: {
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
	line-height: 1.5;
	padding-bottom: 1.3rem;
	position: relative;
} 
.order-addr{
	position: relative;
	background: #FFFFFF;
	padding: 0.16rem 0.3rem;
	display: flex;
	align-items: center;
	.bg-line{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.addr-icon{
		width: 0.28rem;
		height: 0.36rem;
		margin-right: 0.26rem;
	}
	.more-icon{
		width: 0.16rem;
		height: 0.28rem;
		margin-left: 0.25rem;
	}
	.addr-detail{
		flex: 1;
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
	padding: 0 0.3rem;
	background: #fff;
	.cell-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 0.9rem;
		border-bottom: 1px solid #f3f3f3;
	}
	.cell-item:last-child{
		border: none;
	}
}
.points{
	height: 0.9rem;
	display: flex;
	background: #fff;
	align-items: center;
	font-size: 0.24rem;
	padding-left: 0.3rem;
	margin-top: 0.2rem;
	.point-icon{
		padding: 0 0.08rem;
		border: 1px solid #f60;
		font-size: 0.2rem;
		padding-top: 0.02rem;
		border-radius: 0.06rem;
		margin-right: 0.2rem;
		color: #f60;
	}
}
.pay-content{
	position: fixed;
	width: 100%;
	height: 1rem;
	left: 0;
	bottom: 0;
	background: #fff;
	border-top: 1px solid #eee;
	display: flex;
	line-height: 1rem;
	justify-content: space-between;
	font-size: 0.3rem;
	.pay-btn{
		width: 3rem;
		text-align: center;
		background: #3cafb6;
		color: #fff;
		font-size: 0.32rem;
	}
	.total-num{
		padding-left: 0.3rem;
		padding-right: 0.2rem;
	}
}
.customer-info{
	background: #FFFFFF;
	padding: 0 0.3rem;
	margin-top: 0.2rem;
	.cell-item{
		border-bottom: 1px solid #F9F9F9;
		padding: 0.2rem 0;
		display: flex;
		
		.phone-tip{
			width: 0.9rem;
		}
		.phone{
			flex: 1;
			
		}
		.updata-icon{
			width: 1.1rem;
			height: 1.1rem;
		}
		.updata-text{
			flex: 1;
			p{
				padding: 0.06rem 0;
			}
			p.tip{
				color: #ccc;
			}
		}
	}
}
input::-webkit-input-placeholder {
	color: #ccc;
}
</style>