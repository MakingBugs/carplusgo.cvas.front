import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import RepositoryOutFile from '../../entities/vehicleScheduling/repositoryOutFile'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface RepositoryOutFileState extends ListState<RepositoryOutFile>{
    editRepositoryOutFile:RepositoryOutFile;
}
class RepositoryOutFileModule extends ListModule<RepositoryOutFileState,any,RepositoryOutFile>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<RepositoryOutFile>(),
        loading:false,
        editRepositoryOutFile:new RepositoryOutFile(),
    }
    actions={
        async getAll(context:ActionContext<RepositoryOutFileState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/RepositoryOutFile/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<RepositoryOutFile>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<RepositoryOutFileState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutFile/Create',payload.data);
        },
        async update(context:ActionContext<RepositoryOutFileState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutFile/Update',payload.data);
        },
        async delete(context:ActionContext<RepositoryOutFileState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutFile/Delete',payload.data);
        },
        async get(context:ActionContext<RepositoryOutFileState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/RepositoryOutFile/Get',payload);
            return reponse.data.result as RepositoryOutFile;
        }
    };
    mutations={
        setCurrentPage(state:RepositoryOutFileState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RepositoryOutFileState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RepositoryOutFileState,repositoryOutFile:RepositoryOutFile){
            state.editRepositoryOutFile=repositoryOutFile;
        }
}
}
const repositoryOutFileModule=new RepositoryOutFileModule();
export default repositoryOutFileModule;
