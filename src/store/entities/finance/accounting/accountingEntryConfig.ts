import Entity from '../../entity'
import AccountingTitle from './accountingTitle';

export default class AccountingEntryConfig extends Entity<number>{
        name:string;
        creationTime:Date;
        parentId:string;
        isMaster:boolean;
        children:Array<AccountingEntryConfig>;
        elementChangeDirection:string;
        sort:Number;
        accountingTitleId:string;
        accountingTitle:AccountingTitle;
        isActive:boolean;
}