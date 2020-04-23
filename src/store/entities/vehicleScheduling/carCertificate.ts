import Entity from '../entity'

export default class CarCertificate extends Entity<number>{
    carCertificateName:String;
    qty:Number;
    isStop:Number;
    carCertificateRightList:Array<any>
}