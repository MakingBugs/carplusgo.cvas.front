import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Accessories from '../../entities/accessories/accessories'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface AccessoriesState extends ListState<Accessories>{
    editAccessories:Accessories;
}
class AccessoriesModule extends ListModule<AccessoriesState,any,Accessories>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Accessories>(),
        loading:false,
        editAccessories:new Accessories(),
    }
    actions={
        async getAll(context:ActionContext<AccessoriesState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/Accessories/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Accessories>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<AccessoriesState,any>,payload:any){
            await Ajax.post('/api/services/app/Accessories/Create',payload.data);
        },
        async update(context:ActionContext<AccessoriesState,any>,payload:any){
            await Ajax.post('/api/services/app/Accessories/Update',payload.data);
        },
        async delete(context:ActionContext<AccessoriesState,any>,payload:any){
            await Ajax.post('/api/services/app/Accessories/Delete',payload.data);
        },
        async get(context:ActionContext<AccessoriesState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Accessories/Get',payload);
            return reponse.data.result as Accessories;
        }
    };
    mutations={
        setCurrentPage(state:AccessoriesState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:AccessoriesState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:AccessoriesState,accessories:Accessories){
            state.editAccessories=accessories;
        }
    }
}
const accessoriesModule=new AccessoriesModule();
export default accessoriesModule;