import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Insure2 from '../../entities/insure/insure2'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface Insure2State extends ListState<Insure2>{
    editInsure2:Insure2;
}
class Insure2Module extends ListModule<Insure2State,any,Insure2>{//保险
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Insure2>(),
        loading:false,
        editInsure2:new Insure2()
    }
    actions={
        async getAll(context:ActionContext<Insure2State,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/Insure2/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Insure2>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<Insure2State,any>,payload:any){
            await Ajax.post('/api/services/app/Insure2/Create',payload.data);
        },
        async update(context:ActionContext<Insure2State,any>,payload:any){
            await Ajax.post('/api/services/app/Insure2/Update',payload.data);
        },
        async delete(context:ActionContext<Insure2State,any>,payload:any){
            await Ajax.post('/api/services/app/Insure2/Delete',payload.data);
        },
        async get(context:ActionContext<Insure2State,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Insure2/Get',payload);
            return reponse.data.result as Insure2;
        }
    };
    mutations={
        setCurrentPage(state:Insure2State,page:number){
            state.currentPage=page;
        },
        setPageSize(state:Insure2State,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:Insure2State,insure2:Insure2){
            state.editInsure2=insure2;
        }
    }
}
const insure2Module=new Insure2Module();
export default insure2Module;