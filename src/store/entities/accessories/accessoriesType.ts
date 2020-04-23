import Entity from "../entity";
import AccessoriesMainType from "./accessoriesMainType";

export default class AccessoriesType extends Entity<number>{//配件类型表
    accessoriesMainTypeAuto:number;
    accessoriesMainType:AccessoriesMainType;
    accessoriesTypeName:string;
    purchasePrice:number;
    sellingPrice:number;
    cuser:number;
    cdt:Date;
    muser:number;
    mdt:Date;
}