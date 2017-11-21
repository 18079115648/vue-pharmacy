import VueRouter from 'vue-router'
import token from '@/fetch/accessToken'
import storage from '@/fetch/storage'
import aouth from '@/fetch/wxAouth'
import store from '@/vuex/store.js'

const selected = r => require.ensure([], () => r(require('../components/home.vue')), 'selected')
const search = r => require.ensure([], () => r(require('../components/search.vue')), 'search')
const searchResult = r => require.ensure([], () => r(require('../components/searchResult.vue')), 'searchResult')
const productList = r => require.ensure([], () => r(require('../components/productList.vue')), 'productList')
const cart = r => require.ensure([], () => r(require('../components/cart.vue')), 'cart')
const requireList = r => require.ensure([], () => r(require('../components/requireList.vue')), 'requireList')
const orderSubmit = r => require.ensure([], () => r(require('../components/orderSubmit.vue')), 'orderSubmit')
const paySubmit = r => require.ensure([], () => r(require('../components/paySubmit.vue')), 'paySubmit')
const demandSubmit = r => require.ensure([], () => r(require('../components/demandSubmit.vue')), 'demandSubmit')
const user = r => require.ensure([], () => r(require('../components/user.vue')), 'user')
const userInfo = r => require.ensure([], () => r(require('../components/userInfo.vue')), 'userInfo')
const nickName = r => require.ensure([], () => r(require('../components/nickName.vue')), 'nickName')
const bindMemberCard = r => require.ensure([], () => r(require('../components/bindMemberCard.vue')), 'bindMemberCard')
const identyAouth = r => require.ensure([], () => r(require('../components/identyAouth.vue')), 'identyAouth')
const openMember = r => require.ensure([], () => r(require('../components/openMember.vue')), 'openMember')
const myBalance = r => require.ensure([], () => r(require('../components/myBalance.vue')), 'myBalance')
const myIntergal = r => require.ensure([], () => r(require('../components/myIntergal.vue')), 'myIntergal')
const recharge = r => require.ensure([], () => r(require('../components/recharge.vue')), 'recharge')
const allOrders = r => require.ensure([], () => r(require('../components/allOrders.vue')), 'allOrders')
const orderDetail = r => require.ensure([], () => r(require('../components/orderDetail.vue')), 'orderDetail')
const evaluate = r => require.ensure([], () => r(require('../components/evaluate.vue')), 'evaluate')
const addressList = r => require.ensure([], () => r(require('../components/addressList.vue')), 'addressList')
const addressDetail = r => require.ensure([], () => r(require('../components/addressDetail.vue')), 'addressDetail')
const addressNew = r => require.ensure([], () => r(require('../components/addressNew.vue')), 'addressNew')
const aboutUs = r => require.ensure([], () => r(require('../components/aboutUs.vue')), 'aboutUs')
const login = r => require.ensure([], () => r(require('../components/login.vue')), 'login')
const appLogin = r => require.ensure([], () => r(require('../components/appLogin.vue')), 'appLogin')
const OAuth = r => require.ensure([], () => r(require('../components/OAuth.vue')), 'OAuth')




const article = r => require.ensure([], () => r(require('../components/article.vue')), 'article')
const classification = r => require.ensure([], () => r(require('../components/classification.vue')), 'classification')
const information = r => require.ensure([], () => r(require('../components/information.vue')), 'information')
const shopdetails = r => require.ensure([], () => r(require('../components/shopdetails.vue')), 'shopdetails')
const reviewList = r => require.ensure([], () => r(require('../components/reviewList.vue')), 'reviewList')


const healthRecords = r => require.ensure([], () => r(require('../components/healthRecords.vue')), 'healthRecords')

const Myhealth = r => require.ensure([], () => r(require('../components/Myhealth.vue')), 'Myhealth')
const healthNew = r => require.ensure([], () => r(require('../components/healthNew.vue')), 'healthNew')
const OthersHealth = r => require.ensure([], () => r(require('../components/OthersHealth.vue')), 'OthersHealth')


const indexSetting = r => require.ensure([], () => r(require('../components/indexSetting.vue')), 'indexSetting')
const advices = r => require.ensure([], () => r(require('../components/advices.vue')), 'advices')



const routes = [{
        path: '/selected',
        component: selected,
        meta: {
            keepAlive: true
        }
    },{
        path: '/search',
        component: search
    },{
        path: '/searchResult',
        component: searchResult
    },{
        path: '/productList/:type/:id',
        component: productList
    },{
        path: '/cart',
        component: cart,
        meta: {
            requireAuth: true
        }
    },{
        path: '/requireList',
        component: requireList,
        meta: {
            requireAuth: true
        }
    },{
        path: '/orderSubmit/:type/:status',  //type 901： 普通药 ， 902： 处方药   。   status订单来源    0：立即购买， 1： 购物车， 2：需求清单
        component: orderSubmit
    },{
        path: '/paySubmit/:order_id/:order_no', 
        component: paySubmit
    },{
        path: '/demandSubmit',
        component: demandSubmit
    },{
        path: '/user',
        component: user,
        meta: {
            requireAuth: true
        }
    },{
        path: '/OAuth',
        component: OAuth
    },{
        path: '/login',
        component: login
    },{
        path: '/appLogin',
        component: appLogin
    },{
        path: '/userInfo',
        component: userInfo
    },{
        path: '/nickName',
        component: nickName
    },{
        path: '/bindMemberCard',
        component: bindMemberCard
    },{
        path: '/identyAouth',
        component: identyAouth
    },{
        path: '/openMember',
        component: openMember
    },{
        path: '/article/:id',
        component: article
    },{
        path: '/classification',
        component: classification,
        meta: {
            keepAlive: true
        }
    },{
        path: '/information',
        component: information,
        meta: {
            keepAlive: true
        }
    },{
        path: '/shopdetails/:id',
        component: shopdetails
    },{
        path: '/myBalance',
        component: myBalance
    },{
        path: '/myIntergal/:status',  // status 是否绑定会员卡    0：未绑定， 1： 已绑定
        component: myIntergal
    },{
        path: '/recharge',
        component: recharge
    },{
        path: '/allOrders/:status',
        component: allOrders
    },{
        path: '/orderDetail/:id',
        component: orderDetail
    },{
        path: '/evaluate/:id',
        component: evaluate
    },{
        path: '/addressList/:status',  //status 地址列表来源    'select': 确认订单页切换地址      'list': 个人中心
        component: addressList
    },{
        path: '/addressDetail/:id',
        component: addressDetail
	},{
        path: '/addressNew',
        component: addressNew
	},{
        path: '/aboutUs',
        component: aboutUs,
        meta: {
            keepAlive: true
        }
	},{
        path: '/reviewList/:id',
        component: reviewList
    },{
        path: '/healthRecords',
        component: healthRecords
    },{
        path: '/Myhealth',
        component: Myhealth
    },{
        path: '/healthNew',
        component: healthNew
    },{
        path: '/OthersHealth/:id',
        component: OthersHealth
    },{
        path: '/indexSetting',
        component: indexSetting
    },{
        path: '/advices',
        component: advices
    }]

const router = new VueRouter({
    routes,
//  mode: 'history',
    strict: process.env.NODE_ENV !== 'production'
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
    	aouth.wxAouth().then(res => {
    		if(res.ret == 1) {
    			next()
    		}else {
    			storage.set('history_uri', to.fullPath)
    			window.location.replace(store.state.back_uri + 'index/api/weixin?url=' + encodeURIComponent(to.fullPath))
//  			next()
    		}
    		
    	})
    }else {
    	next()
    }

    
})
export default router   