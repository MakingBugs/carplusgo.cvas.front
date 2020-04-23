import Entity from '../entity'
import BankType from '../public/bankType';

export default class CXLPPFDetail extends Entity<number>{
    cxlpAuto:number;	//CXLP_Auto	bigint
    accountName:string;	//账户名称	nvarchar
    acountBank:string;	//开户行	nvarchar
    bankAccount:string;	//银行账号	nvarchar
    pfAmt:string;	//赔付金额	decimal
    cuser:number;
    cdt:Date;
    muser:number;
    mdt:Date;
    bankType:number;	//银行别
    BankTypeData:BankType;
}