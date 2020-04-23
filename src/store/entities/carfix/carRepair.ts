import Entity from '../entity'
import ItemCode from '../public/itemCode';

export default class CarRepair extends Entity<number>{//交修主档
    carBaseAuto:number;  //车籍对象序号
    orderAuto:number;//关联申购单号
    repairDT:Date;//交修日期
    repairType:number//交修类别
    km:number//行驶里程
    repairDtpre:Date//预计完工日期
    repairName:string//交修人
    contactNumber:string//联系电话
    payMode:number//付款周期
    supplierAuto:number//维修厂商对象序号
    systemP:string//车身系统问题组合序号
    repairProblem:string//送修问题
    operatingItem:string//作业项目
    repairRecommendation:string//交修建议
    estimatedTimeFee:string//预估工时费
    estimatedPartFee:string//预估零件总金额
    estimatedTotalFee:string//预估零件总金额
    status:number//交修单状态（0：暂存；5：驳回；10：送签中；20：核准）
    finishDT:Date//完工时间
    addStatus:number//追加状态(-1:未追加；0：追加暂存；5：追加驳回；10：送签中；20：核准)
    cuser:number
    cdt:Date
    muser:number
    mdt:Date
    repairTypeItemType:number
    repairTypeItemCode:ItemCode
    payModeItemType:number
    payModeItemCode:ItemCode
    carFixType:number //是否维修请款 0否 1是
}