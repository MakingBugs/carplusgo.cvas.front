import Entity from '../entity'
import CarCertificate from './carCertificate';
import ItemCode from '../public/itemCode';

export default class CarCertificateRight extends Entity<number>{
    carCertificateID:Number;
    oilID:Number;
    selected:Number;
    oilType:Number;
    carCertificate:CarCertificate;
    itemCode:ItemCode
}