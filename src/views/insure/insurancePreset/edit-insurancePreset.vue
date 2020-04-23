<template>
    <div>
        <Modal
         :title="L('Edit')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="insurancePresetForm"  label-position="top" :rules="insurancePresetRule" :model="insurancePreset">
                <FormItem label="名称" prop="name">
                    <Input v-model="insurancePreset.name" :maxlength="50"/>
                </FormItem>
                <FormItem label="保险公司" prop="supplierId">
                    <Select v-model="insurancePreset.supplierId">
                        <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="预设保险种类" prop="presetInsuranceType">
                    <Select v-model="insurancePreset.presetInsuranceType" multiple>
                        <Option v-for="item in insuranceTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="保险合同类型" prop="insuranceContractType">
                    <Select v-model="insurancePreset.insuranceContractType">
                        <Option :value=0>新保</Option>
                        <Option :value=1>续保</Option>
                    </Select>
                </FormItem>
                <FormItem label="保单类别" prop="insurancePolicyType">
                    <Select v-model="insurancePreset.insurancePolicyType">
                        <Option :value=0>交强险</Option>
                        <Option :value=1>商业险</Option>
                        <Option :value=2>承运人责任险</Option>
                    </Select>
                </FormItem>
                <FormItem label="交强险返点（%）" prop="compulsoryInsuranceRebateRate" v-if="insurancePreset.insurancePolicyType===0">
                    <Input v-model="insurancePreset.compulsoryInsuranceRebateRate" :maxlength="50"/>
                </FormItem>
                <FormItem label="商业险返点（%）" prop="commercialInsuranceRebateRate" v-if="insurancePreset.insurancePolicyType===1">
                    <Input v-model="insurancePreset.commercialInsuranceRebateRate" :maxlength="50"/>
                </FormItem>
                <FormItem label="承运人责任险返点（%）" prop="carrierLiabilityInsuranceRebateRate" v-if="insurancePreset.insurancePolicyType===2">
                    <Input v-model="insurancePreset.carrierLiabilityInsuranceRebateRate" :maxlength="50"/>
                </FormItem>
                <FormItem label="额外返点（%）" prop="extraRebateRate" v-if="insurancePreset.insurancePolicyType===1">
                    <Input v-model="insurancePreset.extraRebateRate" :maxlength="50"/>
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Input v-model="insurancePreset.remark" :maxlength="50"/>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="insurancePreset.isActive">是否启用</Checkbox>
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
    import InsurancePreset from '@/store/entities/insure/insurancePreset';

    class PageInsuranceTypeRequest extends PageRequest{
        isActive:boolean=true;
    }
    class PageSupplierRequest extends PageRequest{
        isActive:boolean=null;
        supplierTypes:Array<number>;
    }

    @Component
    export default class EditInsurancePreset extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        insurancePreset:InsurancePreset=new InsurancePreset();
        pageInsuranceTypeRequest:PageInsuranceTypeRequest=new PageInsuranceTypeRequest();
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();
        save(){
            (this.$refs.insurancePresetForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'insurancePreset/update',
                        data:this.insurancePreset
                    });
                    (this.$refs.insurancePresetForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.insurancePresetForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getList();
                this.insurancePreset=Util.extend(true,{},this.$store.state.insurancePreset.editInsurancePreset);
            }
        }
        get loadingsupplierList(){
            return this.$store.state.supplier.selectLoading;
        }
        get insuranceTypeList(){
            return this.$store.state.insuranceType.selectList;
        }
        get supplierList(){
            return this.$store.state.supplier.selectList;
        }
        async getList(){
            this.pageInsuranceTypeRequest.maxResultCount=100;
            this.pageInsuranceTypeRequest.skipCount=0;
            this.pageInsuranceTypeRequest.isActive = true;
            
            await this.$store.dispatch({
                type:'insuranceType/selectAll',
                data:this.pageInsuranceTypeRequest
            })

            this.pageSupplierRequest.maxResultCount=100;
            this.pageSupplierRequest.skipCount=0;
            this.pageSupplierRequest.isActive = true;
            this.pageSupplierRequest.supplierTypes=[1];
            await this.$store.dispatch({
                type:'supplier/selectAll',
                data:this.pageSupplierRequest
            })
        }
        validateNumber(rule:any, value:any, callback:Function){
            value = String(value).trim();
            if (!value) {
                callback(new Error('值不能为空'));
            }
            if (!isFinite(value)) {
                callback(new Error('请输入数值'));
            }
            if (Number(value) > 100 || Number(value) < 0) {
                callback(new Error('限制数值范围 0-100'));
            }
            callback();
        }
        insurancePresetRule={
            compulsoryInsuranceRebateRate:[{validator:this.validateNumber, trigger: 'blur'}],
            commercialInsuranceRebateRate:[{validator:this.validateNumber, trigger: 'blur'}],
            extraRebateRate:[{validator:this.validateNumber, trigger: 'blur'}],
            carrierLiabilityInsuranceRebateRate:[{validator:this.validateNumber, trigger: 'blur'}],
        }
    }
</script>