import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import AccessoriesType from '../../entities/accessories/accessoriesType'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface AccessoriesTypeState extends ListState<AccessoriesType>{
    editAccessoriesType:AccessoriesType;
}
class AccessoriesTypeModule extends ListModule<AccessoriesTypeState,any,AccessoriesType>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<AccessoriesType>(),
        loading:false,
        editAccessoriesType:new AccessoriesType()
    }
    actions={
        async getAll(context:ActionContext<AccessoriesTypeState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/AccessoriesType/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<AccessoriesType>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<AccessoriesTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesType/Create',payload.data);
        },
        async update(context:ActionContext<AccessoriesTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesType/Update',payload.data);
        },
        async delete(context:ActionContext<AccessoriesTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesType/Delete',payload.data);
        },
        async get(context:ActionContext<AccessoriesTypeState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/AccessoriesType/Get',payload);
            return reponse.data.result as AccessoriesType;
        }
    }
    mutations={
        setCurrentPage(state:AccessoriesTypeState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:AccessoriesTypeState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:AccessoriesTypeState,accessoriesType:AccessoriesType){
            state.editAccessoriesType=accessoriesType;
        }
        
    }
}
const accessoriesTypeModule=new AccessoriesTypeModule();
export default accessoriesTypeModule;