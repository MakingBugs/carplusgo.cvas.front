<template>
    <div>
        <Modal
         :title="L('Create')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="bankDetailForm"  label-position="top" :rules="checkForm" :model="bankDetail">
                <FormItem label="银行别" prop="bankType">
                    <Select v-model="bankDetail.bankType">
                        <Option v-for="item in ddlBankTypeList" :value="item.id" :key="item.id">{{ item.bankNameT }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="银行支行全称" prop="bankName">
                    <Input v-model="bankDetail.bankName" :maxlength="1024" :minlength="2"/>
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
import publicclass from '../../../lib/publicclass';

    class PageBankTypeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }

    @Component
    export default class CreateBankDetail extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        bankDetail:BankDetail=new BankDetail();
        pageBankTypeRequest:PageBankTypeRequest=new PageBankTypeRequest();
        bankType:any=0;
        save(){
            (this.$refs.bankDetailForm as any).validate(async (valid:boolean)=>{
                this.banknew();
                if(valid){
                    await this.$store.dispatch({
                        type:'bankDetail/create',
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
            }
        }
        //默认赋值
        banknew(){
            this.bankDetail.areaNumber='';
            this.bankDetail.bankNumber='';
            this.bankDetail.inVisible=0;
            this.bankDetail.cuser=0;
            this.bankDetail.cdt=new Date();
            this.bankDetail.muser=null;
            this.bankDetail.mdt=null;
        }
        get ddlBankTypeList(){//主配件
            return this.bankType;
        };
        async getList(){
            this.pageBankTypeRequest.maxResultCount=10000;
            this.pageBankTypeRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'bankType/getAll',
                data:this.pageBankTypeRequest
            }).then(res=>{
                this.bankType=res.items;
            })
        }
        checkForm={//验证
            bankType:[publicclass.Check.required.select],
            bankName:[publicclass.Check.required.text]
        }
    }
</script>
