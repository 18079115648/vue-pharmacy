<template>
  <section class="app">

    <Header title="资讯" back="hidden"></Header>

	<div class="content">
		<Pagination :render="render" :param="pagination" ref="pagination" uri="/news/index">
			<div class="product-nav" v-show="pagination.loadEnd">
				<mt-swipe :auto="0">
					<mt-swipe-item v-for="(item,index) in bannerCat" :key="index">
						<router-link :to="'/article/' + item.news_id " class="fullEle">
							<img :src="item.thumb" />
						</router-link>
						
					</mt-swipe-item>
				</mt-swipe>
			</div>
		    <!-- 资讯列表 -->
		    <div class="msg_title"  v-for="(item, index) in pagination.content" :key="index" @click="goDetail(item.news_id)">
		      <!-- 列表图标 -->
		      <div class="img_left">
		        <img :src="item.thumb" >
		      </div>
		      <!-- 列表文字 -->
		      <div class="msg_text">
		        <div class="title">{{item.title}}</div>
		        <div class="msg-content" v-html="item.content"></div>
		        <div class="teat_info">{{item.time_add}}</div>
		      </div>
		    </div>
		</Pagination>
			
	</div>
	    


    <Menu actived="third"></Menu>

  </section>
</template>

<script>

export default {
  data() {
    return {
        bannerCat: [], // banner
        pagination: {
            content: [],
            loadEnd: false,
            data: {
            	p: 1
            }
        },
    }
  },
  created() {

  },
  methods: {
  	HTMLDecode(text) {
        var temp = document.createElement("div"); 
        temp.innerHTML = text; 
        var output = temp.innerText || temp.textContent; 
        temp = null; 
        return output; 
    },
    render(res) {
    	this.bannerCat = res.banner
        res.data.forEach((item) => {
        	item.content =  this.HTMLDecode(item.content)
        	this.pagination.content.push(item)
        })
    },
    goDetail(id){
      this.$router.push('/article/' + id)
    }
  }

}
</script>

<style lang="scss" scoped>
.app {
  background-color: #f5f5f9;
  position: relative;
}
.content{
	position: absolute;
	width: 100%;
	left: 0;
	top: 0.92rem;
	bottom: 1rem;
	overflow-y: auto;
}
.product-nav{
	width: 100%;
	height: 3rem;
	overflow: hidden;
}
.product-nav img{
	display: block;
	width: 100%;
}
.msg_title{
  width: 100%;
  background-color: #fff;
  padding: .2rem .2rem .2rem .2rem;
  position: relative;
  border-bottom: solid 1px #f5f5f5;
  display: flex;
  
}
.img_left{
  width: 1.8rem;
  height: 1.8rem;
  border: 1px solid #eee;
  position: relative;
  overflow: hidden;
  img{
  	position: absolute;
    height: 100%!important;
    width: auto!important;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
.msg_text{
  width: 100%;
  height: 1.8rem;
  font-size: .28rem;
  flex: 1;
  flex-wrap: wrap;
  padding-left: .2rem;
  overflow: hidden;
  line-height: 1.5;
  position: relative;
  .title{
  	color: #000;
  	text-overflow: ellipsis;
  	white-space: nowrap;
  	overflow: hidden;
  }
  .msg-content{
  	font-size: 0.24rem;
  	color: #888;
  	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 0.1rem 0;
  }
}
.teat_info{
  font-size: .24rem;
  color: #888;
  position: absolute;
  left: 0.2rem;
  bottom: 0.06rem;
}

</style>