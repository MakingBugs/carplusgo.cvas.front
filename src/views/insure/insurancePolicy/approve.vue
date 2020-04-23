<template>
    <div>
        <Modal
         title="送签"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="approveForm"  label-position="top" :rules="approveRule" :model="approveRequest">
                <FormItem label="送签类别" prop="insuranceApprovalType">
                    <Select v-model="approveRequest.insuranceApprovalType">
                        <Option :value=0>暂借</Option>
                        <Option :value=1>请款</Option>
                        <Option :value=2>销账</Option>
                        <Option :value=3>返利开票</Option>
                        <Option :value=4>保险变更</Option>
                    </Select>
                </FormItem>
                <FormItem label="发票类别" prop="insuranceInvoiceType" v-if="hasInvoice">
                    <Select v-model="approveRequest.insuranceInvoiceType">
                        <Option :value=0>普通发票</Option>
                        <Option :value=1>增值税发票</Option>
                    </Select>
                </FormItem>
                <FormItem label="发票号码" prop="invoiceNumber" v-if="hasInvoice">
                    <Input v-model="approveRequest.invoiceNumber" :maxlength="50"/>
                </FormItem>
                <FormItem label="发票代码" prop="invoiceCode" v-if="hasInvoice">
                    <Input v-model="approveRequest.invoiceCode" :maxlength="50"/>
                </FormItem>
                <FormItem label="发票抬头" prop="invoiceName" v-if="needInvoice">
                    <Input v-model="approveRequest.invoiceName" :maxlength="50"/>
                </FormItem>
                <FormItem label="纳税人识别号" prop="taxpayerIdentificationNumber" v-if="needInvoice">
                    <Input v-model="approveRequest.taxpayerIdentificationNumber" :maxlength="50"/>
                </FormItem>
                <FormItem label="单位地址" prop="address" v-if="needInvoice">
                    <Input v-model="approveRequest.address" :maxlength="50"/>
                </FormItem>
                <FormItem label="电话号码" prop="telephone" v-if="needInvoice">
                    <Input v-model="approveRequest.telephone" :maxlength="50"/>
                </FormItem>
                <FormItem label="开户银行类别" prop="bankType" v-if="needInvoice">
                    <Select v-model="approveRequest.bankType" filterable @on-change="bankTypeChange">
                        <Option v-for="item in bankTypeList" :key="item.id" :value="item.id">{{item.bankNameT}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="开户银行" prop="bank" v-if="needInvoice">
                    <Select v-model="approveRequest.bank" placeholder="输入银行关键字" filterable remote :remote-method="getBank" :loading="bankLoading">
                        <Option v-for="item in bankList" :key="item.id" :value="item.bankName">{{item.bankName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="银行账户" prop="bank" v-if="needInvoice">
                    <Input v-model="approveRequest.bankAccount" :maxlength="50"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    class ApproveRequest {
        insurancePolicyIds:Array<any>=[];
        insuranceApprovalType:Number=0;
        insuranceInvoiceType:Number=0;
        invoiceNumber:string="";
        invoiceCode:string="";
        invoiceName:string="";
        taxpayerIdentificationNumber:string="";
        address:string="";
        telephone:string="";
        bankType:number=null;
        bank:string="";
        bankAccount:string="";
    }
    class PagesBankTypeRequest extends PageRequest{//银行类型
        maxResultCount=10000;
        skipCount=0;
    }
    class PagesBankDetailRequest extends PageRequest{//支行
        maxResultCount=10000;
        skipCount=0;
        keyword:string='';
        bankType:number=null;
    }
    @Component({})
    export default class Approve extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Array,default:[]}) data:Array<any>;
        bankTypeRequest:PagesBankTypeRequest=new PagesBankTypeRequest();
        bankDetailRequest:PagesBankDetailRequest=new PagesBankDetailRequest();
        approveRequest:ApproveRequest = new ApproveRequest();
        bankTypeList:Array<any>=[];
        bankList:Array<any>=[];
        bankLoading:Boolean=false;
        get hasInvoice(){
            return this.approveRequest.insuranceApprovalType===1 || this.approveRequest.insuranceApprovalType===2
        }
        get needInvoice(){
            return this.approveRequest.insuranceApprovalType===3
        }
        async save(){
            this.approveRequest.insurancePolicyIds=this.data.map(x=>x.id);
            (this.$refs.approveForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'insuranceApproval/create',
                        data:this.approveRequest
                    });
                    (this.$refs.approveForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.approveForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getBankType()
            }
        }
        async getBankType(){
            this.bankTypeRequest.maxResultCount=10000
            this.bankTypeRequest.skipCount=0
            let res =  await this.$store.dispatch({
                type:'bankType/getAll',
                data:this.bankTypeRequest
            })
            this.bankTypeList = res.items
        }
        bankTypeChange(){
            this.bankList=[]
            this.approveRequest.bank=null
        }
        async getBank(keyword){
            this.bankLoading = true;
            this.bankDetailRequest.keyword=keyword;
            this.bankDetailRequest.bankType = this.approveRequest.bankType;
            let res = await this.$store.dispatch({
                type:'bankDetail/getAll',
                data:this.bankDetailRequest
            })
            this.bankList = res.items
            this.bankLoading = false;
        }
        approveRule={
        }
    }
</script>