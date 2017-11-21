<template>
    <mt-loadmore :bottom-method="loadBottom" :top-method="loadTop" :auto-fill="false" :bottom-all-loaded="allLoaded" :bottomDistance="40" ref="loadmore">
        <slot></slot>
    </mt-loadmore>
</template>

<script>
import {Loadmore} from 'mint-ui'
export default {
    props: {
        render: {
            type: Function,
            required: true
        },
        param: {
            type: Object,
            required: true
        },
        uri: {
            type: String,
            required: true
        },
        autoload: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    data() {
        return {
            allLoaded: false
        }
    },
    mounted() {
        if (this.autoload) {
            this.loadPage()
        }
    },
    methods: {
        // 下拉分页加载
        loadBottom() {
            this.loadPage(false)
        },
        // 上拉刷新加载
        loadTop() {
            this.param.data.p = 1
            this.param.content = []
            this.loadPage(true)
        },
        // 刷新
        refresh() {
            this.loadPage(true)
        },
        // 加载分页
        loadPage(isRefresh) {
            let self = this
            self.param.loadEnd = false
            setTimeout(function() {
            	let Promise = self.param.type === 'post' ? self.$api.pagePost(self.uri, self.param.data) : self.$api.pageGet(self.uri, self.param.data)
                Promise.then((response) => {
                    if (isRefresh) {
                        self.param.data.p = 1
                        self.param.content = []
                        self.allLoaded = false
                    }

                    self.render(response)
					self.param.loadEnd = true
                    if (response.current_page >= response.last_page || response.last_page === 0 ) {
                        // 设置加1
                        self.allLoaded = true
                    } else {
                        self.param.data.p++
                    }

                    if (isRefresh) {
                        self.$refs.loadmore.onTopLoaded()
                    } else {
                        self.$refs.loadmore.onBottomLoaded()
                    }
                })
            }, 200)
        }
    }
}
</script>

<style scoped>

</style>


