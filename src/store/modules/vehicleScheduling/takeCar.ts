import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import TakeCar from '../../entities/vehicleScheduling/takeCar'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface TakeCarState extends ListState<TakeCar>{
    editTakeCar:TakeCar;
}
class TakeCarModule extends ListModule<TakeCarState,any,TakeCar>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<TakeCar>(),
        loading:false,
        editTakeCar:new TakeCar(),
    }
    actions={
        async getAll(context:ActionContext<TakeCarState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/TakeCar/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<TakeCar>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<TakeCarState,any>,payload:any){
            await Ajax.post('/api/services/app/TakeCar/Create',payload.data);
        },
        async createAll(context:ActionContext<TakeCarState,any>,payload:any){
            await Ajax.post('/api/services/app/TakeCar/CreateAll',payload.data);
        },
        async update(context:ActionContext<TakeCarState,any>,payload:any){
            await Ajax.post('/api/services/app/TakeCar/Update',payload.data);
        },
        async delete(context:ActionContext<TakeCarState,any>,payload:any){
            await Ajax.post('/api/services/app/TakeCar/Delete',payload.data);
        },
        async get(context:ActionContext<TakeCarState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/TakeCar/Get',payload);
            return reponse.data.result as TakeCar;
        }
    };
    mutations={
        setCurrentPage(state:TakeCarState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:TakeCarState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:TakeCarState,takeCar:TakeCar){
            state.editTakeCar=takeCar;
        }
}
}
const takeCarModule=new TakeCarModule();
export default takeCarModule;
