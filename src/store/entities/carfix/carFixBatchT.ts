import Entity from '../entity'

export default class CarFixBatchT extends Entity<number>{//维修送件批次档
    carFixBatchTNO:number;	//维修送件批次号码
    amt:string;	//批次请款总额
    status:number;   //转传票状态（0：待审核；20：核准；5：驳回）
    requestStatus:number;	//请款状态（0：未审核；20：已审核）
    payMode:number;	    //付款周期（itemcode  itemtype=123)
    isPAy:number;	//是否付款
    pAyDT:string;	    //付款日期
    cuser:number;	    //建立人
    cdt:Date;	        //建立時間
    muser:number;	    //修改人
    mdt:Date;	        //修改时间
}