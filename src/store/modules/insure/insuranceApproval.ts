import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import InsuranceApproval from '../../entities/insure/insuranceApproval'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface InsuranceApprovalState extends ListState<InsuranceApproval>{
    editInsuranceApproval:InsuranceApproval;
}
class InsuranceApprovalModule extends ListModule<InsuranceApprovalState,any,InsuranceApproval>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<InsuranceApproval>(),
        loading:false,
        editInsuranceApproval:new InsuranceApproval(),
    }
    actions={
        async getAll(context:ActionContext<InsuranceApprovalState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/InsuranceApproval/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<InsuranceApproval>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<InsuranceApprovalState,any>,payload:any){
            await Ajax.post('/api/services/app/InsuranceApproval/Create',payload.data);
        },
        async update(context:ActionContext<InsuranceApprovalState,any>,payload:any){
            await Ajax.post('/api/services/app/InsuranceApproval/Update',payload.data);
        },
        async delete(context:ActionContext<InsuranceApprovalState,any>,payload:any){
            await Ajax.post('/api/services/app/InsuranceApproval/Delete',payload.data);
        },
        async get(context:ActionContext<InsuranceApprovalState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/InsuranceApproval/Get',payload);
            return reponse.data.result as InsuranceApproval;
        }
    };
    mutations={
        setCurrentPage(state:InsuranceApprovalState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:InsuranceApprovalState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:InsuranceApprovalState,insuranceApproval:InsuranceApproval){
            state.editInsuranceApproval=insuranceApproval;
        }
}
}
const insuranceApprovalModule=new InsuranceApprovalModule();
export default insuranceApprovalModule;
