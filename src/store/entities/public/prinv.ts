import Entity from '../entity'

export default class PRInv extends Entity<number>{//发票明细表
    incAuto:number;	    //公司別	int
    supplierAuto:number;	//廠商序號	bigint
    invCode:string;	        //發票代碼	nvarchar
    invNo:string;	        //發票號碼	nvarchar
    invDt:Date;	            //發票日期	datetime
    amount:string;	        //發票金額	decimal
    paydt:Date;	            //付款日期	datetime
    payamt:string;	        //付款金額	float
    status:number;	        //狀態	int
    cuser:number;	        //建立人	int
    cdt:Date;	            //建立時間	datetime
    muser:number;	        //修改人	int
    mdt:Date;	            //修改時間	datetime
    invType:number;	        //发票类别(1:普票;2:增票)	int
    prinvLinkAuto:number;	//发票维修关联序号	int
    accountName:string;	    //收款人	nvarchar
    accountBank:string;	    //银行名称	nvarchar
    bankAccount:string;	    //收款账号	nvarchar
    bankType:number;	    //银行别	int
    invRealAmt:string;	    //发票实际金额	decimal

}