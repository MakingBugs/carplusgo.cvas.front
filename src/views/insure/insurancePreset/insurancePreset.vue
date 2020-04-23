<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="'名称:'" style="width:100%">
                                <Input v-model="pagerequest.keyword" placeholder="名称"/>
                            </FormItem>
                        </Col>   
                        <Col span="6">
                            <FormItem label="保险公司：" style="width:100%">
                                <Select v-model="pagerequest.supplierId" filterable clearable>
                                    <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                                </Select>
                            </FormItem>    
                        </Col>
                        <Col span="6">
                            <FormItem label="合同类型：" style="width:100%">
                                <Select v-model="pagerequest.insuranceContractType" clearable>
                                    <Option :value=0>新保</Option>
                                    <Option :value=1>续保</Option>
                                </Select>
                            </FormItem>                        
                        </Col>
                        <Col span="6">
                            <FormItem label="保单类别：" style="width:100%">
                                <Select v-model="pagerequest.insurancePolicyType" clearable>
                                    <Option :value=0>交强险</Option>
                                    <Option :value=1>商业险</Option>
                                    <Option :value=2>承运人责任险</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('IsActive')+':'" style="width:100%">
                                <Select :placeholder="L('Select')" @on-change="isActiveChange">
                                    <Option value="All">{{L('All')}}</Option>
                                    <Option value="Actived">{{L('Actived')}}</Option>
                                    <Option value="NoActive">{{L('NoActive')}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-insurancePreset v-model="createModalShow" @save-success="getpage"></create-insurancePreset>
        <edit-insurancePreset v-model="editModalShow" @save-success="getpage"></edit-insurancePreset>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateInsurancePreset from './create-insurancePreset.vue'
    import EditInsurancePreset from './edit-insurancePreset.vue'
    
    class PageInsurancePresetRequest extends PageRequest{
        keyword:string='';
        supplierId:number=null;
        isActive:boolean=null;
        insuranceContractType:number=null;
        insurancePolicyType:number=null;
    }
    class PageSupplierRequest extends PageRequest{
        isActive:boolean=null;
        supplierTypes:Array<number>;
    }
    class PageInsuranceTypeRequest extends PageRequest{
        isActive:boolean=true;
    }
    @Component({
        components:{CreateInsurancePreset,EditInsurancePreset}
    })
    export default class InsurancePresets extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
       
        pagerequest:PageInsurancePresetRequest=new PageInsurancePresetRequest();
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();
        insuranceTypeRequest:PageInsuranceTypeRequest=new PageInsuranceTypeRequest();
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.insurancePreset.list;
        };
        get loading(){
            return this.$store.state.insurancePreset.loading;
        }
        get supplierList(){
            return this.$store.state.supplier.selectList;
        }
        create(){
            this.createModalShow=true;
        }
        isActiveChange(val:string){
            if(val==='Actived'){
                this.pagerequest.isActive=true;
            }else if(val==='NoActive'){
                this.pagerequest.isActive=false;
            }else{
                this.pagerequest.isActive=null;
            }
        }
        pageChange(page:number){
            this.$store.commit('insurancePreset/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('insurancePreset/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            
            await this.$store.dispatch({
                type:'insurancePreset/getAll',
                data:this.pagerequest
            })
            
            this.insuranceTypeRequest.maxResultCount=100;
            this.insuranceTypeRequest.skipCount=0;
            await this.$store.dispatch({
                type:'insuranceType/selectAll',
                data:this.insuranceTypeRequest
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
        get pageSize(){
            return this.$store.state.insurancePreset.pageSize;
        }
        get totalCount(){
            return this.$store.state.insurancePreset.totalCount;
        }
        get currentPage(){
            return this.$store.state.insurancePreset.currentPage;
        }
        columns=[
        {
            title:'名称',
            key:'name',
            width:160
        },{
            title:'保险公司',
            render:(h:any,params:any)=>{
                return h('span',params.row.supplier.fname)
            },
            width:160
        },{
            title:'预设保险种类',
            render:(h:any,params:any)=>{
                var presetInsuranceTypeStr = (params.row.presetInsuranceType as Array<number>)
                .map(x=>{
                    var insuranceType = (this.$store.state.insuranceType.selectList as Array<any>).find(t=>t.id===x)
                    return insuranceType?insuranceType.name:''
                })
                .join(',');
                return h('span',presetInsuranceTypeStr)
            },
            width:160
        },
        {
            title:'保险合同类型',
            render:(h:any,params:any)=>{
                switch (params.row.insuranceContractType) {
                    default:
                    case 0:
                        return h('span','新保');
                    case 1:
                        return h('span','续保');
                }
            },
            width:160
        },
        {
            title:'保单类型',
            render:(h:any,params:any)=>{
                switch (params.row.insurancePolicyType) {
                    default:
                    case 0:
                        return h('span','交强险');
                    case 1:
                        return h('span','商业险');
                    case 2:
                        return h('span','承运人责任险');
                }
            },
            width:160
        },
        {
            title:'交强险返点（%）',
            key:'compulsoryInsuranceRebateRate',
            width:160
        },
        {
            title:'商业险返点（%）',
            key:'commercialInsuranceRebateRate',
            width:160
        },
        {
            title:'承运人责任险返点（%）',
            key:'carrierLiabilityInsuranceRebateRate',
            width:160
        },
        {
            title:'额外返点（%）',
            key:'extraRebateRate',
            width: '160px'
        },
        {
            title:'备注',
            key:'remark',
            width:160
        },
        {
            title:this.L('IsActive'),
            render:(h:any,params:any)=>{
                return h('span',params.row.isActive?this.L('Yes'):this.L('No'))
            },
            width:160
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
            fixed:'right',
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on:{
                            click:()=>{
                                this.$store.commit('insurancePreset/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit')),
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small'
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                        title:this.L('Tips'),
                                        content:this.L('DeleteConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'insurancePreset/delete',
                                                data:params.row
                                            })
                                            await this.getpage();
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
        async created(){
            this.getpage();
        }
        
    }
    
</script>