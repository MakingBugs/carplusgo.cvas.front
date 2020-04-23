import Entity from '../entity'
import TradeItem from './tradeItem';

export default class Inc extends Entity<number>{//公司主档
    tradeItem:TradeItem;
    fname:string;
    sname:string;
    taxCode:string;
    carTaxMode:number;
    accMemo:string;
    status:number;
    cdt:Date;
    cuser:number;
    mdt:Date;
    muser:number;
    incVirBankNo:string;
    incVirBankNm:string;
    oldBankNo:string;
    oldBankNm:string;
    licensePlate:string;
    eascode:string;
    islimitedLicense:number;
    area:number;
    incAddr:string;
    incTel:string;
    incFax:string;
    cityCode:string;
}