<template>
    <div class="app">
    	<Header title="确认订单"></Header>
    	<router-link to="/addressList/select" class="order-addr" v-if="addrDetail.address_id">
    		<img src="../../static/images/line.png" class="bg-line" />
    		<img src="../../static/images/52@3x.png" class="addr-icon" />
    		<div class="addr-detail">
    			<div class="addr-contact">
    				<span>收货人：{{addrDetail.contact}}</span>
    				<span>{{addrDetail.mobile}}</span>
    			</div>
    			<div class="addr-text">{{addrDetail.area}} {{addrDetail.address}}</div>
    			<div class="id-card">身份证：{{addrDetail.id_card}}</div>
    		</div>
    		<img src="../../static/images/arror.png" class="more-icon" />
    	</router-link>
    	<router-link to="/addressList/select" class="order-addr" v-if="!addrDetail.address_id">
    		<img src="../../static/images/line.png" class="bg-line" />
    		<div class="none-addr">选择收货地址</div>
    	</router-link>
    	<div class="customer-info" v-if="type_id == 902">
    		<div class="cell-item">
    			<span class="phone-tip">手机</span>
    			<input class="phone" v-model="phone" @input="inputNumber" maxlength="11" type="tel" placeholder="输入您的手机号，供药师回拨" />
    		</div>
    		<div class="cell-item">
    			<div class="updata-text">
    				<p>上传处方</p>
    				<p class="tip">上传处方可以缩短审核时间，仅限一张</p>
    			</div>
    			<div class="updata-icon">
    				<img :src="updataImg" class="fullEle" @click="changeAvatar" />
    				<!--<img :src="updataImg" class="fullEle" @click="openImg" />
    				<input type="file" v-if="isWx" id="inputImg" @change="onFileChange" accept="image/*" />-->
    			</div>
    		</div>
    	</div>
    	<div class="product-list">
    		<div class="product-item" v-for="(item, index) in goodsList" :key="index">
    			<img :src="item.thumb" class="product-img" />
    			<div class="product-info">
    				<div class="product-name">{{item.title}}</div>
    				<div class="product-amount">
    					<span class="price-color">&yen;{{item.price_shop}}</span>
    					<span class="count">x{{item.num}}</span>
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
    	<div class="points" v-if="orderDetail.points > 0">
    		<span class="point-icon">积分</span>
    		<span>返{{orderDetail.points}}积分</span>
    	</div>
    	<div class="pay-content">
    		<div class="total-num">
    			共<span class="price-color"> {{orderDetail.total}} </span>件， 
    			实付 <span class="price-color"> &yen; {{orderDetail.amount_order}}</span>
    		</div>
    		<div class="pay-btn" v-if="type_id == 901 && isWx" @click.stop="payWx">微信支付</div>
    		<div class="pay-btn" v-if="type_id == 901 && !isWx" @click.stop="payApp">立即支付</div>
    		<div class="pay-btn" v-if="type_id == 902" @click.stop="payCommit">提交预定</div>
    	</div>
    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
	data() {
	    return {
	    	isWx: this.$common.isWeixin(),
	    	
	    	num: 0,
	    	goods_id: null,
	    	type_id: null,
	    	address_id: null, // 默认地址
	    	status: null, // status订单来源    0：立即购买， 1： 购物车， 2：需求清单
	    	
	    	addrDetail: {},
	    	goodsList: [],
	    	orderDetail: {},
	    	
	    	//处方药
	    	phone: '',
	    	updataImg: '../../static/images/11@3x.png'
	    }
	},
	created() {
		this.$store.commit('setLoadingStatus', true)
		this.status = this.$route.params.status
		this.type_id = this.$route.params.type
		this.address_id = this.$storage.get('default_addr_id')
		if(this.status === '0') {
			this.goods_id = [this.$route.query.goods_id]
			this.num = this.$route.query.num
			this.$api.checkOutBuy({
				type_id: this.type_id,
				goods_id: this.goods_id[0],
				address_id: this.address_id,
				num: this.num
			}).then(res => {
				if(res.ret == 1) {
					this.orderDetail = res
					this.addrDetail = res.address
					this.goodsList = res.data
				}
			}, err => {
	
			})
		}else if(this.status === '1' || this.status === '2') {
			this.goods_id = this.$storage.get('select_goods_arr')
//			this.$storage.remove('select_goods_arr')
			this.$api.checkOut({
				type_id: this.type_id,
				goods_ids: this.goods_id,
				address_id: this.address_id,
			}).then(res => {
				if(res.ret == 1) {
					this.orderDetail = res
					this.addrDetail = res.address
					this.goodsList = res.data
				}
			}, err => {
	
			})
		}
		if(this.status === '2' && this.$common.isWeixin()) {
			this.wxJssdk()
		}
		
		
			
	},
	computed: {
		checkPhone: function() {
			if(/^1[34578]\d{9}$/.test(this.phone)){   
		        return true; 
		    } 
		    return false
		}
	},
	methods: {
		wxJssdk() {
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
					jsApiList: ['getLocation', 'chooseImage', 'previewImage', 'uploadImage', 'scanQRCode', 'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				})
//				wx.ready(function() {
//					
//				})
			}).catch((err) => {
				console.log(err)
			})
		},
		openImg() {
			if(this.isWx) {
				document.getElementById('inputImg').click()
				return
			}
			const self = this
			let data = {
				'PHPSESSID': this.$getCookie('PHPSESSID'),
				'TOKEN': this.$getCookie('TOKEN'),
				'type': 2
			}
			Indicator.open()
			this.$bridge.choosePhoto(data).then(res => {
				Indicator.close()
				if(res.ret == 1) {
					self.updataImg = res.url
				}
                
            })
		},
		
		onFileChange(e) {
			var files = e.target.files[0] || e.dataTransfer.files[0]; 
			if (!files){
				return;
			}
			Indicator.open()
			var param = new FormData(); //创建form对象
      		param.append('file',files);//通过append向form对象添加数据
            axios.post('/order/img_user', param, {
            	headers:{
            		'Content-Type':'multipart/form-data'
            	}
            }).then((res) => {
            	Indicator.close()
            	if(res.data.ret == 1) {
            		this.updataImg = res.data.img_user
            	}
            	
            })
            .catch((error) => {
				Indicator.close()
            })
		},
		changeAvatar() {
			let self = this
			if(this.$common.isWeixin()) {
				wx.chooseImage({
				    count: 1, // 默认9
				    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				    success: function (res) {
				        wx.uploadImage({
						    localId:  res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
						    isShowProgressTips: 1, // 默认为1，显示进度提示
						    success: function (res) {
						        self.$api.wxUploadOrderImg({
						        	media_id: res.serverId
						        }).then(res => {
									if(res.ret == 1) {
										self.updataImg = res.img_user
									}
						        }, err => {
						        	
						        })
						    }
						});
				    }
				})
				return
			}
			let data = {
				'PHPSESSID': this.$getCookie('PHPSESSID'),
				'TOKEN': this.$getCookie('TOKEN'),
				'type': 2
			}
			Indicator.open()
			this.$bridge.choosePhoto(data).then(res => {
				Indicator.close()
				if(res.ret == 1) {
					self.updataImg = res.url
				}
                
            })
				
		},
		inputNumber() {
			if (!/^\d*$/.test(this.phone)) {	
	            this.phone = this.phone.replace(/\D+/g,'')            
	        } 
		},
		createOrder() {
			return this.$api.createOrder({
				type_id: this.type_id,
				goods_ids: this.goods_id,
				address_id: this.address_id,
				customer: this.addrDetail.contact,
				id_card: this.addrDetail.id_card,
				mobile: this.addrDetail.mobile,
				province: this.addrDetail.province,
				city: this.addrDetail.city,
				district: this.addrDetail.district,
				address: this.addrDetail.address,
				check_phone_user: this.phone
			})
		},
		payCommit() {
			if(!this.checkPhone) {
				Toast({
					message: '请正确填写您的手机号',
					position: 'bottom',
					duration: 1500
				});
				return
			}
			this.createOrder().then(res => {
				if(res.ret == 1) {
					this.$router.replace('/orderDetail/' + res.order_id)
				}
			}, err => {
	
			})
		},
		payApp() {
			this.createOrder().then(res => {
				if(res.ret == 1) {
					this.$router.replace('/paySubmit/' + res.order_id + '/' + res.order_no)
				}
			}, err => {
	
			})
		},
		payWx() {
//			this.$api.checkOut({
//				type_id: this.type_id,
//				goods_ids: [this.goods_id],
//				address_id: this.address_id,
//			}).then(res => {
//				if(res.ret == 1) {
//					this.$api.createOrder({
//						type_id: this.type_id,
//						goods_ids: [this.goods_id],
//						address_id: this.address_id,
//						customer: this.addrDetail.contact,
//						id_card: this.addrDetail.id_card,
//						mobile: this.addrDetail.mobile,
//						province: this.addrDetail.province,
//						city: this.addrDetail.city,
//						district: this.addrDetail.district,
//						address: this.addrDetail.address,
//						check_phone_user: ''
//					}).then(res => {
//						if(res.ret == 1) {
//							window.location.href = this.$store.state.back_uri + 'api/Payment/getCode/order_id/' + res.order_id
//						}
//					}, err => {
//			
//					})
//				}
//			}, err => {
//	
//			})
			this.createOrder().then(res => {
				if(res.ret == 1) {
					window.location.href = this.$store.state.back_uri + 'api/Payment/getCode/order_id/' + res.order_id
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
	line-height: 1.5;
	padding-bottom: 1.3rem;
	position: relative;
} 
.order-addr{
	position: relative;
	background: #FFFFFF;
	padding: 0.16rem 0.3rem 0.26rem;
	display: flex;
	align-items: center;
	height: 1.76rem;
	.none-addr{
		text-align: center;
		width: 100%;
		color: #3cafb6;
		font-size: 0.3rem;
	}
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
		padding-left: 0.5rem;
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
				font-size: 0.24rem;
			}
		}
	}
}
input::-webkit-input-placeholder {
	color: #ccc;
}
#inputImg{
	position: fixed;
	left: 0;
	top: 1000rem;
	opacity: 0;	
}
</style>