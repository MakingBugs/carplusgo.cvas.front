import Entity from '../entity'
import InsuranceType from './insuranceType'
import InsurancePolicy from './insurancePolicy'

export default class InsuranceDetail extends Entity<number>{
    insuranceTypeId:number;
    insuranceType:InsuranceType;
    insuredAmount:number;
    originalAmount:number;
    transactionAmount:number;
    noDeductibleOriginalAmount:number;
    noDeductibleTransactionAmount:number;
    rebateAmount:number;
    extraRebateAmount:number;
    remark:string;
    insurancePolicyId:number;
    insurancePolicy:InsurancePolicy;
}