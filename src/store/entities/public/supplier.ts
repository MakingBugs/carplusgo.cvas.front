import Entity from '../entity'
import TradeItem from '../public/tradeItem'

//厂商实体类
export default class supplier extends Entity<number>{//厂商
  TradeItem:TradeItem;//对象表
  SupplierCode:string;//对象序号
  SupplierType:number;
  IncType:number;//公司形态
  LinceBeginDt:Date;//合约起日
  LinceEndDt:Date;//合约期限
  ServiceClasen:number;//服务车型
  Whdiscount:number;//工时折数
  ItemDiscount:number;//材料折数
  BankName:string;//银行名称
  Account:string;//帐号
  AccountName:string;//户名
  PayMode:number;//付款周期
  PayDt:number;//付款日
  PayDay:number;//付款天数
  Status:number;//状态
  Cuser:number;
  Cdt:Date;
  Muser:number;
  Mdt:Date;
  SupplierT:string;//厂商类别（多个类别）
  Fid:string;
  Fname:string;
  Sname:string;
  IncCdt:Date;
  Tel:string;
  Fax:string;
  Email:string;
  Addr:string;
  ZipCode:string;
  AddrProvince:number;
  AddrCity:number;
  AddrArea:number;
}