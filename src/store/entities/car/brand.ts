import Entity from '../entity'
//厂牌实体类
export default class Brand extends Entity<number>{
    brandName:string;//厂牌名称
    cdt:Date;
    cuser:number;
    mdt:Date;
    muser:number;
    factoryBrandAuto:number;//总厂牌ID
}
