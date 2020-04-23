import Entity from '../entity'
import Location from './location';

export default class LocationManager extends Entity<number>{
    areaID:Number;
    repositoryType:Number;
    empID:string;
    isStop:Number;
    location:Location;
}