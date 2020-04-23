import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import LKRTotal from '../../entities/public/lKRTotal'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface LKRTotalState extends ListState<LKRTotal>{
    editLKRTotal:LKRTotal;
}
class LKRTotalModule extends ListModule<LKRTotalState,any,LKRTotal>{//收款人信息表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<LKRTotal>(),
        loading:false,
        editLKRTotal:new LKRTotal()
    }
    actions={
        async getAll(context:ActionContext<LKRTotalState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/LKRTotal/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<LKRTotal>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<LKRTotalState,any>,payload:any){
            await Ajax.post('/api/services/app/LKRTotal/Create',payload.data);
        },
        async update(context:ActionContext<LKRTotalState,any>,payload:any){
            await Ajax.post('/api/services/app/LKRTotal/Update',payload.data);
        },
        async delete(context:ActionContext<LKRTotalState,any>,payload:any){
            await Ajax.post('/api/services/app/LKRTotal/Delete',payload.data);
        },
        async get(context:ActionContext<LKRTotalState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/LKRTotal/Get',payload);
            return reponse.data.result as LKRTotal;
        }
    };
    mutations={
        setCurrentPage(state:LKRTotalState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:LKRTotalState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:LKRTotalState,lKRTotal:LKRTotal){
            state.editLKRTotal=lKRTotal;
        }
    }
}
const lKRTotalModule=new LKRTotalModule();
export default lKRTotalModule;