<template>
  <section class="health">

    <Header title="添加亲属"></Header>
    <div class="save" @click="save">保存</div>

    <div class="datum">
        <span>基本资料</span>
    </div>
    
    <div class="field">
        <label for="name">姓名</label>
        <input class="input" type="text" name="name" placeholder="请输入姓名"  v-model="name">
    </div>
   
    <div class="field has-right-arror">
        <span>性别</span>
        <div class="right">
        	<select v-model="sex" dir="rtl">
        		<option disabled value="disabled">请选择</option>
	            <option value="0">保密</option>
	            <option value="1">男</option>
	            <option value="2">女</option>
	        </select>
        </div>
	        
    </div>
    <div class="field has-right-arror">
        <span>关系</span>
        <div class="right">
        	<select v-model="relationship_id" dir="rtl">
        		<option disabled value="disabled">请选择</option>
	            <option v-for="item in relationship" :value="item.value">{{item.text}}</option>
	        </select>
        </div>
	        
    </div>


    <div class="field has-right-arror" >
        <span>生日</span>
        <div class="right"  @click="openPicker">
        	<div class="birth">{{birth}}</div>
        </div>
	       <mt-datetime-picker
	            ref="picker"
	            v-model="birthPicker"
	            type="date"
	            year-format="{value} 年"
	            month-format="{value} 月"
	            date-format="{value} 日"
	            :startDate="startDate"
	            :endDate="endDate"
	            @confirm="handleConfirm">
	        </mt-datetime-picker> 
    </div>

    <div class="field">
        <label >身高(cm)</label>
        <input class="input" @input="editHeight" type="tel" placeholder="请输入身高"  v-model="height">
    </div>

    <div class="field" style="border:none;">
        <label >体重(kg)</label>
        <input class="input" @input="editWeight" type="tel"  placeholder="请输入体重"  v-model="weight">
    </div>

    <div class="datum">
        <span>健康状况</span>
    </div>

    <div class="condition">
        <div class="illness" :class="{'active': item.active}"  v-for="(item,index) in HealthTag" :key="index"  @click="selectComTag(item)">{{item.value}}</div>

        <div class="illness active" v-for="(item, index) in aloneHealth" :key="index" @click="deleteTag_show(item)">
            {{item.name}}
            <div class="deleteTag" v-show="item.deleteIcon" @click.stop="deleteTag(index)"></div>
        </div>
        <div class="add_illness" @click="add_label">+添加</div>
    </div>


		<confirm-modal 
			:show="deleteShow" 
			@confirm_modal="tagDelete" 
			@closeModal="deleteShow = false" 
			message="确定删除该健康状况?">
		</confirm-modal>	
  </section>
</template>

<script>
import $ from 'jquery';
import { DatetimePicker } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            name: '',   //姓名
            weight: '', //体重
            height: '', //身高
            sex: 'disabled',    //性别
            birthPicker: new Date(),      //生日
            
            HealthTag:[],      //常用健康标签
            aloneHealth:[], //新增疾病标签
            relationship: [],  //关系
            relationship_id:'disabled',
            birth: '请选择',
            startDate: new Date(new Date().setFullYear(new Date().getFullYear()-80,0,1)),
            endDate: new Date(),
            
            currTagIndex: null,
            deleteShow: false,
            
            disabledBtn: false
        }
    },
    created() {
        const self = this       
        //获取标签接口
        this.$api.indexHealthTag().then(res => {
        	res.data.forEach((value) => {
        		 let obj = {
        		 	value: value,
        		 	active: false
        		 }
        		 this.HealthTag.push(obj)
        	})
        }, err => {
            
        })

        //获取关系列表
        this.$api.indexGetRelation().then(res => {
            let optionDom = $(res.form_relationship).children('option')
            optionDom.each(function () {
                self.relationship.push({ value: $(this).val(), text: $(this).text() })
            })
            
        }, err => {
            
        })
        


        
    },
    methods: {
		editHeight() {
			if(!/^[1-9]\d*$/.test(this.height)) {				
	            this.height = this.height.replace(/^0|\D+/g,'')            
	        }
		},
		editWeight() {
			if(!/^[1-9]\d*$/.test(this.weight)) {				
	            this.weight = this.weight.replace(/^0|\D+/g,'')            
	        }
		},
        //保存健康档案
        save(){
        	if(!this.name) {
        		Toast({
	                message: '请输入姓名',
	                position: 'bottom',
	                duration: 1000
	            })
        		return
        	}
        	if(this.sex === 'disabled') {
        		Toast({
	                message: '请选择性别',
	                position: 'bottom',
	                duration: 1000
	            })
        		return
        	}
        	if(this.relationship_id === 'disabled') {
        		Toast({
	                message: '请选择亲属关系',
	                position: 'bottom',
	                duration: 1000
	            })
        		return
        	}
        	if(this.birth === '请选择') {
        		Toast({
	                message: '请选择生日',
	                position: 'bottom',
	                duration: 1000
	            })
        		return
        	}
        	if(!this.height) {
        		Toast({
	                message: '请输入身高',
	                position: 'bottom',
	                duration: 1000
	            })
        		return
        	}
        	if(!this.weight) {
        		Toast({
	                message: '请输入体重',
	                position: 'bottom',
	                duration: 1000
	            })
        		return
        	}
        	if(this.disabledBtn) {
						return
					}
					this.disabledBtn = true
	        let data = ''
	        this.HealthTag.forEach((item) => {
	        	if(item.active) {
	        		data+=',' + item.value
	        	}
	        })
	        this.aloneHealth.forEach((item) => {
	        	data+=',' + item.name
	        })
			data = data.substr(1)
	        this.$api.indexHealthCreate({
                sex: this.sex,
                height: this.height,
                weight: parseInt(this.weight),
                true_name: this.name,
                birthday: this.birth,
                relationship_id: this.relationship_id,
                is_my: 0,
                data: data
	        }).then(res => {
	            if(res.ret == 1) {
	                Toast({
									  message: '添加成功',
									  position: 'middle',
									  iconClass: 'toast-icon icon-success',
									  duration: 1000
									})
	                setTimeout(() => {
	                    this.$router.go(-1)
	                    this.disabledBtn = false
	                },1300)
	            }
	        }, err => {
	        	 this.disabledBtn = false
	        })

        	
        },
        //打开生日选择器
        openPicker() {
            this.$refs.picker.open();
        },
        //点击生日选择器上的确定
        handleConfirm(value) {
            this.birth  = value.getFullYear() + '-' + this.toTwo(value.getMonth() + 1) + '-' + this.toTwo(value.getDate())
            

        },
        toTwo(n) {
        	return n <10 ? '0' + n : n
        },
        //切换标签
        selectComTag(item){
        	item.active = !item.active
        },
        //删除标签
        deleteTag_show(item) {
            item.deleteIcon = !item.deleteIcon
        },
        tagDelete() {
        	this.aloneHealth.splice(this.currTagIndex, 1)
        },
        deleteTag(index) {
            this.currTagIndex = index
            this.deleteShow = true 
        },
        //添加疾病标签
        add_label() {
            const self = this
            
            MessageBox.prompt('请输入慢性病').then(({ value, action }) => {
            	let hasHealth = false
            	this.aloneHealth.forEach((item) => {
            		if(item.name == value) {
            			hasHealth = true
            			Toast({
		                    message: '该疾病已存在',
		                    position: 'bottom',
		                    duration: 1000
		                })
            			return
            		}
            	})
            	this.HealthTag.forEach((item) => {
            		if(item.value == value) {
            			hasHealth = true
            			Toast({
		                    message: '该疾病已存在',
		                    position: 'bottom',
		                    duration: 1000
		                })
            			return
            		}
            	})
            	if(hasHealth) {
            		return
            	}
                let obj = {
        		 	name: value,
        		 	deleteIcon: false
        		}
                this.aloneHealth.push(obj)
            }, err => {
                
            })
        }

    }

}
</script>

<style lang="scss" scoped>
.health{
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
    position: relative;
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
.datum{
    width: 100%;
    height: .88rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 .34rem;
    font-weight: 100;
    color: #999;
}
.field.has-right-arror{
	padding-right: 0.5rem;
}
.field.has-right-arror:after{
	content: '';
	position: absolute;
	right: 0.2rem;
	top: 50%;
	margin-top: -0.25rem;
	width: 0.2rem;
	height: 0.5rem;
	background: url(../../static/images/45@3x.png) no-repeat center;
	background-size: 80%;
}
.field{
    width: 100%;
    height: .88rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem 0 0.3rem;
    font-weight: 100;
    background-color: #fff;
    position: relative;
    border-bottom: solid 1px #f5f5f9;
    padding-right: 0.5rem;
    .input{
        /*height: 100%;*/
        width: 4rem;
        text-align: right;
        font-size: .28rem;
    }
    hr{
        position: absolute;
        border-top: solid .01rem #eee;
        width: 100%;
        bottom: 0;
        margin: 0 auto;
    }
    .right{
    	width: 4rem;
    	justify-content: flex-end;
    	display: flex;
    	align-items: center;
    }
    .right select{
    	width: 100%;
    }
}

input::-webkit-input-placeholder{
        color: #ddd;
        font-size: .28rem;
        font-weight: 100;
}
.condition{
    background-color: #fff;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0.15rem;
}
.condition>div{
	margin: 0.15rem 0.2rem;
	min-width: 2rem;
}
.illness{
    border: solid 1px #efefef;
    color: #999;
    background-color: #efefef;
    text-align: center;
    line-height: .58rem;
    border-radius: 5px;
    margin:.2rem .3rem;
    position: relative;
    padding: 0 0.15rem;
    
}
.illness.active{
	border: solid 1px #3cafb6;
	background-color: #fff;
	color: #3cafb6;
}

.add_illness{
    height: .58rem;
    border: dashed 1px #ddd;
    border-radius: 5px;
    margin: .2rem .3rem;
    text-align: center;
    line-height: .58rem;
    color: #ddd; 
}
.deleteTag{
    position: absolute;
    width: .36rem;
    height: .36rem;
    background: url('../../static/images/29@3x.png') no-repeat center;
    background-size: 50%;
    right: -.14rem;
    top: -.14rem;
    background-color: #ccc;
    border-radius: 50%;
}

</style>