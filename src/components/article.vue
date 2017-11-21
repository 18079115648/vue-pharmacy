<template>
    <section class="app">
        <!-- 文章内容 -->
        <div class="img-content">
        	<img src="../../static/images/23@3x.png" class="icon-img back" @click="back" />
    		<img src="../../static/images/22@3x.png" class="icon-img share" @click="showShareTip" />
        	<img class="banner" :src="detail.thumb"  />
        </div>
        <article >
            <h1>{{detail.title}}</h1>
            <h5>{{detail.time}}</h5>
            <div class="zhuanyi" v-html="detail.content"></div>
        </article>

        <!-- 文章商品标题 -->
        <div class="warp" v-if="goodsList.length>0">
            <h2>
                <hr>
                <span>文章商品</span>
                <hr>
            </h2>
        </div>

        <!-- 文章商品列表 -->
        <div class="list" v-if="goodsList.length>0" v-for="item in goodsList" @click="goDetail(item.goods_id)">
            <div class="list_main">
                <div class="imgs">
                    <img :src="item.thumb">
                </div>
                <div class="info">
                    <h3>{{item.title}}</h3>
                    <p>
                        <span class="price price-color">&yen;{{item.price_shop}}</span>
                        <span class="button">去购买</span>
                    </p>
                </div>
            </div>
        </div>
       <share-tip v-show="show" @shareCancel="show = false"></share-tip> 
    </section>
    
</template>

<script>
import wx from 'weixin-js-sdk'
import {Indicator } from 'mint-ui'
export default {
    data() {
        return {
        	show: false,
            detail: {},
            goodsList:[]
        
        }
    },
    created() {
    	window.scrollTo(0,0)
        const self = this
        Indicator.open()
        this.$api.indexInformationContent(
            {
                id: self.$route.params.id
            }
        ).then(res => {
        	Indicator.close()
        	this.detail = res
        	this.goodsList = res.goods
        	this.lineLink = window.location.href
			this.imgUrl = 'http://' + location.host + res.thumb
			this.shareTitle = res.title
			this.descContent = '金象大药房'
        	if(this.$common.isWeixin()) {
				this.wxShare(this.lineLink, this.imgUrl, this.shareTitle, this.descContent)
			}	
        }, err => {
            Indicator.close()
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
        goDetail(id){
            this.$router.push('/shopdetails/' + id)
        },
        back() {
			if (window.history.length > 1) {
	            this.$router.go(-1)
	        } else {
	            this.$router.replace('/selected')
	        }   
		},
    }
   

}
</script>

<style lang="scss" scoped>
.app {
    background-color: #F5F5F9;
    position: relative;
    padding-bottom: 0.3rem;
}
.img-content{
	width: 100%;
	height: 5.5rem;
	overflow: hidden;
	position: relative;
	background: #fff;
	img.banner{
		position: absolute;
	    height: 100%!important;
	    width: auto!important;
	    left: 50%;
	    top: 50%;
	    transform: translate(-50%,-50%);
	}
	.icon-img{
		position: fixed;
		width: 0.6rem;
		height: 0.6rem;
		top: 0.5rem;
		z-index: 10;
	}
	.icon-img.share{
		right: 0.3rem;
	}
	.icon-img.back{
		left: 0.3rem;
	}
}


.shopdetails_main {
    width: 100%;
    height: auto
}

.shopdetails_scroll {
    width: 100%;
    height: auto;
    position: relative
}

.swiper_main {
    height: 4.56rem;
    background-color: #fff;
    img {
        height: 100%;
        width: auto
    }
}

article {
    width: 100%;
    height: auto;
    padding: .4rem .3rem;
    background-color: #fff;
    h1 {
        font-size: .32rem;
        color: #333;
        font-weight: 700;
        line-height: .42rem
    }
    h5 {
        font-size: .24rem;
        line-height: .3rem;
        color: #999;
        margin: .3rem 0;
    }
}


.list {
    width: 100%;
    height: 1.8rem;
    padding: .2rem .2rem .2rem .2rem;
    background-color: #fff;
    margin-bottom: .2rem
}

.list_main {
    display: flex;
    align-items: center;
    align-content: center;
    align-self: center;
    justify-content: space-between
}

.imgs {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: .2rem;
    border: 1px solid #eee;
    img {
    	display: block;
        width: 100%;
        height: 100%
    }
}

.info {
    width: 5.3rem;
    height: 1.4rem;
    flex: auto;
    h3 {
        color: #222;
        font-size: .26rem;
        line-height: 0.36rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: .72rem;
    }
    p {
        color: #999;
        font-size: .24rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding-top: 0.1rem;
        /*height: 0.5rem;*/
        .price {
            color: #ff6600;
            font-size: .3rem;
        }
        .button {
            width: 1.5rem;
            height: .5rem;
            line-height: .5rem;
            color: #fff;
            font-size: .26rem;
            background-color: #3cafb6;
            text-align: center;
            border-radius: 60px
        }
    }
}



    h2 {
        height: 1rem;
        line-height: 1rem;
        display: flex;
        align-items: center;
        align-content: center;
        align-self: center;
        justify-content: center;
        color: #ffad06;
        hr {
            width: .56rem;
            height: 2px;
            background-color: #ffad06;
            margin: 0 .26rem;
            border-top: #ffad06;
        }
        span{
            font-size: .28rem;
        }
    }


.maps {
    width: 100%;
    height: 4.56rem;
    img {
        width: 100%;
        height: 100%;
    }
}

.zhuanyi {
    width: 100%;
    font-size: .28rem;
    line-height: .3rem;
    text-indent: .56rem;
    padding: 0.1rem 0;
}
.zhuanyi>img{
    width: 100%;
}

</style>