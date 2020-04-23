import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarPart from '../../entities/vehicleScheduling/carPart'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarPartState extends ListState<CarPart>{
    editCarPart:CarPart;
}
class CarPartModule extends ListModule<CarPartState,any,CarPart>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarPart>(),
        loading:false,
        editCarPart:new CarPart(),
    }
    actions={
        async getAll(context:ActionContext<CarPartState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarPart/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarPart>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<CarPartState,any>,payload:any){
            await Ajax.post('/api/services/app/CarPart/Create',payload.data);
        },
        async update(context:ActionContext<CarPartState,any>,payload:any){
            await Ajax.post('/api/services/app/CarPart/Update',payload.data);
        },
        async delete(context:ActionContext<CarPartState,any>,payload:any){
            await Ajax.post('/api/services/app/CarPart/Delete',payload.data);
        },
        async get(context:ActionContext<CarPartState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarPart/Get',payload);
            return reponse.data.result as CarPart;
        }
    };
    mutations={
        setCurrentPage(state:CarPartState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarPartState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarPartState,carPart:CarPart){
            state.editCarPart=carPart;
        }
}
}
const carPartModule=new CarPartModule();
export default carPartModule;
