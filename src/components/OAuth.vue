<template>
</template>

<script>
export default {
    created() {
        let code = ''
        window.location.search.split('&').forEach(value => {
            if (value.indexOf('code') >= 0) {
                code = value.split('=')[1]
            }
        })
        this.$weixin.getAccessToken(code).then(response => {
            this.$weixin.getUserInfo(response.access_token, response.openid).then(response => {
                this.$storage.set('oauthInfo', {
                    open_id: response.openid,
                    uuid: response.unionid,
                    nickname: response.nickname,
                    img_head: response.headimgurl,
                    sex: response.sex
                })
                this.$router.replace({ path: '/login', query: { oauth: '1' }})
            }).catch(error => {
                Promise.reject(error)
            })
        }).catch(error => {
            Promise.reject(error)
        })
    }
}
</script>


