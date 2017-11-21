<template>
  <section class="app">
    <Header title="健康档案"></Header>
    <div class="health-list">
    		<div class="none-data" v-show="pagination.content.length<1 && pagination.loadEnd">
	    		<img class="none-img" src="../../static/images/25@3x.png"  />
	    		<p class="none-tip">暂无亲属健康记录</p>
	    	</div>
	    	<Pagination :render="render" :param="pagination" :autoload="false" ref="pagination" uri="/health/index">
					<div v-show="pagination.content.length>0">
						<div class="recordsList" v-for="(item, index) in pagination.content" :key="index" @click="edit(item.health_id)">
				        <div class="records">
				            <span class="records_label">{{item.relationship_id_name}}</span>
				            <span class="records_name">{{item.true_name}}</span>
				            <span class="records_years">
				                <span>{{item.age}}</span><span>岁</span>
				            </span>
				        </div>
				        <div class="condition">
				            <div class="health-tag" v-for="(list, index) in item.data">{{list.name}}</div>
				        </div>
				        <div class="arror_img">
				            <img src="../../static/images/arror.png" >
				        </div>
				    </div>
			    </div>
				</Pagination>
	    	
    </div>
	    

    <div class="add-health btn-default" @click="addHealth">
        	添加亲属健康状况
    </div>

  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
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
	mounted() {
		this.$refs.pagination.refresh()
	},
	methods: {
			render(res) {
					res.data.forEach((item) => {
	        	this.pagination.content.push(item)
	        })
			},
	    edit(id) {
	        this.$router.push('/OthersHealth/'+ id )
	    },
	    addHealth() {
	        this.$router.push('healthNew')
	    }
	}

}
</script>

<style lang="scss" scoped>
.app{
    background-color: #f5f5f9;
    position: relative;
    line-height: 1.5;
}
.health-list{
	  position: absolute;
    width: 100%;
    left: 0;
    top: 0.92rem;
    bottom: 1.6rem;
    overflow-y: auto;
}
.add-health{
	  position: absolute;
    left: 0.3rem;
    bottom: 0.5rem;
}
.recordsList{
    width: 100%;
    background-color: #fff;
    margin-top: .2rem;
    padding: .3rem 0.3rem 0.2rem;
    position: relative;
    
    .records{
        display: flex;
        width: 100%;
   			align-items: center;
   			padding-bottom: 0.1rem;
        .records_label{
            display: block;
            padding: 0.08rem 0.1rem;
            border-radius: 0.04rem;
            background-color: #ff6600;
            color: #fff;
            text-align: center;
            font-size: 0.2rem;
            margin-right: .3rem;
            line-height: 1;
            
            
        }
        .records_name{
            font-weight: 400;
            font-size: .28rem;
            padding-right: .15rem;
        }
    }
}
.condition{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 -0.15rem;
    width: 6.9rem;
    div.health-tag{
        border: solid 1px #3cafb6;
        color: #3cafb6;
        text-align: center;
        line-height: .58rem;
        border-radius: 0.06rem;
        margin: 0.15rem;
        min-width: 2rem;
    }
}
.arror_img{
    position: absolute;
    width: .15rem;
    height: .25rem;
    top: 50%;
    margin-top: -.125rem;
    right: .2rem;
    img{
        width: 100%;
        height: 100%;
    }
}
.add_disease{
    width: 100%;
    height: .78rem;
    padding: 0 .3rem;
    margin-top: 1.5rem;
    span{
        width: 100%;
        height: 100%;
        background-color: #3cafb6;
        display: block;
        text-align: center;
        line-height: .78rem;
        font-size: .34rem;
        border-radius: .05rem;
        color:#fff;
        font-weight: 100;
        
    }
}
</style>