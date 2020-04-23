import Entity from '../entity' 
import InsurancePolicy from './insurancePolicy' 
 
export default class InsuranceApproval extends Entity<number>{ 
    amount:number; 
    insuranceApprovalType:number; 
    insuranceApprovalStatus:number; 
    insurancePolicyId:number; 
    insurancePolicy:InsurancePolicy; 
}