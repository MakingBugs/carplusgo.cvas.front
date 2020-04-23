import Entity from '../entity'
import TakeCarApply from './takeCarApply';
import ItemCode from '../public/itemCode';
import CarBase from '../car/carbase';

export default class TakeCar extends Entity<number>{
    carTakeApplyID:Number;
    takeCarApply:TakeCarApply;
    carBaseID:Location;
    carBase:CarBase;
    status:Number;
    itemStatusCode:ItemCode
}