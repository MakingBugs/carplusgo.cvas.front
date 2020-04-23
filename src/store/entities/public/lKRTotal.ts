import Entity from '../entity'

export default class LKRTotal extends Entity<number>{//收款人信息表
    lKRName:string;     //收款人姓名
    lKRBank:string;     //收款银行
    lKRBankType:number; //收款银行别
    lKRAcount:string;   //收款账号
    isOn:number;        //是否在使用
    Cuser:number;
    Cdt:Date;
    Muser:number;
    Mdt:Date;
}