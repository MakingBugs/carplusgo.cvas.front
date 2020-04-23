import Entity from '../entity'

export default class FileUpload extends Entity<number>{//附件
    type:number;
    docPostID:number;
    fileName:string;
    path:string;
    status:number;
    memo:string;
    cdt:Date;
    cuser:number;
    mdt:Date;
    muser:number;
    fileSize:number;
    oldFileName:string;
}