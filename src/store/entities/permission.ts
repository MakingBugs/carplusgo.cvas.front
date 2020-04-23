import Entity from './entity'

export default class Permission extends Entity<number>{
    name:string;
    title:string;
    checked:boolean;
    expand:boolean;
    children:Permission[]
}