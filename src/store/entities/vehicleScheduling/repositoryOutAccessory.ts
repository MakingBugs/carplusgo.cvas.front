import Entity from '../entity'
import RepositoryOut from './repositoryOut';
import CarAccessory from './carAccessory';

export default class RepositoryOutCarAccessory extends Entity<number>{
    repositoryOutID:Number;
    type:Number;
    carAccessoryID:Number;
    lack:Number;
    dueQty:Number;
    qty:Number;
    memo:String;
    repositoryOut:RepositoryOut;
    carAccessory:CarAccessory;
    disable:Boolean;
}