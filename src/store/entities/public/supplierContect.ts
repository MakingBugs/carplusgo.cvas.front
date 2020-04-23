import Entity from '../entity'

export default class SupplierContect extends Entity<number>{//厂商联络人
  SupplierAuto:number;
  Title:string;
  Tel:string;
  Email:string;
  ZipCode:string;
  MTel:string;
  Fax:string;
  Status:number;
  Province:number;
  City:number;
  Area:number;
  Address:string;
}