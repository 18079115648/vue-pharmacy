<template>
    <section class="advices">
        <Header title="消息"></Header>

        <div class="content">
            <div class="advices_time">2010年10月10日</div>
            <div class="advices_body">
                <div class="left">
                    <img src="">
                </div>
                <div class="right">
                    <div class="advices_title">预定审核成功</div>
                    <div class="advices_msg">提交的预定已通过审核，请至订单内付款</div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="advices_time">2010年10月10日</div>
            <div class="advices_body">
                <div class="left" style="background-color:#50AA6D;">
                    <img src="">
                </div>
                <div class="right">
                    <div class="advices_title" style="color:#50AA6D;">系统通知</div>
                    <div class="advices_msg">提交的预定已通过审核，请至订单内付款</div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="advices_time">2010年10月10日</div>
            <div class="advices_body">
                <div class="left" style="background-color:#E16958;">
                    <img src="">
                </div>
                <div class="right">
                    <div class="advices_title" style="color:#E16958;">预定审核失败</div>
                    <div class="advices_msg">提交的预定已通过审核，请至订单内付款</div>
                </div>
            </div>
        </div>
        
    </section>
</template>


<script>
import { Toast, Indicator } from 'mint-ui'
export default {
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
           
    }

}
</script>

<style lang="scss" scoped>
.advices{
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
    position: relative;
}
.content{
    padding: .3rem;
    .advices_time{
        width: 2rem;
        height: 0.44rem;
        font-size: .2rem;
        background-color: #777777;
        text-align: center;
        line-height: .44rem;
        color: #fff;
        border-radius: .22rem;
        margin: 0 auto;
    }
    .advices_body{
        width: 100%;
        height: 1.6rem;
        background-color: #fff;
        border-radius: 15px;
        margin-top: .3rem;
        display: flex;
        padding: .3rem;
        align-items: center;
    }
    .left{
        width: 1rem;
        height:1rem;
        border-radius: 10px;
        background-color: #3474CF;
        
    }
    .right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: .1rem .3rem;
        height: 100%;
        .advices_title{
            font-size: .3rem;
            color: #3474CF;
            font-weight: 300;
        }
        .advices_msg{
            font-size: .24rem;
            color: #bbb;
            font-weight: 300;
        }
    }
}

</style>