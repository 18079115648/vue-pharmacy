<template>
    <div class="app">
    	<div class="search-content">
    		<div class="search-input">
    			<img src="../../static/images/search-icon.png" />
    			<form action="#" onsubmit="return false">
					<input class="input" ref="Input" type="search" v-model.trim="word" @keyup.enter="searchProduct(word)"   placeholder="搜索你要的宝贝" />
				</form>
    		</div>
    		<span @click="back">取消</span>
    	</div>
    	<section class="search-history">
			<div class="search-history-tit" v-show="historyWord.length>0">
				<span class="tit">最近搜索</span>
				<span class="delete-icon" @click="historyClear"></span>
			</div>
			<div class="search-history-list" v-show="historyWord.length>0">
				<span class="search-history-item" @click="searchProduct(item.wd)" v-for="(item, index) in historyWord" :key="index">
					{{item.wd}}
				</span>
			</div>
			<div class="search-history-tit" style="padding-top: 0.6rem;" >
				<span class="tit">猜你想找</span>
			</div>
			<div class="search-history-list">
				<span class="search-history-item" @click="searchProduct(item.name)" v-for="(item, index) in guessWord" :key="index">
					{{item.name}}
				</span>
			</div>
		</section>
		<confirm-modal :show="show" @confirm_modal="confirm_modal" @closeModal="show = false" message="确定删除历史记录?"></confirm-modal>	
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			show: false,
			historyWord:[],
			guessWord: [],
			word: ''
		}
	},
	created() {
		this.$api.searchHistory().then(res => { 
			if(res.ret == 1) {
				this.historyWord = res.data
			}
        }, err => {
        	
        })
		
		this.$api.searchGuess().then(res => { 
			if(res.ret == 1) {
				this.guessWord = res.data
			}
        }, err => {
        	
        })
	},
	mounted() {	
		this.$refs.Input.focus()
	},
	methods: {
		back() {
			this.$router.go(-1)
		},
		confirm_modal() {
			this.$api.historyClear().then(res => { 
				if(res.ret == 1) {
					this.historyWord = []
					Toast({
					  message: '删除成功',
					  position: 'bottom',
					  duration: 1500
					});
				}
	        }, err => {
	        	
	        })
			
			
		},
		historyClear() {
			this.show = true
		},
		searchProduct(word) {
			this.$storage.set('search_word', word)
			this.$router.push('/searchResult')
		}
	}
}
</script>

<style lang="scss" scoped>
.search-content{
	display: flex;
	align-items: center;
	padding: 0.18rem 0.3rem;
	border-bottom: 1px solid #F5F5F9;
	& > span{
		width: 1rem;
		color: #3cafb6;
		height: 0.55rem;
		line-height: 0.55rem;
		text-align: right;
	}
	.search-input{
		flex: 1;
		display: flex;
		align-items: center;
		padding: 0.14rem 0.2rem;
		background: #f7f7f7;
		border-radius: 0.06rem;
		& > img{
			width: 0.32rem;
			margin-right: 0.15rem;
		}
		form{
			flex: 1;
			input{
				background: transparent;
				width: 100%;
			}
		}
	}
}
.input::-webkit-inner-spin-button,  
.input::-webkit-outer-spin-button { 
        -webkit-appearance: none !important; 
        appearance: none !important; 
        margin: 0 !important; 
}
.search-history-tit {
	padding: 0.3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.search-history-tit .tit {
	font-size: 0.30rem;
}

.delete-icon {
	width: 0.5rem;
	height: 0.5rem;
	background: url(../../static/images/delete.png) no-repeat center;
	background-size: 80%;
}

.search-history-list {
	padding-left: 0.3rem;
}

.search-history-list .search-history-item {
	display: inline-block;
	background: #F7F7F7;
	padding: 0.1rem 0.3rem;
	border-radius: 0.06rem;
	margin-right: 0.3rem;
	margin-bottom: 0.2rem;
}
</style>