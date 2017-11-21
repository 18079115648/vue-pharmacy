
import MobileDetect from 'mobile-detect'

export default {
    // 判断是否微信
    isWeixin() {
        return window.navigator.userAgent.indexOf('MicroMessenger') > -1
    },

    // 判断是否安卓
    isAndroid() {
        let md = new MobileDetect(window.navigator.userAgent)
        return md.is('AndroidOS')
    },

    // 判断是否iOS
    isIOS() {
        let md = new MobileDetect(window.navigator.userAgent)
        return md.is('iOS')
    },

    // 获取平台类型
    // 1微信公众号 2安卓 3iOS 
    getPlatformType() {
        if (this.isWeixin()) {
            return 1
        } else if (this.isIOS()) {
            return 3
        } else {
            return 2
        }
    }
}
