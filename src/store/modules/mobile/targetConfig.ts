import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface TargetConfigState extends ListState<any>{
    editTargetConfig:any;
}
class TargetConfigModule extends ListModule<TargetConfigState,any,any>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<any>(),
        loading:false,
        editTargetConfig:{}
    }
    actions={
        async getAll(context:ActionContext<TargetConfigState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/TargetConfig/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<any>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<TargetConfigState,any>,payload:any){
            await Ajax.post('/api/services/app/TargetConfig/Create',payload.data);
        },
        async update(context:ActionContext<TargetConfigState,any>,payload:any){
            await Ajax.post('/api/services/app/TargetConfig/Update',payload.data);
        },
        async delete(context:ActionContext<TargetConfigState,any>,payload:any){
            await Ajax.post('/api/services/app/TargetConfig/Delete',payload.data);
        },
        async get(context:ActionContext<TargetConfigState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/TargetConfig/Get',payload);
            return reponse.data.result as any;
        }
    };
    mutations={
        setCurrentPage(state:TargetConfigState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:TargetConfigState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:TargetConfigState,targetConfig:any){
            state.editTargetConfig=targetConfig;
        }
    }
}
const targetConfigModule=new TargetConfigModule();
export default targetConfigModule;