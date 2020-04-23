import Entity from '../entity'

export default class CarAccessory extends Entity<number>{
    carAccessoryName:String;
    qty:Number;
    isStop:Number;
    carAccessoryRightList:Array<any>
}