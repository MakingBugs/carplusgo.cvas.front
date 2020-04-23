import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import AccessoriesMainType from '../../entities/accessories/accessoriesMainType'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface AccessoriesMainTypeState extends ListState<AccessoriesMainType>{
    editAccessoriesMainType:AccessoriesMainType;
}
class AccessoriesMainTypeModule extends ListModule<AccessoriesMainTypeState,any,AccessoriesMainType>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<AccessoriesMainType>(),
        loading:false,
        editAccessoriesMainType:new AccessoriesMainType()
    }
    actions={
        async getAll(context:ActionContext<AccessoriesMainTypeState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/AccessoriesMainType/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<AccessoriesMainType>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<AccessoriesMainTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesMainType/Create',payload.data);
        },
        async update(context:ActionContext<AccessoriesMainTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesMainType/Update',payload.data);
        },
        async delete(context:ActionContext<AccessoriesMainTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesMainType/Delete',payload.data);
        },
        async get(context:ActionContext<AccessoriesMainTypeState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/AccessoriesMainType/Get',payload);
            return reponse.data.result as AccessoriesMainType;
        }
    };
    mutations={
        setCurrentPage(state:AccessoriesMainTypeState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:AccessoriesMainTypeState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:AccessoriesMainTypeState,accessoriesMainType:AccessoriesMainType){
            state.editAccessoriesMainType=accessoriesMainType;
        }
    }
}
const accessoriesMainTypeModule=new AccessoriesMainTypeModule();
export default accessoriesMainTypeModule;