<template>
	<section class="fullDiv move-right">
		<Header title="我的积分"></Header>
		<div class="balance-top">
			<p class="tit">积分余额</p>
			<p class="balance-amount">{{parseFloat(points).toFixed(2)}}</p>
		</div>
		<div class="balance-bottom">
			<div class="integal-nav">
				<div class="nav-item" :class="{'active': index == 1}" @click="changeMenu(1)"><span>收入记录</span></div>
				<div class="nav-item" :class="{'active': index == 2}" @click="changeMenu(2)"><span>支出记录</span></div>
			</div>
			<div class="content">
				<Pagination :render="render" :param="pagination" :autoload="false" ref="pagination" uri="/order/points">
					<div class="balance-list" v-show="pagination.content.length > 0">
						<div class="balance-item" v-for="(item, index) in pagination.content" :key="index">
							<p class="item-name">
								<span>{{item.note}}</span>
								<span class="price-color" v-if="item.type == 1">+{{item.points}}</span>
								<span class="price-color" v-if="item.type == 2">{{item.points}}</span>
							</p>
							<p class="item-time">
								<span>{{item.entrydate}}</span>
							</p>
						</div>
					</div>
				</Pagination>
				<div class="none-data" v-show="pagination.content.length<1 && pagination.loadEnd">
		    		<p class="none-tip">暂无数据信息</p>
		   	    </div>
			</div>
				
		</div>
		<confirm-modal 
			:show="tipShow" 
			@confirm_modal="goBind" 
			cancel_text="下次再说"
			confirm_text="去绑定"
			@closeModal="tipShow = false" 
			message="积分获取需要绑定会员卡哦！">
		</confirm-modal>		
	</section>
</template>

<script>
	export default {
		data() {
			return {
				tipShow: false,
				points: 0.00,
				index: 0,
				pagination: {
	                content: [],
	                loadEnd: false,
	                data: {
	                	p: 1,
						typePoints: 1
	                }
	            }
			}
		},
		created() {
			if(this.$route.params.status == '0') {
				this.tipShow = true
				return
			}
			this.$api.userPoints().then(res => { 
				if(res.ret == 1) {
					this.points = parseFloat(res.data.integral).toFixed(2)
				}
	        }, err => {
	        	
	        })
			
		},
		mounted() {
			this.changeMenu(1)
		},
		methods: {
			goBind() {
				this.$router.replace('/bindMemberCard')
			},
			changeMenu(index){
				if(this.index == index) {
					return
				}
				this.index = index
				this.pagination = {
                    content: [],
	                loadEnd: false,
	                data: {
	                	p: 1,
						typePoints: index
	                }
				}
				this.$refs.pagination.refresh()
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
	position: relative;
} 	
.balance-top{
	height: 2.1rem;
	background: #3cafb6;
	position: relative;
	color: #fff;
	padding: 0 0.3rem;
	.tit{
		padding: 0.2rem 0;
	}
	.balance-amount{
		font-size: 0.8rem;
		padding-top: 0.3rem;
		width: 5rem;
		overflow: hidden;
	}
	.recharge-btn{
		position: absolute;
		border: 1px solid #fff;
		height: 0.6rem;
		padding: 0 0.45rem;
		line-height: 0.56rem;
		border-radius: 0.3rem;
		right: 0.3rem;
		bottom: 0.74rem;
	}
}
.integal-nav{
	height: 0.8rem;
	line-height: 0.76rem;
	display: flex;
	border-bottom: 1px solid #eee;
	background: #fff;
	padding: 0 0.3rem;
	.nav-item{
		flex: 1;
		text-align: center;
		span{
			display: inline-block;
			height: 100%;
			padding: 0 0.1rem;
		}
	}
	.nav-item.active{
		span{
			color: #3cafb6;
			border-bottom: 2px solid #3cafb6;
		}
	}
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
.content{
	position: absolute;
	top: 3.82rem;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow-y: auto;
}
</style>