import Entity from '../entity'
import ItemCode from '../public/itemCode';

export default class CXLPSupplement extends Entity<number>{
    cxlpAuto:number;	        //出险序号
    supplementContent:string;	//案件补充说明内容
    contractors:number;	        //补充说明承办人
    cic:number;
    contractorsItemCode:ItemCode;
    cuser:number;	            //建表人
    cdt:Date;	                //建表时间
    muser:number;	            //修改人
    mdt:Date;	                //修改时间

}