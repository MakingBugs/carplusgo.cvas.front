import Entity from '../entity'

export default class Request extends Entity<number>{//配件请款表
    reqUser:number;  //配件请款人
    accessoriesWorkAuto:number;//配件请款单序号
    rDT:Date;//请款日期
    supplier:number;//厂商
    saleAmt:string;//销售金额
    taxAmt:string;//税额
    invoiceNO:string;//发票号码
    status:number;//配件请款状态
    cUser:number;//建表人
    cDT:Date;//建表日期
    mUser:number;//修改人
    mDT:Date;//修改时间
    iSZanJie:number;//
    isXZ:number;//是否销账 0未销账 1已销账
}