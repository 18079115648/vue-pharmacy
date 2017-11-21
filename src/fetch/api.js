import axios from 'axios'
import qs from 'qs'
import { Toast } from 'mint-ui'
import store from '@/vuex/store.js'
import storage from '@/fetch/storage'
import router from '@/router/router'






// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/index'
						
//POST传参序列化
axios.interceptors.request.use((config) => {
    return config;
},(error) =>{
    
    return Promise.reject(error);
});

////返回状态判断
//axios.interceptors.response.use((res) =>{
//  if(!(res.data.err_code==0)){
//      return Promise.reject(res);
//  }
//  return res;
//}, (error) => {
//  return Promise.reject(error);
//});

export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(response => {
            	store.commit('setLoadingStatus', false)
            	if(response.status == 200) {
            		if(response.data.ret === 0 && response.data.msg !== '用户 未登录') {
            			reject(response)
            			Toast({
						  message: response.data.msg || '数据错误',
						  position: 'bottom',
						  duration: 1500
						});
            		}else if(response.data.ret === 0 && response.data.msg === '用户 未登录'){
            			reject(response)
            			Toast({
						  message: response.data.msg || '数据错误',
						  position: 'bottom',
						  duration: 1500
						});
						storage.set('history_uri', window.location.hash.substr(1))
            			window.location.href = store.state.back_uri + 'index/api/weixin?url=' + encodeURIComponent(window.location.hash.substr(1))
            			
            		}else {
            			resolve(response.data) 
            		} 
            	}else {
            		reject(response)
	               	Toast({
					  message: '网络错误',
					  position: 'bottom',
					  duration: 2000
					});
            	}
            	  
            })
            .catch((error) => {
            	store.commit('setLoadingStatus', false)
               	reject(error)
               	Toast({
				  message: '网络错误',
				  position: 'bottom',
				  duration: 2000
				});
            })
    })
}
export function fetchGet(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
        	params: params
        }).then(response => {
        	    store.commit('setLoadingStatus', false)
            	if(response.status == 200) {
            		if(response.data.ret === 0 && response.data.msg !== '用户 未登录') {
            			reject(response)
            			Toast({
						  message: response.data.msg || '数据错误',
						  position: 'bottom',
						  duration: 1500
						});
            		}else if(response.data.ret === 0 && response.data.msg === '用户 未登录'){
            			reject(response)
            			if(/shopdetails/.test(window.location.hash)) {
            				return
            			}
            			Toast({
						  message: response.data.msg || '数据错误',
						  position: 'bottom',
						  duration: 1500
						});
						storage.set('history_uri', window.location.hash.substr(1))
            			window.location.href = store.state.back_uri + 'index/api/weixin?url=' + encodeURIComponent(window.location.hash.substr(1))
            			
            		}else {
            			resolve(response.data) 
            		}
            		
            	}else {
            		reject(response)
	               	Toast({
					  message: '网络错误',
					  position: 'bottom',
					  duration: 2000
					});
            	}
            })
            .catch((error) => {
            	store.commit('setLoadingStatus', false)
                reject(error)
                Toast({
				  message: '网络错误',
				  position: 'bottom',
				  duration: 2000
				});
            })
    })
}
export default {
    //分页
	pageGet(url, params) {
		return fetchGet(url, params)
	},
	
	pagePost(url, params) {
		return fetchPost(url, params)
	},
	
	
	//首页轮播
	indexBanner(params) {
		return fetchGet('/search/banner', params)
	},
	
	//首页快捷分类
	indexBannerCat(params) {
		return fetchGet('/activity/index', params)
	},
	
	//首页热门商品
	indexHot(params) {
		return fetchPost('/search/hot', params)
	},
	
	//搜索历史
	searchHistory(params) {
		return fetchGet('/search/history', params)
	},
	
	//猜你想找
	searchGuess(params) {
		return fetchGet('/search/guess', params)
	},
	
	//清除搜索历史
	historyClear(params) {
		return fetchGet('/search/historyClear', params)
	},
	
	//商品详情
	goodsDetail(params) {
		return fetchGet('/goods/detail', params)
	},
	
	//我的页面
	user(params) {
		return fetchGet('/user/info', params)
	},
	
	//更新用户信息
	updataUserInfo(params) {
		return fetchPost('/user/info', params)
	},
	
	
	//积分总额
	userPoints(params) {
		return fetchGet('/user/points', params)
	},
	
	
	//订单详情
	orderDetail(params) {
		return fetchGet('/order/detail', params)
	},
		
	//取消订单
	orderCancel(params) {
		return fetchPost('/order/cancel', params)
	},
	
	
	//删除订单
	orderDelete(params) {
		return fetchPost('/order/delete', params)
	},
	
	//订单确认收货
	orderReceipt(params) {
		return fetchPost('/order/receipt', params)
	},
	
	//更新地址
	updataAddr(params) {
		return fetchPost('/address/update', params)
	},
	
	
	//地址详情
	detailAddr(params) {
		return fetchGet('/address/detail', params)
	},
	
	//删除地址
	deleteAddr(params) {
		return fetchPost('/address/delete', params)
	},
	
	//新增地址
	createAddr(params) {
		return fetchPost('/address/create', params)
	},
	
	//获取省市区
	cityList(params) {
		return fetchGet('/api/city', params)
	},
	
	
	//关于我们
	about(params) {
		return fetchGet('/about/index', params)
	},
	
	//获取购物车或需求清单数据
	getCartData(params) {
		return fetchGet('/cart/index', params)
	},
	
	//添加商品到购物车
	addCartData(params) {
		return fetchPost('/cart/add', params)
	},
	
	//微信分享
	wxShare(params) {
		return fetchPost('/api/shareWeiXin', params)
	},
	
	//判断微信是否已登录
	loginAouth(params) {
		return fetchPost('/api/auth', params)
	},
	
	
	//收货地址列表
	addressList(params) {
		return fetchGet('/address/index', params)
	},
	
	//立即购买确认订单
	checkOutBuy(params) {
		return fetchPost('/cart/checkOutBuy', params)
	},
	
	//确认订单
	checkOut(params) {
		return fetchPost('/cart/checkOut', params)
	},
	
	//创建订单
	createOrder(params) {
		return fetchPost('/cart/createOrder', params)
	},
		
	//购物车
	getCartData(params) {
		return fetchGet('/cart/index', params)
	},
	
	//购物车商品数量更新
	updataCartData(params) {
		return fetchPost('/cart/update', params)
	},
	
	//购物车商品数量更新
	deleteCartData(params) {
		return fetchPost('/cart/deleteAll', params)
	},
	
	//登陆短信令牌获取
	getTokenSms(params) {
		return fetchPost('/api/token_sms', params)
	},
	
	//登陆获取验证码
	getCodeSms(params) {
		return fetchPost('/api/smsSend', params)
	},
	
	//注册
	registerUser(params) {
		return fetchPost('/register/index', params)
	},
	
	//注册
	weixinLogin(params) {
		return fetchPost('/login/index ', params)
	},
	
	
	//微信多媒体上传头像图片
	wxUploadUserImg(params) {
		return fetchPost('/user/img_head2', params)
	},
	
	//微信多媒体上传处方药图片
	wxUploadOrderImg(params) {
		return fetchPost('/order/img_user2', params)
	},
	
	//会员卡绑定
	bindMemberCard(params) {
		return fetchPost('/user/bind', params)
	},
	
	//会员卡开通城市列表
	regCityList(params) {
		return fetchGet('/user/reg', params)
	},
	
	//会员卡开通城市列表
	regMember(params) {
		return fetchPost('/user/reg', params)
	},
	
	//充值
	recharge(params) {
		return fetchPost('/cart/createRecharge', params)
	},
	
	
	//评价
	createComment(params) {
		return fetchPost('/goods/commentCreate', params)
	},





	




















	// 资讯
	indexInformation(params) {
		return fetchGet('/news/index', params)
	},

	//资讯内容
	indexInformationContent(params) {
		return fetchGet('/news/detail', params)
	},

	//分类
	indexClassification(params) {
		return fetchGet('goods/category', params)
	},

	//健康档案
	indexHealthRecords(params) {
		return fetchGet('health/index', params)
	},

	//跟新自己的健康档案
	indexHealth(params) {
		return fetchPost('health/updateMy', params)
	},

	//删除健康档案
	indexDeleteHealth(params) {
		return fetchPost('health/delete', params)
	},
	
	//自己的健康档案
	indexDetailMy(params) {
		return fetchGet('health/detailMy', params)
	},

	//健康档案
	indexDetail(params) {
		return fetchGet('health/detail', params)
	},

	//常用标签
	indexHealthTag(params) {
		return fetchGet('health/healthTag', params)
	},
	
	//创建病情标签
	indexAddHealthTag(params) {
		return fetchPost('health/tagCreate', params)
	},

	//删除病情标签
	indexDeleteHealthTag(params) {
		return fetchPost('health/tagDelete', params)
	},

	//关系选择
	indexGetRelation(params) {
		return fetchGet('health/getRelationship', params)
	},

	//健康档案创建
	indexHealthCreate(params) {
		return fetchPost('health/create', params)
	},
	
	//更新健康档案
	
	indexHealthChange(params) {
		return fetchPost('health/update', params)
	},
}
