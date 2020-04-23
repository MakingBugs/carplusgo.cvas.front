import Entity from '../entity'
import AccessoriesType from './accessoriesType';
import ItemCode from '../public/itemCode';

export default class AccessoriesTs extends Entity<number>{//配件类别厂商关联表
    accessoriesTypeAuto:number;
    accessoriesType:AccessoriesType;
    itemType:number;
    supplier:number;  
    itemCode:ItemCode;
    purchasePrice:number;
    sellingPrice:number;
    cuser:number;
    cdt:Date;
    muser:number;
    mdt:Date;
    costPrice:number;
}