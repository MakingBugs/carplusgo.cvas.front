<template>
  <div>
    <Table :disabled-hover="true" border width="100%" :columns="insuranceDetailcolumns" :data="detail"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'

class PageInsuranceDetailRequest extends PageRequest{
    insurancePolicyIds:Array<any>;
}

@Component({})
export default class InsuranceDetail extends AbpBase{
    @Prop({type:Number,default:null}) row:number;//传值
    pageInsuranceDetailRequest:PageInsuranceDetailRequest=new PageInsuranceDetailRequest();
    detail:any=[];

    created(){
        this.getInsureDetail(this.row);
    }
    async getInsureDetail(id){
            this.pageInsuranceDetailRequest.insurancePolicyIds=[id];
            await this.$store.dispatch({
                type:'insuranceDetail/getAll',
                data:this.pageInsuranceDetailRequest
            }).then(res=>{
                this.detail=res.items;
            })
        }
  insuranceDetailcolumns=[{
        title:'险种名称',
        render:(h:any,params:any)=>{
            return h('span',(!!params.row.insuranceType)?params.row.insuranceType.name:'')
        }
    },{
        title:'保险金额',
        key:'insuredAmount',
    },{
        title:'原价保费',
        key:'originalAmount',
    },{
        title:'签单保费',
        key:'transactionAmount',
    },{
        title:'不计免赔原价保费',
        key:'noDeductibleOriginalAmount',
    },{
        title:'不计免赔签单保费',
        key:'noDeductibleTransactionAmount',
    },{
        title:'返点金额',
        key:'rebateAmount',
    },{
        title:'额外返点金额',
        key:'extraRebateAmount',
    },{
        title:'备注',
        key:'remark',
    }]
}
</script>