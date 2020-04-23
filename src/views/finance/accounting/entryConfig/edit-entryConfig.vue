<template>
    <div>
        <Modal
         :title="L('Edit')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="accountingEntryConfigForm"  label-position="top" :rules="accountingEntryConfigRule" :model="accountingEntryConfig">
                <FormItem>
                    <Checkbox v-model="accountingEntryConfig.isMaster" @on-change="isMasterChange">{{L('IsMaster')}}</Checkbox>
                </FormItem>
                <FormItem :label="L('Name')" prop="name">
                    <Input v-model="accountingEntryConfig.name" :maxlength="32" :minlength="2"/>
                </FormItem>
                <FormItem :label="L('Sort')" prop="sort" v-if="childrenSettingShow">
                    <Input v-model="accountingEntryConfig.sort" :maxlength="4" :minlength="1"/>
                </FormItem>
                <FormItem :label="L('ElementChangeDirection')" prop="elementChangeDirection" v-if="childrenSettingShow" >
                    <Select v-model="accountingEntryConfig.elementChangeDirection">
                        <Option value="1">{{L('Increase')}}</Option>
                        <Option value="2">{{L('Decrease')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="L('Parent')" prop="parentId" v-if="childrenSettingShow" >
                    <Select v-model="accountingEntryConfig.parentId" :loading="loadingEntryConfigList">
                        <Option v-for="item in entryConfigList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="L('AccountingTitle')" prop="accountingTitleId" v-if="childrenSettingShow">
                    <Select v-model="accountingEntryConfig.accountingTitleId" :loading="loadingTitleList">
                        <Option v-for="item in titleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="accountingEntryConfig.isActive">{{L('IsActive')}}</Checkbox>
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
    import AccountingEntryConfig from '@/store/entities/finance/accounting/accountingEntryConfig';

    class PageAccountingEntryConfigRequest extends PageRequest{
        keyword:string='';
        isActive:boolean=null;
        isMaster:boolean=null;
        from:Date;
        to:Date;
    }

    class PageAccountingTitleRequest extends PageRequest{
        keyword:string='';
        isActive:boolean=null;
        from:Date;
        to:Date;
    }

    @Component
    export default class EditAccountingEntryConfig extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        accountingEntryConfig:AccountingEntryConfig=new AccountingEntryConfig();
        pageAccountingEntryConfigRequest:PageAccountingEntryConfigRequest=new PageAccountingEntryConfigRequest();
        pageAccountingTitleRequest:PageAccountingTitleRequest=new PageAccountingTitleRequest();
        childrenSettingShow:boolean=false;
        save(){
            (this.$refs.accountingEntryConfigForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'accountingEntryConfig/update',
                        data:this.accountingEntryConfig
                    });
                    (this.$refs.accountingEntryConfigForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.accountingEntryConfigForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getList();
                this.accountingEntryConfig=Util.extend(true,{},this.$store.state.accountingEntryConfig.editAccountingEntryConfig);
                if(this.accountingEntryConfig.elementChangeDirection){
                    this.accountingEntryConfig.elementChangeDirection=this.accountingEntryConfig.elementChangeDirection.toString();
                }
                this.childrenSettingShow=!this.accountingEntryConfig.isMaster;
            }
        }
        isMasterChange(val:boolean){
            this.childrenSettingShow=!val;
        }
        get entryConfigList(){
            return (this.$store.state.accountingEntryConfig.selectList as Array<AccountingEntryConfig>).filter(x=>x.id!=this.accountingEntryConfig.id);
        };
        get loadingEntryConfigList(){
            return this.$store.state.accountingEntryConfig.selectLoading;
        }
        get titleList(){
            return this.$store.state.accountingTitle.list;
        };
        get loadingTitleList(){
            return this.$store.state.accountingTitle.loading;
        }
        async getList(){
            this.pageAccountingEntryConfigRequest.maxResultCount=1000;
            this.pageAccountingEntryConfigRequest.skipCount=0;
            this.pageAccountingEntryConfigRequest.isMaster = true;
            this.pageAccountingEntryConfigRequest.isActive = true;

            await this.$store.dispatch({
                type:'accountingEntryConfig/getSelectAll',
                data:this.pageAccountingEntryConfigRequest
            })

            this.pageAccountingTitleRequest.maxResultCount=10000;
            this.pageAccountingTitleRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'accountingTitle/getAll',
                data:this.pageAccountingTitleRequest
            })
        }
        accountingEntryConfigRule={
            name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('Name')),trigger: 'blur'}],
            sort:[{required: this.childrenSettingShow,message:this.L('FieldIsRequired',undefined,this.L('Sort')),trigger: 'blur'}],
            elementChangeDirection:[{required: this.childrenSettingShow,message:this.L('FieldIsRequired',undefined,this.L('ElementChangeDirection')),trigger: 'blur'}]
        }
    }
</script>

