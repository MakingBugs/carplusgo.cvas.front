import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CXLPPFDetail from '../../entities/carInsurance/cxlpPFDetail'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CXLPPFDetailState extends ListState<CXLPPFDetail>{
    editCXLPPFDetail:CXLPPFDetail;
}
class CXLPPFDetailModule extends ListModule<CXLPPFDetailState,any,CXLPPFDetail>{//车险资料附件表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CXLPPFDetail>(),
        loading:false,
        editCXLPPFDetail:new CXLPPFDetail()
    }
    actions={
        async getAll(context:ActionContext<CXLPPFDetailState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CXLPPFDetail/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CXLPPFDetail>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CXLPPFDetailState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPPFDetail/Create',payload.data);
        },
        async update(context:ActionContext<CXLPPFDetailState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPPFDetail/Update',payload.data);
        },
        async delete(context:ActionContext<CXLPPFDetailState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPPFDetail/Delete',payload.data);
        },
        async get(context:ActionContext<CXLPPFDetailState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CXLPPFDetail/Get',payload);
            return reponse.data.result as CXLPPFDetail;
        }
    };
    mutations={
        setCurrentPage(state:CXLPPFDetailState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CXLPPFDetailState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CXLPPFDetailState,cxlpPFDetail:CXLPPFDetail){
            state.editCXLPPFDetail=cxlpPFDetail;
        }
    }
}
const cxlpPFDetailModule=new CXLPPFDetailModule();
export default cxlpPFDetailModule;