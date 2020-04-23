import Entity from '../../entity'

export default class AccountingTitle extends Entity<number>{
    accountingElementType:String;
    name:String;
    code:String;
    level:Number;
    isActive:boolean;
    creationTime:Date;
}