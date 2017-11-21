<template>
  <section class="app">

    <Header title="评论列表"></Header>

    <!-- 评价 -->
	<div class="evaluate" v-show="pagination.loadEnd && pagination.content.length>0">
        <div class="evaluate_title">
            <div class="evaluate_left">
                <span>评价(<span>{{total}}</span>)</span>
            </div>
            <div class="evaluate_right">
                <span>好评度</span><span class="money">{{total_score}}</span><span class="money">%</span>
            </div>
        </div>
    </div>	    
	<div class="content">
		<Pagination :render="render" :param="pagination" :autoload="false" ref="pagination" uri="/goods/comment">
			
			<div class="review-list" v-show="pagination.content.length>0">
				<div class="review" v-for="(item, index) in pagination.content" :key="index">
			        <div class="review_info">
			            <div class="review_portrait">
			                <img :src="item.img_head">
			                <h4>{{item.uid_username}}</h4>
			            </div>
			
			
			            <div class="review_grade">
			                <img src="../../static/images/28@3x.png" v-for="n in item.score">
          					<img src="../../static/images/27@3x.png" v-for="n in 5-item.score">
			            </div>
			        </div>
			
			        <div class="review_data">
			            {{item.time_make}}
			        </div>
			        <div class="review_body" v-html="item.content">
			        </div>
			    </div>
			</div>
		</Pagination>
		<div class="none-data" v-show="pagination.content.length<1 && pagination.loadEnd">
    		<img class="none-img" src="../../static/images/26@3x.png"  />
    		<p class="none-tip">该商品暂无评价</p>
    	</div>
		
			
	</div>
	    
 

  </section>
</template>

<script>

export default {
    data() {
	    return {
	    	total: 0,
	    	total_score: 0,
				pagination: {
		            content: [],
		            loadEnd: false,
		            type: 'post',
		            data: {
		            	p: 1,
		            	id: this.$route.params.id
		            }
		        },
		    }
    },
    created() {
    	this.$store.commit('setLoadingStatus', true)
    },
    mounted() {
    	this.$refs.pagination.refresh()
    },
    methods: {
  	    render(res) {
  	    	this.total = res.total
  	    	this.total_score = parseInt(res.total_score)
            res.data.forEach((item) => {
            	this.pagination.content.push(item)
            })
        }
    }

}
</script>

<style lang="scss" scoped>
.app{
    background-color: #f5f5f9;
    font-size: 0.26rem;
    position: relative;
}
.content{
	position: absolute;
	width: 100%;
	left: 0;
	top: 1.72rem;
	bottom: 0;
	overflow-y: auto;
}
.evaluate{
	left: 0;
	top: 0;
    width: 100%;
    height: auto;
    background-color: #fff;
    padding-left: .24rem;
    
    .evaluate_title{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        padding-right: .24rem;
        display: flex;
        justify-content: space-between;
        align-self: center;
        border-bottom: 1px solid #f6f6f6;
        .evaluate_left{
        color: #666;
        }
        .evaluate_right{
        display: flex;
        align-items: center;
        color: #666;
        justify-content: space-between;
        }
    }
    .money{
        color: #ff6600;
    }

}
.review{
    width: 100%;
    height: auto;
    padding: .24rem;
    background-color: #fff;
    margin-bottom: .24rem;
}
.review-list .review:last-child{
	margin-bottom: 0;
}
.review_info{
    display: flex;
    align-items: center;
}
.review_portrait{
    display: flex;
    align-items: center;
    img{
	    width: .5rem;
	    height: .5rem;
	    border-radius: .25rem;
	    margin-right: .24rem;
    }
}
.review_grade{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img{
	    width: .3rem;
	    height: .3rem;
	    margin-left: .1rem;
    }
}
.review_data{
    padding-top: .26rem;
    font-size: .24rem;
    color: #999;
    
}
.review_body{
    padding-top: .2rem;
    line-height: .34rem;
    font-size: 0.26rem;
    color: #666;
}

</style>