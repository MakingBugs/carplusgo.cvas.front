import Entity from '../entity'

export default class Customer extends Entity<number>{//客户
    tradeItemAuto:number;	//對象序號	bigint
    custID:string;	//客户编号	nvarchar
    custType:number;	//客户类别	int
    incType:number;	//公司型态	int
    bossName:string;	//負責人姓名	nvarchar
    bossIDType:number;	//負責人证件类别	int
    bossFID:string;	//負責人身分证号	nvarchar
    bossBirthday:Date;	//負責人出生日期	datetime
    salesAuto:number;	//業務員序號	bigint
    status:number;	//狀態	int
    cdt:Date;	//建立人	datetime
    cuser:number;	//建立時間	int
    mdt:Date;	//修改人	datetime
    muser:number;	//修改時間	int
    sreaAuto:number;	//Area_auto	bigint
    incLev:number;	//客戶等級	int
    sex:number;	//sex	int
    idenType:number;	//IdenType	int
    isVIP:number;	//IsVIP	int
    vipMemo:string;	//VIPMemo	nvarchar
    taxType:number;	//TaxType	int
    taxBankNm:string;	//TaxBankNm	nvarchar
    taxBankNo:string;	//TaxBankNo	nvarchar
    regCapital:number;	//RegCapital	int
    recCapital:number;	//RecCapital	int
    moneyType:number;	//MoneyType	int
    makInvPro:number;	//MakInvPro	int
    makInvCity:number;	//MakInvCity	int
    makInvArea:number;	//MakInvArea	int
    makInvAddr:string;	//MakInvAddr	nvarchar
    makInvTel:string;	//MakInvTel	nvarchar
    regType:number;	//RegType	int
}