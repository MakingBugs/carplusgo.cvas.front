import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarFixBatch from '../../entities/carfix/carFixBatch'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarFixBatchState extends ListState<CarFixBatch>{
    editCarFixBatch:CarFixBatch;
}
class CarFixBatchModule extends ListModule<CarFixBatchState,any,CarFixBatch>{//批次请款送件档
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarFixBatch>(),
        loading:false,
        editCarFixBatch:new CarFixBatch()
    }
    actions={
        async getAll(context:ActionContext<CarFixBatchState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarFixBatch/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarFixBatch>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CarFixBatchState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarFixBatch/Create',payload.data);
            let page=reponse.data.result as PageResult<CarFixBatch>;
            return page
        },
        async update(context:ActionContext<CarFixBatchState,any>,payload:any){
            await Ajax.post('/api/services/app/CarFixBatch/Update',payload.data);
        },
        async delete(context:ActionContext<CarFixBatchState,any>,payload:any){
            await Ajax.post('/api/services/app/CarFixBatch/Delete',payload.data);
        },
        async get(context:ActionContext<CarFixBatchState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarFixBatch/Get',payload);
            return reponse.data.result as CarFixBatch;
        }
    };
    mutations={
        setCurrentPage(state:CarFixBatchState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarFixBatchState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarFixBatchState,carFixBatch:CarFixBatch){
            state.editCarFixBatch=carFixBatch;
        }
    }
}
const carFixBatchModule=new CarFixBatchModule();
export default carFixBatchModule;