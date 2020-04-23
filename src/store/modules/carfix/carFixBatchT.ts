import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarFixBatchT from '../../entities/carfix/carFixBatchT'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarFixBatchTState extends ListState<CarFixBatchT>{
    editCarFixBatchT:CarFixBatchT;
}
class CarFixBatchTModule extends ListModule<CarFixBatchTState,any,CarFixBatchT>{//维修送件批次档
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarFixBatchT>(),
        loading:false,
        editCarFixBatchT:new CarFixBatchT()
    }
    actions={
        async getAll(context:ActionContext<CarFixBatchTState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarFixBatchT/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarFixBatchT>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async selectMaxCarFixBatchTNO(context:ActionContext<CarFixBatchTState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarFixBatchT/SelectMaxCarFixBatchTNO',payload.data);
            let page=reponse.data.result as PageResult<CarFixBatchT>;
            return page;
        },
        async create(context:ActionContext<CarFixBatchTState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarFixBatchT/Create',payload.data);
            let page=reponse.data.result as PageResult<CarFixBatchT>;
            return page
        },
        async update(context:ActionContext<CarFixBatchTState,any>,payload:any){
            await Ajax.post('/api/services/app/CarFixBatchT/Update',payload.data);
        },
        async delete(context:ActionContext<CarFixBatchTState,any>,payload:any){
            await Ajax.post('/api/services/app/CarFixBatchT/Delete',payload.data);
        },
        async get(context:ActionContext<CarFixBatchTState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarFixBatchT/Get',payload);
            return reponse.data.result as CarFixBatchT;
        }
    };
    mutations={
        setCurrentPage(state:CarFixBatchTState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarFixBatchTState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarFixBatchTState,carFixBatchT:CarFixBatchT){
            state.editCarFixBatchT=carFixBatchT;
        }
    }
}
const carFixBatchTModule=new CarFixBatchTModule();
export default carFixBatchTModule;