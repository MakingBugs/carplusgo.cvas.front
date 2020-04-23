import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import VEmp from '../../entities/public/vEmp'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface VEmpState extends ListState<VEmp>{
    editVEmp:VEmp;
}
class VEmpModule extends ListModule<VEmpState,any,VEmp>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<VEmp>(),
        loading:false,
        editVEmp:new VEmp(),
    }
    actions={
        async getAll(context:ActionContext<VEmpState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/VEmp/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<VEmp>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<VEmpState,any>,payload:any){
            await Ajax.post('/api/services/app/VEmp/Create',payload.data);
        },
        async update(context:ActionContext<VEmpState,any>,payload:any){
            await Ajax.post('/api/services/app/VEmp/Update',payload.data);
        },
        async delete(context:ActionContext<VEmpState,any>,payload:any){
            await Ajax.post('/api/services/app/VEmp/Delete',payload.data);
        },
        async get(context:ActionContext<VEmpState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/VEmp/Get',payload);
            return reponse.data.result as VEmp;
        }
    };
    mutations={
        setCurrentPage(state:VEmpState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:VEmpState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:VEmpState,vEmp:VEmp){
            state.editVEmp=vEmp;
        }
}
}
const vEmpModule=new VEmpModule();
export default vEmpModule;
