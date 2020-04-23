<template>
  <div>
    <Divider orientation="left">车辆外观</Divider>
    <Row type="flex" justify="start">
      <Col span="24">
        <Button type="primary" style="width:90px;margin:4px 0" @click="ShowCarAppearance=true">新增</Button>
      </Col>
    </Row>
    <Table :columns="AppearanceHeader" border :data="Appearancelist"></Table>
    <Divider orientation="left">随车配件</Divider>
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
    <Divider orientation="left">随车证件</Divider>
    <Table border :columns="columns1" :data="data1">
      <template #qj="{row,index}">
        <Checkbox v-model="row.qj"></Checkbox>
      </template>

      <template #yssl="{row,index}">
        <Form class="tabform" :ref='"forma"+row.id' :model='row'>
          <FormItem prop="yssl" :rules='{required:true,message:"请输入应收数量！"}'>
            <InputNumber :disabled="row.ys==false? true:false" style="width:100%" :max="10" :min="0" v-model="row.yssl"></InputNumber>
          </FormItem>
        </Form>
      </template>

      <template #sssl="{row,index}">
        <Form class="tabform" :ref='"formb"+row.id' :model='row'>
          <FormItem prop="sssl" :rules='{required:true,message:"请输入实收数量！"}'>
            <InputNumber :disabled="row.ys==false? true:false" style="width:100%" :max="10" :min="0" v-model="row.sssl"></InputNumber>
          </FormItem>
        </Form>
      </template>

      <template #remark="{row,index}">
        <Form class="tabform" :ref='"formc"+row.id' :model="row">
          <FormItem prop="remark" :model="row" :rules='{required:true,message:"请输入备注！"}'>
            <Input :disabled="row.ys==false? true:false" style="width:100%" v-model='row.remark' placeholder=''/>
          </FormItem>
        </Form>
      </template>
    </Table>
    <Divider orientation="left">上传出还车确认表</Divider>
    <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击此处上传文件</p>
        </div>
    </Upload>

    <CarAppearance v-model="ShowCarAppearance"></CarAppearance>
  </div>
</template>

<script lang="ts">
  import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
  import Util from '@/lib/util'
  import AbpBase from '@/lib/abpbase'
  import PageRequest from '@/store/entities/page-request'
  import publicclass from '@/lib/publicclass'
  import CarAppearance from './carappearance.vue'
  
  @Component({
      components:{CarAppearance}
  })
  export default class extends AbpBase{

    ShowCarAppearance:boolean=false;
    Form={

    }

    AppearanceHeader=[//车辆外观表头
      {
        type: 'index',
        width: 60,
        align: 'center'
      },{
        title:'车辆部位',
        align: 'center',
        tooltip:true,
        key:'a'
      },{
        title:'状态',
        align: 'center',
        tooltip:true,
        key:'b'
      },{
        title:'备注',
        align: 'center',
        tooltip:true,
        key:'c'
      },{
        title:'维护',
        width:100,
        align: 'center',
        render:(h:any,params:any)=>{
          return h('div',[
            h('Button',{
              style:{
                width:"100%"
              },
              props:{
                type:'primary',
              },
              on:{
                click:()=>{

                }
              }
            },'维护')
          ])
        }
      },{
        title:'删除',
        width:100,
        align: 'center',
        render:(h:any,params:any)=>{
          return h('div',[
            h('Button',{
              style:{
                width:"100%"
              },
              props:{
                type:'error',
              },
              on:{
                click:()=>{

                }
              }
            },'删除')
          ])
        }
      }
    ]
    Appearancelist=[
      {
        a:'前保险杆',
        b:'凹',
        c:'无'
      },{
        a:'引擎盖',
        b:'擦伤(刮伤)',
        c:'哈哈哈'
      }
    ]//车辆外观列表

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
      align:'center',
      key:'name'
    },
    {
      title: '应收数量',
      align:'center',
      slot:'yssl',
    },
    {
      title: '实收数量',
      align:'center',
      slot: 'sssl'
    },
    {
      title:'备注',
      align:'center',
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

  columns1=[
    {
      title:'应收',
      align:'center',
      width:'60px',
      key:'ys',
      render:(h:any,params:any)=>{
        
        this.data1[params.index]=params.row;
        return h('Checkbox',{
            domProps:{
              value:params.row.ys
            },
            on:{
              'on-change':async (value)=>{
                this.data1[params.index].ys=value
                if(!value){
                  (this.$refs['forma'+params.row.id] as any).resetFields();
                  (this.$refs['formb'+params.row.id] as any).resetFields();
                  (this.$refs['formc'+params.row.id] as any).resetFields();
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
      align:'center',
      key:'name'
    },
    {
      title: '应收数量',
      align:'center',
      slot:'yssl',
    },
    {
      title: '实收数量',
      align:'center',
      slot: 'sssl'
    },
    {
      title:'备注',
      align:'center',
      slot:'remark'
    }
  ]

  data1=[
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
      var valid4:boolean=false
      var valid5:boolean=false
      var valid6:boolean=false
      await (this.$refs['form1'+x.id] as any).validate(async (valid:boolean)=>{
        valid1=valid
      });
      await (this.$refs['form2'+x.id] as any).validate(async (valid:boolean)=>{
        valid2=valid
      });
      await (this.$refs['form3'+x.id] as any).validate(async (valid:boolean)=>{
        valid3=valid
      })
      await (this.$refs['forma'+x.id] as any).validate(async (valid:boolean)=>{
        valid4=valid
      });
      await (this.$refs['formb'+x.id] as any).validate(async (valid:boolean)=>{
        valid5=valid
      });
      await (this.$refs['formc'+x.id] as any).validate(async (valid:boolean)=>{
        valid6=valid
      })

      if(valid1&&valid2&&valid3&&valid4&&valid5&&valid6){
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
  }
}
</script>

<style lang="less">
.readonly{
  background-color: #EEEEEE!important;
  text-align: center;
}

.tabform{
  margin-bottom: -20px!important;
}
.tabform .ivu-form-item-error-tip{
  top: 5px;
  left: 280px;
}
</style>