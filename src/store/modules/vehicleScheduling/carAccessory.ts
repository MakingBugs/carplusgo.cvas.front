import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarAccessory from '../../entities/vehicleScheduling/carAccessory'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarAccessoryState extends ListState<CarAccessory>{
    editCarAccessory:CarAccessory;
}
class CarAccessoryModule extends ListModule<CarAccessoryState,any,CarAccessory>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarAccessory>(),
        loading:false,
        editCarAccessory:new CarAccessory(),
    }
    actions={
        async getAll(context:ActionContext<CarAccessoryState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarAccessory/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarAccessory>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<CarAccessoryState,any>,payload:any){
            await Ajax.post('/api/services/app/CarAccessory/Create',payload.data);
        },
        async update(context:ActionContext<CarAccessoryState,any>,payload:any){
            await Ajax.post('/api/services/app/CarAccessory/Update',payload.data);
        },
        async delete(context:ActionContext<CarAccessoryState,any>,payload:any){
            await Ajax.post('/api/services/app/CarAccessory/Delete',payload.data);
        },
        async get(context:ActionContext<CarAccessoryState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarAccessory/Get',payload);
            return reponse.data.result as CarAccessory;
        }
    };
    mutations={
        setCurrentPage(state:CarAccessoryState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarAccessoryState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarAccessoryState,carAccessory:CarAccessory){
            state.editCarAccessory=carAccessory;
        }
}
}
const carAccessoryModule=new CarAccessoryModule();
export default carAccessoryModule;
