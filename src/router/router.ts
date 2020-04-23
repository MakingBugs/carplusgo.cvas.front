declare global {
    interface RouterMeta {
        title: string;
    }
    interface Router {
        path: string;
        name: string;
        icon?: string;
        permission?: string;
        meta?: RouterMeta;
        component: any;
        children?: Array<Router>;
    }
    interface System {
        import(request: string): Promise<any>
    }
    var System: System
}
import main from '../views/main.vue'

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const loginRouter: Router = {
    path: '/',
    name: 'login',
    meta: {
        title: 'LogIn'
    },
    component: () => import('../views/login.vue')
};
export const otherRouters: Router = {
    path: '/main',
    name: 'main',
    permission: '',
    meta: { title: 'ManageMenu' },
    component: main,
    children: [
        { path: 'home', meta: { title: 'HomePage' }, name: 'home', component: () => import('../views/home/home.vue') }
    ]
}
export const appRouters: Array<Router> = [{
    path: '/setting',
    name: 'setting',
    permission: '',
    meta: { title: 'ManageMenu' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'user', permission: 'Pages.Users', meta: { title: 'Users' }, name: 'user', component: () => import('../views/setting/user/user.vue') },
        { path: 'role', permission: 'Pages.Roles', meta: { title: 'Roles' }, name: 'role', component: () => import('../views/setting/role/role.vue') },
        { path: 'tenant', permission: 'Pages.Tenants', meta: { title: 'Tenants' }, name: 'tenant', component: () => import('../views/setting/tenant/tenant.vue') }
    ]
},{
    path: '/finance',
    name: 'finance',
    permission: '',
    meta: { title: 'FinanceManagement' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'accountingTitle',permission: 'Pages.Finance.AccountingTitle', meta: { title: 'AccountingTitle' }, name: 'accountingTitle', component: () => import('../views/finance/accounting/title/title.vue') },
        { path: 'accountingEntryConfig',permission: 'Pages.Finance.AccountingEntryConfig', meta: { title: 'AccountingEntryConfig' }, name: 'accountingEntryConfig', component: () => import('../views/finance/accounting/entryConfig/entryConfig.vue') }
    ]
},{
    path: '/insure',
    name: 'insure',
    permission: '',
    meta: { title: '保险' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'insuranceType', permission:'Pages.InsuranceType',  meta: { title: '保险种类配置' }, name: 'insuranceType', component: () => import('../views/insure/insuranceType/insuranceType.vue') },
        { path: 'insurancePreset', permission:'Pages.InsurancePreset',  meta: { title: '保险预设配置' }, name: 'insurancePreset', component: () => import('../views/insure/insurancePreset/insurancePreset.vue') },
        { path: 'vehicleInsure', permission:'Pages.VehicleInsure', meta: { title: '车辆投保' }, name: 'vehicleInsure', component: () => import('../views/insure/vehicleInsure/vehicleInsure.vue') },
        { path: 'insurancePolicy', permission:'Pages.InsurancePolicy',  meta: { title: '保单' }, name: 'insurancePolicy', component: () => import('../views/insure/insurancePolicy/insurancePolicy.vue') },
    ]
},{
    path: '/accessories',
    name: 'accessories',
    permission: '',
    meta: { title: '配件' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'accessoriesMainType', permission:'',  meta: { title: '主配件维护' }, name: 'AccessoriesMainType', component: () => import('../views/accessories/accessoriesMainType/accessoriesMainType.vue') },
        { path: 'accessoriesType', permission:'',  meta: { title: '配件类别维护' }, name: 'AccessoriesType', component: () => import('../views/accessories/accessoriesType/accessoriesType.vue') },
        { path: 'accessoriesTs', permission:'',  meta: { title: '配件厂商关联' }, name: 'AccessoriesTs', component: () => import('../views/accessories/accessoriesTs/accessoriesTs.vue') },
        { path: 'accessoriesWork', permission:'',  meta: { title: '配件派工单' }, name: 'AccessoriesWork', component: () => import('../views/accessories/accessoriesWork/accessoriesWork.vue') },
        { path: 'request', permission:'',  meta: { title: '配件请款单' }, name: 'request', component: () => import('../views/accessories/accessoriesRequest/request.vue') },
    ]
},{
    path: '/OrdersMenu',
    name: 'OrdersMenu',
    permission: '',
    meta: { title: '试算' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'orders', permission:'',  meta: { title: '试算报价' }, name: 'orders', component: () => import('../views/OrdersMenu/orders/orders.vue') }
    ]
},{
    path: '/SupplierMenu',
    name: 'SupplierMenu',
    permission: '',
    meta: { title: '厂商' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'Supplier', permission:'Pages.Supplier', meta: { title: '厂商维护' }, name: 'Supplier', component: () => import('../views/SupplierMenu/Supplier/supplier.vue') }
    ]
},{
    path: '/carfix',
    name: 'carfix',
    permission: '',
    meta: { title: '维修' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'carRepair', permission:'Pages.CarRepair', meta: { title: '交修单维护' }, name: 'carRepair', component: () => import('../views/carfix/carRepair/carRepair.vue') },
        { path: 'carFix', permission:'Pages.CarFix', meta: { title: '维修维护' }, name: 'carFix', component: () => import('../views/carfix/carFixMenu/carFix.vue') },
        { path: 'carFixSend', permission:'Pages.CarFixSend', meta: { title: '维修送件' }, name: 'carFixSend', component: () => import('../views/carfix/carFixSend/carFixSend.vue') },
        { path:'carFixQuery', permission:'', meta:{title:'维修查询'}, name:'carFixQuery', component: () => import('../views/carfix/carFixQuery/carFixQuery.vue')}
    ]
},{
    path: '/car',
    name: 'car',
    permission: '',
    meta: { title: '车辆' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'carbase', permission:'Pages.Carbase', meta: { title: '车籍维护' }, name: 'carbase', component: () => import('../views/car/carBaseMenu/carBase.vue') },
    ]
},{
    path: '/carInsurance',
    name: 'carInsurance',
    permission: '',
    meta: { title: '车险' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'cxlp', permission:'Pages.Cxlp', meta: { title: '车险理赔' }, name: 'cxlp', component: () => import('../views/carInsurance/cxlp/cxlp.vue') },
        { path: 'cxlpQuery', permission:'Pages.CxlpQuery', meta: { title: '出险查询' }, name: 'cxlpQuery', component: () => import('../views/carInsurance/cxlpQuery/cxlpQuery.vue') },
        { path: 'cxlpQ', permission:'Pages.CxlpQ', meta: { title: '车险理赔查询' }, name: 'cxlpQ', component: () => import('../views/carInsurance/cxlpQuery/cxlpQ.vue') },
        { path: 'bankDetail', permission:'Pages.BankDetail', meta: { title: '银行信息维护' }, name: 'bankDetail', component: () => import('../views/carInsurance/bankDetail/bankDetail.vue') },
    ]
},{
    path: '/mobile',
    name: 'mobile',
    permission: '',
    meta: { title: '移动端' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'mobileOrder', permission:'Pages.MobileOrder', meta: { title: '订单数据' }, name: 'mobileOrder', component: () => import('../views/mobile/mobileOrder/mobileOrder.vue') },
        { path: 'operationTarget', permission:'Pages.OperationTarget', meta: { title: '营运指标' }, name: 'operationTarget', component: () => import('../views/mobile/operationTarget/operationTarget.vue') },
        { path: 'targetConfig', permission:'Pages.TargetConfig', meta: { title: '目标配置' }, name: 'targetConfig', component: () => import('../views/mobile/targetConfig/targetConfig.vue') },
    ]
},{
    path: '/vehicleScheduling',
    name: 'vehicleScheduling',
    permission: '',
    meta: { title: '车辆调度' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'warehouseArea', permission:'Pages.WarehouseArea', meta: { title: '区域维护' }, name: 'warehouseArea', component: () => import('../views/vehicleScheduling/warehousearea/warehouseArea.vue') },
        { path: 'warehouse', permission:'Pages.Warehouse',meta: { title: '仓库维护' }, name: 'warehouse', component: () => import('../views/vehicleScheduling/warehouse/warehouse.vue') },
        { path:'vehicleCertificate', permission:'Pages.VehicleCertificate', meta: { title: '车辆随车证件维护'}, name: 'vehicleCertificate', component: () => import('../views/vehicleScheduling/vehicleCertificate/vehicleCertificate.vue') },
        { path:'vehicleAccessories', permission:'Pages.VehicleAccessories', meta: { title: '车辆随车配件维护'}, name: 'vehicleAccessories', component: () => import('../views/vehicleScheduling/vehicleAccessories/vehicleAccessories.vue') },
        { path: 'vehicleParts', permission:'Pages.VehicleParts', meta: { title: '车辆部位维护' }, name: 'vehicleParts', component: () => import('../views/vehicleScheduling/vehicleParts/vehicleParts.vue') },
        { path: 'takeCarApply', permission:'Pages.TakeCarApply', meta: { title: '车辆取用整备作业' }, name: 'takeCarApply', component: () => import('../views/vehicleScheduling/takeCarApply/takeCarApply.vue') },
        { path: 'vehicleLoading', permission:'Pages.VehicleLoading', meta: { title: '车辆入库作业' }, name: 'vehicleLoading', component: () => import('../views/vehicleScheduling/vehicleLoading/vehicleLoading.vue') },
        { path: 'vehicleUnloading', permission:'Pages.VehicleUnloading', meta: { title: '车辆出库作业' }, name: 'vehicleUnloading', component: () => import('../views/vehicleScheduling/vehicleUnloading/vehicleUnloading.vue') },
        { path: 'useCarApply', permission:'Pages.UseCarApply',meta: { title: '出还车作业' }, name: 'useCarApply', component: () => import('@/views/vehicleScheduling/useCarApply/usecarapply.vue') }
    ]
}]
export const routers = [
    loginRouter,
    locking,
    ...appRouters,
    otherRouters
];
