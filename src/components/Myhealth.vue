<template>
  <section class="app">

    <Header title="我的健康"></Header>
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
        <div class="none-data" v-if="sex_name">请选择</div>
        <div class="right" v-if="!sex_name">
        	<select @change="change" v-model="sex" dir="rtl">
	            <option value="0">保密</option>
	            <option value="1">男</option>
	            <option value="2">女</option>
	        </select>
        </div>
	        
    </div>


    <div class="field has-right-arror" >
        <span>生日</span>
        <div v-if="birth_time" @click="openPicker">请选择</div>
        <div v-if="!birth_time" class="right"  @click="openPicker">
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
            <div class="deleteTag" v-show="item.deleteIcon" @click.stop="deleteTag(item.health_tag_id, index)"></div>
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
import { Popup } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast , Indicator} from 'mint-ui'
export default {
    data() {
        return {
            popupVisible:false,
            name: '',   //姓名
            weight: '', //体重
            height: '', //身高
            sex: '',    //性别
            birthPicker: '',      //生日
            relationship: [],  //关系
            HealthTag:[],      //常用健康标签
            aloneHealth:[], //新增疾病标签
            relationship_id:'',
            sex_name: true,
            birth_time: true,
            birth: '',
            id :'',
            startDate: new Date('1917-1-1'),
            endDate: new Date(),
            
            currTagId: null,
            currTagIndex: null,
            deleteShow: false
        }
    },
    created() {
                
        //获取标签接口
        Indicator.open()
        this.getComTag().then(res => {
	        	res.data.forEach((value) => {
	        		 let obj = {
	        		 	value: value,
	        		 	active: false
	        		 }
	        		 this.HealthTag.push(obj)
	        	})
        		return this.initData()
        }).then(res => {
        	  Indicator.close()
        	  this.birth = res.birthday
        	  this.birthPicker = res.birthday
            this.weight = parseInt(res.weight)
            this.height = parseInt(res.height)
            this.name = res.true_name
            this.sex = res.sex
            this.id = res.health_id
            this.relationship_id = res.relationship_id
            res.data.forEach((item) => {
            	let isCom = false
            	this.HealthTag.forEach((obj) => {
            		if(obj.value == item.name) {
            			isCom = true
            			obj.active = true
            			obj.hasDelete = true
            			obj.health_tag_id = item.health_tag_id
            			return
            		}
            	})
            	if(!isCom) {
            		item.deleteIcon = false
            		this.aloneHealth.push(item)
            	}
            	
            })
            if(res.sex){
                this.sex_name = false
            }
            if(res.birthday){
                this.birth_time = false
            }
        })
				setTimeout(() => {
					Indicator.close()
				},15000)
        //获取关系列表
        // this.$api.indexGetRelation().then(res => {
        //     this.relationship = res.form_relationship
        // }, err => {
            
        // })
        


        
    },
    methods: {
    		getComTag() {
    			return this.$api.indexHealthTag()
    		},
	    	initData() {
	    		return this.$api.indexDetailMy()
	    	},
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
        	if(!this.weight) {
        		Toast({
                message: '请输入体重',
                position: 'bottom',
                duration: 1000
            })
        		return
        	}
        	
	        let data = ''
	        this.HealthTag.forEach((item) => {
	        	if(item.active && !item.hasDelete) {
	        		data+=',' + item.value
	        	}
	        })
					data = data.substr(1)
	        this.$api.indexHealth({
                id: this.id,
                sex: this.sex,
                height: this.height,
                weight: parseInt(this.weight),
                true_name: this.name,
                birthday: this.birth,
                relationship_id: this.relationship_id,
                data: data
	        }).then(res => {
	            if(res.ret == 1) {
	                Toast({
	                    message: '保存成功',
	                    position: 'bottom',
	                    duration: 1000
	                })
	                setTimeout(() => {
	                    this.$router.go(-1)
	                },1200)
	            }else {
	                Toast({
	                    message: res.msg,
	                    position: 'bottom',
	                    duration: 1000
	                })
	            }
	            
	        }, err => {
	        	
	        })

        	
        },
        change() {
            this.sex_name = false
        },
        
        //打开生日选择器
        openPicker() {
            this.$refs.picker.open();
        },
        //点击生日选择器上的确定
        handleConfirm(value) {
        	console.log(this.birthPicker)
            this.birth_time = false
            this.birth  = value.getFullYear() + '-' + this.toTwo(value.getMonth() + 1) + '-' + this.toTwo(value.getDate())
            

        },
        toTwo(n) {
        	return n <10 ? '0' + n : n
        },
        //切换标签
        selectComTag(item){
        	if(item.hasDelete) {
        		this.$api.indexDeleteHealthTag({
		            health_tag_id: item.health_tag_id,
		            health_id: this.id
            }).then(res => {
                if(res.ret == 1) {
                	item.hasDelete = false
                	item.health_tag_id = undefined
                	item.active = !item.active
                }
            }, err => {
                
            })
        	}else {
        		item.active = !item.active
        	}
        	
        },
        //删除标签
        deleteTag_show(item) {
            item.deleteIcon = !item.deleteIcon
        },
        tagDelete() {
        	  this.$api.indexDeleteHealthTag(
                {
                    health_tag_id: this.currTagId,
                    health_id: this.id
                }
            ).then(res => {
                if(res.ret == 1) {
                	this.aloneHealth.splice(this.currTagIndex, 1)
                }
            }, err => {
                
            })
        },
        deleteTag(id, index) {
            this.currTagId = id
            this.currTagIndex = index
            this.deleteShow = true 
        },
        //添加疾病标签
        add_label() {
            const self = this
            
            MessageBox.prompt('请输入慢性病').then(({ value, action }) => {
                this.$api.indexAddHealthTag(
                    {
                        health_id: this.id,
                        name: value
                    }
                ).then(res => {
                    if(res.ret == 1) {
                        this.initData().then(res => {
                        		this.aloneHealth = []
								            res.data.forEach((item) => {
								            	let isCom = false
								            	this.HealthTag.forEach((obj) => {
								            		if(obj.value == item.name) {
								            			isCom = true
								            			obj.active = true
								            			obj.hasDelete = true
								            			obj.health_tag_id = item.health_tag_id
								            			return
								            		}
								            	})
								            	if(!isCom) {
								            		item.deleteIcon = false
								            		this.aloneHealth.push(item)
								            	}
								            })
								        }, err => {
								            
								        })
                    }
                }, err => {
                    
                })
            }, err => {
                
            })
        }

    }

}
</script>

<style lang="scss" scoped>
.app{
    
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
	padding-right: 0.6rem;
}
.field.has-right-arror:after{
	content: '';
	position: absolute;
	right: 0.3rem;
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
    padding: 0 .3rem;
    font-weight: 100;
    background-color: #fff;
    position: relative;
    border-bottom: solid 1px #f5f5f9;
    .input{
        /*height: 100%;*/
        width: 4rem;
        text-align: right;
        font-size: .28rem;
    }
    .input.has-unit{
    	/*margin-right: 0.4rem;*/
    	padding-right: 0.5rem;
    }
    .unit{
    	position: absolute;
    	right: 0.4rem;
    	width: 0.3rem;
    	top: 50%;
    	transform: translateY(-50%);
    }
    hr{
        position: absolute;
        border-top: solid .01rem #eee;
        width: 100%;
        bottom: 0;
        margin: 0 auto;
    }
    div.none-data{
        text-align: right;
        width: 3rem;
        padding-right: .24rem;
        color: #ddd;
        font-size: .28rem;
        font-weight: 100;
    }
    .right{
    	width: 4rem;
    	justify-content: flex-end;
    	display: flex;
    	align-items: center;
    }
    .right select{
    	width: 3rem;
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