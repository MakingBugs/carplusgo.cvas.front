import Entity from '../entity'
import Repository from './repository';

export default class RepositoryManager extends Entity<number>{
    repositoryID:Number;
    managerID:Number;
    isStop:Number;
    isManager:Number;
    repository:Repository;
}