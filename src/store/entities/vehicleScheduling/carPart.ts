import Entity from '../entity'

export default class CarPart extends Entity<number>{
    carPartName:String;
    isStop:Number;
    carPartRightList:Array<any>;
}