import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import InsuranceDetail from '../../entities/insure/insuranceDetail'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface InsuranceDetailState extends ListState<InsuranceDetail>{
    editInsuranceDetail:InsuranceDetail;
    selectList:Array<InsuranceDetail>;
    insertNum:Number;
}
class InsuranceDetailModule extends ListModule<InsuranceDetailState,any,InsuranceDetail>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<InsuranceDetail>(),
        selectList:new Array<InsuranceDetail>(),
        loading:false,
        editInsuranceDetail:new InsuranceDetail(),
        insertNum:0,
    }
    actions={
        async getAll(context:ActionContext<InsuranceDetailState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/InsuranceDetail/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<InsuranceDetail>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async selectAll(context:ActionContext<InsuranceDetailState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/InsuranceDetail/GetAll',payload.data);
            let page=reponse.data.result as PageResult<InsuranceDetail>;
            context.state.selectList=page.items;
        },
        async create(context:ActionContext<InsuranceDetailState,any>,payload:any){
            await Ajax.post('/api/services/app/InsuranceDetail/Create',payload.data);
        },
        async update(context:ActionContext<InsuranceDetailState,any>,payload:any){
            await Ajax.post('/api/services/app/InsuranceDetail/Update',payload.data);
        },
        async delete(context:ActionContext<InsuranceDetailState,any>,payload:any){
            await Ajax.post('/api/services/app/InsuranceDetail/Delete',payload.data);
        },
        async get(context:ActionContext<InsuranceDetailState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/InsuranceDetail/Get',payload);
            return reponse.data.result as InsuranceDetail;
        },
        async importAll(context:ActionContext<InsuranceDetailState,any>,payload:any){
            let reponse = await Ajax.post('/api/services/app/InsuranceDetail/ImportAll',payload.data);
            context.state.insertNum = reponse.data.result
        },
    };
    mutations={
        setCurrentPage(state:InsuranceDetailState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:InsuranceDetailState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:InsuranceDetailState,insuranceDetail:InsuranceDetail){
            state.editInsuranceDetail=insuranceDetail;
        }
}
}
const insuranceDetailModule=new InsuranceDetailModule();
export default insuranceDetailModule;
