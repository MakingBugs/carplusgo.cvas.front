import Entity from '../entity'
import Supplier from '../public/supplier';

export default class InsurancePreset extends Entity<number>{
    name:string;
    insuranceContractType:number;
    insurancePolicyType:number;
    supplierId:number;
    supplier:Supplier;
    presetInsuranceType:Array<number>;
    compulsoryInsuranceRebateRate:number;
    commercialInsuranceRebateRate:number;
    extraRebateRate:number;
    carrierLiabilityInsuranceRebateRate:number;
    remark:string;
    isActive:boolean;
}