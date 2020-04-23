import Entity from '../entity'

export default class AccessoriesMainType extends Entity<number>{//配件主类型表
    accessoriesMainName:string;  
    cuser:number;
    cdt:Date;
    muser:number;
    mdt:Date;
}