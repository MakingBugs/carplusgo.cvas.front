import Entity from '../entity'

export default class CarFixItem extends Entity<number>{//维修配件明细表
    carFixAuto:number;	//維修序號
    itemName:string;	//零件名稱
    itemCount:number;   //零件數量
    itemAmount:string;	//零件單價
    payType:number;	    //付費類別
    itemType:string;	//零件類別
    memo:string;	    //零件備註
    seq:number;	            
    cuser:number;	    //建立人
    cdt:Date;	        //建立時間
    muser:number;	    //修改人
    mdt:Date;	        //修改时间
}