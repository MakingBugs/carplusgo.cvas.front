<template>
    <div>
        <Modal
         fullscreen
         title="投保文档生成"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="insureForm"  label-position="top" :rules="insureRule" :model="insureRequest">
                <FormItem label="保险预设配置" prop="insurancePresetId">
                    <Select v-model="insureRequest.insurancePresetId" @on-change="getExportList">
                        <Option v-for="item in insurancePresetList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="保险开始日期" prop="startTime">
                    <DatePicker  v-model="insureRequest.startTime" @on-change="startTimeChange" type="date" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                </FormItem>
                <FormItem label="保险结束日期" prop="endTime">
                    <DatePicker  v-model="insureRequest.endTime" @on-change="getExportList" type="date" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
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
    import CarBase from '@/store/entities/car/carbase';

    class PageInsurancePresetRequest extends PageRequest{
        isActive:boolean=true;
    }

    class PageInsuranceTypeRequest extends PageRequest{
        isActive:boolean=true;
    }

    class InsureRequest {
        insurancePresetId:Number=0;
        startTime:Date=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),0,0,0);
        endTime:Date=new Date(new Date().getFullYear()+1,new Date().getMonth(),new Date().getDate(),0,0,0);
    }

    @Component({})
    export default class Insure extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Array,default:[]}) data:Array<CarBase>;
        pageInsurancePresetRequest:PageInsurancePresetRequest=new PageInsurancePresetRequest();
        pageInsuranceTypeRequest:PageInsuranceTypeRequest=new PageInsuranceTypeRequest();
        insureRequest:InsureRequest = new InsureRequest();
        list:Array<any>=[];
        loading:Boolean=false;
        get pageHeight(){
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            return h - 380
        }
        get insurancePresetList(){
            return this.$store.state.insurancePreset.selectList;
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
        async startTimeChange(){
            this.insureRequest.endTime = new Date(this.insureRequest.startTime.getFullYear()+1,this.insureRequest.startTime.getMonth(),this.insureRequest.startTime.getDate())
            await this.getExportList()
        }
        async getExportList(){
            this.loading=true;
            this.list = [];
            await this.getInsuranceTypeList();
            var insurancePreset = (this.insurancePresetList as Array<any>).find(x=>x.id===this.insureRequest.insurancePresetId);
            if(!!insurancePreset){
                this.data.map(x=>{
                    (insurancePreset.presetInsuranceType as Array<Number>).map(y=>{
                        var insuranceType:InsuranceType = (this.insuranceTypeList as Array<any>).find(x=>x.id===y);
                        this.list.push({
                            carBaseId:x.id,
                            carNo:x.carNo,
                            insuranceTypeId:insuranceType.id,
                            insuranceTypeName:insuranceType.name,
                            insurancePresetId:insurancePreset.id,
                            insurancePresetName:insurancePreset.name,
                            insuranceOperationType:'投保',
                            insuranceContractType:this.getInsuranceContractTypeName(insurancePreset.insuranceContractType),
                            insurancePolicyType:this.getInsurancePolicyTypeName(insurancePreset.insurancePolicyType),
                            supplierId:insurancePreset.supplierId,
                            supplierName:insurancePreset.supplier.fname,
                            insuranceNum:'',
                            insuredAmount:'',
                            originalAmount:'',
                            transactionAmount:'',
                            noDeductibleOriginalAmount:'',
                            noDeductibleTransactionAmount:'',
                            startTime:this.insureRequest.startTime,
                            endTime:this.insureRequest.endTime,
                            remark:'',
                        })
                    })
                })
            }

            this.loading=false;
        }
        async save(){     
            if(!this.list || this.list.length <= 0){
                this.$Modal.error({title:'错误',content:'列表不能为空'})
                return
            }     
            (this.$refs.insureForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    let params = { 
                        title: this.columns.map(value=>value.title), 
                        key: this.columns.map(value=>value.key), 
                        data: this.list, 
                        autoWidth: true, 
                        filename: "投保文档" 
                    }; 
                    Excel.export_array_to_excel(params);
                    (this.$refs.insureForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.insureForm as any).resetFields();
            this.$emit('input',false);
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
        async getList(){
            this.pageInsurancePresetRequest.maxResultCount=100;
            this.pageInsurancePresetRequest.skipCount=0;
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
            }
        }
        columns=[{
                title:'保险单号',
                key:'insuranceNum',
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
                title:'保险预设编号',
                key:'insurancePresetId',
                width:150,
            },{
                title:'保险预设名称',
                key:'insurancePresetName',
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
                title:'保险开始日期',
                key:'startTime',
                width:150,
                render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.startTime).toLocaleDateString())
                }
            },{
                title:'保险结束日期',
                key:'endTime',
                width:150,
                render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.endTime).toLocaleDateString())
                }
            },{
                title:'备注',
                key:'remark',
                width:150,
            }]
        insureRule={
            startTime:[{required: true,type:'date',message:'请选择时间',trigger: 'blur'}],
            endTime:[{required: true,type:'date',message:'请选择时间',trigger: 'blur'}]
        }
    }
</script>