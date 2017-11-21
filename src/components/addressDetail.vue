<template>
    <div class="app">
    	<Header title="编辑服务地址"></Header>
    	<div class="user-info">
			<div class="link-item">
				<span>收货人</span>
				<input type="text" v-model.trim="addrDetail.contact" placeholder="请输入姓名" />
			</div>
			<div class="link-item">
				<span>联系电话</span>
				<input type="tel" v-model.trim="addrDetail.mobile" maxlength="11" placeholder="请输入联系电话" />
			</div>
			<div class="link-item">
				<span>身份证号</span>
				<input type="tel" v-model.trim="addrDetail.id_card" maxlength="18" placeholder="请输入身份证号" />
			</div>
			<div class="link-item">
				<span>所在地区</span>
				<div class="area-select">
					<select v-model="addrDetail.province" @change="changeProvince">
						<option disabled value="disabled">省份</option>
                        <option v-for="item in provinceList" :value="item.id">{{item.name}}</option>
                    </select>
                    <select v-model="addrDetail.city" @change="changeCity">
                        <option disabled value="disabled">城市</option>
                        <option v-for="item in cityList" :value="item.id">{{item.name}}</option>
                    </select>
                    <select v-model="addrDetail.district">
                        <option disabled value="disabled">县区</option>
                        <option v-for="item in areaList" :value="item.id">{{item.name}}</option>
                    </select>
				</div>
			</div>
			<textarea class="addr-detail" v-model.trim="addrDetail.address" placeholder="请填写详细地址"></textarea>
    	</div>
    	<div class="default-content">
    		<div class="left">
    			<p>设为默认地址</p>
    			<p class="tip">注：每次下单时会使用该地址</p>
    		</div>
    		<div class="right">
    			<mt-switch v-model="addrDetail.is_default"></mt-switch>
    		</div>
    		
    	</div>
		<div class="save" @click="updataAddr">保存</div>
    </div>
</template>

<script>
import qs from 'qs'
import { Toast, Indicator } from 'mint-ui'
export default {
	data() {
	    return {
			addressId: null,
			addrDetail: {},
			provinceList: [],
			provinceId: 0,
			cityList: [],
			cityId: 0,
			areaList: [],
			areaId: 0,
			disabledBtn: false
	    }
	},
	created() {
		this.addressId = this.$route.params.id
		Indicator.open()
		this.$api.detailAddr({
			id: this.addressId
		}).then(res => {
			if(res.ret == 1){
				Indicator.close()
				this.addrDetail = res
				this.addrDetail.is_default = (this.addrDetail.is_default ? true : false)
				this.getCity(1, 0)
				this.getCity(res.province, 1)
				this.getCity(res.city, 2)
			}
				
        }, err => {
        	
        })
	},
	methods: {
		getCity(id, index) {
			this.$api.cityList({
				parent_id: id
			}).then(res => { 
				if(index === 0) {
					this.provinceList = res	
				}else if(index === 1) {
					this.cityList = res
				}else if(index === 2) {
					this.areaList = res
				}
				
	        }, err => {
	        	
	        })
		},
		changeProvince() {
			this.$api.cityList({
				parent_id: this.addrDetail.province
			}).then(res => { 
				this.cityList = res
				this.addrDetail.city = res[0].id
				this.changeCity()
	        }, err => {
	        	
	        })
		},
		changeCity() {
			this.$api.cityList({
				parent_id: this.addrDetail.city
			}).then(res => { 
				this.areaList = res
				this.addrDetail.district = res[0].id
	        }, err => {
	        	
	        })
		},
		updataAddr() {
			if(this.disabledBtn) {
				return
			}
			this.disabledBtn = true
			this.$api.updataAddr({
				id:  this.addressId,
			    contact: this.addrDetail.contact,
			    mobile: this.addrDetail.mobile, 
			    id_card: this.addrDetail.id_card,
			    province: this.addrDetail.province,
			    city: this.addrDetail.city,  
			    district: this.addrDetail.district,
			    address:  this.addrDetail.address,
			    is_default: this.addrDetail.is_default ? 1 : 0
			}).then(res => {
				if(res.ret !== 1) {
					Toast({
					  message: res.msg,
					  position: 'bottom',
					  duration: 1000
					});
					return
				}
				Toast({
				  message: '修改成功',
				  position: 'middle',
				  iconClass: 'toast-icon icon-success',
				  duration: 1000
				})
				setTimeout(() => {
					this.$router.go(-1)
					this.disabledBtn = false
				},1200)
				
	        }, err => {
	        	this.disabledBtn = false
	        })
		}
	}
}
</script>

<style lang="scss" scoped>
.app{
	background: #f5f5f9;
	padding-top: 0.3rem;
} 
.user-info{
	background: #fff;
	padding-left: 0.3rem;
	.link-item{
		display: flex;
		height: 0.9rem;
		align-items: center;
		justify-content: space-between;
		padding-right: 0.3rem;
		border-bottom: 1px solid #f3f3f3;
		span{
			width: 1.9rem;
		}
		input{
			flex: 1;
		}
	}
	.addr-detail{
		width: 100%;
		height: 1.4rem;
		border: none;
		padding: 0.2rem 0.3rem 0.2rem 0;
	}
}
.default-content{
	background: #fff;
	margin-top: 0.3rem;
	display: flex;
	padding: 0.2rem 0.3rem;
	justify-content: space-between;
	align-items: center;
	.left{
		P{
			padding: 0.12rem 0;
		}
		.tip{
			color: #999;
			font-size: 0.24rem;
		}
	}
}
.save{
	position: fixed;
	width: 1.3rem;
	height: 0.92rem;
	right: 0;
	top: 0;
	line-height: 0.9rem;
	color: #fff;
	z-index: 60;
	text-align: center;
}
.area-select{
	flex: 1;
	text-align: right;
	display: flex;
}
.area-select select{
	width: 1.3rem;
	margin-right: 0.2rem;
	border: 0;
	outline: none;
	appearance: none;
	background: #fff;
	text-align: left;
	font-size: 0.28rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: middle;
	
}
.area-select select option{
	text-align: left;
}
</style>