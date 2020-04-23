<template>
  <div>
    <!-- <Row class="expand-row">
        <Col span="4">
            <span class="expand-key">发票代码: </span>
            <span class="expand-value">{{ row.invCode }}</span>
        </Col>
        <Col span="4">
            <span class="expand-key">发票号码: </span>
            <span class="expand-value">{{ row.invNo }}</span>
        </Col>
        <Col span="4">
            <span class="expand-key">发票日期: </span>
            <span class="expand-value">{{ row.invDt }}</span>
        </Col>
        <Col span="4">
            <span class="expand-key">发票类别: </span>
            <span class="expand-value">{{ row.invTypeName }}</span>
        </Col>
        <Col span="4">
            <span class="expand-key">发票金额: </span>
            <span class="expand-value">{{ row.amount }}</span>
        </Col>
    </Row>
    <Row class="expand-row">
        <Col span="4">
            <span class="expand-key">保养厂: </span>
            <span class="expand-value">{{ row.supplier.sname }}</span>
        </Col>
        <Col span="4">
            <span class="expand-key">公司别: </span>
            <span class="expand-value">{{ row.incName }}</span>
        </Col>
        <Col span="4">
            <span class="expand-key">车号: </span>
            <span class="expand-value">{{ row.makNo }}</span>
        </Col>
        <Col span="4">
            <span class="expand-key">批号: </span>
            <span class="expand-value">{{ row.carFixBatchTno }}</span>
        </Col>
        <Col span="4">
            <span class="expand-key">收款人: </span>
            <span class="expand-value">{{ row.accountName }}</span>
        </Col>
    </Row> -->
    <Table :disabled-hover="true" border width="100%" :columns="header" :data="row.prinv"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import AbpBase from '@/lib/abpbase'

@Component({})
export default class Order extends AbpBase{
  @Prop({type:Object,default:null}) row:object;//传值

  header=[{
            align: 'center',
            title: '发票代码',
            key:'invCode',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':params.row.invCode)
            }
        },{
            align: 'center',
            title: '发票号码',
            key:'invNo',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':params.row.invNo)
            }
        },{
            align: 'center',
            title: '发票日期',
            key:'invDt',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':new Date(params.row.invDt).toLocaleDateString())
            }
        },{
            align: 'center',
            title: '发票类别',
            render:(h:any,params:any)=>{
                var invType="";
                if(params.row==null){
                    return h('span','')
                }
                else{
                    if(params.row.invType==1){
                        invType="普票"
                    }else if(params.row.invType==2){
                        invType="增票"
                    }
                    return h('span',invType)
                }
            }
        },{
            align: 'center',
            title: '发票金额',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':params.row.amount)
            }
        },{
            align: 'center',
            title: '保养厂',
            render:(h:any,params:any)=>{
                return h('span',params.row.supplier==null?'':params.row.supplier.sname)
            }
        },{
            align: 'center',
            title: '公司别',
            render:(h:any,params:any)=>{
                return h('span',params.row.inc==null?'':params.row.inc.sname)
            }
        },{
            align: 'center',
            title: '收款人',
            key:'accountName',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':params.row.accountName)
            }
        }]
}
</script>

<style lang="less" scoped>
.expand-row{
    margin-bottom: 16px;
    margin-left: 100px;
}
</style>