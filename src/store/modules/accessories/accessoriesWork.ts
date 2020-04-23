import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import AccessoriesWork from '../../entities/accessories/accessoriesWork'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface AccessoriesWorkState extends ListState<AccessoriesWork>{
    editAccessoriesWork:AccessoriesWork;
}
class AccessoriesWorkModule extends ListModule<AccessoriesWorkState,any,AccessoriesWork>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<AccessoriesWork>(),
        loading:false,
        editAccessoriesWork:new AccessoriesWork()
    }
    actions={
        async getAll(context:ActionContext<AccessoriesWorkState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/AccessoriesWork/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<AccessoriesWork>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<AccessoriesWorkState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesWork/Create',payload.data);
        },
        async update(context:ActionContext<AccessoriesWorkState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesWork/Update',payload.data);
        },
        async get(context:ActionContext<AccessoriesWorkState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/AccessoriesWork/Get',payload);
            return reponse.data.result as AccessoriesWork;
        }
    };
    mutations={
        setCurrentPage(state:AccessoriesWorkState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:AccessoriesWorkState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:AccessoriesWorkState,accessoriesWork:AccessoriesWork){
            state.editAccessoriesWork=accessoriesWork;
        }
    }
}
const accessoriesWorkModule=new AccessoriesWorkModule();
export default accessoriesWorkModule;