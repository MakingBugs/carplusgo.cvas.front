import Entity from '../entity'
import ItemCode from '../public/itemCode';

export default class CXLPRecord extends Entity<number>{
    cxlpAuto:number;	    //出险理赔序号
    recordContent:string;	//理赔记录内容
    contractors:number;	    //处理承办人
    caseDealWay:number;	    //出险处理方法
    cuser:number;	        //建立人
    mdt:Date;	            //修改时间
    cdt:Date;	            //建立日期
    muser:number;	            //修改人
    cdwic:number;
    cic:number;
    caseDealWayItemCode:ItemCode;
    contractorsItemCode:ItemCode;
}