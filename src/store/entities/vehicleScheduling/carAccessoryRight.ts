import Entity from '../entity'
import CarAccessory from './carAccessory';
import ItemCode from '../public/itemCode';

export default class CarAccessoryRight extends Entity<number>{
    carAccessoryID:Number;
    oilID:Number;
    selected:Number;
    oilType:Number;
    carAccessory:CarAccessory;
    itemCode:ItemCode
}