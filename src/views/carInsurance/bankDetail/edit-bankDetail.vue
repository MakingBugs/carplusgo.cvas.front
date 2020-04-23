<template>
    <div>
        <Modal
         :title="L('Edit')"
         :value="value"
         :information="information"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="bankDetailForm"  label-position="top" :rules="checkForm" :model="bankDetailForm">
                <FormItem label="银行别" prop="bankType">
                    <Select v-model="bankDetailForm.bankType">
                        <Option v-for="item in ddlBankTypeList" :value="item.id" :key="item.id">{{ item.bankNameT }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="银行支行全称" prop="bankName">
                    <Input v-model="bankDetailForm.bankName"/>
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
    import BankDetail from '@/store/entities/public/bankDetail';

    class PageBankTypeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }

    @Component
    export default class EditBankDetail extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) information:any;
        bankDetail:BankDetail=new BankDetail();
        pageBankTypeRequest:PageBankTypeRequest=new PageBankTypeRequest();
        bankType:any=0;
        save(){
            (this.$refs.bankDetailForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.ToData();
                    await this.$store.dispatch({
                        type:'bankDetail/update',
                        data:this.bankDetail
                    });
                    (this.$refs.bankDetailForm as any).resetFields();//resetFields 重置
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.bankDetailForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
            else{
                this.getList();
                this.bankDetailForm=Util.extend(true,{},this.information);
            }
        }
        bankDetailForm={
            id:0,
            bankType:null,
            areaNumber:'',
            bankName:'',
            bankNumber:'',
            inVisible:0,
            cuser:0,
            cdt:null,
            muser:0,
            mdt:null,
        }
        ToData(){
            this.bankDetail.id=this.bankDetailForm.id;
            this.bankDetail.bankType=this.bankDetailForm.bankType;
            this.bankDetail.bankName=this.bankDetailForm.bankName;
            this.bankDetail.areaNumber=this.bankDetailForm.areaNumber;
            this.bankDetail.bankNumber=this.bankDetailForm.bankNumber;
            this.bankDetail.inVisible=this.bankDetailForm.inVisible;
            this.bankDetail.cuser=this.bankDetailForm.cuser;
            this.bankDetail.cdt=this.bankDetailForm.cdt;
            this.bankDetail.muser=0;
            this.bankDetail.mdt=new Date();
        }
        get ddlBankTypeList(){//银行别
            return this.bankType;
        };
        async getList(){
            this.pageBankTypeRequest.maxResultCount=10000;
            this.pageBankTypeRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'bankType/getAll',
                data:this.pageBankTypeRequest
            }).then(res=>{
                this.bankType = res.items
            })
        }
        checkForm={//验证
            // ddlBankType:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('ddlBankType')),trigger: 'blur'}],
            // txtBankName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('txtBankName')),trigger: 'blur'}],
        }
    }
</script>
