import Entity from '../entity'

export default class PRInvLinK extends Entity<number>{//维修记录和发票关联档
    prinvAuto:number;	//應付發票序號	bigint
    prtype:number;	    //PRType	int
    invSource:number;	//發票來源	int
    sourceAuto:number;	//來源序號	bigint
    linkAmt:number;	    //分擔金額	decimal


}