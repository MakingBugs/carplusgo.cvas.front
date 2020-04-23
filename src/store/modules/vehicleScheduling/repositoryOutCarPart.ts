import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import RepositoryOutCarPart from '../../entities/vehicleScheduling/repositoryOutCarPart'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface RepositoryOutCarPartState extends ListState<RepositoryOutCarPart>{
    editRepositoryOutCarPart:RepositoryOutCarPart;
}
class RepositoryOutCarPartModule extends ListModule<RepositoryOutCarPartState,any,RepositoryOutCarPart>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<RepositoryOutCarPart>(),
        loading:false,
        editRepositoryOutCarPart:new RepositoryOutCarPart(),
    }
    actions={
        async getAll(context:ActionContext<RepositoryOutCarPartState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/RepositoryOutCarPart/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<RepositoryOutCarPart>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<RepositoryOutCarPartState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutCarPart/Create',payload.data);
        },
        async update(context:ActionContext<RepositoryOutCarPartState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutCarPart/Update',payload.data);
        },
        async delete(context:ActionContext<RepositoryOutCarPartState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutCarPart/Delete',payload.data);
        },
        async get(context:ActionContext<RepositoryOutCarPartState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/RepositoryOutCarPart/Get',payload);
            return reponse.data.result as RepositoryOutCarPart;
        }
    };
    mutations={
        setCurrentPage(state:RepositoryOutCarPartState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RepositoryOutCarPartState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RepositoryOutCarPartState,repositoryOutCarPart:RepositoryOutCarPart){
            state.editRepositoryOutCarPart=repositoryOutCarPart;
        }
}
}
const repositoryOutCarPartModule=new RepositoryOutCarPartModule();
export default repositoryOutCarPartModule;
