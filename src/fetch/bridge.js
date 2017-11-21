import router from '@/router/router'
import common from '@/fetch/common'
import storage from '@/fetch/storage'
import qs from 'qs'
import axios from 'axios'

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
setupWebViewJavascriptBridge(function(bridge) {
    //初始化
    if (common.isAndroid()) {
        bridge.init(function(message, responseCallback) {
            var data = {
                'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
        })
    }

    // 跳转消息页面
    bridge.registerHandler('newsPage', (data, responseCallback) => {
        router.push('/advices')
        responseCallback()
    })

})




export default {
    // 微信支付
    wechatPay(params) {
        return new Promise((resolve, reject) => {
            setupWebViewJavascriptBridge(bridge => {
                bridge.callHandler('callWeChatPay', JSON.stringify(params), response => {
                    resolve(response)
                })
            })
        })
    },

    // 支付宝支付
    alipay(params) {
        return new Promise((resolve, reject) => {
            setupWebViewJavascriptBridge(bridge => {
                bridge.callHandler('callAlipay', params, response => {
                    resolve(response)
                })
            })
        })
    },


    // 微信OAuth认证
    wechatOAuth() {
        return new Promise((resolve, reject) => [
            setupWebViewJavascriptBridge(bridge => {
                bridge.callHandler('oauth', "1", response => {
                    resolve(response)
                })
            })
        ])
    },

    // 分享
    share(params) {
        return new Promise((resolve, reject) => {
            setupWebViewJavascriptBridge(bridge => {
                bridge.callHandler('share', JSON.stringify(params), response => {
                    resolve(response)
                })
            })
        })
    },

    // 选择图片
    choosePhoto(params) {
        return new Promise((resolve, reject) => {
            setupWebViewJavascriptBridge(bridge => {
                bridge.callHandler('choosePhoto', JSON.stringify(params), response => {
                    resolve(JSON.parse(response))
                })
            })
        })
    }
}