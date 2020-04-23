<template>
  <div>
    <Table :disabled-hover="true" border width="100%" :columns="carFixItemcolumns" :data="row.carFixItem"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'

class PageItemCodeRequest extends PageRequest{
    maxResultCount=10000
    skipCount=0
    itemTypes:Array<number>
}

@Component({})
export default class CarFixItem extends AbpBase{
    @Prop({type:Object,default:null}) row:object;//传值
    pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
    detail:any=[];
    newItemList:any=[];

    carFixItemcolumns=[{
            title:'零件名称',
            key:'itemName',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':params.row.itemName)
            }
        },{
            title:'数量',
            key:'itemCount',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':params.row.itemCount)
            }
        },{
            title:'单价',
            key:'itemAmount',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':params.row.itemAmount)
            }
        },{
            title:'材料类别',
            key:'itemTypeD',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':params.row.itemTypeD);
            }
        },{
            title:'小计',
            key:'totalAmount',
            render:(h:any,params:any)=>{
                return h('span',params.row.itemAmount*params.row.itemCount)
            }
        },{
            title:'备注',
            key:'memo',
            render:(h:any,params:any)=>{
                return h('span',params.row==null?'':params.row.memo)
            }
    }]

    
}
</script>