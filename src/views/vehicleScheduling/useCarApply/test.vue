<template>
  <!--Begin-->
  <div>
    <Table border :columns="columns0" :data="data0">
      <template #qj="{row,index}">
        <Checkbox v-model="row.qj"></Checkbox>
      </template>

      <template #yssl="{row,index}">
        <Form class="tabform" :ref='"form1"+row.id' :model='row'>
          <FormItem prop="yssl" :rules='{required:true,message:"请输入应收数量！"}'>
            <InputNumber :disabled="row.ys==false? true:false" style="width:100%" :max="10" :min="0" v-model="row.yssl"></InputNumber>
          </FormItem>
        </Form>
      </template>

      <template #sssl="{row,index}">
        <Form class="tabform" :ref='"form2"+row.id' :model='row'>
          <FormItem prop="sssl" :rules='{required:true,message:"请输入实收数量！"}'>
            <InputNumber :disabled="row.ys==false? true:false" style="width:100%" :max="10" :min="0" v-model="row.sssl"></InputNumber>
          </FormItem>
        </Form>
      </template>

      <template #remark="{row,index}">
        <Form class="tabform" :ref='"form3"+row.id' :model="row">
          <FormItem prop="remark" :model="row" :rules='{required:true,message:"请输入备注！"}'>
            <Input :disabled="row.ys==false? true:false" style="width:100%" v-model='row.remark' placeholder=''/>
          </FormItem>
        </Form>
      </template>
    </Table>
    <input type="button" value="打印验证结果" @click="clg">
  </div>
  
  <!--End-->
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import publicclass from '../../../lib/publicclass'

@Component({})
export default class Warehouse extends AbpBase{
  //Test Demo------------------------------------------------------------------------------------------------
  columns0=[
    {
      title:'应收',
      align:'center',
      width:'60px',
      key:'ys',
      render:(h:any,params:any)=>{
        
        this.data0[params.index]=params.row;
        return h('Checkbox',{
            domProps:{
              value:params.row.ys
            },
            on:{
              'on-change':async (value)=>{
                this.data0[params.index].ys=value
                if(!value){
                  (this.$refs['form1'+params.row.id] as any).resetFields();
                  (this.$refs['form2'+params.row.id] as any).resetFields();
                  (this.$refs['form3'+params.row.id] as any).resetFields();
                }
              }
            }
          })
      }
    },
    {
      title: '缺件',
      align:'center',
      width:'65px',
      slot:'qj'
    },
    {
      title: '配件',
      align:'cente',
      key:'name'
    },
    {
      title: '应收数量',
      slot:'yssl',
    },
    {
      title: '实收数量',
      slot: 'sssl'
    },
    {
      title:'备注',
      slot:'remark'
    }
  ]

  data0=[
    {
      id:1,
      ys:false,
      qj:false,
      name:'工具包',
      yssl:null,
      sssl:null,
      remark:'',
    },
    {
      id:2,
      ys:false,
      qj:false,
      name:'千斤顶',
      yssl:null,
      sssl:null,
      remark:'',
    },
    {
      id:3,
      ys:false,
      qj:false,
      name:'行驶证',
      yssl:null,
      sssl:null,
      remark:'',
    },
    {
      id:4,
      ys:false,
      qj:false,
      name:'保险贴',
      yssl:null,
      sssl:null,
      remark:'',
    },
  ]
  async check(newdata){
    var res:any=[]
    await newdata.map(async x=>{
      var valid1:boolean=false
      var valid2:boolean=false
      var valid3:boolean=false
      await (this.$refs['form1'+x.id] as any).validate(async (valid:boolean)=>{
        valid1=valid
      });
      await (this.$refs['form2'+x.id] as any).validate(async (valid:boolean)=>{
        valid2=valid
      });
      await (this.$refs['form3'+x.id] as any).validate(async (valid:boolean)=>{
        valid3=valid
      })

      if(valid1&&valid2&&valid3){
        res.push({name:x.name,msg:'验证通过'})
      }else{
        res.push({name:x.name,msg:'验证未通过'})
      }
    })
    return res
  }

  async clg(){
    var newdata = this.data0.filter(x=>{
      return x.ys
    })
    var res = await this.check(newdata)
    console.log(res)
  }
}
</script>

<style lang="less">
.tabform{
  margin-bottom: -20px!important;
}
.tabform .ivu-form-item-error-tip{
  top: 5px;
  left: 50px;
}
</style>