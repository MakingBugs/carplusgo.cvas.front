import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import RepositoryManager from '../../entities/vehicleScheduling/repositoryManager'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface RepositoryManagerState extends ListState<RepositoryManager>{
    editRepositoryManager:RepositoryManager;
}
class RepositoryManagerModule extends ListModule<RepositoryManagerState,any,RepositoryManager>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<RepositoryManager>(),
        loading:false,
        editRepositoryManager:new RepositoryManager(),
    }
    actions={
        async getAll(context:ActionContext<RepositoryManagerState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/RepositoryManager/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<RepositoryManager>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<RepositoryManagerState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryManager/Create',payload.data);
        },
        async update(context:ActionContext<RepositoryManagerState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryManager/Update',payload.data);
        },
        async delete(context:ActionContext<RepositoryManagerState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryManager/Delete',payload.data);
        },
        async get(context:ActionContext<RepositoryManagerState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/RepositoryManager/Get',payload);
            return reponse.data.result as RepositoryManager;
        }
    };
    mutations={
        setCurrentPage(state:RepositoryManagerState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RepositoryManagerState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RepositoryManagerState,repositoryManager:RepositoryManager){
            state.editRepositoryManager=repositoryManager;
        }
}
}
const repositoryManagerModule=new RepositoryManagerModule();
export default repositoryManagerModule;
