// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import VueRouter from 'vue-router'
import store from './vuex/store'

import axios from 'axios'

import mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import VueScroller from 'vue-scroller'

import api from '@/fetch/api'
Vue.prototype.$api = api

import storage from '@/fetch/storage'
Vue.prototype.$storage = storage

import { loadJssdk } from '@/fetch/tool'
Vue.prototype.$loadJssdk = loadJssdk

import { getCookie } from '@/fetch/tool'
Vue.prototype.$getCookie = getCookie

import bridge from '@/fetch/bridge'
Vue.prototype.$bridge = bridge

import common from '@/fetch/common'
Vue.prototype.$common = common

import weixin from '@/fetch/weixin'
Vue.prototype.$weixin = weixin

import token from '@/fetch/accessToken'
Vue.prototype.$token = token

import aouth from '@/fetch/wxAouth'
Vue.prototype.$wxAouth = aouth.wxAouth
//console.log(aouth.wxAouth().then(()))


import Menu from '@/components/common/tabBar'
Vue.component('Menu', Menu)
import Header from '@/components/common/Header'
Vue.component('Header', Header)
import Pagination from '@/components/common/Pagination'
Vue.component('Pagination', Pagination)
import confirmModal from '@/components/common/confirmModal'
Vue.component('confirmModal', confirmModal)
import shareTip from '@/components/common/shareTip'
Vue.component('shareTip', shareTip)
import enlargeImg from '@/components/common/enlargeImg'
Vue.component('enlargeImg', enlargeImg)

Vue.use(VueScroller)

Vue.config.productionTip = true

Vue.use(VueRouter)

Vue.use(mint)






/* eslint-disable no-new */
new Vue({
    store,
    router,
    components: { App },
    render: h => h(App)
}).$mount('#app')