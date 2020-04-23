import Entity from '../entity'
import ItemCode from '../public/itemCode';

export default class CXLPFee extends Entity<number>{
    cxlpAuto:number;	    //出险理赔序号
    dzfType:number; 	    //对肇方
    feeType:number; 	    //损失费用别
    feeAmount:string;	    //损失费用金额	decimal
    feeOtherRemark:string;	//其他费用备注
    cuser:number;       	//建立人
    cdt:Date;           	//建立日期
    muser:number;       	//修改人
    mdt:Date;           	//修改时间
    dtic:number;
    dzfTypeItemCode:ItemCode;
    ftic:number;
    feeTypeItemCode:ItemCode;
}