<template>
    <div>
        <Modal
         fullscreen
         :title="'信息'"
         :value="value"
         @on-visible-change="visibleChange"
        >
                <Collapse v-model="collapseValue">
                    <Panel name="1">
                        保单信息
                        <div slot="content">
                            <Form ref="insurancePolicyForm"  label-position="top" :rules="insurancePolicyRule" :model="insurancePolicy">
                                <Row :gutter="20">
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="保险单号" prop="insuranceNum">
                                            <Input v-model="insurancePolicy.insuranceNum" :maxlength="50" disabled/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="保险公司" prop="supplierId">
                                            <Select v-model="insurancePolicy.supplierId" :loading="loadingSupplierList" disabled>
                                                <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="保单类别" prop="insurancePolicyType">
                                            <Select v-model="insurancePolicy.insurancePolicyType" disabled>
                                                <Option :value=0>交强险</Option>
                                                <Option :value=1>商业险</Option>
                                                <Option :value=2>承运人责任险</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="保险合同类型" prop="insuranceContractType">
                                            <Select v-model="insurancePolicy.insuranceContractType" disabled>
                                                <Option :value=0>新保</Option>
                                                <Option :value=1>续保</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="20">
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="保险开始日期" prop="startTime">
                                            <DatePicker  v-model="insurancePolicy.startTime" disabled type="date" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="保险结束日期" prop="endTime">
                                            <DatePicker  v-model="insurancePolicy.endTime" disabled type="date" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="交强险返点（%）" prop="compulsoryInsuranceRebateRate"  v-if="insurancePolicy.insurancePolicyType===0">
                                            <Input v-model="insurancePolicy.compulsoryInsuranceRebateRate" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="商业险返点（%）" prop="commercialInsuranceRebateRate" v-if="insurancePolicy.insurancePolicyType===1">
                                            <Input v-model="insurancePolicy.commercialInsuranceRebateRate" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="承运人责任险返点（%）" prop="carrierLiabilityInsuranceRebateRate" v-if="insurancePolicy.insurancePolicyType===2">
                                            <Input v-model="insurancePolicy.carrierLiabilityInsuranceRebateRate" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem label="额外返点（%）" prop="extraRebateRate" v-if="insurancePolicy.insurancePolicyType===1">
                                            <Input v-model="insurancePolicy.extraRebateRate" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Panel>
                    <Panel name="2">
                        车辆信息
                        <div slot="content">
                            <Row :gutter="20">
                                <Col :xs="24" :md="12" :xxl="6">
                                    总厂牌：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.factoryBrand.factoryBrandName:''}}
                                </Col>
                                <Col :xs="24" :md="12" :xxl="6">
                                    车牌号码：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.makNo:''}}
                                </Col>
                                <Col :xs="24" :md="12" :xxl="6">
                                    厂牌：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.brand.brandName:''}}
                                </Col>
                                <Col :xs="24" :md="12" :xxl="6">
                                    车型：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.clasen.clasenName:''}}
                                </Col>
                            </Row>
                            <Row :gutter="20" class="margin-top-10">
                                <Col :xs="24" :md="12" :xxl="6">
                                    车辆型号：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.clasenCode:''}}
                                </Col>
                                <Col :xs="24" :md="12" :xxl="6">
                                    座位数：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.percnt:''}}
                                </Col>
                                <Col :xs="24" :md="12" :xxl="6">
                                    排气量：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.cc:''}}
                                </Col>
                                <Col :xs="24" :md="12" :xxl="6">
                                    登记日期：{{(!!insurancePolicy.carBase)?new Date(insurancePolicy.carBase.linceDt).toLocaleDateString():''}}
                                </Col>
                            </Row>
                            <Row :gutter="20" class="margin-top-10">
                                <Col :xs="24" :md="12" :xxl="6">
                                    使用性质：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.itemCode.itemName:''}}
                                </Col>
                                <Col :xs="24" :md="12" :xxl="6">
                                    发动机号码：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.engNo:''}}
                                </Col>
                                <Col :xs="24" :md="12" :xxl="6">
                                    车架号：{{(!!insurancePolicy.carBase)?insurancePolicy.carBase.carNo:''}}
                                </Col>
                            </Row>
                                                            
                        </div>
                    </Panel>
                    <Panel name="3">
                        险种信息
                        <div slot="content">
                            <Table :columns="columns" :no-data-text="L('NoDatas')" border :data="insuranceDetailList">
                            </Table>
                        </div>
                    </Panel>
                </Collapse>
            <div slot="footer">
                <Button @click="cancel">{{'关闭'}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import InsurancePolicy from '@/store/entities/insure/insurancePolicy';
    import InsuranceDetail from '@/store/entities/insure/insuranceDetail';

    class PageInsuranceTypeRequest extends PageRequest{
        isActive:boolean=true;
    }
    class PageSupplierRequest extends PageRequest{
        isActive:boolean=null;
        supplierTypes:Array<number>;
    }
    class PageCarBaseRequest extends PageRequest{
        keyword:string;
    }
    class PageInsuranceDetailRequest extends PageRequest{
        insurancePolicyIds:Array<Number>=[];
    }

    @Component
    export default class InfoInsurancePolicy extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        insurancePolicy:InsurancePolicy=new InsurancePolicy();
        insuranceDetail:InsuranceDetail=new InsuranceDetail();
        pageInsuranceTypeRequest:PageInsuranceTypeRequest=new PageInsuranceTypeRequest();
        pageInsuranceDetailRequest:PageInsuranceDetailRequest=new PageInsuranceDetailRequest();
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();
        pageCarBaseRequest:PageCarBaseRequest=new PageCarBaseRequest();
        collapseValue:Array<string>=["1","2","3"]
        cancel(){
            (this.$refs.insurancePolicyForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getList();
                this.insurancePolicy=Util.extend(true,{},this.$store.state.insurancePolicy.editInsurancePolicy);
            }
        }
        get loadingSupplierList(){
            return this.$store.state.supplier.selectLoading;
        }
        get insuranceTypeList(){
            return this.$store.state.insuranceType.selectList;
        }
        get supplierList(){
            return this.$store.state.supplier.selectList;
        }
        get insuranceDetailList(){
            return this.$store.state.insuranceDetail.selectList;
        }
        async getList(){
            this.pageInsuranceTypeRequest.maxResultCount=10000;
            this.pageInsuranceTypeRequest.skipCount=0;
            this.pageInsuranceTypeRequest.isActive = true;
            await this.$store.dispatch({
                type:'insuranceType/selectAll',
                data:this.pageInsuranceTypeRequest
            })

            this.pageSupplierRequest.maxResultCount=10000;
            this.pageSupplierRequest.skipCount=0;
            this.pageSupplierRequest.isActive = true;
            this.pageSupplierRequest.supplierTypes=[1];
            await this.$store.dispatch({
                type:'supplier/selectAll',
                data:this.pageSupplierRequest
            })

            this.pageInsuranceDetailRequest.maxResultCount=10000;
            this.pageInsuranceDetailRequest.skipCount=0;
            this.pageInsuranceDetailRequest.insurancePolicyIds=[this.insurancePolicy.id];
            
            await this.$store.dispatch({
                type:'insuranceDetail/selectAll',
                data:this.pageInsuranceDetailRequest
            })
        }
        columns=[{
                title:'险种名称',
                key:'insuranceTypeName',
                render:(h:any,params:any)=>{
                    return h('span',(!!params.row.insuranceType)?params.row.insuranceType.name:'')
                }
            },{
                title:'保险金额',
                key:'insuredAmount',
            },{
                title:'原价保费',
                key:'originalAmount',
            },{
                title:'签单保费',
                key:'transactionAmount',
            },{
                title:'不计免赔原价保费',
                key:'noDeductibleOriginalAmount',
            },{
                title:'不计免赔签单保费',
                key:'noDeductibleTransactionAmount',
            },{
                title:'返点金额',
                key:'rebateAmount',
            },{
                title:'额外返点金额',
                key:'extraRebateAmount',
            },{
                title:'备注',
                key:'remark',
            }]
        insurancePolicyRule={
        }
    }
</script>