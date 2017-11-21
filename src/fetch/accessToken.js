import storage from '@/fetch/storage'
import moment from 'moment'
import router from '@/router/router'
import { Toast } from 'mint-ui'

export default {


    /**
     * 获取accessToken
     */
    getAccessToken() {
        // 从storage中查询token信息
        var token = storage.get('token')

        if (!token || !token.accessToken || !token.expired) {
//          Toast({
//              message: '请登录',
//              position: 'bottom',
//              duration: 1000
//          })
//          storage.set('history_url', router.history.current.path)
//          router.replace('/appLogin')
            return false
        } else if (token.expired <= moment().unix()) {
            // 已过期，置换accessToken
//          Toast({
//              message: '凭证已过期',
//              position: 'bottom',
//              duration: 1000
//          })
//          storage.set('history_url', router.history.current.path)
//          router.replace('/appLogin')
            return false
        }
        return token.accessToken
    },

    /**
     * 保存token信息
     * 
     * @param {*} accessToken  访问凭证
     * @param {*} refreshToken 置换凭证
     * @param {*} expireTime 过期时间（秒）
     */
    refreshToken(accessToken, expireTime) {
        storage.set('token', {
            accessToken: accessToken, // 访问凭证
            expired: moment().unix() + parseInt(expireTime) - 60 // 有效时间 = 当前时间戳 + 过期时间（秒）
        })
    }

}