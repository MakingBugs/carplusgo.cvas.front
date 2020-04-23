import Entity from '../entity'
import CarPart from './carPart';
import ItemCode from '../public/itemCode';

export default class CarPartRight extends Entity<number>{
    carPartID:Number;
    oilID:Number;
    selected:Number;
    oilType:Number;
    carPart:CarPart;
    itemCode:ItemCode
}