import Entity from '../entity'

export default class ReadyBPM extends Entity<string>{//BPM关联表
    requisitionID:string;
    diagramID:string;
    applicantDept:string;
    applicantDeptName:string;
    applicantID:string;
    applicantName:string;
    fillerID:string;
    fillerName:string;
    applicantDateTime:Date;
    priority:number;
    draftFlag:number;
    flowActivated:number;
    tagId:string;
    flowId:string;
    formName:string;
}