import Entity from '../entity'

//总厂牌实体类
export default class FactoryBrand extends Entity<number>{
    factoryBrandName:string;//总厂牌名称
    cdt:Date;//建立时间
    cuser:number;//建立人
    muser:number;//修改人
    mdt:Date;//修改时间
}