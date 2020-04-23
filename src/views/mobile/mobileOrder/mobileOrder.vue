<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem label="开始时间:" style="width:100%">
                                <DatePicker  v-model="startTime" type="daterange" format="yyyy/MM/dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="结束时间:" style="width:100%">
                                <DatePicker  v-model="endTime" type="daterange" format="yyyy/MM/dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6"> 
                            <FormItem label="订单编号:" style="width:100%"> 
                                <Input v-model="pagerequest.orderNum" placeholder="订单编号"/> 
                            </FormItem> 
                        </Col> 
                        <Col span="6"> 
                            <FormItem label="乘客手机号:" style="width:100%"> 
                                <Input v-model="pagerequest.phoneNum"  placeholder="乘客手机号"/> 
                            </FormItem> 
                        </Col> 
                        <Col span="6"> 
                            <FormItem label="车牌号:" style="width:100%"> 
                                <Input v-model="pagerequest.carNum"  placeholder="车牌号"/> 
                            </FormItem> 
                        </Col> 
                        <Col span="6">
                            <FormItem label="订单状态:" style="width:100%">
                                <Select placeholder="请选择" v-model="pagerequest.orderStatus">
                                    <Option value="0">全部</Option>
                                    <Option value="1">乘客下单</Option>
                                    <Option value="5">司机接到订单</Option>
                                    <Option value="6">司机去接乘客</Option>
                                    <Option value="10">司机已到达</Option>
                                    <Option value="15">开始行程</Option>
                                    <Option value="20">行程结束</Option>
                                    <Option value="25">行程结束未评价</Option>
                                    <Option value="30">取消订单</Option>
                                    <Option value="31">取消订单未支付</Option>
                                    <Option value="35">乘客已支付</Option>
                                    <Option value="40">预约失败</Option>
                                    <Option value="45">立即单派单失败</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage">查找</Button>
                        <Button icon="ios-refresh" size="large" @click="reset"  class="toolbar-btn">重置</Button>
                        <Button icon="md-download" type="primary" size="large" :loading="exportLoading" @click="exportExcel" v-hasPermission="'Pages.MobileOrder.Export'" class="toolbar-btn">导出Excel</Button>
                        <Button type="primary" size="large" @click="setColumns" class="toolbar-btn">编辑列表字段</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <div>
            <Modal
                title="编辑列表字段"
                :value="modalShow"
                @on-ok="save"
                @on-cancel="cancel"
                >
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                    <Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <Row>
                        <Col span="6" v-for="item in mobileOrderExport.columns" :key="item.key">
                            <Checkbox  :label="item.key">{{item.title}}</Checkbox>
                        </Col>
                    </Row>
                </CheckboxGroup>
            </Modal>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    class  PageMobileOrderRequest extends PageRequest{
        orderNum:string;
        phoneNum:string;
        carNum:string;
        orderStatus:string="0";
        startTimeFrom:Date;
        startTimeTo:Date;
        endTimeFrom:Date;
        endTimeTo:Date;
    }

    class  MobileOrderExport{
        pagerequest:PageMobileOrderRequest=new PageMobileOrderRequest();
        columns:Array<any>=[{
            title:'订单编号',
            key:'orderNum',
            width: 180,
            fixed: 'left'
        },{
            title:'约车类型',
            key:'orderType',
            width: 160
        },{
            title:'生成时间',
            key:'placeOrderTime',
            width: 160
        },{
            title:'开始时间',
            key:'startTime',
            width: 160
        },{
            title:'结束时间',
            key:'endTime',
            width: 160
        },{
            title:'预约上车位置',
            key:'startPoint',
            width: 160
        },{
            title:'预约下车位置',
            key:'endPoint',
            width: 160
        },{
            title:'实际上车位置',
            key:'startAddressReal',
            width: 160
        },{
            title:'实际下车位置',
            key:'travelEndAddress',
            width: 160
        },{
            title:'订单状态',
            key:'orderStatus',
            width: 160
        },{
            title:'车牌号',
            key:'carNum',
            width: 160
        },{
            title:'开票状态',
            key:'invoiceStatus',
            width: 160
        },{
            title:'司机账号',
            key:'driverUserName',
            width: 160
        },{
            title:'乘客账号',
            key:'passengerUserName',
            width: 160
        },{
            title:'优惠券类型',
            key:'giftType',
            width: 160
        },{
            title:'司机得分',
            key:'driverEvaluation',
            width: 160
        },{
            title:'车辆得分',
            key:'carEvaluation',
            width: 160
        },{
            title:'取消时间',
            key:'calTime',
            width: 160
        },{
            title:'取消原因',
            key:'calReasonNote',
            width: 160
        },{
            title:'订单金额',
            key:'orderAmount',
            width: 160
        },{
            title:'动态折扣金额',
            key:'dynamicDiscountAmount',
            width: 160
        },{
            title:'折后价',
            key:'discountedAmount',
            width: 160
        },{
            title:'支付金额',
            key:'payAmount',
            width: 160
        },{
            title:'支付时间',
            key:'payTime',
            width: 160
        },{
            title:'现金营收',
            key:'amountPayment',
            width: 160
        },{
            title:'预约时间',
            key:'appointmentTime',
            width: 160
        },{
            title:'司机接单时间',
            key:'driverAcceptOrderTime',
            width: 160
        },{
            title:'司机出发时间',
            key:'driverStartOffTime',
            width: 160
        },{
            title:'司机到达时间',
            key:'driverArrivedTime',
            width: 160
        },{
            title:'乘客上车时间',
            key:'passengerGetOnTime',
            width: 160
        },{
            title:'预估行驶里程(km)',
            key:'expMileage',
            width: 160
        },{
            title:'预估行驶时长(m)',
            key:'expTime',
            width: 160
        },{
            title:'预估金额',
            key:'expAmount',
            width: 160
        },{
            title:'实际行驶里程(km)',
            key:'totalDistance',
            width: 160
        },{
            title:'实际行驶时长(m)',
            key:'totalTime',
            width: 160
        },{
            title:'预定/实际下车点距离(km)',
            key:'endPointDistance',
            width: 160
        },{
            title:'预约上车经纬度',
            key:'startPoinitLocation',
            width: 160
        },{
            title:'预约下车经纬度',
            key:'endPointLocation',
            width: 160
        },{
            title:'实际上车经纬度',
            key:'startPoinitLocationReal',
            width: 160
        },{
            title:'实际下车经纬度',
            key:'endPointLocationReal',
            width: 160
        },{
            title:'实际接起时间(m)',
            key:'realAcceptedTime',
            width: 160
        }];
    }

    @Component({
        
    })
    export default class MobileOrder extends AbpBase{
        //filters
        pagerequest:PageMobileOrderRequest=new PageMobileOrderRequest();
        mobileOrderExport:MobileOrderExport=new MobileOrderExport();
        startTime:Date[]=[new Date(), new Date()];
        endTime:Date[]=[];
        modalShow:boolean=false;
        indeterminate:boolean=false;
        checkAll:boolean=true;
        checkAllGroup:Array<string>=[];
        columns:Array<any>=[{
            title:'订单编号',
            key:'orderNum',
            width: 180,
            fixed: 'left'
        },{
            title:'约车类型',
            key:'orderType',
            width: 160
        },{
            title:'生成时间',
            key:'placeOrderTime',
            width: 160
        },{
            title:'开始时间',
            key:'startTime',
            width: 160
        },{
            title:'结束时间',
            key:'endTime',
            width: 160
        },{
            title:'预约上车位置',
            key:'startPoint',
            width: 160
        },{
            title:'预约下车位置',
            key:'endPoint',
            width: 160
        },{
            title:'实际上车位置',
            key:'startAddressReal',
            width: 160
        },{
            title:'实际下车位置',
            key:'travelEndAddress',
            width: 160
        },{
            title:'订单状态',
            key:'orderStatus',
            width: 160
        },{
            title:'车牌号',
            key:'carNum',
            width: 160
        },{
            title:'开票状态',
            key:'invoiceStatus',
            width: 160
        }]
        get list(){
            return this.$store.state.mobileOrder.list;
        };
        get loading(){
            return this.$store.state.mobileOrder.loading;
        };
        get exportLoading(){
            return this.$store.state.mobileOrder.exportLoading;
        }
        get pageSize(){
            return this.$store.state.mobileOrder.pageSize;
        }
        get totalCount(){
            return this.$store.state.mobileOrder.totalCount;
        }
        get currentPage(){
            return this.$store.state.mobileOrder.currentPage;
        }
        pageChange(page:number){
            this.$store.commit('mobileOrder/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('mobileOrder/setPageSize',pagesize);
            this.getpage();
        }
        setColumns(){
            this.modalShow=true;
            this.indeterminate = true;
            this.checkAll = false;
            this.checkAllGroup=this.columns.map(_=>_.key);
        }
        save(){
            this.columns=this.mobileOrderExport.columns.filter(x=>this.checkAllGroup.includes(x.key));
            this.modalShow=false;
        }
        cancel(){
            this.checkAllGroup=this.columns.map(_=>_.key);
            this.modalShow=false;
        }
        handleCheckAll(){
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.checkAllGroup = this.mobileOrderExport.columns.map(_=>_.key);
            } else {
                this.checkAllGroup = [];
            }
        }
        checkAllGroupChange(data:Array<any>){
            if (data.length === this.mobileOrderExport.columns.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        }
        async exportExcel(){
            this.mobileOrderExport.pagerequest.maxResultCount=1000000;
            this.mobileOrderExport.pagerequest.skipCount=0;
            this.mobileOrderExport.pagerequest.orderNum=this.pagerequest.orderNum
            this.mobileOrderExport.pagerequest.phoneNum=this.pagerequest.phoneNum
            this.mobileOrderExport.pagerequest.carNum=this.pagerequest.carNum
            this.mobileOrderExport.pagerequest.orderStatus=this.pagerequest.orderStatus
            if (this.startTime.length>0) {
                this.mobileOrderExport.pagerequest.startTimeFrom=this.startTime[0];
            }
            if (this.startTime.length>1) {
                this.mobileOrderExport.pagerequest.startTimeTo=this.startTime[1];
            }
            if (this.endTime.length>0) {
                this.mobileOrderExport.pagerequest.endTimeFrom=this.endTime[0];
            }
            if (this.endTime.length>1) {
                this.mobileOrderExport.pagerequest.endTimeTo=this.endTime[1];
            }
            await this.$store.dispatch({
                type:'mobileOrder/exportAll',
                data:this.mobileOrderExport
            })
        }
        async reset(){
            this.pagerequest=new PageMobileOrderRequest();
            this.mobileOrderExport=new MobileOrderExport();
            this.startTime=[];
            this.endTime=[];
        }
        async getpage(){
          
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            if (this.startTime.length>0) {
                this.pagerequest.startTimeFrom=this.startTime[0];
            }
            if (this.startTime.length>1) {
                this.pagerequest.startTimeTo=this.startTime[1];
            }
            if (this.endTime.length>0) {
                this.pagerequest.endTimeFrom=this.endTime[0];
            }
            if (this.endTime.length>1) {
                this.pagerequest.endTimeTo=this.endTime[1];
            }

            await this.$store.dispatch({
                type:'mobileOrder/getAll',
                data:this.pagerequest
            })
        }
        async created(){
            this.getpage();
        }
    }
</script>