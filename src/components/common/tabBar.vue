<template>
<div>
    <div class="menu-blank"></div>
    <ul class="nav_bottm">
        <li :class="{'active':actived == 'first'}">
            <router-link to='/selected' replace>
                <img v-show="actived == 'first'" src="../../../static/images/34@3x.png" alt="精选"/>
                <img v-show="actived != 'first'" src="../../../static/images/4@3x.png" alt="精选"/>
                <div>精选</div>
            </router-link>
        </li>
        <li :class="{'active':actived == 'second'}">
            <router-link to='/classification' replace>
                <img v-show="actived == 'second'" src="../../../static/images/1@3x.png" alt="分类"/>
                <img v-show="actived != 'second'" src="../../../static/images/33@3x.png" alt="分类"/>
                <div>分类</div>
            </router-link>
        </li>
        <li :class="{'active':actived == 'third'}">
            <router-link to='/information' replace>
                <img v-show="actived == 'third'" src="../../../static/images/3@3x.png" alt="资讯"/>
                <img v-show="actived != 'third'" src="../../../static/images/32@3x.png" alt="资讯"/>
                <div>资讯</div>
            </router-link>
        </li>
        <li :class="{'active':actived == 'four'}">
            <router-link to='/cart' replace>
                <img v-show="actived == 'four'" src="../../../static/images/2@3x.png" alt="购物车"/>
                <img v-show="actived != 'four'" src="../../../static/images/20@3x.png" alt="购物车"/>
                <div>购物车</div>
            </router-link>
        </li>
        <li :class="{'active':actived == 'five'}">
            <router-link to='/user' replace>
                <img v-show="actived == 'five'" src="../../../static/images/5@3x.png" alt="我的"/>
                <img v-show="actived != 'five'" src="../../../static/images/30@3x.png" alt="我的"/>
                <div>我的</div>
            </router-link>
        </li>
    </ul>
</div>
</template>

<script>
    export default {
        props: ['actived']
    }
</script>

<style scoped>
    .menu-blank {
        height: 1rem;
    }
    .nav_bottm{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        background: #FFFFFF;
        border-top: 1px solid #eee;
        box-sizing: border-box;       
        display: flex;
        z-index: 30;
    }
    .nav_bottm li{
        flex: 1;
        display: flex;
        /*align-items: center;
        justify-content: center;*/
        color: #000;
    }
    .nav_bottm a{
        display: block;
        width: 100%;
    }
    .nav_bottm img{
        width: 0.36rem;
        height: 0.36rem;
        display: block;
        margin:0.14rem auto 0.1rem ;
    }
    .nav_bottm div{
        font-size: 0.22rem;
        color: #000;
        text-align: center;
    }
    .nav_bottm .active div {
        color: #3cafb6;
    }
</style>
