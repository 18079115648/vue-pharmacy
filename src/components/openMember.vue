<template>
    <div class="app" id="app" :style="{ height: wH + 'px' }">
    	<Header title="开通会员卡"></Header>
    	<div class="user-info">
			<div class="link-item">
				<span>姓名</span>
				<input type="text" v-model="name" placeholder="您的真实姓名" class="input" />
			</div>
			<div class="link-item">
				<span>身份证号</span>
				<input type="tel" v-model="id_card" maxlength="18" placeholder="您的身份证号" class="input" />
			</div>
			<div class="link-item has-right-arror">
				<span>所在地区</span>
				<select class="city-list" v-model="city">
					<option disabled value="disabled">请选择</option>
                    <option v-for="item in cityList" :value="item.coding">{{item.city}}</option>
                </select>
			</div>
			<div class="link-item has-right-arror">
				<span>性别</span>
				<select class="city-list" v-model="sex">
					<option disabled value="disabled">请选择</option>
                    <option v-for="item in sexList" :value="item.value">{{item.label}}</option>
                </select>
			</div>
    	</div>
    	<div class="btn-default submit btn-hover" @click="regMember">提交</div>
    </div>
</template>

<script>
import $ from 'jquery'
import { Toast } from 'mint-ui'
export default {
	data() {
	    return {
	    	name: '',
	    	id_card: '',
	    	city: 'disabled',
	    	cityList:[],
	    	sex: 'disabled',
	    	sexList: [{
	    		label: '男',
	    		value: 1
	    	},{
	    		label: '女',
	    		value: 2
	    	}],
	    	wH: 0
	    }
	},
	created() {
		this.$api.regCityList().then(res => { 
			if(res.ret == 1) {
				this.cityList = res.city
			}
        }, err => {
        	
        })
	},
	mounted() {	
		this.wH = $('#app').height()
	},
	computed: {
		checkIdCard: function() {
			if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.id_card)){   
		        return true; 
		    } 
		    return false
		}
	},
	methods: {
		regMember() {
			if(this.name.length < 1) {
				Toast({
					message: '请输入真实姓名',
					position: 'bottom',
					duration: 1000
				});
				return
			}
			if(!this.checkIdCard) {
				Toast({
					message: '请正确填写身份证号',
					position: 'bottom',
					duration: 1000
				});
				return
			}
			if(this.city == 'disabled') {
				Toast({
					message: '请选择所在地区',
					position: 'bottom',
					duration: 1000
				});
				return
			}
			this.$api.regMember({
				true_name: this.name,
				city: this.city,
				idcard: this.id_card,
				sex: this.sex
			}).then(res => {
				if(res.ret == 1) {
					Toast({
					  message: '注册成功',
					  position: 'middle',
					  iconClass: 'toast-icon icon-success',
					  duration: 1000
					})
					setTimeout(() => {
						this.$router.go(-2)
					},800)
				}
	        }, err => {
	        	
	        })
		}
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
	position: relative;
} 
.user-info{
	background: #fff;
	padding-left: 0.3rem;
	margin-top: 0.3rem;
	.link-item{
		display: flex;
		height: 0.9rem;
		align-items: center;
		justify-content: space-between;
		padding-right: 0.3rem;
		border-bottom: 1px solid #f3f3f3;
		& > span{
			width: 2.5rem;
		}
		& > input {
			flex: 1;
		}
		& > select{
			flex: 1;
		}
	}
	.link-item.has-right-arror{
		padding-right: 0.6rem;
	}
}
.city-list{
	height: 100%;
	option {
		text-align: right;
	}
}
.submit{
	position: absolute;
	bottom: 1.5rem;
	left: 0.3rem;
}
</style>