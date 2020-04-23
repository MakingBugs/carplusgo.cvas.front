import Entity from '../entity'
import Location from './location';

export default class Repository extends Entity<number>{
    repositoryType:Number;
    repositoryName:string;
    areaID:Number;
    isStop:Number;
    location:Location;
}