import Entity from '../entity'

export default class ItemCode extends Entity<number>{//类别明细表
    itemType:number;
    num:number;
    itemName:string;
    memo:string;
    isActive:number;
    seq:number;
    v1:string;
    v2:string;
    a1:string;
}