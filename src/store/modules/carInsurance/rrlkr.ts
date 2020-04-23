import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';
import RRLKR from '@/store/entities/carInsurance/rrlkr';

interface RRLKRState extends ListState<RRLKR>{
    editRRLKR:RRLKR;
}
class RRLKRModule extends ListModule<RRLKRState,any,RRLKR>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<RRLKR>(),
        loading:false,
        editRRLKR:new RRLKR()
    }
    actions={
        async getAll(context:ActionContext<RRLKRState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/RRLKR/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<RRLKR>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<RRLKRState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/RRLKR/Create',payload.data);
            let page=reponse.data.result as PageResult<RRLKR>;
            return page
        },
        async update(context:ActionContext<RRLKRState,any>,payload:any){
            await Ajax.post('/api/services/app/RRLKR/Update',payload.data);
        },
        async delete(context:ActionContext<RRLKRState,any>,payload:any){
            await Ajax.post('/api/services/app/RRLKR/Delete',payload.data);
        },
        async get(context:ActionContext<RRLKRState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/RRLKR/Get',payload.data);
            return reponse.data.result as RRLKR;
        }
    };
    mutations={
        setCurrentPage(state:RRLKRState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RRLKRState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RRLKRState,rrlkr:RRLKR){
            state.editRRLKR=rrlkr;
        }
    }
}
const rrlkrModule=new RRLKRModule();
export default rrlkrModule;