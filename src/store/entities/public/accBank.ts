import Entity from '../entity'

export default class AccBank extends Entity<number>{//银行
  SupplierAuto:number
  Seq:number
  BankName:string
  Account:string
  AccountName:string
  Cuser:number
  Cdt:Date
  Muser:number
  Mdt:Date
  Memo:string
  IsUser:number
  BankTypeId:number
  BankDetailAuto:number
}