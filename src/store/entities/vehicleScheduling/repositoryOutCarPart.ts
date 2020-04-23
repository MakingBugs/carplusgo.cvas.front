import Entity from '../entity'
import RepositoryOut from './repositoryOut';
import CarPart from './carPart';
import ItemCode from '../public/itemCode';

export default class RepositoryOutCarPart extends Entity<number>{
    repositoryOutID:Number;
    type:Number;
    carPartID:Number;
    status:Number;
    memo:String;
    itemStatus:Number;
    repositoryOut:RepositoryOut;
    carPart:CarPart;
    itemCode:ItemCode;
}