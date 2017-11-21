<template>
    <div class="app">
        <Header title="充值"></Header>
		<div class="recharge-content">
			<div class="recharge-select">
				<div class="recharge-item" :class="{'active': item.active}" v-for="(item, index) in rechargeData" :key="index" @click="changeRecharge(item.value)">
					{{item.value}}元
				</div>
				<div class="recharge-item" :class="{'active': otherStatus}" @click="changeOther">
					其他金额
				</div>
			</div>
			<div class="recharge-amount">
				充值金额： &yen;
				<input type="tel" ref="Input" @input="editRechargeNum" @focus="otherRecharge" v-model="recharge" maxlength="8" />
			</div>
		</div>
		<p class="tip">温馨提示：您可以在线进行充值，线下到指定药店办理会员卡</p>
        <div class="btn-default btn-hover pay-wx" @click="payWx">微信支付</div>
        <div class="btn-default btn-hover pay-ali" v-if="!isWx">支付宝支付</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
            	isWx: this.$common.isWeixin(),
            	
                rechargeData: [{
                	value: 50,
                	active: true
                },{
                	value: 100,
                	active: false
                },{
                	value: 200,
                	active: false
                },{
                	value: 500,
                	active: false
                },{
                	value: 1000,
                	active: false
                }],
                recharge: 50,
                otherStatus: false,
                
                disabledBtn: false
            }
        },
        created() {
            
            
        },
        methods: {
            changeRecharge(value){
            	this.otherStatus = false
            	this.recharge = value
            	this.rechargeData.forEach((item) => {
            		item.active = item.value == value
            	})
            },
            otherRecharge() {
            	this.changeRecharge('')
            	this.otherStatus = true
            	
            },
            changeOther() {
            	this.$refs.Input.focus()
            },
            editRechargeNum() {
				if (!/^[1-9]\d*$/.test(this.recharge)) {				
	                this.recharge = this.recharge.replace(/^0|\D+/g,'')            
	            }
			},
			payWx() {
				if(!parseFloat(this.recharge)) {
					Toast({
					  message: '请选择充值金额',
					  position: 'bottom',
					  duration: 1500
					});
					return
				}
				if(this.disabledBtn) {
					return
				}
				this.disabledBtn = true
				this.$api.recharge({
					money: parseFloat(this.recharge)
				}).then(res => {
					if(res.ret == 1) {
						this.disabledBtn = false
						window.location.href = this.$store.state.back_uri + 'api/Payment/getCode/order_id/' + res.order_no
					}
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
	padding-bottom: 1rem;
} 
.recharge-content{
	background: #fff;
	.recharge-select{
		padding: 0.3rem 0.15rem;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid #f6f6f6;
		.recharge-item{
			width: 2.1rem;
			height: 0.9rem;
			border: 1px solid #ddd;
			text-align: center;
			line-height: 0.86rem;
			border-radius: 0.08rem;
			color: #333;
			margin: 0.15rem;
			font-weight: 700;
		}
		.recharge-item.active{
			color: #3cafb6;
			border-color: #3cafb6;
			
		}
	}
	.recharge-amount{
		padding: 0.3rem;
	}
} 
.tip{
	color: #999;
	padding: 0.3rem;
	font-size: 0.24rem;
}
.pay-wx{
	background: #4fb21a;
	margin-top: 0.8rem;
}
.pay-ali{
	background: #2099df;
	margin-top: 0.8rem;
}
</style>