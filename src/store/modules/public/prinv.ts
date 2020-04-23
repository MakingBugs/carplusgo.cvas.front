import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import PRInv from '../../entities/public/prinv'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface PRInvState extends ListState<PRInv>{
    editPRInv:PRInv;
}
class PRInvModule extends ListModule<PRInvState,any,PRInv>{//发票明细表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<PRInv>(),
        loading:false,
        editPRInv:new PRInv()
    }
    actions={
        async getAll(context:ActionContext<PRInvState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/PRInv/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<PRInv>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<PRInvState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/PRInv/Create',payload.data);
            let page=reponse.data.result as PageResult<PRInv>;
            return page
        },
        async update(context:ActionContext<PRInvState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/PRInv/Update',payload.data);
            let page=reponse.data.result as PageResult<PRInv>;
            return page
        },
        async delete(context:ActionContext<PRInvState,any>,payload:any){
            await Ajax.post('/api/services/app/PRInv/Delete',payload.data);
        },
        async get(context:ActionContext<PRInvState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/PRInv/Get',payload);
            return reponse.data.result as PRInv;
        }
    };
    mutations={
        setCurrentPage(state:PRInvState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:PRInvState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:PRInvState,prinv:PRInv){
            state.editPRInv=prinv;
        }
    }
}
const prinvModule=new PRInvModule();
export default prinvModule;