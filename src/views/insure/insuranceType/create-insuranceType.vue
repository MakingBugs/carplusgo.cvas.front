<template>
    <div>
        <Modal
         :title="L('Create')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="insuranceTypeForm"  label-position="top" :rules="insuranceTypeRule" :model="insuranceType">
                <FormItem :label="'名称'" prop="name">
                    <Input v-model="insuranceType.name"/>
                </FormItem>
                <FormItem :label="'备注'" prop="remark">
                    <Input v-model="insuranceType.remark" :maxlength="1024"/>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="insuranceType.isActive">{{L('IsActive')}}</Checkbox>
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
    import InsuranceType from '@/store/entities/insure/insuranceType';
    @Component
    export default class CreateInsuranceType extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        insuranceType:InsuranceType=new InsuranceType();
        save(){
            (this.$refs.insuranceTypeForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'insuranceType/create',
                        data:this.insuranceType
                    });
                    (this.$refs.insuranceTypeForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.insuranceTypeForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
        }
        insuranceTypeRule={
            name:[{required:true,message:'请输入名称',trigger: 'blur'}]
        }
    }
</script>
