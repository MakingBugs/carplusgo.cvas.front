<template>
    <div>
        <Modal
         fullscreen
         :title="'保险信息'"
         :value="value"
         :carbaseId="carbaseId"
         :caseTimeCXLP="caseTimeCXLP"
         @on-visible-change="visibleChange"
        >
        <Form ref="insurancePolicyForm"  label-position="top">
            <Row>
                <Col>
                    <h2>保单信息</h2>
                    <div>
                        <Table :columns="insurancePolicycolumns" :no-data-text="L('NoDatas')" border :data="insurancePolicyList"></Table>
                    </div>
                </Col>
            </Row>
        </Form>            
            <div slot="footer">
                <Button @click="cancel">{{'关闭'}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import InsuranceDetail from './insuranceDetail.vue'

    class PageInsurancePolicyRequest extends PageRequest{
        carBaseIds:Array<any>;
    }

    @Component({
        components:{InsuranceDetail}
    })
    export default class InfoInsurancePolicy extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Number,default:0}) carbaseId:number;
        @Prop({type:String,default:''}) caseTimeCXLP:string;
        pageInsurancePolicyRequest:PageInsurancePolicyRequest=new PageInsurancePolicyRequest();
        insurancePolicyList:any=[];
        insurelist:any=[];
        cancel(){
            (this.$refs.insurancePolicyForm as any).resetFields();
            this.insurancePolicyList=[];
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.insurancePolicyList=[];
                this.$emit('input',value);
            }else{
                this.getInsure(this.carbaseId,this.caseTimeCXLP);
            }
        }
        async getInsure(id,caseTime){//根据车号和出险时间查保险，在保险期间则显示，否则不显示
            this.insurelist=[];
            if(id!=0&&id!=null&&id!=undefined){
                if(caseTime==''){//查看车籍保险（全部的保险，不包括退保的）
                    this.pageInsurancePolicyRequest.carBaseIds=[id];
                    await this.$store.dispatch({
                        type:'insurancePolicy/getAll',
                        data:this.pageInsurancePolicyRequest
                    }).then(res=>{
                        if(res.items.length>0){
                            res.items.map(i=>{
                                if(new Date(i.endTime)<new Date() || i.insurancePolicyStatus===1){

                                }else{
                                    this.insurelist.push(i);
                                }
                            })
                            this.insurancePolicyList=this.insurelist;
                        }else{
                            this.insurancePolicyList=[];
                        }
                    })
                }else{//车险理赔 查看保单（出险在保险期内的保险）
                    this.pageInsurancePolicyRequest.carBaseIds=[id];
                    await this.$store.dispatch({
                        type:'insurancePolicy/getAll',
                        data:this.pageInsurancePolicyRequest
                    }).then(res=>{
                        if(res.items.length>0){
                            res.items.map(i=>{
                                if(new Date(i.endTime)<new Date() || i.insurancePolicyStatus===1){

                                }else{
                                    if(new Date(new Date(caseTime).toLocaleDateString())<=new Date(new Date(i.endTime).toLocaleDateString())&&
                                    new Date(new Date(caseTime).toLocaleDateString())>=new Date(new Date(i.startTime).toLocaleDateString())){
                                        this.insurelist.push(i);
                                    }
                                }
                            })
                            this.insurancePolicyList=this.insurelist;
                        }else{
                            this.insurancePolicyList=[];
                        }
                    })
                }
            }else{
                this.insurancePolicyList=[];
            }
        }
        insurancePolicycolumns=[{
                type: 'expand',
                width:50,
                align: 'center',
                fixed: 'left',
                tooltip:true,
                render: (h, params) => {
                    return h(InsuranceDetail, {
                        props: {
                            row: params.row.id
                        }
                    })
                }
            },{
                title:'保险单号',
                key:'insuranceNum',
            },{
                title:'保险公司',
                render:(h:any,params:any)=>{
                    return h('span',params.row.supplier==null?'':params.row.supplier.sname)
                }
            },{
                title:'保单类别',
                render:(h:any,params:any)=>{
                    var text='';
                    if(params.row.insurancePolicyType==0){
                        text='交强险';
                    }else if(params.row.insurancePolicyType==1){
                        text='商业险';
                    }else if(params.row.insurancePolicyType==2){
                        text='承运人责任险';
                    }
                    return h('span',text);
                }
            },{
                title:'保险合同类型',
                render:(h:any,params:any)=>{
                    var text='';
                    if(params.row.insuranceContractType==0){
                        text='新保';
                    }else if(params.row.insuranceContractType==1){
                        text='续保';
                    }
                    return h('span',text);
                }
            },{
                title:'保险开始日期',
                render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.startTime).toLocaleDateString());
                }
            },{
                title:'保险结束日期',
                render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.endTime).toLocaleDateString());
                }
            },{
                title:'交强险返点（%）',
                key:'compulsoryInsuranceRebateRate',
            },{
                title:'商业险返点（%）',
                key:'commercialInsuranceRebateRate',
            },{
                title:'承运人责任险返点（%）',
                key:'carrierLiabilityInsuranceRebateRate',
            },{
                title:'额外返点（%）',
                key:'extraRebateRate',
            }]
    }

</script>