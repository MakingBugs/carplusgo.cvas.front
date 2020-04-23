<template>
    <div>
        <Modal
         fullscreen
         title="批减文档生成"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="batchReduceForm"  label-position="top" :rules="batchReduceRule" :model="batchReduceRequest">
                <FormItem label="保险预设配置" prop="insurancePresetId">
                    <Select v-model="batchReduceRequest.insurancePresetId" clearable @on-change="getExportList">
                        <Option v-for="item in insurancePresetList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list" :height="pageHeight">
            </Table>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">生成文档</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import Excel from '@/lib/excel' 
    import InsuranceType from '@/store/entities/insure/insuranceType';
    import InsurancePreset from '@/store/entities/insure/insurancePreset';
    import InsurancePolicy from '@/store/entities/insure/insurancePolicy';
    import InsuranceDetail from '@/store/entities/insure/insuranceDetail';

    class PageInsurancePresetRequest extends PageRequest{
        isActive:boolean=true;
        supplierId:Number=0;
        insuranceContractType:Number=0;
        insurancePolicyType:Number=0;
    }

    class PageInsuranceDetailRequest extends PageRequest{
        insurancePolicyIds:Array<Number>=[];
    }

    class PageInsuranceTypeRequest extends PageRequest{
        isActive:boolean=true;
    }

    class BatchReduceRequest {
        insurancePresetId:Number=0;
    }
    @Component({})
    export default class BatchReduce extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Array,default:[]}) data:Array<any>;
        pageInsurancePresetRequest:PageInsurancePresetRequest=new PageInsurancePresetRequest();
        pageInsuranceDetailRequest:PageInsuranceDetailRequest=new PageInsuranceDetailRequest();
        pageInsuranceTypeRequest:PageInsuranceTypeRequest=new PageInsuranceTypeRequest();
        batchReduceRequest:BatchReduceRequest = new BatchReduceRequest();
        list:Array<any>=[];
        loading:Boolean=false;
        get pageHeight(){
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            return h - 220
        }
        get insurancePresetList(){
            return this.$store.state.insurancePreset.selectList;
        }
        get insuranceDetailList(){
            return this.$store.state.insuranceDetail.selectList;
        }
        get insuranceTypeList(){
            return this.$store.state.insuranceType.selectList;
        }
        getInsuranceContractTypeName(value:number){
            switch (value) {
                case 0:
                    return '新保';
                case 1:
                    return '续保';
                case 2:
                    return '变更';
            }
        }
        getInsurancePolicyTypeName(value:number){
            switch (value) {
                case 0:
                    return '交强险';
                case 1:
                    return '商业险';
                case 2:
                    return '承运人责任险';
            }
        }
        async getExportList(){
            this.loading=true;
            this.list = [];

            await this.getInsuranceTypeList();
            await this.getInsuranceDetailList();

            var insurancePreset = (this.insurancePresetList as Array<any>).find(x=>x.id===this.batchReduceRequest.insurancePresetId);
            if(!!insurancePreset){
                this.getListFromInsurancePreset(insurancePreset);
            }else{
                this.getListFromOriginalData();
            }

            this.loading=false;
        }
        getListFromOriginalData(){
            this.insuranceDetailList.map((x:InsuranceDetail)=>{
                var insurancePolicy = (this.data as Array<any>).find(y=>y.id===x.insurancePolicyId);
                this.list.push({
                    carBaseId:insurancePolicy.carBaseId,
                    carNo:insurancePolicy.carBase.carNo,
                    insuranceTypeId:x.insuranceTypeId,
                    insuranceTypeName:x.insuranceType.name,
                    isDeleted:'否',
                    insuranceOperationType:'批减',
                    insuranceContractType:this.getInsuranceContractTypeName(insurancePolicy.insuranceContractType),
                    insurancePolicyType:this.getInsurancePolicyTypeName(insurancePolicy.insurancePolicyType),
                    supplierId:insurancePolicy.supplierId,
                    supplierName:insurancePolicy.supplier.fname,
                    insuranceNum:insurancePolicy.insuranceNum,
                    serialNumber:'',
                    insuredAmount:x.insuredAmount,
                    originalAmount:x.originalAmount,
                    transactionAmount:x.transactionAmount,
                    noDeductibleOriginalAmount:x.noDeductibleOriginalAmount,
                    noDeductibleTransactionAmount:x.noDeductibleTransactionAmount,
                    remark:x.remark,
                })
            })
        }
        getListFromInsurancePreset(insurancePreset){
            this.insuranceDetailList.map((x:InsuranceDetail)=>{
                var insurancePolicy = (this.data as Array<any>).find(y=>y.id===x.insurancePolicyId);
                this.list.push({
                    carBaseId:insurancePolicy.carBaseId,
                    carNo:insurancePolicy.carBase.carNo,
                    insuranceTypeId:x.insuranceTypeId,
                    insuranceTypeName:x.insuranceType.name,
                    isDeleted:(insurancePreset.presetInsuranceType as Array<Number>).some(z=>z===x.insuranceTypeId)?'否':'是',
                    insuranceOperationType:'批减',
                    insuranceContractType:this.getInsuranceContractTypeName(insurancePolicy.insuranceContractType),
                    insurancePolicyType:this.getInsurancePolicyTypeName(insurancePolicy.insurancePolicyType),
                    supplierId:insurancePolicy.supplierId,
                    supplierName:insurancePolicy.supplier.fname,
                    insuranceNum:insurancePolicy.insuranceNum,
                    serialNumber:'',
                    insuredAmount:x.insuredAmount,
                    originalAmount:x.originalAmount,
                    transactionAmount:x.transactionAmount,
                    noDeductibleOriginalAmount:x.noDeductibleOriginalAmount,
                    noDeductibleTransactionAmount:x.noDeductibleTransactionAmount,
                    remark:x.remark,
                })
            })
        }
        async getInsuranceTypeList(){
            this.pageInsuranceTypeRequest.maxResultCount=10000;
            this.pageInsuranceTypeRequest.skipCount=0;
            this.pageInsuranceTypeRequest.isActive = true;
            
            await this.$store.dispatch({
                type:'insuranceType/selectAll',
                data:this.pageInsuranceTypeRequest
            })
        }
        async getInsuranceDetailList(){
            this.pageInsuranceDetailRequest.maxResultCount=10000;
            this.pageInsuranceDetailRequest.skipCount=0;
            this.pageInsuranceDetailRequest.insurancePolicyIds = this.data.map(x=>x.id);
            
            await this.$store.dispatch({
                type:'insuranceDetail/selectAll',
                data:this.pageInsuranceDetailRequest
            })
        }
        async save(){
            let params = { 
                title: this.columns.map(value=>value.title), 
                key: this.columns.map(value=>value.key), 
                data: this.list, 
                autoWidth: true, 
                filename: "批减文档" 
            }; 
            Excel.export_array_to_excel(params);
            
            (this.$refs.batchReduceForm as any).resetFields();
            this.$emit('save-success');
            this.$emit('input',false);
        }
        cancel(){
            (this.$refs.batchReduceForm as any).resetFields();
            this.$emit('input',false);
        }
        async getList(){
            this.pageInsurancePresetRequest.maxResultCount=10000;
            this.pageInsurancePresetRequest.skipCount=0;
            this.pageInsurancePresetRequest.isActive=true;
            this.pageInsurancePresetRequest.supplierId=this.data[0].supplierId
            this.pageInsurancePresetRequest.insuranceContractType=this.data[0].insuranceContractType
            this.pageInsurancePresetRequest.insurancePolicyType=this.data[0].insurancePolicyType
            await this.$store.dispatch({
                type:'insurancePreset/selectAll',
                data:this.pageInsurancePresetRequest
            })
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getList();
                this.getExportList();
            }
        }
        columns=[{
                title:'保险单号',
                key:'insuranceNum',
                width:150,
            },{
                title:'批单号',
                key:'serialNumber',
                width:150,
            },{
                title:'车辆编号',
                key:'carBaseId',
                width:150,
            },{
                title:'车架号',
                key:'carNo',
                width:150,
            },{
                title:'险种编号',
                key:'insuranceTypeId',
                width:150,
            },{
                title:'险种名称',
                key:'insuranceTypeName',
                width:150,
            },{
                title:'是否删除',
                key:'isDeleted',
                width:150,
            },{
                title:'保险操作类型',
                key:'insuranceOperationType',
                width:150,
            },{
                title:'保险合同类型',
                key:'insuranceContractType',
                width:150,
            },{
                title:'保单类别',
                key:'insurancePolicyType',
                width:150,
            },{
                title:'保险公司编号',
                key:'supplierId',
                width:150,
            },{
                title:'保险公司名称',
                key:'supplierName',
                width:150,
            },{
                title:'保险金额',
                key:'insuredAmount',
                width:150,
            },{
                title:'原价保费',
                key:'originalAmount',
                width:150,
            },{
                title:'签单保费',
                key:'transactionAmount',
                width:150,
            },{
                title:'不计免赔原价保费',
                key:'noDeductibleOriginalAmount',
                width:150,
            },{
                title:'不计免赔签单保费',
                key:'noDeductibleTransactionAmount',
                width:150,
            },{
                title:'备注',
                key:'remark',
                width:150,
            }]
        batchReduceRule={
        }
    }
</script>