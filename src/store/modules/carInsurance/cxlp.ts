import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CXLP from '../../entities/carInsurance/cxlp'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CXLPState extends ListState<CXLP>{
    editCXLP:CXLP;
}
class CXLPModule extends ListModule<CXLPState,any,CXLP>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CXLP>(),
        loading:false,
        editCXLP:new CXLP(),
    }
    actions={
        async getAll(context:ActionContext<CXLPState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CXLP/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CXLP>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async SelectMaxCXLPNO(context:ActionContext<CXLPState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CXLP/SelectMaxCXLPNO',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CXLP>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CXLPState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CXLP/Create',payload.data);
            let page=reponse.data.result as PageResult<CXLP>;
            return page
        },
        async update(context:ActionContext<CXLPState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLP/Update',payload.data);
        },
        async delete(context:ActionContext<CXLPState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLP/Delete',payload.data);
        },
        async get(context:ActionContext<CXLPState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CXLP/Get',payload.data);
            return reponse.data.result as CXLP;
        }
    };
    mutations={
        setCurrentPage(state:CXLPState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CXLPState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CXLPState,cxlp:CXLP){
            state.editCXLP=cxlp;
        }
    }
}
const cxlpModule=new CXLPModule();
export default cxlpModule;