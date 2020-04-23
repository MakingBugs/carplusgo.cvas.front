import Entity from '../entity'

export default class CarFix extends Entity<number>{//维修表
    carBaseAuto:number;	//车籍序號
    orderAuto:number;//契約編號
    supplierAuto:number;	//廠商序號
    carFixNo:string;	//工單號碼
    makNo:string;	//車牌號碼
    custName:string;	//送修人
    fixDT:Date;	//進廠日期
    fixDTPre:Date;	//預計完修日
    fixDTReal:Date;	//實際完修日
    km:number;	//維修里程
    fixType:number;	//維修類別
    mainTainKM:number;	//定保類別
    wHAmount:string;	//工時費
    wHDisCount:string;	//WHDisCount
    itemAmount:string;	//材料費
    itemDisCount:string;	//材料費折扣
    realAmount:string;	//實付金額
    status:number;	//狀態
    cuser:number;	//建立人
    cdt:Date;	//建立時間
    muser:number;	//修改人
    mdt:Date;	//修改時間
    accBankAuto:number;	//厂商账户明细序号
    carFixBatchAuto:number;	//维修送件批次
    remark:string;	//Remark
    carFixBatchTNO:number;	//CarFixBatchTNO
    payMode:number;	//PayMode
    carRepairAuto:number;	//CarRepair_Auto
    nextMaintainKM:number;	//下次保养里程
    nextMaintainDT:Date;	//下次保养日期
    preNextMaintainDT:Date;	//预估下次保养日期
    itemCodeFixType:number;
    itemCodeStatus:number;
}