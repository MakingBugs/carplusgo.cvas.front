import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import RepositoryOutAccessory from '../../entities/vehicleScheduling/repositoryOutAccessory'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface RepositoryOutAccessoryState extends ListState<RepositoryOutAccessory>{
    editRepositoryOutAccessory:RepositoryOutAccessory;
}
class RepositoryOutAccessoryModule extends ListModule<RepositoryOutAccessoryState,any,RepositoryOutAccessory>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<RepositoryOutAccessory>(),
        loading:false,
        editRepositoryOutAccessory:new RepositoryOutAccessory(),
    }
    actions={
        async getAll(context:ActionContext<RepositoryOutAccessoryState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/RepositoryOutAccessory/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<RepositoryOutAccessory>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<RepositoryOutAccessoryState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutAccessory/Create',payload.data);
        },
        async update(context:ActionContext<RepositoryOutAccessoryState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutAccessory/Update',payload.data);
        },
        async delete(context:ActionContext<RepositoryOutAccessoryState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutAccessory/Delete',payload.data);
        },
        async get(context:ActionContext<RepositoryOutAccessoryState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/RepositoryOutAccessory/Get',payload);
            return reponse.data.result as RepositoryOutAccessory;
        }
    };
    mutations={
        setCurrentPage(state:RepositoryOutAccessoryState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RepositoryOutAccessoryState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RepositoryOutAccessoryState,repositoryOutAccessory:RepositoryOutAccessory){
            state.editRepositoryOutAccessory=repositoryOutAccessory;
        }
}
}
const repositoryOutAccessoryModule=new RepositoryOutAccessoryModule();
export default repositoryOutAccessoryModule;
