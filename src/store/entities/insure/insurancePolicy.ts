import Entity from '../entity'
import CarBase from '../car/carbase'
import Supplier from '../public/supplier'
import InsuranceDetail from './insuranceDetail'

export default class InsurancePolicy extends Entity<number>{
    carBaseId:number;
    carBase:CarBase;
    supplierId:number;
    supplier:Supplier;
    insuranceContractType:number;
    insurancePolicyType:number;
    insurancePolicyStatus:number;
    insuranceNum:string;
    startTime:Date;
    endTime:Date;
    compulsoryInsuranceRebateRate:number;
    commercialInsuranceRebateRate:number;
    extraRebateRate:number;
    carrierLiabilityInsuranceRebateRate:number;
    insuranceDetails:Array<InsuranceDetail>;
}