import Entity from '../entity'
import RepositoryOut from './repositoryOut';
import CarCertificate from './carCertificate';

export default class RepositoryOutCertificate extends Entity<number>{
    repositoryOutID:Number;
    type:Number;
    carCertificateID:Number;
    lack:Number;
    dueQty:Number;
    qty:Number;
    memo:String;
    repositoryOut:RepositoryOut;
    carCertificate:CarCertificate;
}