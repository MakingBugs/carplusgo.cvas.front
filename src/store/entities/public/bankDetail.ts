import Entity from '../entity'
import BankType from './bankType';

export default class BankDetail extends Entity<number>{//银行明细表
    bankType:string;
    areaNumber:string;
    bankName:string;
    bankNumber:string;
    inVisible:number;
    cuser:number;
    cdt:Date;
    muser:number;
    mdt:Date;
    bankTypeData:BankType;
}