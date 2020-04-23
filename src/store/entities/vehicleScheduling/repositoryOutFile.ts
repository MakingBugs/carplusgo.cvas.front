import Entity from '../entity'

export default class RepositoryOutFile extends Entity<number>{
    repositoryOutID:Number;
    type:Number;
    status:Number;
    fileName:String;
    url:String;
}