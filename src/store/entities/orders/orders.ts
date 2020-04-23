import Entity from '../entity'

export default class Orders extends Entity<number>{
    /**厂牌ID*/
    BrandAuto:number;//厂牌
    /**车型ID */
    ClasenAuto:number;//车型
    /**总厂牌ID */
    FactoryBrandAuto:number;
    /**车号代码 */
    CarBaseAuto:number;//车籍
    /**公司别代码 */
    IncAuto:number;//公司别代码
    //Inc Inc  公司对象
    /**客户代码 */
    TradeItemAuto:number;//对象档
    /**业代 */
    SalesAuto:number;//业代
    /**客户来源 */
    CustSource:number;//客户来源
    CustMemo:string;
    /**车辆来源 */
    CarSource:number;//车辆来源
    /**车型代码 */
    ClasenCode:string;//车型代码
    /**车色 */
    CarColor:string;//车色
    /**出厂年月 */
    CarDt:Date;//出厂年月
    /**排气量 */
    Cc:number;//排气量
    /**车号 */
    MakNo:string;//车号
    /**牌价 */
    ListPrice:number;//牌价
    /**折价 */
    DisPrice:number;//折价
    /**进价 */
    GetPrice:number;//进价
    /**配件金额 */
    Accessary:number;//配件金额
    /**佣金 */
    PushMoney:number;//佣金
    PushMan:string;
    PushManAuto:number
    PushTel:string;
    /**购置税 */
    CarTax:number;//购置税
    /**车辆成本 */
    CarCost:number;//车辆成本
    /**残值 */
    OverAmt:number;//残值
    /**保证金 */
    DptAmt:number;//保证金
    /**上海牌 */
    MakNoType:number;//上海牌
    /**购牌费 */
    MakNoCost:number;//购牌费
    /**业务类别 */
    OrderType:number;//业务类别
    /**租赁期数 */
    Mm:number;//期数
    /**承租车价 */
    RentAmt:number;
    /**承租性质 */
    RentType:number;
    /**印花税 */
    StampTax:number;
    /**售车税 */
    SellCarTax:number;
    /**过户费 */
    TrnsFee:number;
    /**付款周期 */
    PayMode:number;
    /**付款天数 */
    PayDay:number;
    /**车险性质别 */
    InsureType:number;
    /**车险座位别 */
    InsurePercnt:number;
    /**座位数 */
    Percnt:number;
    /**汽车产地 */
    CarPlace:number;
    /**计价成本利率（%） */
    RateRate:number;
    /**实际成交价利率（%） */
    FinalRate:number;
    RateMcost:number;
    RateYcost:number;
    RateTcost:number;
    RateM:number;
    RateY:number;
    RateT:number;
    RateCost:number;
    /**折旧月租金 */
    RateDpn:number;
    RateTax:number;
    RateAmt:number;
    FinalMcost:number;
    FinalYcost:number;
    FinalTcost:number;
    FinalM:number;
    FinalY:number;
    FinalT:number;
    FinalCost:number;
    FinalDpn:number;
    FinalTax:number;
    FinalAmt:number;
    Mamt:number;
    RentAmtT:number;
    RentRate:number;
    GrossMargin:number;
    GrossMarginT:number;
    OrderStatus:number;
    Memo:string;
    TaxMode:number;
    /**税率 */
    TaxRate:number;
    ChkListPrice:number;
    Cuser:number;
    Cdt:Date;
    Muser:number;
    Mdt:Date;
    LinceKm:number;
    AppDate:Date;
    /**附件1 */
    A1:string;
    /**附件2 */
    A2:string;
    /**附件3 */
    A3:string;
    /**附件4 */
    A4:string;
    /**附件5 */
    A5:string;
    /**原试算单号 */
    OrdersOld:number;
    /**试算类型 */
    PostType:number;
    IscontractLock:number;
    LockUser:number;
    LockDt:Date;
    IsthirdParty:number;
    BsType:number;
    NoInsure:number;
    Irr:number;
    Npv:number;
    IsCredit:number;
    IsCreditUser:number;
    DptType:number;
    SupplierBuy:number;
    ProjectAuto:number;
    Onetime:number;
    RepurchaseAmt:number;
    IsinsureOffer:number;
    CostAdjustment:number;
    /**首付款开票付款方式 */
    DptTaxPay:number;
    /**带垫利息成本 */
    DptTax:number;
    /**燃油种类 */
    Oil:number;
    IsCustomerCare:number;
    /**续租新车就\旧车号 */
    ReletMakno:string;
    /**续租新车否 */
    IsRelet:number;
    OnetimeTransfer:number;
    OnetimePoundage:number;
    OverAmtY:number;
    Budget01Y:number;
    CarTransfer:number;
    MakNoInc:string;
    Weight:number;
    Mm2:number;
    UseKm:number;
    /**服务费 */
    ServiceAmt:number;
    /**出库费 */
    OutFee:number;
    /**金融费 */
    FinanceFee:number;
    UrgentFee:number;
    RequisitionId:string;
    A1size:number;
    A2size:number;
    A3size:number;
    A4size:number;
    A5size:number;
}