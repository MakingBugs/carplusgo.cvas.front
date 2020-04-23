import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Repository from '../../entities/vehicleScheduling/repository'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface RepositoryState extends ListState<Repository>{
    editRepository:Repository;
}
class RepositoryModule extends ListModule<RepositoryState,any,Repository>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Repository>(),
        loading:false,
        editRepository:new Repository(),
    }
    actions={
        async getAll(context:ActionContext<RepositoryState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/Repository/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Repository>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<RepositoryState,any>,payload:any){
            await Ajax.post('/api/services/app/Repository/Create',payload.data);
        },
        async update(context:ActionContext<RepositoryState,any>,payload:any){
            await Ajax.post('/api/services/app/Repository/Update',payload.data);
        },
        async delete(context:ActionContext<RepositoryState,any>,payload:any){
            await Ajax.post('/api/services/app/Repository/Delete',payload.data);
        },
        async get(context:ActionContext<RepositoryState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Repository/Get',payload);
            return reponse.data.result as Repository;
        }
    };
    mutations={
        setCurrentPage(state:RepositoryState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RepositoryState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RepositoryState,repository:Repository){
            state.editRepository=repository;
        }
}
}
const repositoryModule=new RepositoryModule();
export default repositoryModule;
