import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';
import CXLPDZF from '@/store/entities/carInsurance/cxlpDZF';

interface CXLPDZFState extends ListState<CXLPDZF>{
    editCXLPDZF:CXLPDZF;
}
class CXLPDZFModule extends ListModule<CXLPDZFState,any,CXLPDZF>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CXLPDZF>(),
        loading:false,
        editCXLPDZF:new CXLPDZF()
    }
    actions={
        async getAll(context:ActionContext<CXLPDZFState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CXLPDZF/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CXLPDZF>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CXLPDZFState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CXLPDZF/Create',payload.data);
            let page=reponse.data.result as PageResult<CXLPDZF>;
            return page
        },
        async update(context:ActionContext<CXLPDZFState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPDZF/Update',payload.data);
        },
        async delete(context:ActionContext<CXLPDZFState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPDZF/Delete',payload.data);
        },
        async get(context:ActionContext<CXLPDZFState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CXLPDZF/Get',payload);
            return reponse.data.result as CXLPDZF;
        }
    };
    mutations={
        setCurrentPage(state:CXLPDZFState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CXLPDZFState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CXLPDZFState,cxlpDZF:CXLPDZF){
            state.editCXLPDZF=cxlpDZF;
        }
    }
}
const cxlpDZFModule=new CXLPDZFModule();
export default cxlpDZFModule;