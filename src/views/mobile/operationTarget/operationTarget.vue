<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="'日期选择:'" style="width:100%">
                                <DatePicker  v-model="creationTime" type="daterange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                        <Button icon="md-download" type="primary" size="large" :loading="exportLoading" @click="exportExcel" class="toolbar-btn">导出Excel</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <edit-operationTarget v-model="editModalShow" @save-success="getpage"></edit-operationTarget>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import EditOperationTarget from './edit-operationTarget.vue'
import util from '@/lib/util';
    class  PageOperationTargetRequest extends PageRequest{
        from:Date;
        to:Date;
    }

    class  ExportPageOperationTargetRequest{
        pagerequest:PageOperationTargetRequest=new PageOperationTargetRequest();
        columns:Array<any>=[{}];
    }
    @Component({
        components:{EditOperationTarget}
    })
    export default class Users extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
        //filters
        pagerequest:PageOperationTargetRequest=new PageOperationTargetRequest();
        exportPagerequest:ExportPageOperationTargetRequest=new ExportPageOperationTargetRequest();
        creationTime:Date[]=[new Date(new Date().getTime()-15*24*60*60*1000),new Date(new Date().getTime()-24*60*60*1000)];
        editModalShow:boolean=false;
        get loading(){
            return this.$store.state.operationTarget.loading;
        }
        pageChange(page:number){
            this.$store.commit('operationTarget/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('operationTarget/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
          
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            //filters
            
            if (this.creationTime.length>0) {
                this.pagerequest.from=this.creationTime[0];
            }
            if (this.creationTime.length>1) {
                this.pagerequest.to=this.creationTime[1];
            }

            await this.$store.dispatch({
                type:'operationTarget/getAll',
                data:this.pagerequest
            })
        }
        checkNum(value:any){
            return Number(value) >= 0 ? util.toThousands(value) : '-';
        }
        async exportExcel(){
            this.exportPagerequest.pagerequest.maxResultCount=1000000;
            this.exportPagerequest.pagerequest.skipCount=0;
            if (this.creationTime.length>0) {
                this.exportPagerequest.pagerequest.from=this.creationTime[0];
            }
            if (this.creationTime.length>1) {
                this.exportPagerequest.pagerequest.to=this.creationTime[1];
            }
            this.exportPagerequest.columns = this.columns;
            await this.$store.dispatch({
                type:'operationTarget/exportAll',
                data:this.exportPagerequest
            })
        }
        get exportLoading(){
            return this.$store.state.operationTarget.exportLoading;
        }
        get pageSize(){
            return this.$store.state.operationTarget.pageSize;
        }
        get totalCount(){
            return this.$store.state.operationTarget.totalCount;
        }
        get currentPage(){
            return this.$store.state.operationTarget.currentPage;
        }
        get list(){
            return (this.$store.state.operationTarget.list as Array<any>).map(x=>{
                return {
                    id:x.id,
                    date:new Date(x.date).getFullYear()+'-'+(new Date(x.date).getMonth()+1)+'-'+new Date(x.date).getDate(),
                    orderAmount: this.checkNum(Number(x.orderAmount).toFixed()),
                    cashPayAmount: this.checkNum(Number(x.cashPayAmount).toFixed()),
                    cashPayPercent: x.cashPayAmount >= 0 && x.orderAmount > 0 ? util.toThousands(Number(Number(x.cashPayAmount/x.orderAmount*100).toFixed(1))) : '-',
                    activeUserCount: this.checkNum(x.activeUserCount),
                    placedOrderUserCount: this.checkNum(x.placedOrderUserCount),
                    completedOrderUserCount: this.checkNum(x.completedOrderUserCount),
                    placedOrderCount: this.checkNum(x.placedOrderCount),
                    acceptedOrderCount: this.checkNum(x.acceptedOrderCount),
                    completedOrderCount: this.checkNum(x.completedOrderCount),
                    acceptedPercent: x.acceptedOrderCount >= 0 && x.placedOrderCount > 0 ? util.toThousands(Number(Number(x.acceptedOrderCount/x.placedOrderCount*100).toFixed(1))) : '-',
                    completedPercent: x.completedOrderCount >= 0 && x.placedOrderCount > 0 ? util.toThousands(Number(Number(x.completedOrderCount/x.placedOrderCount*100).toFixed(1))) : '-',
                    avgOrderAmount: x.orderAmount >= 0 && x.completedOrderCount > 0 ? util.toThousands(Number(Number(x.orderAmount/x.completedOrderCount).toFixed())) : '-',
                    avgCashPayAmount: this.checkNum(Number(x.avgCashPayAmount).toFixed()),
                    completedOrderAvgMileage: this.checkNum(Number(x.completedOrderAvgMileage/1000).toFixed(1)),
                    completedOrderAvgDuration: this.checkNum(Number(x.completedOrderAvgDuration/60).toFixed()),
                    iosNewInstallUserCount: this.checkNum(x.iosNewInstallUserCount),
                    androidNewInstallUserCount: this.checkNum(x.androidNewInstallUserCount),
                    newRegisterUserCount: this.checkNum(x.newRegisterUserCount),
                    newRechargeUserCount: this.checkNum(x.newRechargeUserCount),
                    newConsumeUserCount: this.checkNum(x.newConsumeUserCount),
                    iosTotalInstallUserCount: this.checkNum(x.iosTotalInstallUserCount),
                    androidTotalInstallUserCount: this.checkNum(x.androidTotalInstallUserCount),
                    totalRegisterUserCount: this.checkNum(x.totalRegisterUserCount),
                    totalRechargeUserCount: this.checkNum(x.totalRechargeUserCount),
                    totalConsumeUserCount: this.checkNum(x.totalConsumeUserCount),
                    rechargeAmount: this.checkNum(Number(x.rechargeAmount).toFixed()),
                    balanceUserCount: this.checkNum(x.balanceUserCount),
                    cashBalance: this.checkNum(Number(x.cashBalance).toFixed()),
                    giftBalance: this.checkNum(Number(x.giftBalance).toFixed()),
                    onDutyDriverCount: this.checkNum(x.onDutyDriverCount),
                    recruitDriverCount: this.checkNum(x.recruitDriverCount),
                    quitDriverCount: this.checkNum(x.quitDriverCount),
                    onlineDriverCount: this.checkNum(x.onlineDriverCount),
                    onlineDriverPercent: x.onlineDriverCount >= 0 && x.onDutyDriverCount > 0 ? util.toThousands(Number(Number(x.onlineDriverCount/x.onDutyDriverCount*100).toFixed(1))) : '-',
                    avgOnlineDuration: this.checkNum(Number(x.avgOnlineDuration).toFixed(1)),
                    avgOvertimeDuration: this.checkNum(Number(x.avgOvertimeDuration).toFixed(1)),
                    driverAvgOrderCount: x.completedOrderCount >= 0 && x.onlineDriverCount > 0 ? util.toThousands(Number(Number(x.completedOrderCount/x.onlineDriverCount).toFixed(1))) : '-',
                    driverAvgOrderAmount: x.orderAmount >= 0 && x.onlineDriverCount > 0 ? util.toThousands(Number(Number(x.orderAmount/x.onlineDriverCount).toFixed())) : '-',
                    driverAvgCashPayAmount: x.cashPayAmount >= 0 && x.onlineDriverCount > 0 ? util.toThousands(Number(Number(x.cashPayAmount/x.onlineDriverCount).toFixed())) : '-',
                    carCount: this.checkNum(x.carCount),
                    operationCarCount: this.checkNum(x.operationCarCount),
                    accidentCarCount: this.checkNum(x.accidentCarCount),
                    maintenanceCarCount: this.checkNum(x.maintenanceCarCount),
                    onlineCarCount: this.checkNum(x.onlineCarCount),
                    onlineCarPercent:  x.onlineCarCount >= 0 && x.operationCarCount > 0 ? util.toThousands(Number(Number(x.onlineCarCount/x.operationCarCount*100).toFixed(1))) : '-',
                    complaintDriverUserCount: this.checkNum(x.complaintDriverUserCount),
                    complaintAppUserCount: this.checkNum(x.complaintAppUserCount),
                    complaintCarUserCount: this.checkNum(x.complaintCarUserCount),
                    complaintPercent: (x.complaintDriverUserCount+x.complaintAppUserCount+x.complaintCarUserCount) >=0 && x.completedOrderCount > 0 ? util.toThousands(Number(Number((x.complaintDriverUserCount+x.complaintAppUserCount+x.complaintCarUserCount)/x.completedOrderCount*100).toFixed(1))) : '-',
                    pickupPlacedOrderCount: this.checkNum(x.pickupPlacedOrderCount),
                    pickupAcceptedOrderCount: this.checkNum(x.pickupAcceptedOrderCount),
                    pickupCompletedOrderCount: this.checkNum(x.pickupCompletedOrderCount),
                    pickupOrderAmount: this.checkNum(Number(x.pickupOrderAmount).toFixed()),
                    pickupOrderAmountPercent: x.pickupOrderAmount >= 0 && x.orderAmount > 0 ? util.toThousands(Number(Number(x.pickupOrderAmount/x.orderAmount*100).toFixed(1))) : '-',
                    dropoffPlacedOrderCount: this.checkNum(x.dropoffPlacedOrderCount),
                    dropoffAcceptedOrderCount: this.checkNum(x.dropoffAcceptedOrderCount),
                    dropoffCompletedOrderCount:  this.checkNum(x.dropoffCompletedOrderCount),
                    dropoffOrderAmount:  this.checkNum(Number(x.dropoffOrderAmount).toFixed()),
                    dropoffOrderAmountPercent: x.dropoffOrderAmount >=0 && x.orderAmount > 0 ? util.toThousands(Number(Number(x.dropoffOrderAmount/x.orderAmount*100).toFixed(1))) : '-',
                    payCount: this.checkNum(x.payCount),
                    payAmount: this.checkNum(Number(x.payAmount).toFixed()),
                    balancePayCount: this.checkNum(x.balancePayCount),
                    balancePayAmount: this.checkNum(Number(x.balancePayAmount).toFixed()),
                    alipayPayCount: this.checkNum(x.alipayPayCount),
                    alipayPayAmount: this.checkNum(Number(x.alipayPayAmount).toFixed()),
                    weChatPayCount: this.checkNum(x.weChatPayCount),
                    weChatPayAmount: this.checkNum(Number(x.weChatPayAmount).toFixed()),
                    mainWorkItems:x.mainWorkItems,
                }
            });
        };
        columns=[{
            title:"日期",
            key:'date',
            width: 160,
            fixed: 'left'
        },{
            title:"总营收/元",
            key:'orderAmount',
            width: 160
        },{
            title:"现金营收/元",
            key:'cashPayAmount',
            width: 160
        },{
            title:"现金收入比/%",
            key:'cashPayPercent',
            width: 160
        },{
            title:"活跃用户数/个",
            key:'activeUserCount',
            width: 160
        },{
            title:"下单用户数/个",
            key:'placedOrderUserCount',
            width: 160
        },{
            title:"完单用户数/个",
            key:'completedOrderUserCount',
            width: 160
        },{
            title:"总下单量/个",
            key:'placedOrderCount',
            width: 160
        },{
            title:"总接单量/个",
            key:'acceptedOrderCount',
            width: 160
        },{
            title:"总完成量/个",
            key:'completedOrderCount',
            width: 160
        },{
            title:"总响应率/%",
            key:'acceptedPercent',
            width: 160
        },{
            title:"总完成率/%",
            key:'completedPercent',
            width: 160
        },{
            title:"单均营收/元",
            key:'avgOrderAmount',
            width: 160
        },{
            title:"单均现金营收/元",
            key:'avgCashPayAmount',
            width: 160
        },{
            title:"单均里程/公里",
            key:'completedOrderAvgMileage',
            width: 160
        },{
            title:"单均服务时长/分钟",
            key:'completedOrderAvgDuration',
            width: 160
        },{
            title:"ios新增下载数/个",
            key:'iosNewInstallUserCount',
            width: 160
        },{
            title:"安卓新增下载数/个",
            key:'androidNewInstallUserCount',
            width: 160
        },{
            title:"新增注册用户数/个",
            key:'newRegisterUserCount',
            width: 160
        },{
            title:"新增充值用户数/个",
            key:'newRechargeUserCount',
            width: 160
        },{
            title:"新增消费用户数/个",
            key:'newConsumeUserCount',
            width: 160
        },{
            title:"ios下载数/个",
            key:'iosTotalInstallUserCount',
            width: 160
        },{
            title:"安卓下载数/个",
            key:'androidTotalInstallUserCount',
            width: 160
        },{
            title:"累计注册数/个",
            key:'totalRegisterUserCount',
            width: 160
        },{
            title:"累计充值数/个",
            key:'totalRechargeUserCount',
            width: 160
        },{
            title:"累计消费数/个",
            key:'totalConsumeUserCount',
            width: 160
        },{
            title:"充值金额/元",
            key:'rechargeAmount',
            width: 160
        },{
            title:"余额账户数/个",
            key:'balanceUserCount',
            width: 160
        },{
            title:"现金总余额/元",
            key:'cashBalance',
            width: 160
        },{
            title:"赠送总余额/元",
            key:'giftBalance',
            width: 160
        },{
            title:"在岗人数/个",
            key:'onDutyDriverCount',
            width: 160
        },{
            title:"招募数/个",
            key:'recruitDriverCount',
            width: 160
        },{
            title:"离职数/个",
            key:'quitDriverCount',
            width: 160
        },{
            title:"上线司机数/个",
            key:'onlineDriverCount',
            width: 160
        },{
            title:"司机上线比/%",
            key:'onlineDriverPercent',
            width: 160
        },{
            title:"人均在线时长/小时",
            key:'avgOnlineDuration',
            width: 160
        },{
            title:"人均加班时长/小时",
            key:'avgOvertimeDuration',
            width: 160
        },{
            title:"人均单量/个",
            key:'driverAvgOrderCount',
            width: 160
        },{
            title:"上线人均营收/元",
            key:'driverAvgOrderAmount',
            width: 160
        },{
            title:"上线人均现金营收/元",
            key:'driverAvgCashPayAmount',
            width: 160
        },{
            title:"车辆总数/个",
            key:'carCount',
            width: 160
        },{
            title:"可营运车辆数/个",
            key:'operationCarCount',
            width: 160
        },{
            title:"事故车辆数/个",
            key:'accidentCarCount',
            width: 160
        },{
            title:"在厂车辆数/个",
            key:'maintenanceCarCount',
            width: 160
        },{
            title:"上线车辆数/个",
            key:'onlineCarCount',
            width: 160
        },{
            title:"车辆营运比/%",
            key:'onlineCarPercent',
            width: 160
        },{
            title:"投诉司机数/个",
            key:'complaintDriverUserCount',
            width: 160
        },{
            title:"投诉APP数/个",
            key:'complaintAppUserCount',
            width: 160
        },{
            title:"用车体验不佳/个",
            key:'complaintCarUserCount',
            width: 160
        },{
            title:"投诉率/%",
            key:'complaintPercent',
            width: 160
        },{
            title:"接机单下单量/个",
            key:'pickupPlacedOrderCount',
            width: 160
        },{
            title:"接机单接单量/个",
            key:'pickupAcceptedOrderCount',
            width: 160
        },{
            title:"接机单完成量/个",
            key:'pickupCompletedOrderCount',
            width: 160
        },{
            title:"接机单流水/元",
            key:'pickupOrderAmount',
            width: 160
        },{
            title:"接机单流水比/%",
            key:'pickupOrderAmountPercent',
            width: 160
        },{
            title:"送机单下单量/个",
            key:'dropoffPlacedOrderCount',
            width: 160
        },{
            title:"送机单接单量/个",
            key:'dropoffAcceptedOrderCount',
            width: 160
        },{
            title:"送机单完成量/个",
            key:'dropoffCompletedOrderCount',
            width: 160
        },{
            title:"送机单流水/元",
            key:'dropoffOrderAmount',
            width: 160
        },{
            title:"送机单流水比/%",
            key:'dropoffOrderAmountPercent',
            width: 160
        },{
            title:"订单支付数/笔",
            key:'payCount',
            width: 160
        },{
            title:"订单支付金额/元",
            key:'payAmount',
            width: 160
        },{
            title:"余额支付数/笔",
            key:'balancePayCount',
            width: 160
        },{
            title:"余额支付金额/元",
            key:'balancePayAmount',
            width: 160
        },{
            title:"支付宝支付数/笔",
            key:'alipayPayCount',
            width: 160
        },{
            title:"支付宝支付金额/元",
            key:'alipayPayAmount',
            width: 160
        },{
            title:"微信支付数/笔",
            key:'weChatPayCount',
            width: 160
        },{
            title:"微信支付金额/元",
            key:'weChatPayAmount',
            width: 160
        },{
            type:'html',
            title:"重点工作事项",
            key:'mainWorkItems',
            width: 160
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:160,
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
                                this.$store.commit('operationTarget/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit'))
                ])
            },
            fixed: 'right'
        }]
        async created(){
            this.getpage();
        }
    }
</script>