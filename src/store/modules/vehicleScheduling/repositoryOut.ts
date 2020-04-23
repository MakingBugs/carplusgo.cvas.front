import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import RepositoryOut from '../../entities/vehicleScheduling/repositoryOut'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface RepositoryOutState extends ListState<RepositoryOut>{
    editRepositoryOut:RepositoryOut;
}
class RepositoryOutModule extends ListModule<RepositoryOutState,any,RepositoryOut>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<RepositoryOut>(),
        loading:false,
        editRepositoryOut:new RepositoryOut(),
    }
    actions={
        async getAll(context:ActionContext<RepositoryOutState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/RepositoryOut/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<RepositoryOut>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<RepositoryOutState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOut/Create',payload.data);
        },
        async update(context:ActionContext<RepositoryOutState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOut/Update',payload.data);
        },
        async delete(context:ActionContext<RepositoryOutState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOut/Delete',payload.data);
        },
        async get(context:ActionContext<RepositoryOutState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/RepositoryOut/Get',payload);
            return reponse.data.result as RepositoryOut;
        }
    };
    mutations={
        setCurrentPage(state:RepositoryOutState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RepositoryOutState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RepositoryOutState,repositoryOut:RepositoryOut){
            state.editRepositoryOut=repositoryOut;
        }
}
}
const repositoryOutModule=new RepositoryOutModule();
export default repositoryOutModule;
