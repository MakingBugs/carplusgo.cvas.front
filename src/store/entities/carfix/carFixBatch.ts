import Entity from '../entity'

export default class CarFixBatch extends Entity<number>{//批次请款送件档
    totalAmt:string;	//维修批次实付总金额
    supplierAuto:number;	//维修厂商
    incAuto:number;	//公司别
    status:number;	//状态
    accBankAuto:number;	//账号明细序号
    pAyDT:Date;	//列印日期(付款日期)
    isPAy:number;	//是否付款(0:未付；1：已付)	
    bankTab:number;	//他行标记(0：他行；1：建行)	
    cuser:number;	//建表人	
    cdt:Date;	
    muser:number;
    mdt:Date;	
    requestStatus:number;	
    accountName:string;	
    accountBank:string;	
    bankAccount:string;	
    bankType:number;	
    isS:number;	
    payMode:number;	
    carFixBatchTNO:number;
    isTab:number;

}