import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Unit from '../../entities/public/unit'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface UnitState extends ListState<Unit>{
    editUnit:Unit;
}
class UnitModule extends ListModule<UnitState,any,Unit>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Unit>(),
        loading:false,
        editUnit:new Unit(),
    }
    actions={
        async getAll(context:ActionContext<UnitState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/Unit/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Unit>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<UnitState,any>,payload:any){
            await Ajax.post('/api/services/app/Unit/Create',payload.data);
        },
        async update(context:ActionContext<UnitState,any>,payload:any){
            await Ajax.post('/api/services/app/Unit/Update',payload.data);
        },
        async delete(context:ActionContext<UnitState,any>,payload:any){
            await Ajax.post('/api/services/app/Unit/Delete',payload.data);
        },
        async get(context:ActionContext<UnitState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Unit/Get',payload);
            return reponse.data.result as Unit;
        }
    };
    mutations={
        setCurrentPage(state:UnitState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:UnitState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:UnitState,unit:Unit){
            state.editUnit=unit;
        }
}
}
const unitModule=new UnitModule();
export default unitModule;
