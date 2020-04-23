import Entity from '../entity'

export default class InsuranceType extends Entity<number>{
    id:number;
    name:string;   //险种名称
    remark:string;    //备注
    isActive:boolean;
}