import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CXLPSupplement from '../../entities/carInsurance/cxlpSupplement'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CXLPSupplementState extends ListState<CXLPSupplement>{
    editCXLPSupplement:CXLPSupplement;
}
class CXLPSupplementModule extends ListModule<CXLPSupplementState,any,CXLPSupplement>{//处理进度表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CXLPSupplement>(),
        loading:false,
        editCXLPSupplement:new CXLPSupplement()
    }
    actions={
        async getAll(context:ActionContext<CXLPSupplementState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CXLPSupplement/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CXLPSupplement>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CXLPSupplementState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPSupplement/Create',payload.data);
        },
        async update(context:ActionContext<CXLPSupplementState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPSupplement/Update',payload.data);
        },
        async delete(context:ActionContext<CXLPSupplementState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPSupplement/Delete',payload.data);
        },
        async get(context:ActionContext<CXLPSupplementState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CXLPSupplement/Get',payload);
            return reponse.data.result as CXLPSupplement;
        }
    };
    mutations={
        setCurrentPage(state:CXLPSupplementState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CXLPSupplementState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CXLPSupplementState,cxlpSupplement:CXLPSupplement){
            state.editCXLPSupplement=cxlpSupplement;
        }
    }
}
const cxlpSupplementModule=new CXLPSupplementModule();
export default cxlpSupplementModule;