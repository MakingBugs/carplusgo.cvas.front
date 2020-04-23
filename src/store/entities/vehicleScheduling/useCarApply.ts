import Entity from '../entity'

export default class UseCarApply extends Entity<number>{
  useReason:bigint
  areaID:bigint
  preUseDT:Date
  preReutrnDT:Date
  preClasen:bigint
  cc:Number
  empID:Number
  user:string
  tel:string
  customerName:string
  status:Number
  repositoryID:bigint
  makNo:string
  carBase:bigint
  carBaseData:object
  rejectMemo:string
  outDT:Date
  outKM:Number
  taker:string
  outProvider:string
  outMemo:string
  reutrnDT:Date
  returner:string
  returnPervider:string
  returnMemo:string
  useMemo:string
  itemType:Number
}