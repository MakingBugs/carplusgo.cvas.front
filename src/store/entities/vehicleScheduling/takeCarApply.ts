import Entity from '../entity'
import Location from './location';
import FactoryBrand from '../car/factorybrand';
import Brand from '../car/brand';
import ItemCode from '../public/itemCode';

export default class TakeCarApply extends Entity<number>{
    areaID:Number;
    location:Location;
    type:Number;
    itemTypeCode:ItemCode;
    takeDate:Date;
    takeQty:Number;
    factory:Number;
    factoryBrand:FactoryBrand;
    brand:Number;
    brandData:Brand;
    clasen:Number;
    clasenData:any;
    memo:String;
    cancelMemo:String;
    status:Number;
    itemStatusCode:ItemCode;
    takeCarList:Array<any>;
}