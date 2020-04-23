import Entity from '../entity'
import ItemCode from '../public/itemCode';

export default class CXLPDZF extends Entity<number>{
    cxlpAuto:number;	//出险理赔序号
    dzfType:number;	    //对肇方
    isInjured:number;	//是否人伤
    makNO:string;   	//车号
    clasenName:string;	//车型
    iNSINC:string;  	//承保公司
    owner:string;   	//车主
    driver:string;  	//驾驶员
    phone:string;	    //联系电话
    remark:string;  	//备注
    needFile:number;	//应备文件
    makeFile:number;	//已交文件
    needFileNum:number;	//应备文件数量
    makeFileNum:number;	//已交文件数量
    cuser:number;   	//建立人
    cdt:Date;       	//建立时间
    muser:number;	    //修改人
    mdt:Date;	        //修改时间
    tjclFile:number;	//提交材料value之和
    tjclNum:number;	    //提交材料数量
    qjdbFile:number;	//缺件待补value之和	
    qjdbNum:number;	    //缺件待补数量
    dzfWXC:string;	    //对肇方维修厂
    dtic:number;
    dzfTypeItemCode:ItemCode;
}