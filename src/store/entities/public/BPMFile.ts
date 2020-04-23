import Entity from '../entity'

export default class BPMFile extends Entity<string>{//附件
    requisitionID:string;
    formName:string;
    nFileName:string;
    oFileName:string;
    fileSize:number;
    flowId:string;

    
}