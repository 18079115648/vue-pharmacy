<template>
	<section class="app">
		<section class="product-banner">
			<img src="../../static/images/23@3x.png" class="icon-img back" @click="back" />
			<img src="../../static/images/22@3x.png" class="icon-img share" @click="showShareTip" />
			<mt-swipe :auto="0">
				<mt-swipe-item v-for="(item, index) in banner" :key="index">
					<img :src="item.file" class="fullEle" />
				</mt-swipe-item>
			</mt-swipe>
		</section>

		<div class="shopdetails_title">
			<h3>{{goodsDetail.title}}</h3>
			<div class="count">
				<span class="price">&yen; {{goodsDetail.price_shop}}</span>
				<div class="stock">库存：{{goodsDetail.num}}</div>
			</div>
			<div class="points" v-if="goodsDetail.points > 0">
				<span class="point-icon">积分</span>
				<span>返{{goodsDetail.points}}积分</span>
			</div>
		</div>

		<!-- 评价 -->
		<div class="evaluate">
			<div class="evaluate_title">
				<div class="evaluate_left">
					<span>评价(<span>{{goodsDetail.comment_total_count}}</span>)</span>
				</div>
				<a :href="'#/reviewList/' + goodsId" class="evaluate_right">
					<span>好评度</span><span class="money">{{parseInt(goodsDetail.comment_total_score)}}</span><span class="money">%</span>
					<div class="icon">
					</div>
				</a>
			</div>
			<hr>
		</div>
		<div class="review" v-if="comment.comment_id">
			<div class="review_info">
				<div class="review_portrait">
					<img :src="comment.img_head">
					<h4>{{comment.uid_username}}</h4>
				</div>
				<div class="review_grade">
					<img src="../../static/images/28@3x.png" v-for="n in comment.score">
					<img src="../../static/images/27@3x.png" v-for="n in 5-comment.score">
				</div>
			</div>
			<div class="review_body" v-html="comment.content"></div>
		</div>

		<!-- 详情内容 -->
		<div class="picture">
			<h4>图文介绍</h4>
			<div class="pics" style="font-size: .28rem;" v-html="goodsDetail.content">
			</div>
		</div>

		<!-- 立即购买 -->
		<div class="foot_button" v-if="typeId == 902">
			<div class="desired" @click="goCart('/requireList')">
				<img src="../../static/images/21@3x.png">
				<div>需求清单</div>
				<span class="count" v-show="total>0">{{total}}</span>
			</div>
			<div class="commit" @click="goodsCommit">提交需求</div>
		</div>

		<!-- 加入购物车 -->
		<div class="foot_button" v-if="typeId == 901">
			<div class="desired" @click="goCart('/cart')">
				<img src="../../static/images/20@3x.png" style="width:auto;">
				<div>购物车</div>
				<span class="count" v-show="total>0">{{total}}</span>
			</div>
			<div class="operation">
				<div class="pay" @click="goodsOperate('pay')">立即购买</div>
				<div class="add" @click="goodsOperate('add')">加入购物车</div>
			</div>
		</div>

		<share-tip v-show="show" @shareCancel="show = false"></share-tip>
		<mt-popup v-model="showCharge" class="charge-detail" position="bottom">
			<div class="charge-info">
				<img :src="goodsDetail.thumb" />
				<p class="price">&yen; {{goodsDetail.price_shop}}
					<span style="display: block; color: #333; padding-top: 0.2rem;">库存：{{goodsDetail.num}}</span>
				</p>
				<span class="close" @click="showCharge = false"></span>
			</div>
			<div class="charge-num">
				<span>数量</span>
				<div class="num-btn" v-show="goodsDetail.num > 0">
					<span @click="minusCharge">-</span>
					<input type="tel" v-model="chargeNum" @input="editCount" />
					<span @click="plusCharge">+</span>
				</div>
				<div class="num-btn disabled" v-show="goodsDetail.num < 1">
					<span>-</span>
					<span>0</span>
					<span>+</span>
				</div>
			</div>
			<div class="charge-confirm-btn btn-hover" @click="operate">确定</div>
		</mt-popup>
	</section>
</template>

<script>
	import {
		Popup,
		Toast,
		Indicator
	} from 'mint-ui';
	import wx from 'weixin-js-sdk'
	import token from '@/fetch/accessToken'
	export default {
		data() {
				return {
					show: false,
					showCharge: false,
					chargeNum: 1,
					opereteStatus: '', //商品操作类型  'add' 加入购物车 ， 'pay' 立即购买
					aouthStatus: false, //获取登录状态是否登录
					goodsDetail: {},
					banner: [],
					comment: {},

					goodsId: null,

					typeId: null,
					total: 0, //购物车商品种类数
					incart: false, //该商品是否在购物车中
				}
			},
			created() {
				window.scrollTo(0, 0)
				this.goodsId = this.$route.params.id
				this.$store.commit('setLoadingStatus', true)
				this.$api.goodsDetail({
					id: this.$route.params.id
				}).then(res => {
					if(res.ret == 1) {
						this.goodsDetail = res
						this.typeId = res.type_id == 10002 ? 901 : 902
						this.banner = res.thumb_more
						this.comment = res.comment
						this.getCartData()
						this.lineLink = window.location.href
						this.imgUrl = 'http://' + location.host + res.thumb
						this.shareTitle = res.title
						this.descContent = '金象大药房正品保证,售价: ￥' + res.price_shop
						if(this.$common.isWeixin()) {
							
							this.wxShare(this.lineLink, this.imgUrl, this.shareTitle, this.descContent)
						}		
					}

				}, err => {

				})
			},
			mounted() {
				this.$api.addressList({
					p: 1
				}).then(res => {
					if(res.ret == 1) {
						res.data.forEach((item) => {
							if(item.is_default == 1) {
								this.$storage.set('default_addr_id', item.address_id)
								return
							}
						})
					}
				}, err => {

				})

			},
			methods: {
				wxShare(lineLink, imgUrl, shareTitle, descContent) {
					let self = this
					this.$api.wxShare({
						url: window.location.href.split('#')[0]
					}).then((res) => {
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: res.appId, // 必填，公众号的唯一标识
							timestamp: parseInt(res.timestamp), // 必填，生成签名的时间戳
							nonceStr: res.noncestr, // 必填，生成签名的随机串
							signature: res.signature, // 必填，签名，见附录1
							jsApiList: ['uploadImage', 'getLocation', 'chooseImage', 'previewImage', 'uploadImage', 'scanQRCode', 'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						})
						wx.ready(function() {
							self.$loadJssdk(lineLink, imgUrl, shareTitle, descContent)
						})
					}).catch((err) => {
						console.log(err)
					})
				},
				showShareTip() {
					const self = this
					if(this.$common.isWeixin()) {
						this.show = true
						return
					}
					this.$bridge.share({
	                    link: self.lineLink,
	                    title: self.shareTitle,
	                    desc: self.descContent,
	                    icon: self.imgUrl
	                }).then(ret => {
	                    
	                })
				},
				back() {
					if (window.history.length > 1) {
			            this.$router.go(-1)
			        } else {
			            this.$router.replace('/selected')
			        }   
				},

				//获取购物车数据
				getCartData() {
					this.$api.getCartData({
						type_id: this.typeId
					}).then(res => {
						if(res.ret == 1) {
							this.total = res.total
							res.data.forEach((item) => {
								if(item.goods_id == this.goodsId) {
									this.incart = true
								}
							})
						}
					}, err => {

					})
				},
				editCount() {
					if(!/^[1-9]\d*$/.test(this.chargeNum)) {
						this.chargeNum = this.chargeNum.replace(/^0|\D+/g, '')

					}
					if(this.chargeNum > this.goodsDetail.num) {
						this.chargeNum = this.chargeNum.substr(0, this.chargeNum.length - 1)
					}
				},
				minusCharge() {
					this.chargeNum > 1 ? this.chargeNum-- : this.chargeNum = 1
				},
				plusCharge() {
					this.chargeNum < this.goodsDetail.num ? this.chargeNum++ : this.chargeNum = this.goodsDetail.num
				},
				goCart(url) {
					this.$router.push(url)
				},
				goodsOperate(status) {
					if(this.goodsDetail.num < 1) {
						Toast({
							message: '库存不足',
							position: 'bottom',
							duration: 1500
						});
						return
					}
					this.showCharge = true
					this.aouthStatus = false
					this.$wxAouth().then(res => {
						if(res.ret == 1) {
							this.aouthStatus = true
							this.opereteStatus = status
						} else {
							this.$storage.set('history_uri', window.location.hash.substr(1))
							window.location.href = this.$store.state.back_uri + 'index/api/weixin?url=' + encodeURIComponent(window.location.hash.substr(1))
						}
					}, err => {

					})
					

				},
				operate() {
					if(this.opereteStatus === 'add' && this.aouthStatus) {
						this.$api.addCartData({
							type_id: this.typeId,
							goods_id: this.goodsId,
							num: this.chargeNum
						}).then(res => {
							this.showCharge = false
							if(res.ret == 1) {
								Toast({
									message: '添加成功',
									position: 'bottom',
									duration: 1500
								});
								if(!this.incart) {
									this.total += 1
									this.incart = true
								}
							}

						}, err => {
							this.showCharge = false
						})
					} else if(this.opereteStatus === 'pay' && this.aouthStatus) {
						this.$router.push({
							path: '/orderSubmit/' + this.typeId + '/' + 0,
							query: {
								goods_id: this.goodsId,
								num: this.chargeNum
							}
						})
					}
				},
				goodsCommit() {
					if(this.goodsDetail.num < 1) {
						Toast({
							message: '库存不足',
							position: 'bottom',
							duration: 1500
						});
						return
					}
					Indicator.open()
					this.$wxAouth().then(res => {
						if(res.ret == 1) {
							this.$api.addCartData({
								type_id: this.typeId,
								goods_id: this.goodsId,
								num: 1
							}).then(res => {
								Indicator.close()
								if(res.ret == 1) {
									Toast({
										message: '添加成功',
										position: 'bottom',
										duration: 1500
									});
									if(!this.incart) {
										this.total += 1
										this.incart = true
									}
								}
		
							}, err => {
								Indicator.close()
							})
						} else {
							Indicator.close()
							this.$storage.set('history_uri', window.location.hash.substr(1))
							window.location.href = this.$store.state.back_uri + 'index/api/weixin?url=' + encodeURIComponent(window.location.hash.substr(1))
						}
					}, err => {
						Indicator.close()
					})
					
				}
			}
	}
</script>

<style lang="scss" scoped>
	.app {
		background: #f5f5f9;
		font-size: 0.26rem;
		padding-bottom: 1rem;
	}
	
	.product-banner {
		height: 7.5rem;
		position: relative;
		.icon-img {
			position: fixed;
			width: 0.6rem;
			height: 0.6rem;
			top: 0.5rem;
			z-index: 10;
		}
		.icon-img.share {
			right: 0.3rem;
		}
		.icon-img.back {
			left: 0.3rem;
		}
	}
	
	.shopdetails_title {
		width: 100%;
		/*height: 1.8rem;*/
		background-color: #fff;
		padding: 0.3rem;
		margin-bottom: .2rem;
		h3 {
			line-height: .36rem;
			font-size: 0.28rem;
		}
		.count {
			line-height: .42rem;
			margin-top: .24rem;
			display: flex;
			justify-content: space-between;
			span.price {
				font-size: .32rem;
				color: #ff6600;
			}
		}
	}
	
	.points {
		margin-top: 0.3rem;
		height: 0.5rem;
		display: flex;
		background: #fff;
		align-items: center;
		font-size: 0.24rem;
		.point-icon {
			padding: 0.04rem 0.08rem;
			border: 1px solid #f60;
			font-size: 0.2rem;
			padding-top: 0.06rem;
			border-radius: 0.06rem;
			margin-right: 0.2rem;
			color: #f60;
		}
	}
	
	.evaluate {
		width: 100%;
		height: auto;
		background-color: #fff;
		padding-left: .3rem;
		hr {
			border-top: #f9f9f9;
			margin: 0 auto;
		}
		.evaluate_title {
			width: 100%;
			height: .8rem;
			line-height: .8rem;
			padding-right: .3rem;
			display: flex;
			justify-content: space-between;
			align-self: center;
			.evaluate_left {
				color: #666;
			}
			.evaluate_right {
				display: flex;
				align-items: center;
				color: #666;
				justify-content: space-between;
			}
		}
		.money {
			color: #ff6600;
		}
		.icon {
			width: .3rem;
			height: .3rem;
			margin-top: -0.04rem;
			background: url('../../static/image/arror.png') no-repeat right center;
			background-size: .16rem .24rem;
		}
	}
	
	.review {
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: .3rem;
	}
	
	.review_info {
		display: flex;
	}
	
	.review_portrait {
		display: flex;
		align-items: center;
		img {
			width: .5rem;
			height: .5rem;
			border-radius: .25rem;
			margin-right: .15rem;
		}
	}
	
	.review_grade {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		img {
			width: .3rem;
			height: .3rem;
			margin-left: .1rem;
		}
	}
	
	.review_body {
		padding-top: .3rem;
		line-height: 1.4;
		font-size: 0.26rem;
		color: #666;
	}
	
	.picture {
		width: 100%;
		height: auto;
		background-color: #fff;
		margin-top: 0.2rem;
		padding-bottom: .3rem;
		h4 {
			height: .9rem;
			font-size: .26rem;
			color: #666;
			line-height: .9rem;
			padding: 0rem .3rem
		}
		.pics {
			width: 6.9rem;
			height: auto;
			padding: 0rem .3rem;
			font-size: .28rem;
			line-height: 1.5;
			margin: 0 auto;
			img {
				width: 100% !important;
				height: auto !important
			}
		}
	}
	
	.foot_button {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 1rem;
		background-color: #fff;
		border-top: 1px solid #dedede;
		display: flex;
		.desired {
			width: 1.5rem;
			height: 100%;
			color: #999;
			line-height: .24rem;
			text-align: center;
			position: relative;
			img {
				width: .29rem;
				height: .36rem;
				margin-top: .18rem;
				color: #666;
			}
			div {
				font-size: .2rem;
				line-height: .24rem;
				margin-top: .1rem;
			}
			span.count {
				position: absolute;
				height: 0.34rem;
				min-width: 0.34rem;
				text-align: center;
				line-height: 0.36rem;
				background: rgba(55, 55, 55, 0.7);
				left: 50%;
				top: 0.1rem;
				color: #fff;
				font-size: 0.2rem;
				border-radius: 50%;
				padding: 0 0.04rem;
			}
		}
		.commit {
			flex: 1;
			background-color: #3CAFB6;
			color: #fff;
			text-align: center;
			line-height: .98rem;
			font-size: .32rem;
		}
		.operation {
			display: flex;
			flex: 1;
			text-align: center;
			line-height: .98rem;
			color: #fff;
			font-size: 0.3rem;
			.pay {
				flex: 1;
				background-color: #F8B62D;
			}
			.add {
				flex: 1;
				background-color: #3CAFB6;
			}
		}
	}
	
	// car
	.car_model_warp {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .6);
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0
	}
	
	.car_model {
		width: 100%;
		height: 4.65rem;
		background-color: #fff;
		position: fixed;
		z-index: 1000;
		bottom: 0px;
	}
	
	.model_main {
		width: 100%;
		height: 1.45rem;
		padding: 0rem .3rem;
		display: flex;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
		position: relative
	}
	
	.model_pic {
		height: 1.8rem;
		width: 1.8rem;
		position: absolute;
		border: 1px solid #e5e5e5;
		border-radius: 8px;
		bottom: 0;
		background-color: #fff
	}
	
	.model_title {
		height: 100%;
		margin-left: 2.2rem;
		display: flex;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
		flex-direction: column;
		p {
			margin-top: .2rem;
			font-size: .34rem;
			color: #ff6600;
			line-height: .48rem
		}
		p:last-child {
			font-size: .26rem;
			line-height: .48rem;
			color: #222
		}
	}
	
	.closex {
		font-size: .42rem;
	}
	
	.commodity_p1 {
		display: flex;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
		margin: .60rem 0px .5rem;
		padding: 0rem .3rem;
		font-size: .3rem;
		color: #222
	}
	
	.btncar {
		width: 100%;
		height: .98rem;
		text-align: center;
		line-height: .98rem;
		color: #fff;
		background-color: #3CAFB6;
		position: absolute;
		bottom: 0px;
		left: 0px;
		font-size: .34rem;
		font-weight: 100;
	}
	
	.commodity_num {
		width: 2rem;
		display: flex;
		align-content: center;
		align-items: center;
		align-self: center;
		justify-content: space-between;
		i,
		em,
		.em {
			font-style: normal;
			width: .6rem;
			height: .6rem;
			background-color: #EFEFEF;
			color: #666666;
			text-align: center;
			line-height: .6rem;
			font-size: .3rem;
			color: #222
		}
		i {
			color: #ccc
		}
		em,
		.em {
			width: .72rem;
			font-size: .36rem
		}
	}
	
	.charge-detail {
		width: 100%;
	}
	
	.charge-info {
		padding: 0.1rem 0.3rem;
		display: flex;
		position: relative;
	}
	
	.charge-info .close {
		position: absolute;
		width: 0.6rem;
		height: 0.6rem;
		right: 0.2rem;
		top: 0.2rem;
		background: url(../../static/images/close-icon.png) no-repeat center;
		background-size: 50%;
	}
	
	.charge-info img {
		width: 1.7rem;
		height: 1.7rem;
		border-radius: 0.15rem;
		position: relative;
		top: -0.4rem;
	}
	
	.charge-info .price {
		flex: 1;
		padding-left: 0.3rem;
		padding-top: 0.15rem;
		color: #f26200;
		font-size: 0.32rem;
		span {
			font-size: 0.28rem;
		}
	}
	
	.charge-num {
		display: flex;
		padding: 0.2rem 0.3rem 0.4rem;
		justify-content: space-between;
		align-items: center;
	}
	
	.charge-num .num-btn {
		display: flex;
	}
	
	.charge-num .num-btn.disabled {
		color: #ccc;
	}
	
	.charge-num .num-btn span {
		width: 0.6rem;
		height: 0.6rem;
		background: #efefef;
		margin: 0 0.05rem;
		border-radius: 0.06rem;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.36rem;
	}
	
	.charge-num .num-btn input {
		width: 0.7rem;
		background: #efefef;
		margin: 0 0.05rem;
		text-align: center;
		line-height: 0.6rem;
		font-size: 0.32rem;
		border-radius: 0.06rem;
	}
	
	.charge-confirm-btn {
		height: 1rem;
		width: 100%;
		line-height: 1rem;
		text-align: center;
		background: #3cafb6;
		color: #fff;
		font-size: 0.32rem;
	}
	
	.product-desc-content {
		padding: 0.1rem 0.3rem;
	}
</style>