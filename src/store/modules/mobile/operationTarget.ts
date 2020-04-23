import {Store,Module,ActionContext} from 'vuex' 
import ListModule from '../list-module' 
import ListState from '../list-state' 
import Ajax from '../../../lib/ajax' 
import Excel from '../../../lib/excel' 
import PageResult from '@/store/entities/page-result'

interface OperationTargetState extends ListState<any>{
    editOperationTarget:any;
    exportLoading:boolean;
}
class OperationTargetModule extends ListModule<OperationTargetState,any,any>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<any>(),
        loading:false,
        editOperationTarget:{},
        exportLoading:false, 
    }
    actions={
        async getAll(context:ActionContext<OperationTargetState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/OperationTarget/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<any>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async exportAll(context:ActionContext<OperationTargetState,any>,payload:any){ 
            const checkNum = function(value:any){
                return Number(value) >= 0 ? value : '-';
            }
            context.state.exportLoading=true; 
            let reponse=await Ajax.post('/api/services/app/OperationTarget/GetAll',payload.data.pagerequest); 
            let page=reponse.data.result as PageResult<any>;
            let exportData = page.items.map(x=>{
                return {
                    date:new Date(x.date).getFullYear()+'-'+(new Date(x.date).getMonth()+1)+'-'+new Date(x.date).getDate(),
                    orderAmount: checkNum(Number(x.orderAmount).toFixed()),
                    cashPayAmount: checkNum(Number(x.cashPayAmount).toFixed()),
                    cashPayPercent: x.cashPayAmount >= 0 && x.orderAmount > 0 ? Number(x.cashPayAmount/x.orderAmount*100).toFixed(1) : '-',
                    activeUserCount: checkNum(x.activeUserCount),
                    placedOrderUserCount: checkNum(x.placedOrderUserCount),
                    completedOrderUserCount: checkNum(x.completedOrderUserCount),
                    placedOrderCount: checkNum(x.placedOrderCount),
                    acceptedOrderCount: checkNum(x.acceptedOrderCount),
                    completedOrderCount: checkNum(x.completedOrderCount),
                    acceptedPercent: x.acceptedOrderCount >= 0 && x.placedOrderCount > 0 ? Number(x.acceptedOrderCount/x.placedOrderCount*100).toFixed(1) : '-',
                    completedPercent: x.completedOrderCount >= 0 && x.placedOrderCount > 0 ? Number(x.completedOrderCount/x.placedOrderCount*100).toFixed(1) : '-',
                    avgOrderAmount: x.orderAmount >= 0 && x.completedOrderCount > 0 ? Number(x.orderAmount/x.completedOrderCount).toFixed() : '-',
                    avgCashPayAmount: checkNum(Number(x.avgCashPayAmount).toFixed()),
                    completedOrderAvgMileage: checkNum(Number(x.completedOrderAvgMileage/1000).toFixed(1)),
                    completedOrderAvgDuration: checkNum(Number(x.completedOrderAvgDuration/60).toFixed()),
                    iosNewInstallUserCount: checkNum(x.iosNewInstallUserCount),
                    androidNewInstallUserCount: checkNum(x.androidNewInstallUserCount),
                    newRegisterUserCount: checkNum(x.newRegisterUserCount),
                    newRechargeUserCount: checkNum(x.newRechargeUserCount),
                    newConsumeUserCount: checkNum(x.newConsumeUserCount),
                    iosTotalInstallUserCount: checkNum(x.iosTotalInstallUserCount),
                    androidTotalInstallUserCount: checkNum(x.androidTotalInstallUserCount),
                    totalRegisterUserCount: checkNum(x.totalRegisterUserCount),
                    totalRechargeUserCount: checkNum(x.totalRechargeUserCount),
                    totalConsumeUserCount: checkNum(x.totalConsumeUserCount),
                    rechargeAmount: checkNum(Number(x.rechargeAmount).toFixed()),
                    balanceUserCount: checkNum(x.balanceUserCount),
                    cashBalance: checkNum(Number(x.cashBalance).toFixed()),
                    giftBalance: checkNum(Number(x.giftBalance).toFixed()),
                    onDutyDriverCount: checkNum(x.onDutyDriverCount),
                    recruitDriverCount: checkNum(x.recruitDriverCount),
                    quitDriverCount: checkNum(x.quitDriverCount),
                    onlineDriverCount: checkNum(x.onlineDriverCount),
                    onlineDriverPercent: x.onlineDriverCount >= 0 && x.onDutyDriverCount > 0 ? Number(x.onlineDriverCount/x.onDutyDriverCount*100).toFixed(1) : '-',
                    avgOnlineDuration: checkNum(Number(x.avgOnlineDuration).toFixed(1)),
                    avgOvertimeDuration: checkNum(Number(x.avgOvertimeDuration).toFixed(1)),
                    driverAvgOrderCount: x.completedOrderCount >= 0 && x.onlineDriverCount > 0 ? Number(x.completedOrderCount/x.onlineDriverCount).toFixed(1) : '-',
                    driverAvgOrderAmount: x.orderAmount >= 0 && x.onlineDriverCount > 0 ? Number(x.orderAmount/x.onlineDriverCount).toFixed() : '-',
                    driverAvgCashPayAmount: x.cashPayAmount >= 0 && x.onlineDriverCount > 0 ? Number(x.cashPayAmount/x.onlineDriverCount).toFixed() : '-',
                    carCount: checkNum(x.carCount),
                    operationCarCount: checkNum(x.operationCarCount),
                    accidentCarCount: checkNum(x.accidentCarCount),
                    maintenanceCarCount: checkNum(x.maintenanceCarCount),
                    onlineCarCount: checkNum(x.onlineCarCount),
                    onlineCarPercent:  x.onlineCarCount >= 0 && x.operationCarCount > 0 ? Number(x.onlineCarCount/x.operationCarCount*100).toFixed(1) : '-',
                    complaintDriverUserCount: checkNum(x.complaintDriverUserCount),
                    complaintAppUserCount: checkNum(x.complaintAppUserCount),
                    complaintCarUserCount: checkNum(x.complaintCarUserCount),
                    complaintPercent: (x.complaintDriverUserCount+x.complaintAppUserCount+x.complaintCarUserCount) >=0 && x.completedOrderCount > 0 ? Number((x.complaintDriverUserCount+x.complaintAppUserCount+x.complaintCarUserCount)/x.completedOrderCount*100).toFixed(1) : '-',
                    pickupPlacedOrderCount: checkNum(x.pickupPlacedOrderCount),
                    pickupAcceptedOrderCount: checkNum(x.pickupAcceptedOrderCount),
                    pickupCompletedOrderCount: checkNum(x.pickupCompletedOrderCount),
                    pickupOrderAmount: checkNum(Number(x.pickupOrderAmount).toFixed()),
                    pickupOrderAmountPercent: x.pickupOrderAmount >= 0 && x.orderAmount > 0 ? Number(x.pickupOrderAmount/x.orderAmount*100).toFixed(1) : '-',
                    dropoffPlacedOrderCount: checkNum(x.dropoffPlacedOrderCount),
                    dropoffAcceptedOrderCount: checkNum(x.dropoffAcceptedOrderCount),
                    dropoffCompletedOrderCount:  checkNum(x.dropoffCompletedOrderCount),
                    dropoffOrderAmount:  checkNum(Number(x.dropoffOrderAmount).toFixed()),
                    dropoffOrderAmountPercent: x.dropoffOrderAmount >=0 && x.orderAmount > 0 ? Number(x.dropoffOrderAmount/x.orderAmount*100).toFixed(1) : '-',
                    payCount: checkNum(x.payCount),
                    payAmount: checkNum(Number(x.payAmount).toFixed()),
                    balancePayCount: checkNum(x.balancePayCount),
                    balancePayAmount: checkNum(Number(x.balancePayAmount).toFixed()),
                    alipayPayCount: checkNum(x.alipayPayCount),
                    alipayPayAmount: checkNum(Number(x.alipayPayAmount).toFixed()),
                    weChatPayCount: checkNum(x.weChatPayCount),
                    weChatPayAmount: checkNum(Number(x.weChatPayAmount).toFixed()),
                    mainWorkItems:x.mainWorkItems,
                }
            });
            let params = { 
                title: payload.data.columns.map(value=>value.title), 
                key: payload.data.columns.map(value=>value.key), 
                data: exportData, 
                autoWidth: true, 
                filename: "营运指标" 
            }; 
            Excel.export_array_to_excel(params) 
            context.state.exportLoading=false; 
        },
        async update(context:ActionContext<OperationTargetState,any>,payload:any){
            await Ajax.post('/api/services/app/OperationTarget/Update',payload.data);
        }
    };
    mutations={
        setCurrentPage(state:OperationTargetState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:OperationTargetState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:OperationTargetState,tenant:any){
            state.editOperationTarget=state.list.find(x=>x.id === tenant.id);
        }
    }
}
const operationTargetModule=new OperationTargetModule();
export default operationTargetModule;