import Entity from '../entity'

export default class CXLPMaterial extends Entity<number>{
    cxlpAuto:number;	            //出险理赔序号
    cxlpMaterialName:string;	    //资料名称
    cxlpMaterialURL:string;	        //资料相对地址
    cxlpMaterialType:number;	    //资料类别(0:录像;1:照片)
    cuser:number;	                //建立人
    cdt:Date;	                    //建立时间
    muser:number;	                //修改人
    mdt:Date;	                    //修改时间
    fileSize:string;	            //尺寸大小
    oldFileName:string;	            //原名称

}