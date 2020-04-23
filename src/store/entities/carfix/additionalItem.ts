import Entity from '../entity'

export default class AdditionalItem extends Entity<number>{//追加表
    carRepairAuto:number;	//交修单号
    additionalItem1:string;	//追加项目内容
    status:number;          //状态(0:暂存;5:驳回;10:送件中;20:核准)
    serialNumber:number;	//追加次序
    cuser:number;	        //创立人
    cdt:Date;	            //创立时间
    muser:number;	        //修改人
    mdt:Date;	            //修改时间
}