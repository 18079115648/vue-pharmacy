import axios from 'axios'
import storage from '@/fetch/storage'
import router from '@/router/router'
import store from '@/vuex/store.js'


export default {
    // 认证
    authorize() {
        let redirect = store.state.back_uri + '#oauth'
        let authURI = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + store.state.APP_ID + '&redirect_uri=' + encodeURIComponent(redirect) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        window.location.replace(authURI)
    },

    // 获取凭证
    getAccessToken(code) {
        return new Promise((resolve, reject) => {
            let URI = store.state.back_uri + 'winxin/sns/oauth2/access_token?appid=' + store.state.APP_ID + '&secret=' + store.state.APP_SECRET + '&code=' + code + '&grant_type=authorization_code'
            axios.get(URI).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    getUserInfo(accessToken, openid) {
        return new Promise((resolve, reject) => {
            let URI = store.state.back_uri + 'winxin/sns/userinfo?access_token=' + accessToken + '&openid=' + openid + '&lang=zh_CN'
            axios.get(URI, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}