import Entity from "../entity";

export default class AccessoriesWork extends Entity<number>{//配件派工单主档
    orderAuto:number;
    carbaseAuto:number;
    accessary:string;
    sCDT:Date;
    preOverDT:Date;
    remark:string;
    status:number;
    cuser:number;
    cdt:Date;
    muser:number;
    mdt:Date;
    isGPS:number;
    ordersAuto:number;
}