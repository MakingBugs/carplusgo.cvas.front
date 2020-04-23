import Entity from "../entity";

export default class Accessories extends Entity<number>{//配件表
    accessoriesWorkAuto:number;//配件派工单序号
    accessoriesTypeAuto:number;//配件类别序号
    supplier:number;//配件厂商
    amt:number;//实付金额
    purchasePrice:number;//厂商进价
    location:string;//施工位置
    seat:string;//座位数
    remark:string;//施工及价格变动说明
    status:number;//配件请款审核状态 0新增暂存 -1已删除 5驳回 10送签 20核准
    requestAuto:number;//请款序号
    accessoriesTSAuto:number;//配件和厂商关联序号
    cUser:number;//建表人
    cDT:Date;//建表时间
    mUser:number;//修改人
    mDT:Date;//修改时间
}