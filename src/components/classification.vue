<template>
  <section class="classification">
    <div class="search-content">
			<a href="#/search" class="search-input">
				<img src="../../static/images/search-icon.png" />
				<span>搜索你要的宝贝</span>
			</a>
		</div>
    <main>
      <div class="left_nav" ref="navtabs">
        <ul >
          <li v-for="nav in navtab" :class="{iscur: currNavId === nav.cat_id}" @click="changeNav(nav)">{{nav.name}}</li>
        </ul>
      </div>
      <div class="right_main_warp">
        <div class="right_main">
          <div class="two" v-for="lists in currNavlist" >
            <div class="nav_main">
            	<h3>{{lists.name}}</h3>
	            <div class="nav_main_list" @click="goList(list.cat_id, list.name)" v-for="list in lists.data">
                <img :src="list.thumb">
	              <p>{{list.name}}</p>
	            </div>
          	</div>
          </div>
        </div>
      </div>
      
    </main>

    <Menu actived="second"></Menu>

  </section>
</template>

<script>
export default {
  data (){
    return {
      navtab: [],
      currNavId: 0, 
      currNavlist: []
    }
  },
  created() {
    const self = this
    this.$api.indexClassification().then(res => {
      this.navtab = res
      this.currNavId = res[0].cat_id
      this.currNavlist = res[0].data
    }, err => {
        
    })
  },
  methods: {
  	changeNav(nav){
  		this.navtab.forEach((item) => {
  			if(item.cat_id == nav.cat_id) {
  				this.currNavId = item.cat_id
  				 this.currNavlist = item.data
  				 return
  			}
  		})
  	},
  	goList(id, name){
  		this.$storage.set('product_cat', name)
  		this.$router.push('/productList/goods/' + id)
  	}
  }
  

  
    
  

}
</script>

<style lang="scss" scoped>
.classification {
  height: 100vh;
  background-color: #F5F5F9;
  position: relative;
}
.search-content{
	padding: 0.18rem 0.35rem ;
	background: #3cafb6;
	position: fixed;
	left: 0;
	width: 100%;
	top: 0;
	z-index: 10;
}
.search-input{
	width: 100%;
	height: 0.56rem;
	background: #FFFFFF;
	border-radius: 0.08rem;
	display: flex;
	align-items: center;
	img{
		width: 0.32rem;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
	}
	span{
		color: #777;
	}
}


main {
	position: absolute;
	left: 0;
	top: 0.92rem;
	bottom: 1rem;
  width: 100%;
  overflow: hidden;
  display: flex;
}

.left_nav {
  width: 1.88rem;
  height: 100%; 
  overflow-y: auto;
}

ul {
  width: 1.88rem; 
  height: auto;
  font-size: .26rem;
  color: #333;
  background-color: #fff;
}

li {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-bottom: 1px solid #F5F5F9
}

.iscur {
  background-color: #F5F5F9;
  color: #3CAFB6
}

.right_main_warp {
  flex: 1;
  height: 100%;
  padding: 0rem .3rem;
}

h3 {
  width: 100%;
  height: .9rem;
  line-height: 1rem;
  font-size: .24rem;
  color: #222;
  text-align: center;
}

.right_main {
  width: 100%;
  height: 100%;
  
  overflow-y: auto;
}
.two{
	background-color: #fff;
}
.two h3{
	background: #F5F5F9;
	text-align: left;
}
.two h4 {
  font-size: .3rem;
  text-align: center
}

.nav_main {
  display: flex;
  align-items: center;
/*  justify-content: center;*/
  align-self: center;
  flex-wrap: wrap;
  font-size: .24rem;
  color: #666
}

.nav_main_list {
  width: 33.33%;
  height: 1.84rem;
  text-align: center;
  img {
    width: .9rem;
    height: .9rem;
    margin: 0 auto;
    margin-top: .3rem;
    
  }
  p {
  	padding-top: 0.08rem;
    line-height: .36rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>