import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import InsuranceType from '../../entities/insure/insuranceType'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface InsuranceTypeState extends ListState<InsuranceType>{
    editInsuranceType:InsuranceType;
    selectList:Array<InsuranceType>;
}
class InsuranceTypeModule extends ListModule<InsuranceTypeState,any,InsuranceType>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<InsuranceType>(),
        selectList:new Array<InsuranceType>(),
        loading:false,
        editInsuranceType:new InsuranceType()
    }
    actions={
        async getAll(context:ActionContext<InsuranceTypeState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/InsuranceType/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<InsuranceType>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async selectAll(context:ActionContext<InsuranceTypeState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/InsuranceType/GetAll',payload.data);
            let page=reponse.data.result as PageResult<InsuranceType>;
            context.state.selectList=page.items;
        },
        async create(context:ActionContext<InsuranceTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/InsuranceType/Create',payload.data);
        },
        async update(context:ActionContext<InsuranceTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/InsuranceType/Update',payload.data);
        },
        async delete(context:ActionContext<InsuranceTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/InsuranceType/Delete',payload.data);
        },
        async get(context:ActionContext<InsuranceTypeState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/InsuranceType/Get',payload);
            return reponse.data.result as InsuranceType;
        }
    };
    mutations={
        setCurrentPage(state:InsuranceTypeState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:InsuranceTypeState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:InsuranceTypeState,insuranceType:InsuranceType){
            state.editInsuranceType=insuranceType;
        }
    }
}
const insuranceTypeModule=new InsuranceTypeModule();
export default insuranceTypeModule;