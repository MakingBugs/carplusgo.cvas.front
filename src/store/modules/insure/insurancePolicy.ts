import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import InsurancePolicy from '../../entities/insure/insurancePolicy'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface InsurancePolicyState extends ListState<InsurancePolicy>{
    editInsurancePolicy:InsurancePolicy;
    selectList:Array<InsurancePolicy>;
}
class InsurancePolicyModule extends ListModule<InsurancePolicyState,any,InsurancePolicy>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<InsurancePolicy>(),
        selectList:new Array<InsurancePolicy>(),
        loading:false,
        editInsurancePolicy:new InsurancePolicy(),
    }
    actions={
        async getAll(context:ActionContext<InsurancePolicyState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/InsurancePolicy/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<InsurancePolicy>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async selectAll(context:ActionContext<InsurancePolicyState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/InsurancePolicy/GetAll',payload.data);
            let page=reponse.data.result as PageResult<InsurancePolicy>;
            context.state.selectList=page.items;
        },
        async create(context:ActionContext<InsurancePolicyState,any>,payload:any){
            await Ajax.post('/api/services/app/InsurancePolicy/Create',payload.data);
        },
        async update(context:ActionContext<InsurancePolicyState,any>,payload:any){
            await Ajax.post('/api/services/app/InsurancePolicy/Update',payload.data);
        },
        async delete(context:ActionContext<InsurancePolicyState,any>,payload:any){
            await Ajax.post('/api/services/app/InsurancePolicy/Delete',payload.data);
        },
        async get(context:ActionContext<InsurancePolicyState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/InsurancePolicy/Get',payload);
            return reponse.data.result as InsurancePolicy;
        },
        async surrender(context:ActionContext<InsurancePolicyState,any>,payload:any){
            await Ajax.post('/api/services/app/InsurancePolicy/Surrender',payload.data);
        },
    };
    mutations={
        setCurrentPage(state:InsurancePolicyState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:InsurancePolicyState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:InsurancePolicyState,insurancePolicy:InsurancePolicy){
            state.editInsurancePolicy=insurancePolicy;
        }
}
}
const insurancePolicyModule=new InsurancePolicyModule();
export default insurancePolicyModule;
