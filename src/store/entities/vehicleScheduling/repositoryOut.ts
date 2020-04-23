import Entity from '../entity'
import CarBase from '../car/carbase';
import TakeCarApply from './takeCarApply';
import TakeCar from './takeCar';
import RepositoryOutCarPart from './repositoryOutCarPart';
import RepositoryOutAccessory from './repositoryOutAccessory';
import RepositoryOutCertificate from './repositoryOutCertificate';
import RepositoryOutFile from './repositoryOutFile';

export default class RepositoryOut extends Entity<number>{
    carTakeApplyID:Number;
    carTakeID:Number;
    carBaseAuto:Number;
    makNo:String;
    outRepositoryID:Number;
    outReason:Number;
    outDate:Date;
    outKM:Number;
    outCondition:Number;
    outMemo:String;
    inRepositoryID:Number;
    inReason:Number;
    inDate:Date;
    inKM:Number;
    inCondition:Number;
    inMemo:String;
    rejectMemo:String;
    status:Number;
    carBase:CarBase;
    takeCarApply:TakeCarApply;
    takeCar:TakeCar;
    repositoryOutCarPartList:RepositoryOutCarPart[];
    repositoryOutAccessoryList:RepositoryOutAccessory[];
    repositoryOutCertificateList:RepositoryOutCertificate[];
    repositoryOutFileList:RepositoryOutFile[];
}