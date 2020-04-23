import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import InsurancePreset from '../../entities/insure/insurancePreset'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface InsurancePresetState extends ListState<InsurancePreset>{
    editInsurancePreset:InsurancePreset;
    selectList:Array<InsurancePreset>;
}
class InsurancePresetModule extends ListModule<InsurancePresetState,any,InsurancePreset>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<InsurancePreset>(),
        selectList:new Array<InsurancePreset>(),
        loading:false,
        editInsurancePreset:new InsurancePreset(),
    }
    actions={
        async getAll(context:ActionContext<InsurancePresetState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/InsurancePreset/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<InsurancePreset>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async selectAll(context:ActionContext<InsurancePresetState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/InsurancePreset/GetAll',payload.data);
            let page=reponse.data.result as PageResult<InsurancePreset>;
            context.state.selectList=page.items;
        },
        async create(context:ActionContext<InsurancePresetState,any>,payload:any){
            await Ajax.post('/api/services/app/InsurancePreset/Create',payload.data);
        },
        async update(context:ActionContext<InsurancePresetState,any>,payload:any){
            await Ajax.post('/api/services/app/InsurancePreset/Update',payload.data);
        },
        async delete(context:ActionContext<InsurancePresetState,any>,payload:any){
            await Ajax.post('/api/services/app/InsurancePreset/Delete',payload.data);
        },
        async get(context:ActionContext<InsurancePresetState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/InsurancePreset/Get',payload);
            return reponse.data.result as InsurancePreset;
        }
    };
    mutations={
        setCurrentPage(state:InsurancePresetState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:InsurancePresetState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:InsurancePresetState,insurancePreset:InsurancePreset){
            state.editInsurancePreset=insurancePreset;
        }
}
}
const insurancePresetModule=new InsurancePresetModule();
export default insurancePresetModule;
