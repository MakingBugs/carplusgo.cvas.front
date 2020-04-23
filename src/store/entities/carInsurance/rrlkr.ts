import Entity from '../entity'

export default class RRLKR extends Entity<number>{//车险理赔请款明细表
    formType:number;	//请款表单类别(1:请款)
    lkrUser:string;	//账户名称
    lkrAccount:string;	//账号
    lkrBank:string;	//LKR_Bank
    bankType:number;	//银行别
    cuser:number;
    cdt:Date;
}