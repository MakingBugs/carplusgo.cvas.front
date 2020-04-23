import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CXLPFee from '../../entities/carInsurance/cxlpFee'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CXLPFeeState extends ListState<CXLPFee>{
    editCXLPFee:CXLPFee;
}
class CXLPFeeModule extends ListModule<CXLPFeeState,any,CXLPFee>{//车险资料附件表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CXLPFee>(),
        loading:false,
        editCXLPFee:new CXLPFee()
    }
    actions={
        async getAll(context:ActionContext<CXLPFeeState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CXLPFee/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CXLPFee>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CXLPFeeState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPFee/Create',payload.data);
        },
        async update(context:ActionContext<CXLPFeeState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPFee/Update',payload.data);
        },
        async delete(context:ActionContext<CXLPFeeState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPFee/Delete',payload.data);
        },
        async get(context:ActionContext<CXLPFeeState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CXLPFee/Get',payload);
            return reponse.data.result as CXLPFee;
        }
    };
    mutations={
        setCurrentPage(state:CXLPFeeState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CXLPFeeState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CXLPFeeState,cxlpFee:CXLPFee){
            state.editCXLPFee=cxlpFee;
        }
    }
}
const cxlpFeeModule=new CXLPFeeModule();
export default cxlpFeeModule;