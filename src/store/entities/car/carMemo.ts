import Entity from '../entity'

export default class CarMemo extends Entity<number>{
    orderAuto:number;
    carMakNo:string;
    carMemoText:string;
    cuser:number;
    cdate:Date;
}
