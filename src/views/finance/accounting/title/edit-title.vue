<template>
    <div>
        <Modal
         :title="L('Edit')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="accountingTitleForm"  label-position="top" :rules="accountingTitleRule" :model="accountingTitle">
                <FormItem :label="L('Name')" prop="name">
                    <Input v-model="accountingTitle.name" :maxlength="32" :minlength="2"/>
                </FormItem>
                <FormItem :label="L('Code')" prop="code">
                    <Input v-model="accountingTitle.code" :maxlength="32" :minlength="2"/>
                </FormItem>
                <FormItem :label="L('Level')" prop="level">
                    <Input v-model="accountingTitle.level" :maxlength="4" :minlength="1"/>
                </FormItem>
                <FormItem :label="L('AccountingElementType')" prop="accountingElementType">
                    <Select v-model="accountingTitle.accountingElementType">
                        <Option value="1">{{L('Asset')}}</Option>
                        <Option value="2">{{L('Liability')}}</Option>
                        <Option value="3">{{L('OwnersEquity')}}</Option>
                        <Option value="4">{{L('Revenue')}}</Option>
                        <Option value="5">{{L('Expense')}}</Option>
                        <Option value="6">{{L('Cost')}}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="accountingTitle.isActive">{{L('IsActive')}}</Checkbox>
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
    import AccountingTitle from '@/store/entities/finance/accounting/accountingTitle';
    @Component
    export default class EditAccountingTitle extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        accountingTitle:AccountingTitle=new AccountingTitle();
        save(){
            (this.$refs.accountingTitleForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'accountingTitle/update',
                        data:this.accountingTitle
                    });
                    (this.$refs.accountingTitleForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.accountingTitleForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.accountingTitle=Util.extend(true,{},this.$store.state.accountingTitle.editAccountingTitle);
                this.accountingTitle.accountingElementType=this.accountingTitle.accountingElementType.toString()
            }
        }
        accountingTitleRule={
            accountingElementType:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('AccountingElementType')),trigger: 'blur'}],
            name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('Name')),trigger: 'blur'}],
            code:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('Code')),trigger: 'blur'}]
        }
    }
</script>

